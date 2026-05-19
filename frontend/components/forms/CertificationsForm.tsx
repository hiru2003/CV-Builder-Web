import React, { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useCVStore } from '@/store/useCVStore';
import { CVData } from '@/types/cv';
import { Plus, Trash2, Check, ArrowLeft } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

export const CertificationsForm = ({ onBack }: { onBack: () => void }) => {
  const { data, setCertifications } = useCVStore();
  
  const { register, control, watch, formState: { errors, touchedFields } } = useForm<{ certifications: CVData['certifications'] }>({
    defaultValues: {
      certifications: data.certifications.length > 0 ? data.certifications : [{
        id: uuidv4(),
        name: '',
        issuer: '',
        date: '',
        link: '',
      }],
    },
    mode: 'onChange',
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'certifications',
  });

  const formValues = watch();

  const isValidAndNotEmpty = (index: number, fieldName: 'name' | 'issuer' | 'date' | 'link') => {
    const list = formValues.certifications;
    if (!list || !list[index]) return false;
    const val = list[index][fieldName];
    const fieldError = errors.certifications?.[index]?.[fieldName];
    const isTouched = touchedFields.certifications?.[index]?.[fieldName];
    
    const storeList = data.certifications;
    const hasInitialValue = storeList && storeList[index] && storeList[index][fieldName] && storeList[index][fieldName] !== '';
    return (isTouched || hasInitialValue) && val && typeof val === 'string' && val.trim() !== '' && !fieldError;
  };

  useEffect(() => {
    const subscription = watch((value) => {
      if (value.certifications) {
        setCertifications(value.certifications as CVData['certifications']);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setCertifications]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-600 transition-colors">
          <ArrowLeft size={18} />
        </button>
        <h2 className="text-xl font-bold text-slate-800">Certifications</h2>
      </div>
      
      <div className="space-y-6">
        {fields.map((field, index) => (
          <div key={field.id} className="p-5 border border-slate-200 rounded-xl bg-slate-50 relative group">
            <button
              type="button"
              onClick={() => remove(index)}
              className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors"
            >
              <Trash2 size={18} />
            </button>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div className="space-y-1 md:col-span-2">
                <label className="text-sm font-medium text-slate-700">Certificate Name</label>
                <div className="relative">
                  <input 
                    {...register(`certifications.${index}.name`, { required: 'Name is required' })}
                    className={`w-full p-2 pr-9 border rounded-md focus:ring-2 focus:outline-none bg-white ${
                      errors.certifications?.[index]?.name ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:ring-blue-500'
                    }`}
                    placeholder="e.g. AWS Certified Developer"
                  />
                  {isValidAndNotEmpty(index, 'name') && (
                    <Check size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 stroke-[3px]" />
                  )}
                </div>
                {errors.certifications?.[index]?.name && (
                  <p className="text-xs text-red-500 font-medium mt-1">{errors.certifications[index].name.message}</p>
                )}
              </div>
              
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Issuer / Organization</label>
                <div className="relative">
                  <input 
                    {...register(`certifications.${index}.issuer`, { required: 'Issuer is required' })}
                    className={`w-full p-2 pr-9 border rounded-md focus:ring-2 focus:outline-none bg-white ${
                      errors.certifications?.[index]?.issuer ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:ring-blue-500'
                    }`}
                    placeholder="e.g. Amazon Web Services"
                  />
                  {isValidAndNotEmpty(index, 'issuer') && (
                    <Check size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 stroke-[3px]" />
                  )}
                </div>
                {errors.certifications?.[index]?.issuer && (
                  <p className="text-xs text-red-500 font-medium mt-1">{errors.certifications[index].issuer.message}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Date Issued</label>
                <div className="relative">
                  <input 
                    {...register(`certifications.${index}.date`, { required: 'Date is required' })}
                    className={`w-full p-2 pr-9 border rounded-md focus:ring-2 focus:outline-none bg-white ${
                      errors.certifications?.[index]?.date ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:ring-blue-500'
                    }`}
                    placeholder="e.g. Oct 2023"
                  />
                  {isValidAndNotEmpty(index, 'date') && (
                    <Check size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 stroke-[3px]" />
                  )}
                </div>
                {errors.certifications?.[index]?.date && (
                  <p className="text-xs text-red-500 font-medium mt-1">{errors.certifications[index].date.message}</p>
                )}
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="text-sm font-medium text-slate-700">Credential URL (Optional)</label>
                <div className="relative">
                  <input 
                    {...register(`certifications.${index}.link`)}
                    className="w-full p-2 pr-9 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                    placeholder="e.g. https://credly.com/badge/..."
                  />
                  {isValidAndNotEmpty(index, 'link') && (
                    <Check size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 stroke-[3px]" />
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => append({ id: uuidv4(), name: '', issuer: '', date: '', link: '' })}
        className="w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-slate-600 font-medium flex items-center justify-center gap-2 hover:bg-slate-50 hover:border-blue-400 hover:text-blue-500 transition-colors"
      >
        <Plus size={18} /> Add Certification
      </button>
    </div>
  );
};
