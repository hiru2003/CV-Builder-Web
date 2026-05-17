import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { data, template } = body;

    // Launch puppeteer
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
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

    // Navigate to a blank page first
    await page.goto('about:blank');

    // Generate the HTML shell
    // We load the Tailwind CDN to ensure all classes work exactly as they do in the app
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <script src="https://cdn.tailwindcss.com"></script>
          <script src="https://unpkg.com/lucide@latest"></script>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
            @import url('https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;1,300&display=swap');
            
            body { 
              margin: 0; 
              padding: 0; 
              background: white; 
              font-family: 'Inter', sans-serif;
            }
            .font-serif {
              font-family: 'Merriweather', serif;
            }
            
            /* A4 Print Reset */
            @page {
              size: A4;
              margin: 0;
            }
            
            #cv-root {
              width: 210mm;
              height: 297mm;
              overflow: hidden;
            }
          </style>
        </head>
        <body>
          <div id="cv-root">
             <!-- We will inject the rendered HTML here via page.evaluate -->
             <div style="padding: 40px; text-align: center; font-family: sans-serif;">
                <h2>Generating PDF...</h2>
                <p>If you see this in the final PDF, the React render failed to inject.</p>
             </div>
          </div>
        </body>
      </html>
    `;

    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    // Since we can't easily compile the React component to an HTML string inside this API route 
    // (because it relies on Lucide-react and Tailwind which are client-side in this setup),
    // we instruct puppeteer to navigate to our actual app's preview, but we can't share Zustand state easily.
    
    // Let's create a temporary hidden route: /editor/print that reads from sessionStorage
    // and we inject the data into sessionStorage via puppeteer before loading the page.
    
    const printUrl = `${baseUrl}/resume/print-preview?template=${template}`;
    
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

    return new NextResponse(pdfBuffer, {
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
