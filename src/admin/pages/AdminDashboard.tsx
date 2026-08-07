import React, { useState, useEffect, useCallback } from 'react';
import {
  LayoutDashboard, Map, Plane, Hotel, Star, BookOpen, LogOut,
  ChevronRight, Plus, Pencil, Trash2, X, Save, Loader2, Upload, Menu, FileText, Moon, Settings as SettingsIcon, Ticket, ShieldCheck
} from 'lucide-react';
import { toursAPI, blogsAPI, hotelsAPI, reviewsAPI, destinationsAPI, uploadAPI, visasAPI, umrahAPI, settingsAPI, carouselsAPI, ticketGroupsAPI, insuranceAPI, studyAPI } from '../../services/api';
import type { ApiTour, ApiBlog, ApiHotel, ApiReview, ApiDestination, ApiVisaCountry, ApiUmrahPackage, ApiCarousel, ApiTicketGroup, ApiInsuranceService } from '../../services/api';

type AdminPage = 'dashboard' | 'tours' | 'destinations' | 'blogs' | 'hotels' | 'reviews' | 'visas' | 'umrah' | 'carousels' | 'settings' | 'tickets' | 'insurance' | 'study';

interface AdminDashboardProps {
  onLogout: () => void;
  adminName: string;
}

// ===========================
// GENERIC DATA TABLE
// ===========================
interface Column<T> {
  key: string;
  label: string;
  render?: (item: T) => React.ReactNode;
}

function DataTable<T extends { _id?: string }>({
  data, columns, onEdit, onDelete, loading, resourceName
}: {
  data: T[];
  columns: Column<T>[];
  onEdit: (item: T) => void;
  onDelete: (id: string) => void;
  loading: boolean;
  resourceName: string;
}) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-[#ff5500] animate-spin" />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-20 text-slate-400">
        <p className="text-lg font-bold">No {resourceName} found.</p>
        <p className="text-sm mt-1">Click "Add New" to create your first {resourceName.toLowerCase()}.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-700/50">
            {columns.map(col => (
              <th key={col.key} className="text-left py-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                {col.label}
              </th>
            ))}
            <th className="text-right py-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id} className="border-b border-slate-700/30 hover:bg-white/5 transition-colors">
              {columns.map(col => (
                <td key={col.key} className="py-3 px-4 text-slate-200">
                  {col.render ? col.render(item) : String((item as any)[col.key] ?? '')}
                </td>
              ))}
              <td className="py-3 px-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <button onClick={() => onEdit(item)} className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors cursor-pointer" title="Edit">
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => item._id && onDelete(item._id)} className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors cursor-pointer" title="Delete">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ===========================
// FORM MODAL
// ===========================
interface FormField {
  key: string;
  label: string;
  type: 'text' | 'number' | 'textarea' | 'select' | 'checkbox' | 'array' | 'image' | 'image_array' | 'itinerary_array' | 'flights_array' | 'study_items_array';
  options?: string[];
  quickOptions?: (string | { label: string; value: string })[];
  required?: boolean;
  placeholder?: string;
}

