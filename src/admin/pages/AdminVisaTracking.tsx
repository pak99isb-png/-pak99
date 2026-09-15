import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Pencil, Trash2, X, Loader2 } from 'lucide-react';
import { visaApplicationsAPI } from '../../services/api';
import type { ApiVisaApplication } from '../../services/api';
import toast from 'react-hot-toast';

export const AdminVisaTracking: React.FC = () => {
  const [applications, setApplications] = useState<ApiVisaApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<ApiVisaApplication> | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchApplications = useCallback(async () => {
    setLoading(true);
    try {
      const data = await visaApplicationsAPI.getAll();
      setApplications(data);
    } catch (err) {
      console.error('Failed to fetch visa applications:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this visa application?')) return;
    try {
      await visaApplicationsAPI.delete(id);
      toast.success('Deleted successfully');
      fetchApplications();
    } catch (err) {
      toast.error('Failed to delete');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem?.customerName || !editingItem?.referenceNumber || !editingItem?.visaType || !editingItem?.status) {
      toast.error('Please fill all required fields');
      return;
    }
    
    setSaving(true);
    try {
      if (editingItem._id) {
        await visaApplicationsAPI.update(editingItem._id, editingItem);
        toast.success('Updated successfully');
      } else {
        await visaApplicationsAPI.create(editingItem);
        toast.success('Created successfully');
      }
      setModalOpen(false);
      fetchApplications();
    } catch (err: any) {
      toast.error(err.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h3 className="text-xl sm:text-2xl font-extrabold text-white">Visa Process Tracking</h3>
        <button
          onClick={() => {
            setEditingItem({
              status: 'Pending',
              referenceNumber: `PK99-${Math.floor(10000 + Math.random() * 90000)}`
            });
            setModalOpen(true);
          }}
          className="px-4 py-2.5 bg-gradient-to-r from-[#ff5500] to-amber-500 text-white rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-orange-500/20 hover:from-orange-600 hover:to-amber-600 transition-all w-full sm:w-auto"
        >
          <Plus className="w-3.5 h-3.5" /> Add Application
        </button>
      </div>

      <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl overflow-x-auto">
        {loading ? (
          <div className="flex justify-center p-10">
            <Loader2 className="w-8 h-8 text-[#ff5500] animate-spin" />
          </div>
        ) : applications.length === 0 ? (
          <div className="text-center p-10 text-slate-400 font-bold">No applications found.</div>
        ) : (
          <table className="w-full text-sm min-w-max">
            <thead>
              <tr className="border-b border-slate-700/50">
                <th className="text-left py-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Ref Number</th>
                <th className="text-left py-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Customer</th>
                <th className="text-left py-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Visa Type</th>
                <th className="text-left py-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="text-right py-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map(app => (
                <tr key={app._id} className="border-b border-slate-700/30 hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4 text-[#ff5500] font-bold">{app.referenceNumber}</td>
                  <td className="py-3 px-4 text-slate-200 font-bold">{app.customerName}</td>
                  <td className="py-3 px-4 text-slate-200">{app.visaType}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      app.status === 'Approved' ? 'bg-emerald-500/20 text-emerald-400' :
                      app.status === 'Rejected' ? 'bg-red-500/20 text-red-400' :
                      app.status === 'Processing' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-amber-500/20 text-amber-400'
                    }`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => { setEditingItem(app); setModalOpen(true); }} className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 cursor-pointer">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(app._id!)} className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 cursor-pointer">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center p-4 pt-10 overflow-y-auto">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-lg shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b border-slate-700">
              <h3 className="text-lg font-extrabold text-white">{editingItem?._id ? 'Edit' : 'Add'} Application</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSave} className="p-5 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-300 uppercase block mb-1">Customer Name *</label>
                <input required type="text" value={editingItem?.customerName || ''} onChange={e => setEditingItem({...editingItem, customerName: e.target.value})} className="w-full px-3 py-2.5 bg-slate-700/50 border border-slate-600 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5500]/50" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-300 uppercase block mb-1">Reference Number *</label>
                <input required type="text" value={editingItem?.referenceNumber || ''} onChange={e => setEditingItem({...editingItem, referenceNumber: e.target.value.toUpperCase()})} className="w-full px-3 py-2.5 bg-slate-700/50 border border-slate-600 rounded-xl text-white text-sm uppercase focus:outline-none focus:ring-2 focus:ring-[#ff5500]/50" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-300 uppercase block mb-1">Visa Type * (e.g. Umrah, Dubai Visit)</label>
                <input required type="text" value={editingItem?.visaType || ''} onChange={e => setEditingItem({...editingItem, visaType: e.target.value})} className="w-full px-3 py-2.5 bg-slate-700/50 border border-slate-600 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5500]/50" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-300 uppercase block mb-1">Passport Number (Optional)</label>
                <input type="text" value={editingItem?.passportNumber || ''} onChange={e => setEditingItem({...editingItem, passportNumber: e.target.value})} className="w-full px-3 py-2.5 bg-slate-700/50 border border-slate-600 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5500]/50" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-300 uppercase block mb-1">Status *</label>
                <select required value={editingItem?.status || 'Pending'} onChange={e => setEditingItem({...editingItem, status: e.target.value})} className="w-full px-3 py-2.5 bg-slate-700/50 border border-slate-600 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5500]/50">
                  <option value="Pending">Pending</option>
                  <option value="Documents Submitted">Documents Submitted</option>
                  <option value="Processing">Processing</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-300 uppercase block mb-1">Expected Date (Optional)</label>
                <input type="date" value={editingItem?.expectedDate ? new Date(editingItem.expectedDate).toISOString().split('T')[0] : ''} onChange={e => setEditingItem({...editingItem, expectedDate: e.target.value})} className="w-full px-3 py-2.5 bg-slate-700/50 border border-slate-600 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5500]/50 [color-scheme:dark]" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-300 uppercase block mb-1">Notes (Optional)</label>
                <textarea value={editingItem?.notes || ''} onChange={e => setEditingItem({...editingItem, notes: e.target.value})} rows={2} className="w-full px-3 py-2.5 bg-slate-700/50 border border-slate-600 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5500]/50 resize-y" />
              </div>
              
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 text-sm font-bold text-slate-300 hover:text-white cursor-pointer transition-colors">Cancel</button>
                <button type="submit" disabled={saving} className="px-4 py-2 text-sm font-bold bg-[#ff5500] hover:bg-orange-600 text-white rounded-xl shadow-lg cursor-pointer flex items-center gap-2 transition-colors">
                  {saving && <Loader2 className="w-4 h-4 animate-spin" />} Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
