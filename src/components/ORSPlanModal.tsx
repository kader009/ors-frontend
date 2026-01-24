import React, { useState } from 'react';
import {
  X,
  Truck,
  BarChart3,
  AlertCircle,
  Plus,
  FileText,
  Trash2,
  Link,
} from 'lucide-react';
import { useCreateOrsPlanMutation } from '../redux/api/endApi';
import { toast } from 'react-hot-toast';

interface ORSPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const initialState = {
  vehicle: '',
  roadWorthinessScore: '',
  overallTrafficScore: 'B',
  actionRequired: '',
  documents: [
    {
      textDoc: [{ label: '', description: '' }],
      attachments: [] as string[],
    },
  ],
};

const ORSPlanModal: React.FC<ORSPlanModalProps> = ({ isOpen, onClose }) => {
  const [createPlan, { isLoading }] = useCreateOrsPlanMutation();

  // Local Form State based on requested JSON
  const [formData, setFormData] = useState(initialState);

  if (!isOpen) return null;

  const handleAddNote = () => {
    const newDocs = [...formData.documents];
    newDocs[0].textDoc.push({ label: '', description: '' });
    setFormData({ ...formData, documents: newDocs });
  };

  const handleRemoveNote = (index: number) => {
    const newDocs = [...formData.documents];
    newDocs[0].textDoc.splice(index, 1);
    setFormData({ ...formData, documents: newDocs });
  };

  const handleNoteChange = (
    index: number,
    field: 'label' | 'description',
    value: string,
  ) => {
    const newDocs = [...formData.documents];
    newDocs[0].textDoc[index][field] = value;
    setFormData({ ...formData, documents: newDocs });
  };

  const handleAddAttachment = () => {
    const newDocs = [...formData.documents];
    newDocs[0].attachments.push('');
    setFormData({ ...formData, documents: newDocs });
  };

  const handleRemoveAttachment = (index: number) => {
    const newDocs = [...formData.documents];
    newDocs[0].attachments.splice(index, 1);
    setFormData({ ...formData, documents: newDocs });
  };

  const handleAttachmentChange = (index: number, value: string) => {
    const newDocs = [...formData.documents];
    newDocs[0].attachments[index] = value;
    setFormData({ ...formData, documents: newDocs });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Append % if numeric score provided
      const finalData = {
        ...formData,
        roadWorthinessScore: formData.roadWorthinessScore.includes('%')
          ? formData.roadWorthinessScore
          : `${formData.roadWorthinessScore}%`,
      };
      await createPlan(finalData).unwrap();
      toast.success('ORS Plan created successfully');
      setFormData(initialState); // Clear Fields
      onClose();
    } catch (err) {
      toast.error('Failed to create ORS plan');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      {/* Background Overlay - Optimized to cover everything */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Box - More compact width and height */}
      <div className="relative bg-[#f8fafc] dark:bg-gray-900 w-full max-w-lg rounded-xl shadow-2xl overflow-hidden animate-in zoom-in duration-200">
        {/* Header - Compact height */}
        <div className="px-5 py-2.5 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-white dark:bg-gray-900">
          <div>
            <h2 className="text-base font-bold text-gray-900 dark:text-white leading-tight">
              Add ORS Plan
            </h2>
            <p className="text-[10px] text-gray-500 dark:text-gray-400">
              Manage vehicle roadworthiness and actions.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors cursor-pointer text-gray-500"
          >
            <X size={16} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-4 space-y-3 max-h-[85vh] overflow-y-auto custom-scrollbar"
        >
          {/* Section: Vehicle Information */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-primary font-bold text-sm">
              <Truck size={16} /> <span>Vehicle Information</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                  License Plate / Vehicle ID
                </label>
                <input
                  required
                  value={formData.vehicle}
                  onChange={(e) =>
                    setFormData({ ...formData, vehicle: e.target.value })
                  }
                  placeholder="e.g. Truck-12"
                  className="w-full px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm dark:text-white"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                  Traffic Score (Grade)
                </label>
                <select
                  value={formData.overallTrafficScore}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      overallTrafficScore: e.target.value,
                    })
                  }
                  className="w-full px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm dark:text-white"
                >
                  <option value="A">A - Excellent</option>
                  <option value="B">B - Good</option>
                  <option value="C">C - Average</option>
                  <option value="Failed">Failed</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section: ORS Scores */}
          <div className="bg-white dark:bg-gray-800/50 p-4 rounded-xl border border-gray-200 dark:border-gray-800 space-y-3">
            <div className="flex items-center gap-2 text-primary font-bold text-sm">
              <BarChart3 size={16} /> <span>ORS Scores</span>
            </div>
            <div className="grid grid-cols-3 gap-3 items-end">
              <div className="space-y-1">
                <label className="text-[9px] font-black text-gray-400 uppercase">
                  Roadworthiness %
                </label>
                <input
                  type="text"
                  required
                  value={formData.roadWorthinessScore}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      roadWorthinessScore: e.target.value,
                    })
                  }
                  placeholder="78"
                  className="w-full px-3 py-1.5 bg-gray-50 dark:bg-gray-900 border-none rounded-lg text-center font-bold text-base focus:ring-2 focus:ring-primary/20 text-gray-700 dark:text-white outline-none"
                />
              </div>
              <div className="col-span-2 bg-primary/5 dark:bg-primary/10 p-2 rounded-lg border border-primary/20 flex flex-col items-center justify-center">
                <span className="text-[9px] font-black text-primary uppercase">
                  Calculated Total ORS
                </span>
                <span className="text-xl font-black text-primary">
                  {String(formData.roadWorthinessScore).replace('%', '') || '0'}
                  %
                </span>
              </div>
            </div>
          </div>

          {/* Section: Action Required */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-blue-500 font-bold text-sm">
              <AlertCircle size={16} /> <span>Action Required</span>
            </div>
            <textarea
              value={formData.actionRequired}
              onChange={(e) =>
                setFormData({ ...formData, actionRequired: e.target.value })
              }
              placeholder="Describe repairs required..."
              className="w-full h-16 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-xs dark:text-white resize-none"
            />
          </div>

          {/* Section: Documentation Notes */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200 font-bold text-sm">
                <FileText size={16} /> <span>Documentation Notes</span>
              </div>
              <button
                type="button"
                onClick={handleAddNote}
                className="flex items-center gap-1.5 text-[10px] font-bold text-primary hover:bg-primary/10 px-2 py-1 rounded-lg transition-colors border-none bg-transparent"
              >
                <Plus size={12} /> Add Entry
              </button>
            </div>

            <div className="space-y-2">
              {formData.documents[0].textDoc.map((note, idx) => (
                <div key={idx} className="flex gap-2 group">
                  <input
                    value={note.label}
                    onChange={(e) =>
                      handleNoteChange(idx, 'label', e.target.value)
                    }
                    placeholder="Label"
                    className="flex-1 px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-xs dark:text-white outline-none focus:border-primary transition-all"
                  />
                  <input
                    value={note.description}
                    onChange={(e) =>
                      handleNoteChange(idx, 'description', e.target.value)
                    }
                    placeholder="Description..."
                    className="flex-2 px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-xs dark:text-white outline-none focus:border-primary transition-all"
                  />
                  {formData.documents[0].textDoc.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveNote(idx)}
                      className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-all opacity-0 group-hover:opacity-100 border-none bg-transparent"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Section: Attached Links */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200 font-bold text-sm">
                <Link size={16} /> <span>Attached Links</span>
              </div>
              <button
                type="button"
                onClick={handleAddAttachment}
                className="flex items-center gap-1.5 text-[10px] font-bold text-primary hover:bg-primary/10 px-2 py-1 rounded-lg transition-colors border-none bg-transparent"
              >
                <Plus size={12} /> Add Link
              </button>
            </div>

            <div className="space-y-2">
              {formData.documents[0].attachments.map((link, idx) => (
                <div key={idx} className="flex gap-2 group">
                  <input
                    value={link}
                    onChange={(e) =>
                      handleAttachmentChange(idx, e.target.value)
                    }
                    placeholder="URL..."
                    className="flex-1 px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-xs dark:text-white outline-none focus:border-primary transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveAttachment(idx)}
                    className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-all border-none bg-transparent"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
              {formData.documents[0].attachments.length === 0 && (
                <p className="text-[10px] text-gray-400">No attachments yet.</p>
              )}
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="px-6 py-2.5 border-t border-gray-200 dark:border-gray-800 flex justify-end gap-2 bg-white dark:bg-gray-900">
          <button
            onClick={onClose}
            type="button"
            className="px-4 py-1.5 text-xs font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all cursor-pointer border-none bg-transparent"
          >
            Cancel
          </button>
          <button
            disabled={isLoading}
            onClick={handleSubmit}
            className="px-6 py-2 bg-primary hover:bg-primary-dark text-white rounded-sm text-xs font-bold shadow-lg shadow-primary/20 flex items-center gap-2 transform active:scale-95 transition-all disabled:opacity-50 cursor-pointer border-none"
          >
            {isLoading ? 'Saving...' : <>Create Plan</>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ORSPlanModal;