function FormModal<T extends Record<string, any>>({
  isOpen, onClose, onSave, onError, fields, initialData, title, saving
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: T) => void;
  onError: (msg: string) => void;
  fields: FormField[];
  initialData: Partial<T>;
  title: string;
  saving: boolean;
}) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const defaults: Record<string, any> = {};
      fields.forEach(f => {
        if (f.type === 'array' || f.type === 'image_array' || f.type === 'itinerary_array' || f.type === 'flights_array' || f.type === 'study_items_array') defaults[f.key] = (initialData as any)?.[f.key] || [];
        else if (f.type === 'checkbox') defaults[f.key] = (initialData as any)?.[f.key] || false;
        else if (f.type === 'number') defaults[f.key] = (initialData as any)?.[f.key] ?? '';
        else defaults[f.key] = (initialData as any)?.[f.key] || '';
      });
      // Handle flat to nested for Umrah
      if (title.includes('Umrah')) {
        const umrah = initialData as unknown as ApiUmrahPackage;
        defaults['hotels_makkah'] = umrah.hotels?.makkah || '';
        defaults['hotels_madinah'] = umrah.hotels?.madinah || '';
        defaults['pricing_sharing'] = umrah.pricing?.sharing || '';
        defaults['pricing_quad'] = umrah.pricing?.quad || '';
        defaults['pricing_triple'] = umrah.pricing?.triple || '';
        defaults['pricing_double'] = umrah.pricing?.double || '';
      }
      setFormData(defaults);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleArrayChange = (key: string, idx: number, value: string) => {
    setFormData(prev => {
      const arr = [...(prev[key] || [])];
      arr[idx] = value;
      return { ...prev, [key]: arr };
    });
  };

  const handleAddArrayItem = (key: string, value: string = '') => {
    setFormData(prev => ({
      ...prev,
      [key]: [...(prev[key] || []), value]
    }));
  };

  const handleRemoveArrayItem = (key: string, index: number) => {
    const arr = [...(formData[key] || [])];
    arr.splice(index, 1);
    handleChange(key, arr);
  };

  const handleStudyItemChange = (key: string, index: number, field: string, value: string) => {
    setFormData(prev => {
      const arr = [...(prev[key] || [])];
      if (!arr[index]) arr[index] = {};
      arr[index] = { ...arr[index], [field]: value };
      return { ...prev, [key]: arr };
    });
  };

  const handleAddStudyItem = (key: string) => {
    setFormData(prev => ({
      ...prev,
      [key]: [...(prev[key] || []), { title: '', description: '' }]
    }));
  };

  const handleImageUpload = async (key: string, file: File) => {
    setUploading(true);
    try {
      const result = await uploadAPI.uploadImage(file);
      handleChange(key, result.url);
    } catch (err) {
      onError('Image upload failed. Make sure Cloudinary is configured.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData as T);
  };

  return (
    <>
      {(saving || uploading) && (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-900/90 backdrop-blur-md">
          <Loader2 className="w-12 h-12 text-[#ff5500] animate-spin mb-4" />
          <p className="text-white text-lg font-bold mb-6">
            {uploading ? 'Uploading Data...' : 'Saving... Please wait.'}
          </p>
          <button 
            type="button" 
            onClick={() => {
              if (uploading) setUploading(false);
              else window.location.reload();
            }}
            className="px-6 py-2.5 bg-slate-800 text-white rounded-xl hover:bg-slate-700 transition border border-slate-600 cursor-pointer font-bold"
          >
            Cancel Action
          </button>
        </div>
      )}
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center p-4 pt-10 overflow-y-auto">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-2xl shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-slate-700">
          <h3 className="text-lg font-extrabold text-white">{title}</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form id="crud-form" onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
          {fields.map(field => (
            <div key={field.key} className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">{field.label}</label>
              
              {field.type === 'text' && (
                <input
                  type="text"
                  value={formData[field.key] || ''}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  required={field.required}
                  className="w-full px-3 py-2.5 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5500]/50"
                />
              )}

              {field.type === 'number' && (
                <input
                  type="number"
                  value={formData[field.key] ?? ''}
                  onChange={(e) => handleChange(field.key, e.target.value ? Number(e.target.value) : '')}
                  placeholder={field.placeholder}
                  required={field.required}
                  className="w-full px-3 py-2.5 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5500]/50"
                />
              )}

              {field.type === 'textarea' && (
                <textarea
                  value={formData[field.key] || ''}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  required={field.required}
                  rows={3}
                  className="w-full px-3 py-2.5 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5500]/50 resize-y"
                />
              )}

              {field.type === 'select' && (
                <select
                  value={formData[field.key] || ''}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  required={field.required}
                  className="w-full px-3 py-2.5 bg-slate-700/50 border border-slate-600 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5500]/50"
                >
                  <option value="">Select...</option>
                  {field.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              )}

              {field.type === 'checkbox' && (
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData[field.key] || false}
                    onChange={(e) => handleChange(field.key, e.target.checked)}
                    className="w-4 h-4 rounded accent-[#ff5500]"
                  />
                  <span className="text-sm text-slate-300">Enabled</span>
                </label>
              )}

              {field.type === 'image' && (
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    {formData[field.key] && (
                      <div className="relative shrink-0 w-full sm:w-auto flex justify-center">
                        <img src={formData[field.key]} alt="Preview" className="w-32 h-32 object-cover rounded-2xl border border-slate-600 shadow-lg" />
                        <button type="button" onClick={() => handleChange(field.key, '')} className="absolute -top-2 right-0 sm:-right-2 p-1.5 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors">
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                    <div className="flex-1 w-full">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-600 border-dashed rounded-2xl cursor-pointer bg-slate-700/30 hover:bg-slate-700/50 hover:border-[#ff5500]/50 transition-all">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className={`w-8 h-8 mb-2 ${uploading ? 'text-[#ff5500] animate-bounce' : 'text-slate-400'}`} />
                          <p className="mb-1 text-sm font-bold text-slate-300">
                            {uploading ? 'Uploading...' : 'Click or Drag to Upload'}
                          </p>
                          <p className="text-xs text-slate-500 font-medium text-center">Optimized formats: .WEBP or .JPG<br/>(Max 5MB)</p>
                        </div>
                        <input
                          type="file"
                          accept="image/jpeg, image/png, image/webp"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleImageUpload(field.key, file);
                          }}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              )}

              
              {field.type === 'image_array' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {(formData[field.key] || []).map((img: string, idx: number) => (
                      <div key={idx} className="relative group rounded-xl overflow-hidden aspect-video border border-slate-600">
                        <img src={img} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                        <button type="button" onClick={() => handleRemoveArrayItem(field.key, idx)} className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity cursor-pointer shadow-lg">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <label className="flex flex-col items-center justify-center aspect-video border-2 border-slate-600 border-dashed rounded-xl cursor-pointer bg-slate-700/30 hover:bg-slate-700/50 hover:border-[#ff5500]/50 transition-all">
                      <div className="flex flex-col items-center justify-center">
                        <Upload className={`w-6 h-6 mb-2 ${uploading ? 'text-[#ff5500] animate-bounce' : 'text-slate-400'}`} />
                        <span className="text-xs font-bold text-slate-300">Add Image(s)</span>
                      </div>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                        onChange={async (e) => {
                          const files = e.target.files;
                          if (!files || files.length === 0) return;
                          setUploading(true);
                          try {
                            const uploadPromises = Array.from(files).map(file => uploadAPI.uploadImage(file));
                            const results = await Promise.all(uploadPromises);
                            const newUrls = results.map(res => res.url);
                            setFormData(prev => ({
                              ...prev,
                              [field.key]: [...(prev[field.key] || []), ...newUrls]
                            }));
                          } catch (err) {
                            onError('Image upload failed.');
                          } finally {
                            setUploading(false);
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
              )}

              {field.type === 'array' && (
                <div className="space-y-3">
                  {(formData[field.key] || []).map((item: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => handleArrayChange(field.key, idx, e.target.value)}
                        className="flex-1 px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5500]/50"
                      />
                      <button type="button" onClick={() => handleRemoveArrayItem(field.key, idx)} className="p-1.5 text-red-400 hover:text-red-300 cursor-pointer">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  
                  <button type="button" onClick={() => handleAddArrayItem(field.key)} className="text-xs font-bold text-[#ff5500] hover:underline flex items-center gap-1 cursor-pointer">
                    <Plus className="w-3.5 h-3.5" /> Add Custom Item
                  </button>

                  {field.quickOptions && (
                    <div className="pt-2 border-t border-slate-700/50">
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2">Quick Add</p>
                      <div className="flex flex-wrap gap-2">
                        {field.quickOptions.map((opt: any, idx: number) => {
                          const val = typeof opt === 'string' ? opt : opt.value;
                          const lbl = typeof opt === 'string' ? opt : opt.label;
                          return (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => handleAddArrayItem(field.key, val)}
                              className="px-2 py-1 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xs text-xs text-slate-300 font-medium transition-colors cursor-pointer"
                            >
                              + {lbl}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {field.type === 'study_items_array' && (
                <div className="space-y-4">
                  {(formData[field.key] || []).map((item: any, idx: number) => (
                    <div key={idx} className="p-4 bg-slate-900 border border-slate-700 rounded-xl space-y-3 relative">
                      <button type="button" onClick={() => handleRemoveArrayItem(field.key, idx)} className="absolute top-3 right-3 p-1 bg-red-500/10 text-red-400 rounded-md hover:bg-red-500/20 cursor-pointer">
                        <X className="w-4 h-4" />
                      </button>
                      <div className="grid grid-cols-2 gap-3 pr-8">
                        <div className="col-span-2">
                          <label className="text-[10px] text-slate-400 font-bold uppercase">Title</label>
                          <input type="text" value={item.title || ''} onChange={e => handleStudyItemChange(field.key, idx, 'title', e.target.value)} className="w-full px-2 py-1.5 bg-slate-800 border border-slate-700 rounded text-sm text-white" />
                        </div>
                        <div className="col-span-2">
                          <label className="text-[10px] text-slate-400 font-bold uppercase">Description</label>
                          <textarea value={item.description || ''} onChange={e => handleStudyItemChange(field.key, idx, 'description', e.target.value)} rows={2} className="w-full px-2 py-1.5 bg-slate-800 border border-slate-700 rounded text-sm text-white" />
                        </div>
                        {formData['pageType'] === 'destination' && (
                          <div className="col-span-2">
                            <label className="text-[10px] text-slate-400 font-bold uppercase">Icon Name (e.g. GraduationCap, Award)</label>
                            <input type="text" value={item.icon || ''} onChange={e => handleStudyItemChange(field.key, idx, 'icon', e.target.value)} className="w-full px-2 py-1.5 bg-slate-800 border border-slate-700 rounded text-sm text-white" />
                          </div>
                        )}
                        {formData['pageType'] === 'scholarship' && (
                          <>
                            <div className="col-span-1">
                              <label className="text-[10px] text-slate-400 font-bold uppercase">Funding (e.g. 100% Fully Funded)</label>
                              <input type="text" value={item.funding || ''} onChange={e => handleStudyItemChange(field.key, idx, 'funding', e.target.value)} className="w-full px-2 py-1.5 bg-slate-800 border border-slate-700 rounded text-sm text-white" />
                            </div>
                            <div className="col-span-1">
                              <label className="text-[10px] text-slate-400 font-bold uppercase">Target (e.g. UK Master's)</label>
                              <input type="text" value={item.target || ''} onChange={e => handleStudyItemChange(field.key, idx, 'target', e.target.value)} className="w-full px-2 py-1.5 bg-slate-800 border border-slate-700 rounded text-sm text-white" />
                            </div>
                          </>
                        )}
                        <div className="col-span-2">
                          <label className="text-[10px] text-slate-400 font-bold uppercase">Button Text (Optional)</label>
                          <input type="text" value={item.buttonText || ''} onChange={e => handleStudyItemChange(field.key, idx, 'buttonText', e.target.value)} className="w-full px-2 py-1.5 bg-slate-800 border border-slate-700 rounded text-sm text-white" />
                        </div>
                      </div>
                    </div>
                  ))}
                  <button type="button" onClick={() => handleAddStudyItem(field.key)} className="text-xs font-bold text-[#ff5500] flex items-center gap-1 cursor-pointer">
                    <Plus className="w-4 h-4" /> Add Item / Highlight
                  </button>
                </div>
              )}

              {field.type === 'itinerary_array' && (
                <div className="space-y-4">
                  {(formData[field.key] || []).map((item: any, idx: number) => (
                    <div key={idx} className="p-4 bg-slate-700/30 border border-slate-600 rounded-xl space-y-3 relative">
                      <button type="button" onClick={() => handleRemoveArrayItem(field.key, idx)} className="absolute top-2 right-2 p-1.5 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors cursor-pointer">
                        <X className="w-4 h-4" />
                      </button>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <div className="w-full sm:w-24">
                          <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1 block">Day</label>
                          <input type="number" value={item.day || ''} onChange={(e) => {
                            const arr = [...(formData[field.key] || [])];
                            arr[idx] = { ...arr[idx], day: Number(e.target.value) };
                            handleChange(field.key, arr);
                          }} className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5500]/50" />
                        </div>
                        <div className="flex-1">
                          <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1 block">Title</label>
                          <input type="text" value={item.title || ''} onChange={(e) => {
                            const arr = [...(formData[field.key] || [])];
                            arr[idx] = { ...arr[idx], title: e.target.value };
                            handleChange(field.key, arr);
                          }} className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5500]/50" placeholder="e.g., Arrival in Skardu" />
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1 block">Detail</label>
                        <textarea value={item.detail || ''} onChange={(e) => {
                          const arr = [...(formData[field.key] || [])];
                          arr[idx] = { ...arr[idx], detail: e.target.value };
                          handleChange(field.key, arr);
                        }} rows={2} className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5500]/50 resize-y" placeholder="Describe the day's activities..." />
                      </div>
                    </div>
                  ))}
                  <button type="button" onClick={() => {
                    const arr = [...(formData[field.key] || [])];
                    const nextDay = arr.length > 0 ? (Number(arr[arr.length - 1].day) || arr.length) + 1 : 1;
                    handleChange(field.key, [...arr, { day: nextDay, title: '', detail: '' }]);
                  }} className="text-xs font-bold text-[#ff5500] hover:underline flex items-center gap-1 cursor-pointer">
                    <Plus className="w-3.5 h-3.5" /> Add Itinerary Day
                  </button>
                </div>
              )}

              {field.type === 'flights_array' && (
                <div className="space-y-4">
                  {(formData[field.key] || []).map((item: any, idx: number) => (
                    <div key={idx} className="p-4 bg-slate-700/30 border border-slate-600 rounded-xl space-y-3 relative">
                      <button type="button" onClick={() => handleRemoveArrayItem(field.key, idx)} className="absolute top-2 right-2 p-1.5 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors cursor-pointer">
                        <X className="w-4 h-4" />
                      </button>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pr-8">
                        <div>
                          <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1 block">Date</label>
                          <input type="text" value={item.date || ''} onChange={(e) => {
                            const arr = [...(formData[field.key] || [])];
                            arr[idx] = { ...arr[idx], date: e.target.value };
                            handleChange(field.key, arr);
                          }} className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5500]/50" placeholder="e.g. 08-08-2026" />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1 block">Time</label>
                          <input type="text" value={item.time || ''} onChange={(e) => {
                            const arr = [...(formData[field.key] || [])];
                            arr[idx] = { ...arr[idx], time: e.target.value };
                            handleChange(field.key, arr);
                          }} className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5500]/50" placeholder="e.g. 13:20 - 15:40" />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1 block">Bag</label>
                          <input type="text" value={item.bag || ''} onChange={(e) => {
                            const arr = [...(formData[field.key] || [])];
                            arr[idx] = { ...arr[idx], bag: e.target.value };
                            handleChange(field.key, arr);
                          }} className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5500]/50" placeholder="e.g. 20+7 KG" />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1 block">Meal Included</label>
                          <div className="flex items-center h-9">
                            <input type="checkbox" checked={item.meal || false} onChange={(e) => {
                              const arr = [...(formData[field.key] || [])];
                              arr[idx] = { ...arr[idx], meal: e.target.checked };
                              handleChange(field.key, arr);
                            }} className="w-5 h-5 rounded border-slate-600 text-[#ff5500] focus:ring-[#ff5500]/50 bg-slate-700/50" />
                          </div>
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1 block">Fare (PKR)</label>
                          <input type="text" value={item.fare || ''} onChange={(e) => {
                            const arr = [...(formData[field.key] || [])];
                            arr[idx] = { ...arr[idx], fare: e.target.value };
                            handleChange(field.key, arr);
                          }} className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5500]/50" placeholder="e.g. 86,000" />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1 block">Seats</label>
                          <input type="text" value={item.seats || ''} onChange={(e) => {
                            const arr = [...(formData[field.key] || [])];
                            arr[idx] = { ...arr[idx], seats: e.target.value };
                            handleChange(field.key, arr);
                          }} className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5500]/50" placeholder="e.g. Check Seats" />
                        </div>
                      </div>
                    </div>
                  ))}
                  <button type="button" onClick={() => {
                    const arr = [...(formData[field.key] || [])];
                    handleChange(field.key, [...arr, { date: '', time: '', bag: '20+7 KG', meal: true, fare: '', seats: 'Check Seats' }]);
                  }} className="text-xs font-bold text-[#ff5500] hover:underline flex items-center gap-1 cursor-pointer">
                    <Plus className="w-3.5 h-3.5" /> Add Flight Details
                  </button>
                </div>
              )}
            </div>
          ))}
        </form>

        <div className="flex items-center justify-end gap-3 p-5 border-t border-slate-700">
          <button onClick={onClose} className="px-4 py-2.5 bg-slate-700 text-slate-300 rounded-xl text-sm font-bold hover:bg-slate-600 transition-colors cursor-pointer">
            Cancel
          </button>
          <button type="submit" form="crud-form" disabled={saving} className="px-5 py-2.5 bg-gradient-to-r from-[#ff5500] to-amber-500 text-white rounded-xl text-sm font-extrabold shadow-lg shadow-orange-500/20 flex items-center gap-2 disabled:opacity-50 cursor-pointer">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
            </div>
    </div>
    </>
  );
}

// ===========================
// SETTINGS PANEL
// ===========================
const SettingsPanel = () => {
  const [settings, setSettings] = useState<any>({});
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [alertDialog, setAlertDialog] = useState({ isOpen: false, title: '', message: '' });

  useEffect(() => {
    settingsAPI.get().then((data: any) => {
      setSettings(data || {});
      setIsLoading(false);
    });
  }, []);

  const handleChange = (key: string, value: string) => {
    setSettings((prev: any) => ({ ...prev, [key]: value }));
    
    // Auto-fetch YouTube thumbnail if it's a YouTube link
    if (key === 'visaVideoLink' && value) {
      const ytMatch = value.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
      if (ytMatch) {
        const videoId = ytMatch[1];
        setSettings((prev: any) => ({ 
          ...prev, 
          visaVideoThumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
        }));
      }
    }
  };

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const result = await uploadAPI.uploadImage(file);
      handleChange('visaVideoThumbnail', result.url);
    } catch (err) {
      setAlertDialog({ isOpen: true, title: 'Error', message: 'Thumbnail upload failed.' });
    } finally {
      setUploading(false);
    }
  };



  const saveSettings = async () => {
    setIsSaving(true);
    try {
      await settingsAPI.update(settings);
      setAlertDialog({ isOpen: true, title: 'Success', message: 'Settings saved successfully!' });
    } catch (error) {
      setAlertDialog({ isOpen: true, title: 'Error', message: 'Failed to save settings.' });
    }
    setIsSaving(false);
  };

  if (isLoading) return <div className="p-10 text-center"><Loader2 className="w-8 h-8 text-[#ff5500] animate-spin mx-auto" /></div>;

  return (
    <>
      {(isSaving || uploading) && (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-900/90 backdrop-blur-md">
          <Loader2 className="w-12 h-12 text-[#ff5500] animate-spin mb-4" />
          <p className="text-white text-lg font-bold mb-6">
            {uploading ? 'Uploading Thumbnail...' : 'Saving Settings...'}
          </p>
          <button 
            type="button" 
            onClick={() => {
              if (uploading) setUploading(false);
              else window.location.reload();
            }}
            className="px-6 py-2.5 bg-slate-800 text-white rounded-xl hover:bg-slate-700 transition border border-slate-600 cursor-pointer font-bold"
          >
            Cancel Action
          </button>
        </div>
      )}
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
      <h3 className="text-xl font-extrabold text-white mb-6">Global Page Settings</h3>
      
      <div className="space-y-6 max-w-2xl">
        <div className="bg-slate-700/30 p-5 rounded-xl border border-slate-600/50">
          <h4 className="text-[#ff5500] font-bold mb-4">Visa Page Video</h4>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1">YouTube Video Link</label>
              <input
                type="text"
                value={settings.visaVideoLink || ''}
                onChange={(e) => handleChange('visaVideoLink', e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full px-3 py-2.5 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5500]/50"
              />
              <p className="text-xs text-slate-500 mt-1">Leave empty to hide the video section entirely.</p>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1">Video Thumbnail</label>
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <div className="relative w-full sm:w-64 h-36 bg-slate-900 rounded-xl overflow-hidden border border-slate-600">
                  {settings.visaVideoThumbnail ? (
                    <img src={settings.visaVideoThumbnail} alt="Thumbnail" className="w-full h-full object-cover opacity-80" />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full text-slate-500 text-xs">No thumbnail</div>
                  )}
                </div>
                <div className="flex-1">
                  <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-slate-600 border-dashed rounded-xl cursor-pointer hover:bg-slate-700/50 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className={`w-6 h-6 mb-2 ${uploading ? 'text-[#ff5500] animate-bounce' : 'text-slate-400'}`} />
                      <p className="text-xs font-bold text-slate-300">{uploading ? 'Uploading...' : 'Upload Custom Image'}</p>
                    </div>
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])} />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-slate-700/30 p-5 rounded-xl border border-slate-600/50">
          <h4 className="text-[#ff5500] font-bold mb-4">Insurance Page Hero</h4>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1">Hero Title</label>
              <input
                type="text"
                value={settings.insurance_page_title || ''}
                onChange={(e) => handleChange('insurance_page_title', e.target.value)}
                placeholder="Global Ticketing & Travel Insurance Services"
                className="w-full px-3 py-2.5 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5500]/50"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1">Hero Description</label>
              <textarea
                value={settings.insurance_page_description || ''}
                onChange={(e) => handleChange('insurance_page_description', e.target.value)}
                placeholder="Enjoy peace of mind with our instant ticketing..."
                rows={3}
                className="w-full px-3 py-2.5 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5500]/50 resize-y"
              />
            </div>
          </div>
        </div>
        <button onClick={saveSettings} disabled={isSaving} className="px-6 py-3 bg-[#ff5500] hover:bg-orange-600 text-white font-extrabold rounded-xl shadow-lg transition-colors flex items-center gap-2 cursor-pointer">
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save Settings
                </button>
      </div>
    </div>

    {/* Custom Alert Dialog for Settings */}
    {alertDialog.isOpen && (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[10000] flex items-center justify-center p-4">
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 w-full max-w-sm shadow-2xl">
          <h3 className="text-xl font-extrabold text-white mb-2">{alertDialog.title}</h3>
          <p className="text-slate-300 text-sm mb-6">{alertDialog.message}</p>
          <div className="flex justify-end">
            <button 
              onClick={() => setAlertDialog(prev => ({ ...prev, isOpen: false }))} 
              className="px-4 py-2 text-sm font-bold bg-[#ff5500] hover:bg-orange-600 text-white rounded-xl shadow-lg shadow-orange-500/30 transition-all cursor-pointer"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    )}

    </>
  );
};

// ===========================
// MAIN ADMIN DASHBOARD
// ===========================
export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout, adminName }) => {
  const [currentPage, setCurrentPage] = useState<AdminPage>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Data states
  const [tours, setTours] = useState<ApiTour[]>([]);
  const [blogs, setBlogs] = useState<ApiBlog[]>([]);
  const [hotels, setHotels] = useState<ApiHotel[]>([]);
  const [reviews, setReviews] = useState<ApiReview[]>([]);
  const [destinations, setDestinations] = useState<ApiDestination[]>([]);
  const [visas, setVisas] = useState<ApiVisaCountry[]>([]);
  const [umrah, setUmrah] = useState<ApiUmrahPackage[]>([]);
  const [carousels, setCarousels] = useState<ApiCarousel[]>([]);
  const [tickets, setTickets] = useState<ApiTicketGroup[]>([]);
  const [insurance, setInsurance] = useState<ApiInsuranceService[]>([]);
  const [study, setStudy] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [confirmDialog, setConfirmDialog] = useState<{isOpen: boolean; title: string; message: string; onConfirm: () => void}>({isOpen: false, title: '', message: '', onConfirm: () => {}});
  const [alertDialog, setAlertDialog] = useState<{isOpen: boolean; title: string; message: string}>({isOpen: false, title: '', message: ''});

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [t, b, h, r, d, v, u, c, tk, ins, st] = await Promise.all([
        toursAPI.getAll(), blogsAPI.getAll(), hotelsAPI.getAll(), reviewsAPI.getAll(), destinationsAPI.getAll(), visasAPI.getAll(), umrahAPI.getAll(), carouselsAPI.getAll(), ticketGroupsAPI.getAll(), insuranceAPI.getAll(), studyAPI.getAll()
      ]);
      setTours(t); setBlogs(b); setHotels(h); setReviews(r); setDestinations(d); setVisas(v); setUmrah(u); setCarousels(c); setTickets(tk); setInsurance(ins); setStudy(st);
    } catch (err) {
      console.error('Failed to fetch data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleDelete = (resource: string, id: string) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Confirm Delete',
      message: 'Are you sure you want to delete this item? This action cannot be undone.',
      onConfirm: async () => {
        setConfirmDialog(prev => ({ ...prev, isOpen: false }));
        try {
          const api = { tours: toursAPI, blogs: blogsAPI, hotels: hotelsAPI, reviews: reviewsAPI, destinations: destinationsAPI, visas: visasAPI, umrah: umrahAPI, carousels: carouselsAPI, tickets: ticketGroupsAPI, insurance: insuranceAPI, study: studyAPI }[resource] as any;
          if (api) { await api.delete(id); fetchData(); }
        } catch (err) { 
          setAlertDialog({isOpen: true, title: 'Error', message: 'Delete failed.'});
        }
      }
    });
  };

  const handleSave = async (resource: string, data: any) => {
    setSaving(true);
    try {
      let finalData = { ...data };
      if (resource === 'umrah') {
        finalData.hotels = { makkah: finalData.hotels_makkah, madinah: finalData.hotels_madinah };
        finalData.pricing = { sharing: finalData.pricing_sharing, quad: finalData.pricing_quad, triple: finalData.pricing_triple, double: finalData.pricing_double };
      }

      const api = { tours: toursAPI, blogs: blogsAPI, hotels: hotelsAPI, reviews: reviewsAPI, destinations: destinationsAPI, visas: visasAPI, umrah: umrahAPI, carousels: carouselsAPI, tickets: ticketGroupsAPI, insurance: insuranceAPI, study: studyAPI }[resource] as any;
      if (!api) return;
      
      if (editingItem?._id) {
        await api.update(editingItem._id, finalData);
      } else {
        await api.create(finalData);
      }
      setModalOpen(false);
      setEditingItem(null);
      fetchData();
    } catch (err: any) {
      setAlertDialog({isOpen: true, title: 'Save Failed', message: err.message});
    } finally {
      setSaving(false);
    }
  };

  const navItems: { id: AdminPage; icon: React.ReactNode; label: string }[] = [
    { id: 'dashboard', icon: <LayoutDashboard className="w-4 h-4" />, label: 'Dashboard' },
    { id: 'tours', icon: <Map className="w-4 h-4" />, label: 'Tours' },
    { id: 'destinations', icon: <Plane className="w-4 h-4" />, label: 'Destinations' },
    { id: 'blogs', icon: <BookOpen className="w-4 h-4" />, label: 'Blogs' },
    { id: 'hotels', icon: <Hotel className="w-4 h-4" />, label: 'Hotels' },
    { id: 'reviews', icon: <Star className="w-4 h-4" />, label: 'Reviews' },
    { id: 'visas', icon: <FileText className="w-4 h-4" />, label: 'Visas' },
    { id: 'umrah', icon: <Moon className="w-4 h-4" />, label: 'Umrah' },
    { id: 'carousels', icon: <Upload className="w-4 h-4" />, label: 'Carousels' },
    { id: 'tickets', icon: <Ticket className="w-4 h-4" />, label: 'Tickets' },
    { id: 'insurance', icon: <ShieldCheck className="w-4 h-4" />, label: 'Insurance' },
    { id: 'study', icon: <BookOpen className="w-4 h-4" />, label: 'Study & Services' },
    { id: 'settings', icon: <SettingsIcon className="w-4 h-4" />, label: 'Settings' },
  ];

  // ===========================
  // FIELD DEFINITIONS
  // ===========================
  const tourFields: FormField[] = [
    { key: 'title', label: 'Title', type: 'text', required: true },
    { key: 'category', label: 'Category (Use "Northern Pakistan" for the main Pakistan page)', type: 'select', options: ['Northern Pakistan', 'International', 'Umrah', 'Customized'], required: true },
    { key: 'location', label: 'Location', type: 'text', required: true },
    { key: 'duration', label: 'Duration', type: 'text', required: true, placeholder: 'e.g. 3 Days / 2 Nights' },
    { key: 'pricePKR', label: 'Price (PKR)', type: 'number' },
    { key: 'couplePricePKR', label: 'Couple Price (PKR)', type: 'number' },
    { key: 'originalPricePKR', label: 'Original Price (PKR) — for strikethrough', type: 'number' },
    { key: 'departure', label: 'Departure Schedule', type: 'text', placeholder: 'e.g. Mon & Thurs Night' },
    { key: 'rating', label: 'Rating', type: 'number' },
    { key: 'reviewsCount', label: 'Reviews Count', type: 'number' },
    { key: 'image', label: 'Cover Image', type: 'image', required: true },
    { key: 'featured', label: 'Featured', type: 'checkbox' },
    { key: 'popular', label: 'Popular', type: 'checkbox' },
    { key: 'description', label: 'Description', type: 'textarea', required: true },
    { key: 'aboutInfo', label: 'About This Tour', type: 'textarea' },
    { key: 'highlights', label: 'Highlights', type: 'array' },
    { key: 'inclusions', label: 'Inclusions', type: 'array' },
    { key: 'itinerary', label: 'Itinerary (Day by Day)', type: 'itinerary_array' },
          { key: 'funFacts', label: 'Did you know? Fun Facts', type: 'array' },
      { key: 'seoTitle', label: 'SEO Title (Meta Title)', type: 'text', placeholder: 'Optional custom SEO Title' },
      { key: 'seoDescription', label: 'SEO Description (Meta Description)', type: 'textarea', placeholder: 'Optional custom SEO Description' },
      { key: 'seoKeywords', label: 'SEO Keywords', type: 'text', placeholder: 'comma, separated, keywords' },

  ];

  const blogFields: FormField[] = [
    { key: 'title', label: 'Title', type: 'text', required: true },
    { key: 'category', label: 'Category', type: 'text', required: true },
    { key: 'date', label: 'Date', type: 'text', required: true, placeholder: 'July 15, 2026' },
    { key: 'readTime', label: 'Read Time', type: 'text', placeholder: '5 min read' },
    { key: 'image', label: 'Cover Image', type: 'image', required: true },
    { key: 'excerpt', label: 'Excerpt', type: 'textarea', required: true },
    { key: 'content', label: 'Full Content', type: 'textarea' },
          { key: 'published', label: 'Published', type: 'checkbox' },
      { key: 'seoTitle', label: 'SEO Title', type: 'text' },
      { key: 'seoDescription', label: 'SEO Description', type: 'textarea' },
      { key: 'seoKeywords', label: 'SEO Keywords', type: 'text' },

  ];

  const hotelFields: FormField[] = [
    { key: 'name', label: 'Hotel Name', type: 'text', required: true },
    { key: 'location', label: 'Location', type: 'text', required: true },
    { key: 'rating', label: 'Rating', type: 'number' },
    { key: 'price', label: 'Price', type: 'text', placeholder: 'PKR 24,000 / Night' },
    { key: 'image', label: 'Image', type: 'image', required: true },
    { key: 'amenities', label: 'Amenities', type: 'array' },
  ];

  const reviewFields: FormField[] = [
    { key: 'name', label: 'Reviewer Name', type: 'text', required: true },
    { key: 'role', label: 'Role', type: 'text', placeholder: 'Verified Google Review' },
    { key: 'location', label: 'Location', type: 'text' },
    { key: 'rating', label: 'Rating (1-5)', type: 'number' },
    { key: 'comment', label: 'Comment', type: 'textarea', required: true },
    { key: 'avatar', label: 'Avatar URL', type: 'text' },
  ];

  const destinationFields: FormField[] = [
    { key: 'destinationId', label: 'Destination ID (e.g. skardu, hunza)', type: 'text', required: true },
    { key: 'title', label: 'Title', type: 'text', required: true },
    { key: 'subtitle', label: 'Subtitle', type: 'text', required: true },
    { key: 'bestTime', label: 'Best Time to Visit', type: 'text', required: true },
    { key: 'aboutInfo', label: 'About Info', type: 'textarea', required: true },
    { key: 'sliderImages', label: 'Slider Images (URLs)', type: 'array' },
    { key: 'funFacts', label: 'Fun Facts', type: 'array' },
  ];

  const visaQuickDocs = [
    "Passport Scanning", "Passport Original", "White Background Pic", "CNIC Copy",
    "Bank Statement", "Bank Statement With 5 Lakh Balance", "Bank Statement With 10 Lakh Balance",
    "Account Maintenance Letter", "NTN", "Tax Returns", "Last 3 Salary Slips (For Job Holder)",
    "Business Documents", "Letter Head", "Visiting Card",
    "FRC & MRC", "Police Certificate", "Medical Report", "Covid Vaccine Certificate", "Yellow Fever Certificate",
    "Travel Plan", "Hotel Booking", "Flight Reservation", "Invitation Letter", "Visa Request Letter", "Application Form"
  ];

  const visaFields: FormField[] = [
    { key: 'name', label: 'Country Name (e.g. Turkey)', type: 'text', required: true },
    { key: 'code', label: 'Country Code (e.g. TR)', type: 'text', required: true },
    { key: 'customUrl', label: 'Flag Image', type: 'image' },
    { key: 'visaType', label: 'Visa Type (e.g. Tourist E-Visa)', type: 'text' },
    { key: 'duration', label: 'Visa Duration (e.g. 30 Days)', type: 'text' },
    { key: 'processingTime', label: 'Processing Time (e.g. 24-48 Hours)', type: 'text' },
    { key: 'normalCharges', label: 'Normal Base Charges', type: 'text' },
    { key: 'doneBaseCharges', label: 'Done Base Charges', type: 'text' },
    { key: 'normalDocs', label: 'Normal Documents Required', type: 'array', quickOptions: visaQuickDocs },
    { key: 'doneBaseDocs', label: 'Done Base Documents Required', type: 'array', quickOptions: visaQuickDocs },
    { key: 'note', label: 'Important Note', type: 'textarea' },
  ];

  
  const carouselFields: FormField[] = [
    { 
      key: 'name', 
      label: 'Carousel Position', 
      type: 'select', 
      options: ['Home Page Hero Slider', 'Pakistan Tours Slider'],
      required: true 
    },
    { key: 'images', label: 'Carousel Images', type: 'image_array' }
  ];

  const umrahFields: FormField[] = [
    { key: 'packageId', label: 'Package ID', type: 'text', required: true },
    { key: 'city', label: 'Departure City', type: 'select', options: ['Lahore', 'Islamabad', 'Faisalabad', 'Multan'], required: true },
    { key: 'tier', label: 'Tier', type: 'select', options: ['Economy', 'Star'], required: true },
    { key: 'departureDate', label: 'Departure Date', type: 'text', required: true },
    { key: 'durationText', label: 'Duration Text (e.g. 15 Days)', type: 'text', required: true },
    { key: 'airline', label: 'Airline (e.g. Saudi Airlines)', type: 'text', required: true },
    { key: 'flightRoute', label: 'Flight Route (e.g. LHE-JED-LHE)', type: 'text', required: true },
    { key: 'airlineLogo', label: 'Airline Logo / Icon', type: 'image' },
    { key: 'hotels_makkah', label: 'Hotel in Makkah', type: 'text', required: true },
    { key: 'makkahHotelIcon', label: 'Makkah Hotel Icon', type: 'image' },
    { key: 'hotels_madinah', label: 'Hotel in Madinah', type: 'text', required: true },
    { key: 'madinahHotelIcon', label: 'Madinah Hotel Icon', type: 'image' },
    { key: 'pricing_sharing', label: 'Sharing Price (PKR)', type: 'text' },
    { key: 'pricing_quad', label: 'Quad Price (PKR)', type: 'text' },
    { key: 'pricing_triple', label: 'Triple Price (PKR)', type: 'text' },
    { key: 'pricing_double', label: 'Double Price (PKR)', type: 'text' },
  ];

  const ticketFields: FormField[] = [
    { key: 'title', label: 'Card Title (e.g. United Arab Emirates)', type: 'text', required: true },
    { key: 'buttonText', label: 'Button Text / Slug (e.g. UAE GROUP)', type: 'text', required: true },
    { key: 'image', label: 'Cover Image URL', type: 'image', required: true },
    { key: 'airlineName', label: 'Airline Name (e.g. AIRSIAL)', type: 'text', required: true },
    { 
      key: 'airlineLogo', 
      label: 'Airline Logo', 
      type: 'image',
      quickOptions: [
        { label: 'PIA', value: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Pakistan_International_Airlines_Logo.svg' },
        { label: 'Airblue', value: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Airblue_Logo.svg/512px-Airblue_Logo.svg.png' },
        { label: 'SereneAir', value: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/SereneAir_logo.svg/512px-SereneAir_logo.svg.png' },
        { label: 'AirSial', value: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/AirSial_logo.svg/512px-AirSial_logo.svg.png' },
        { label: 'Fly Jinnah', value: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Fly_Jinnah_Logo.svg/512px-Fly_Jinnah_Logo.svg.png' },
        { label: 'Emirates', value: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/Emirates_logo.svg' },
        { label: 'Saudi Airlines', value: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Saudia_logo.svg' },
        { label: 'Qatar Airways', value: 'https://upload.wikimedia.org/wikipedia/en/2/28/Qatar_Airways_logo.svg' }
      ]
    },
    { key: 'routeDisplay', label: 'Route Display (e.g. LHE-DXB)', type: 'text', required: true },
    { key: 'flights', label: 'Flights Details', type: 'flights_array' },
  ];

  const insuranceFields: FormField[] = [
    { key: 'title', label: 'Service Title (e.g. Schengen Insurance)', type: 'text', required: true },
    { key: 'buttonText', label: 'Button Text (e.g. Issue Policy)', type: 'text', required: true },
    { key: 'inquiryType', label: 'Inquiry Type (Passed to Booking Modal)', type: 'text', required: true },
    { key: 'image', label: 'Cover Image URL', type: 'image', required: true },
    { key: 'description', label: 'Description', type: 'textarea', required: true },
    { key: 'features', label: 'Features (Bullet Points)', type: 'array' },
  ];

  const studyFields: FormField[] = [
    { 
      key: 'slug', 
      label: 'Page Route (Select the specific page to update)', 
      type: 'select', 
      options: ['study-uk', 'study-australia', 'study-germany', 'study-canada', 'scholarships', 'attestation'], 
      required: true 
    },
    { key: 'pageType', label: 'Page Type', type: 'select', options: ['destination', 'scholarship', 'attestation'], required: true },
    { key: 'badgeText', label: 'Hero Badge Text (e.g. 🇬🇧 Study in UK)', type: 'text' },
    { key: 'title', label: 'Hero Main Title', type: 'text', required: true },
    { key: 'description', label: 'Hero Description', type: 'textarea', required: true },
    { key: 'ctaTitle', label: 'Bottom CTA Title (Used for Destinations)', type: 'text' },
    { key: 'ctaDescription', label: 'Bottom CTA Description', type: 'textarea' },
    { key: 'ctaButtonText', label: 'Bottom CTA Button Text', type: 'text' },
    { key: 'items', label: 'Highlights / Cards List', type: 'study_items_array' },
  ];

  // ===========================
  // RENDER PAGE CONTENT
  // ===========================
  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-extrabold text-white">Dashboard Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { label: 'Tours', count: tours.length, color: 'from-orange-500 to-amber-500', icon: <Map className="w-6 h-6" /> },
                { label: 'Destinations', count: destinations.length, color: 'from-blue-500 to-indigo-500', icon: <Plane className="w-6 h-6" /> },
                { label: 'Blogs', count: blogs.length, color: 'from-emerald-500 to-teal-500', icon: <BookOpen className="w-6 h-6" /> },
                { label: 'Hotels', count: hotels.length, color: 'from-purple-500 to-violet-500', icon: <Hotel className="w-6 h-6" /> },
                { label: 'Reviews', count: reviews.length, color: 'from-pink-500 to-rose-500', icon: <Star className="w-6 h-6" /> },
              ].map(card => (
                <div key={card.label} className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-5 space-y-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white`}>
                    {card.icon}
                  </div>
                  <div>
                    <p className="text-3xl font-extrabold text-white">{card.count}</p>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{card.label}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-3">Quick Actions</h3>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => { setCurrentPage('tours'); setEditingItem(null); setModalOpen(true); }} className="px-4 py-2.5 bg-[#ff5500] text-white rounded-xl text-xs font-extrabold flex items-center gap-1.5 cursor-pointer hover:bg-orange-600 transition-colors">
                  <Plus className="w-3.5 h-3.5" /> Add Tour
                </button>
                <button onClick={() => { setCurrentPage('blogs'); setEditingItem(null); setModalOpen(true); }} className="px-4 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-extrabold flex items-center gap-1.5 cursor-pointer hover:bg-emerald-700 transition-colors">
                  <Plus className="w-3.5 h-3.5" /> Add Blog
                </button>
                <button onClick={() => { setCurrentPage('hotels'); setEditingItem(null); setModalOpen(true); }} className="px-4 py-2.5 bg-purple-600 text-white rounded-xl text-xs font-extrabold flex items-center gap-1.5 cursor-pointer hover:bg-purple-700 transition-colors">
                  <Plus className="w-3.5 h-3.5" /> Add Hotel
                </button>
              </div>
            </div>
          </div>
        );
      case 'tours':
        return (
          <ResourceManager
            title="Tour Packages"
            data={tours}
            columns={[
              { key: 'image', label: 'Image', render: (t: ApiTour) => <img src={t.image} alt="" className="w-12 h-12 rounded-lg object-cover" /> },
              { key: 'title', label: 'Title', render: (t: ApiTour) => <span className="font-bold text-white">{t.title}</span> },
              { key: 'category', label: 'Category' },
              { key: 'pricePKR', label: 'Price', render: (t: ApiTour) => <span className="text-[#ff5500] font-bold">{t.pricePKR ? `PKR ${t.pricePKR.toLocaleString()}` : '-'}</span> },
              { key: 'featured', label: 'Featured', render: (t: ApiTour) => t.featured ? <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full font-bold">Yes</span> : <span className="text-slate-500">—</span> },
            ]}
            onEdit={(item) => { setEditingItem(item); setModalOpen(true); }}
            onDelete={(id) => handleDelete('tours', id)}
            onAdd={() => { setEditingItem(null); setModalOpen(true); }}
            loading={loading}
            resourceName="Tours"
          />
        );
      case 'destinations':
        return (
          <ResourceManager
            title="Destinations"
            data={destinations}
            columns={[
              { key: 'title', label: 'Title', render: (d: ApiDestination) => <span className="font-bold text-white">{d.title}</span> },
              { key: 'subtitle', label: 'Subtitle' },
              { key: 'bestTime', label: 'Best Time' },
              { key: 'sliderImages', label: 'Images', render: (d: ApiDestination) => <span>{d.sliderImages?.length || 0} images</span> },
            ]}
            onEdit={(item) => { setEditingItem(item); setModalOpen(true); }}
            onDelete={(id) => handleDelete('destinations', id)}
            onAdd={() => { setEditingItem(null); setModalOpen(true); }}
            loading={loading}
            resourceName="Destinations"
          />
        );
      case 'blogs':
        return (
          <ResourceManager
            title="Blog Posts"
            data={blogs}
            columns={[
              { key: 'image', label: 'Image', render: (b: ApiBlog) => <img src={b.image} alt="" className="w-12 h-12 rounded-lg object-cover" /> },
              { key: 'title', label: 'Title', render: (b: ApiBlog) => <span className="font-bold text-white">{b.title}</span> },
              { key: 'category', label: 'Category' },
              { key: 'published', label: 'Status', render: (b: ApiBlog) => b.published ? <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold">Published</span> : <span className="text-xs bg-slate-500/20 text-slate-400 px-2 py-0.5 rounded-full font-bold">Draft</span> },
            ]}
            onEdit={(item) => { setEditingItem(item); setModalOpen(true); }}
            onDelete={(id) => handleDelete('blogs', id)}
            onAdd={() => { setEditingItem(null); setModalOpen(true); }}
            loading={loading}
            resourceName="Blogs"
          />
        );
      case 'hotels':
        return (
          <ResourceManager
            title="Hotels"
            data={hotels}
            columns={[
              { key: 'image', label: 'Image', render: (h: ApiHotel) => <img src={h.image} alt="" className="w-12 h-12 rounded-lg object-cover" /> },
              { key: 'name', label: 'Name', render: (h: ApiHotel) => <span className="font-bold text-white">{h.name}</span> },
              { key: 'location', label: 'Location' },
              { key: 'price', label: 'Price', render: (h: ApiHotel) => <span className="text-[#ff5500] font-bold">{h.price}</span> },
            ]}
            onEdit={(item) => { setEditingItem(item); setModalOpen(true); }}
            onDelete={(id) => handleDelete('hotels', id)}
            onAdd={() => { setEditingItem(null); setModalOpen(true); }}
            loading={loading}
            resourceName="Hotels"
          />
        );
      case 'reviews':
        return (
          <ResourceManager
            title="Customer Reviews"
            data={reviews}
            columns={[
              { key: 'name', label: 'Name', render: (r: ApiReview) => <span className="font-bold text-white">{r.name}</span> },
              { key: 'rating', label: 'Rating', render: (r: ApiReview) => <span className="text-amber-400 font-bold">{'⭐'.repeat(r.rating)}</span> },
              { key: 'comment', label: 'Comment', render: (r: ApiReview) => <span className="truncate max-w-[200px] block">{r.comment}</span> },
            ]}
            onEdit={(item) => { setEditingItem(item); setModalOpen(true); }}
            onDelete={(id) => handleDelete('reviews', id)}
            onAdd={() => { setEditingItem(null); setModalOpen(true); }}
            loading={loading}
            resourceName="Reviews"
          />
        );
      case 'visas':
        return (
          <ResourceManager
            title="Visa Operations"
            data={visas}
            columns={[
              { key: 'name', label: 'Country', render: (v: ApiVisaCountry) => <span className="font-bold text-white">{v.name} ({v.code})</span> },
              { key: 'visaType', label: 'Type' },
              { key: 'duration', label: 'Duration' },
              { key: 'normalCharges', label: 'Price', render: (v: ApiVisaCountry) => <span className="text-[#ff5500] font-bold">{v.normalCharges || '-'}</span> },
            ]}
            onEdit={(item) => { setEditingItem(item); setModalOpen(true); }}
            onDelete={(id) => handleDelete('visas', id)}
            onAdd={() => { setEditingItem(null); setModalOpen(true); }}
            loading={loading}
            resourceName="Visas"
          />
        );
      case 'umrah':
        return (
          <ResourceManager
            title="Umrah Packages"
            data={umrah}
            columns={[
              { key: 'city', label: 'City', render: (u: ApiUmrahPackage) => <span className="font-bold text-white">{u.city}</span> },
              { key: 'tier', label: 'Tier', render: (u: ApiUmrahPackage) => <span className="text-amber-400 font-bold">{u.tier}</span> },
              { key: 'durationText', label: 'Duration' },
              { key: 'airline', label: 'Airline' },
              { key: 'pricing', label: 'Sharing Price', render: (u: ApiUmrahPackage) => <span className="text-[#ff5500] font-bold">{u.pricing?.sharing || '-'}</span> },
            ]}
            onEdit={(item) => { setEditingItem(item); setModalOpen(true); }}
            onDelete={(id) => handleDelete('umrah', id)}
            onAdd={() => { setEditingItem(null); setModalOpen(true); }}
            loading={loading}
            resourceName="Umrah Packages"
          />
        );
      
      case 'carousels':
        return (
          <ResourceManager
            title="Image Carousels"
            data={carousels}
            columns={[
              { key: 'name', label: 'Name', render: (c: ApiCarousel) => <span className="font-bold text-white">{c.name}</span> },
              { key: 'images', label: 'Images', render: (c: ApiCarousel) => <span className="text-[#ff5500] font-bold">{c.images?.length || 0} images</span> },
            ]}
            onEdit={(item) => { setEditingItem(item); setModalOpen(true); }}
            onDelete={(id) => handleDelete('carousels', id)}
            onAdd={() => { setEditingItem(null); setModalOpen(true); }}
            loading={loading}
            resourceName="Carousels"
          />
        );

        case 'tickets': return (
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-extrabold text-white">Ticket Groups</h3>
              <button onClick={() => { setEditingItem({}); setModalOpen(true); }} className="px-4 py-2 bg-[#ff5500] hover:bg-orange-600 text-white text-sm font-bold rounded-xl flex items-center gap-2 transition-colors cursor-pointer"><Plus className="w-4 h-4" /> Add Ticket Group</button>
            </div>
            <DataTable data={tickets} resourceName="Ticket Groups" loading={loading} onDelete={(id) => handleDelete('tickets', id)} onEdit={(item) => { setEditingItem(item); setModalOpen(true); }}
              columns={[{ key: 'title', label: 'Title' }, { key: 'buttonText', label: 'Button Text' }, { key: 'airlineName', label: 'Airline' }, { key: 'routeDisplay', label: 'Route' }]}
            />
          </div>
        );
      case 'insurance':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-extrabold text-white">Insurance Services</h3>
              <button onClick={() => { setEditingItem({}); setModalOpen(true); }} className="px-4 py-2 bg-[#ff5500] hover:bg-orange-600 text-white text-sm font-bold rounded-xl flex items-center gap-2 transition-colors cursor-pointer"><Plus className="w-4 h-4" /> Add Insurance Service</button>
            </div>
            <DataTable data={insurance} resourceName="Insurance Services" loading={loading} onDelete={(id) => handleDelete('insurance', id)} onEdit={(item) => { setEditingItem(item); setModalOpen(true); }}
              columns={[
                { key: 'image', label: 'Image', render: (i: any) => <img src={i.image} alt="" className="w-12 h-12 rounded-lg object-cover" /> },
                { key: 'title', label: 'Title' }, 
                { key: 'buttonText', label: 'Button Text' }, 
                { key: 'inquiryType', label: 'Inquiry Type' }
              ]}
            />
          </div>
        );
      case 'study':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-extrabold text-white">Study & Services Pages</h3>
              {/* Add Page button removed because slug is locked to a dropdown */}
            </div>
            <DataTable data={study} resourceName="Study Pages" loading={loading} onDelete={(id) => handleDelete('study', id)} onEdit={(item) => { setEditingItem(item); setModalOpen(true); }}
              columns={[
                { key: 'slug', label: 'URL Slug' },
                { key: 'title', label: 'Hero Title' }, 
                { key: 'pageType', label: 'Type', render: (s: any) => <span className="uppercase text-xs font-bold text-slate-400">{s.pageType}</span> },
              ]}
            />
          </div>
        );
      case 'settings':
        return <SettingsPanel />;
    }
  };

  const getFieldsForPage = () => {
    switch (currentPage) {
      case 'tours': return tourFields;
      case 'blogs': return blogFields;
      case 'hotels': return hotelFields;
      case 'reviews': return reviewFields;
      case 'destinations': return destinationFields;
      case 'visas': return visaFields;
      case 'umrah': return umrahFields;
      case 'carousels': return carouselFields;
      case 'tickets': return ticketFields;
      case 'insurance': return insuranceFields;
      case 'study': return studyFields;
      default: return [];
    }
  };

  const getResourceForPage = () => {
    switch (currentPage) {
      case 'tours': return 'tours';
      case 'blogs': return 'blogs';
      case 'hotels': return 'hotels';
      case 'reviews': return 'reviews';
      case 'destinations': return 'destinations';
      case 'visas': return 'visas';
      case 'umrah': return 'umrah';
      case 'carousels': return 'carousels';
      case 'tickets': return 'tickets';
      case 'insurance': return 'insurance';
      case 'study': return 'study';
      default: return 'tours';
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-slate-900 flex">
      {/* Sidebar Overlay (mobile) */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-slate-800/80 backdrop-blur-xl border-r border-slate-700/50 flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-5 border-b border-slate-700/50">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-xl tracking-tight text-white">PAK 99</span>
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#ff5500] text-white uppercase">ADMIN</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1 font-bold">Content Management System</p>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => { setCurrentPage(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                currentPage === item.id
                  ? 'bg-[#ff5500]/10 text-[#ff5500] border border-[#ff5500]/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
              {currentPage === item.id && <ChevronRight className="w-3.5 h-3.5 ml-auto" />}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-700/50">
          <div className="text-xs text-slate-400 mb-2 font-bold">{adminName}</div>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-bold text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar (mobile menu toggle) */}
        <header className="lg:hidden sticky top-0 z-20 bg-slate-800/80 backdrop-blur-xl border-b border-slate-700/50 px-4 py-3 flex items-center gap-3">
          <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-xl hover:bg-white/10 text-slate-400 cursor-pointer">
            <Menu className="w-5 h-5" />
          </button>
          <span className="font-extrabold text-white">PAK 99 <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#ff5500] text-white uppercase">ADMIN</span></span>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {renderContent()}

          {/* Form Modal */}
          {modalOpen && (
            <FormModal
              isOpen={modalOpen}
              onClose={() => { setModalOpen(false); setEditingItem(null); }}
              onSave={(data) => handleSave(getResourceForPage(), data)}
              onError={(msg) => setAlertDialog({ isOpen: true, title: 'Error', message: msg })}
              fields={getFieldsForPage()}
              initialData={editingItem || {}}
              title={editingItem?._id ? `Edit ${getResourceForPage().slice(0, -1)}` : `Add New ${getResourceForPage().slice(0, -1)}`}
              saving={saving}
            />
          )}

          {/* Custom Confirm Dialog */}
          {confirmDialog.isOpen && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
              <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-sm shadow-2xl p-6">
                <h3 className="text-xl font-extrabold text-white mb-2">{confirmDialog.title}</h3>
                <p className="text-slate-300 text-sm mb-6">{confirmDialog.message}</p>
                <div className="flex justify-end gap-3">
                  <button onClick={() => setConfirmDialog(prev => ({ ...prev, isOpen: false }))} className="px-4 py-2 text-sm font-bold text-slate-300 hover:text-white transition-colors cursor-pointer">Cancel</button>
                  <button onClick={confirmDialog.onConfirm} className="px-4 py-2 text-sm font-bold bg-[#ff5500] hover:bg-orange-600 text-white rounded-xl shadow-lg shadow-orange-500/30 transition-all cursor-pointer">Confirm</button>
                </div>
              </div>
            </div>
          )}

          {/* Custom Alert Dialog */}
          {alertDialog.isOpen && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
              <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-sm shadow-2xl p-6">
                <h3 className="text-xl font-extrabold text-white mb-2">{alertDialog.title}</h3>
                <p className="text-slate-300 text-sm mb-6 whitespace-pre-line">{alertDialog.message}</p>
                <div className="flex justify-end">
                  <button onClick={() => setAlertDialog(prev => ({ ...prev, isOpen: false }))} className="px-4 py-2 text-sm font-bold bg-[#ff5500] hover:bg-orange-600 text-white rounded-xl shadow-lg shadow-orange-500/30 transition-all cursor-pointer">OK</button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

// ===========================
// RESOURCE MANAGER WRAPPER
// ===========================
function ResourceManager<T extends { _id?: string }>({
  title, data, columns, onEdit, onDelete, onAdd, loading, resourceName
}: {
  title: string;
  data: T[];
  columns: Column<T>[];
  onEdit: (item: T) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
  loading: boolean;
  resourceName: string;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-extrabold text-white">{title}</h2>
        <button onClick={onAdd} className="px-4 py-2.5 bg-gradient-to-r from-[#ff5500] to-amber-500 text-white rounded-xl text-xs font-extrabold flex items-center gap-1.5 cursor-pointer shadow-lg shadow-orange-500/20 hover:from-orange-600 hover:to-amber-600 transition-all">
          <Plus className="w-3.5 h-3.5" /> Add New
        </button>
      </div>
      <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl overflow-hidden">
        <DataTable data={data} columns={columns} onEdit={onEdit} onDelete={onDelete} loading={loading} resourceName={resourceName} />
      </div>
    </div>
  );
}
