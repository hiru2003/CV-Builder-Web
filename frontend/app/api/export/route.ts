import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer-core';
import fs from 'fs';

function getLocalChromePath() {
  const paths = [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary',
    '/usr/bin/google-chrome'
  ];
  for (const path of paths) {
    if (fs.existsSync(path)) return path;
  }
  return null;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { data, template, font, themeColor, spacing, fontSizeAdjust } = body;

    let browser;

    if (process.env.NODE_ENV === 'development') {
      const localPath = getLocalChromePath();
      if (!localPath) {
        throw new Error('Local Google Chrome installation not found. Please install Chrome or configure its path in route.ts.');
      }
      browser = await puppeteer.launch({
        headless: true,
        executablePath: localPath,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
    } else {
      // In production
      if (process.env.PUPPETEER_EXECUTABLE_PATH) {
        // If we are in a Docker container with native Chromium installed
        browser = await puppeteer.launch({
          executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
          args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
          headless: true,
        });
      } else {
        // In production serverless (Vercel)
        const chromium = (await import('@sparticuz/chromium')).default as any;
        browser = await puppeteer.launch({
          args: chromium.args,
          defaultViewport: chromium.defaultViewport,
          executablePath: await chromium.executablePath(),
          headless: chromium.headless,
        });
      }
    }
    const page = await browser.newPage();

    // Set A4 paper size for the viewport
    await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });

    // Since rendering Tailwind CSS inside puppeteer on the fly from an HTML string is complex
    // (requires injecting the compiled CSS), the most robust way in Next.js is to 
    // construct a minimal HTML string with the Tailwind CDN just for printing.
    // 
    // However, to keep it simple and perfectly matching the UI, we can navigate to 
    // a special print route or just use the CDN approach. For this SaaS architecture,
    // injecting the data into the page context is standard.

    // We will use the Tailwind Play CDN just for the PDF generation server-side
    // In production, you would link to your compiled globals.css
    
    // We need to convert the React Template to HTML. Since we are in an API route, 
    // importing the React component and using ReactDOMServer.renderToString is best,
    // but Next.js App Router API routes don't natively bundle client components well for SSR without setup.
    // 
    // For this implementation, we will pass the data via a script tag to a dynamically constructed HTML page 
    // that fetches a client-side bundle.
    // 
    // ACTUALLY: The easiest robust way in Next.js is to navigate to a hidden route, e.g. `http://localhost:3000/print/modern` 
    // But since we don't have a database to store the state between the client and puppeteer,
    // we'll inject the state directly into the browser context.

    // Get the base URL (localhost for dev, actual domain for prod)
    const protocol = request.headers.get('x-forwarded-proto') || 'http';
    const host = request.headers.get('host');
    const baseUrl = `${protocol}://${host}`;



    // Since we can't easily compile the React component to an HTML string inside this API route 
    // (because it relies on Lucide-react and Tailwind which are client-side in this setup),
    // we instruct puppeteer to navigate to our actual app's preview, but we can't share Zustand state easily.
    
    // Let's create a temporary hidden route: /editor/print that reads from sessionStorage
    // and we inject the data into sessionStorage via puppeteer before loading the page.
    
    const printUrl = `${baseUrl}/resume/print-preview?template=${template}&font=${font || 'inter'}&themeColor=${encodeURIComponent(themeColor || '')}&spacing=${spacing || 'normal'}&fontSizeAdjust=${fontSizeAdjust || 'md'}`;
    
    await page.evaluateOnNewDocument((cvData) => {
      localStorage.setItem('print-cv-data', JSON.stringify(cvData));
    }, data);

    await page.goto(printUrl, { waitUntil: 'networkidle0' });

    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    });

    await browser.close();

    return new NextResponse(pdfBuffer as any, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="resume.pdf"`,
      },
    });

  } catch (error) {
    console.error('PDF Generation Error:', error);
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 });
  }
}
