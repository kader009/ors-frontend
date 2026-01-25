import React, { useState, useEffect } from 'react';
import {
  X,
  Truck,
  BarChart3,
  AlertCircle,
  FileText,
  Trash2,
  Link,
} from 'lucide-react';
import { useOrsUpdateMutation } from '../redux/api/endApi';
import { toast } from 'react-hot-toast';
import type { TORSPlan } from '../types/ors';

interface ORSUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  planData: TORSPlan | null;
}

const ORSUpdateModal: React.FC<ORSUpdateModalProps> = ({
  isOpen,
  onClose,
  planData,
}) => {
  const [updatePlan, { isLoading }] = useOrsUpdateMutation();
  const [isPreview, setIsPreview] = useState(false);

  // Initial State Helper
  const getInitialData = (data: TORSPlan | null) => ({
    vehicle: data?.vehicle || '',
    roadWorthinessScore: data?.roadWorthinessScore || '',
    overallTrafficScore: data?.overallTrafficScore || 'B',
    actionRequired: data?.actionRequired || '',
    // Always create fresh arrays/objects to avoid mutating frozen RTK Query data
    documents: data?.documents?.map((doc) => ({
      textDoc: doc.textDoc?.map((t) => ({ ...t })) || [
        { label: '', description: '' },
      ],
      attachments: doc.attachments ? [...doc.attachments] : ([] as string[]),
    })) || [
      {
        textDoc: [{ label: '', description: '' }],
        attachments: [] as string[],
      },
    ],
  });

  const [formData, setFormData] = useState(getInitialData(planData));

  // Sync state when planData changes or modal opens
  useEffect(() => {
    if (planData) {
      setFormData(getInitialData(planData));
    }
  }, [planData, isOpen]);

  if (!isOpen || !planData) return null;

  const handleAddNote = () => {
    const newDocs = formData.documents.map((d) => ({
      textDoc: d.textDoc.map((t) => ({ ...t })),
      attachments: [...d.attachments],
    }));
    newDocs[0].textDoc.push({ label: '', description: '' });
    setFormData({ ...formData, documents: newDocs });
  };

  const handleRemoveNote = (index: number) => {
    const newDocs = formData.documents.map((d) => ({
      textDoc: d.textDoc.map((t) => ({ ...t })),
      attachments: [...d.attachments],
    }));
    newDocs[0].textDoc.splice(index, 1);
    setFormData({ ...formData, documents: newDocs });
  };

  const handleNoteChange = (
    index: number,
    field: 'label' | 'description',
    value: string,
  ) => {
    const newDocs = formData.documents.map((d) => ({
      textDoc: d.textDoc.map((t) => ({ ...t })),
      attachments: [...d.attachments],
    }));
    newDocs[0].textDoc[index][field] = value;
    setFormData({ ...formData, documents: newDocs });
  };

  const handleAddAttachment = () => {
    const newDocs = formData.documents.map((d) => ({
      textDoc: d.textDoc.map((t) => ({ ...t })),
      attachments: [...d.attachments],
    }));
    newDocs[0].attachments.push('');
    setFormData({ ...formData, documents: newDocs });
  };

  const handleRemoveAttachment = (index: number) => {
    const newDocs = formData.documents.map((d) => ({
      textDoc: d.textDoc.map((t) => ({ ...t })),
      attachments: [...d.attachments],
    }));
    newDocs[0].attachments.splice(index, 1);
    setFormData({ ...formData, documents: newDocs });
  };

  const handleAttachmentChange = (index: number, value: string) => {
    const newDocs = formData.documents.map((d) => ({
      textDoc: d.textDoc.map((t) => ({ ...t })),
      attachments: [...d.attachments],
    }));
    newDocs[0].attachments[index] = value;
    setFormData({ ...formData, documents: newDocs });
  };

  const handleSubmit = async () => {
    try {
      const finalData = {
        ...formData,
        roadWorthinessScore: String(formData.roadWorthinessScore).includes('%')
          ? formData.roadWorthinessScore
          : `${formData.roadWorthinessScore}%`,
      };

      await updatePlan({
        orsId: planData._id,
        orsData: finalData,
      }).unwrap();

      toast.success('ORS Plan updated successfully');
      setIsPreview(false);
      onClose();
    } catch (err) {
      toast.error('Failed to update ORS plan');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-[#f8fafc] dark:bg-gray-900 w-full max-w-lg rounded-xl shadow-2xl overflow-hidden animate-in zoom-in duration-200">
        {/* Header */}
        <div className="px-5 py-2.5 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-white dark:bg-gray-900">
          <div>
            <h2 className="text-base font-bold text-gray-900 dark:text-white">
              {isPreview ? 'Review Changes' : 'Update ORS Plan'}
            </h2>
            <p className="text-[10px] text-gray-500 font-medium tracking-tight">
              {isPreview
                ? 'Verify updated details before saving.'
                : 'Modify vehicle metrics and action items.'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-400"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-4 space-y-4 max-h-[85vh] overflow-y-auto custom-scrollbar">
          {!isPreview ? (
            <div className="space-y-4">
              {/* Vehicle Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-primary font-bold text-sm">
                  <Truck size={16} /> <span>Vehicle Information</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">
                      License Plate
                    </label>
                    <input
                      required
                      value={formData.vehicle}
                      onChange={(e) =>
                        setFormData({ ...formData, vehicle: e.target.value })
                      }
                      placeholder="e.g. Truck-12"
                      className="w-full px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm dark:text-white outline-none focus:border-primary transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">
                      Traffic Score
                    </label>
                    <select
                      value={formData.overallTrafficScore}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          overallTrafficScore: e.target.value,
                        })
                      }
                      className="w-full px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm dark:text-white outline-none focus:border-primary transition-all"
                    >
                      <option value="A">A - Excellent</option>
                      <option value="B">B - Good</option>
                      <option value="C">C - Average</option>
                      <option value="Failed">Failed</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* ORS Score Section */}
              <div className="bg-white dark:bg-gray-800/50 p-4 rounded-xl border border-gray-200 dark:border-gray-800 space-y-3">
                <div className="flex items-center gap-2 text-primary font-bold text-sm">
                  <BarChart3 size={16} /> <span>Calculated Score</span>
                </div>
                <div className="flex items-center gap-3">
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
                    placeholder="Score %"
                    className="w-24 px-3 py-1.5 bg-gray-50 dark:bg-gray-900 border-none rounded-lg text-center font-bold text-base focus:ring-2 focus:ring-primary/20 text-gray-700 dark:text-white outline-none"
                  />
                  <div className="flex-1 text-center font-black text-xl text-primary">
                    {String(formData.roadWorthinessScore).replace('%', '') ||
                      '0'}
                    %
                  </div>
                </div>
              </div>

              {/* Action Section */}
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
                  className="w-full h-16 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-xs dark:text-white resize-none outline-none focus:border-primary transition-all"
                />
              </div>

              {/* Documentation Section */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm font-bold">
                  <span className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                    <FileText size={16} /> Notes
                  </span>
                  <button
                    type="button"
                    onClick={handleAddNote}
                    className="text-[10px] text-primary hover:bg-primary/5 px-2 py-1 rounded transition-colors border-none bg-transparent font-bold"
                  >
                    Add Entry
                  </button>
                </div>
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
                      placeholder="Description"
                      className="flex-2 px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-xs dark:text-white outline-none focus:border-primary transition-all"
                    />
                    {formData.documents[0].textDoc.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveNote(idx)}
                        className="p-1 text-red-400 hover:text-red-50 rounded transition-all border-none bg-transparent opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 size={12} />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Links Section */}
              <div className="space-y-3 border-t dark:border-gray-800 pt-3">
                <div className="flex justify-between items-center text-sm font-bold">
                  <span className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                    <Link size={16} /> Links
                  </span>
                  <button
                    type="button"
                    onClick={handleAddAttachment}
                    className="text-[10px] text-primary hover:bg-primary/5 px-2 py-1 rounded transition-colors border-none bg-transparent font-bold"
                  >
                    Add Link
                  </button>
                </div>
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
                      className="p-1.5 text-red-400 hover:bg-red-50 rounded transition-all border-none bg-transparent opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* PREVIEW VIEW */
            <div className="space-y-4 animate-in slide-in-from-right-2 duration-300">
              <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border-2 border-primary/20 shadow-lg space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase font-black text-gray-400">
                      Updating Unit
                    </span>
                    <span className="text-xl font-black text-gray-900 dark:text-white">
                      {formData.vehicle}
                    </span>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase ${
                      ['A', 'B'].includes(formData.overallTrafficScore)
                        ? 'bg-green-100 text-green-600'
                        : formData.overallTrafficScore === 'C'
                          ? 'bg-amber-100 text-amber-600'
                          : 'bg-red-100 text-red-600'
                    }`}
                  >
                    Score: {formData.overallTrafficScore}
                  </div>
                </div>

                <div className="py-3 border-y dark:border-gray-700 text-center">
                  <div className="text-[9px] font-bold text-gray-400 uppercase">
                    New Roadworthiness
                  </div>
                  <div className="text-2xl font-black text-primary">
                    {String(formData.roadWorthinessScore).replace('%', '') ||
                      '0'}
                    %
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-[9px] font-black text-gray-400 uppercase">
                    Action Plan:
                  </div>
                  <p className="text-xs text-gray-700 dark:text-gray-300">
                    {formData.actionRequired || 'No changes.'}
                  </p>
                </div>
              </div>
              <div className="text-[10px] text-blue-500 font-medium bg-blue-50 dark:bg-blue-900/10 p-2 rounded-lg border border-blue-200/50 text-center">
                Updating an existing record will overwrite old data.
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-2.5 border-t border-gray-200 dark:border-gray-800 flex justify-end gap-2 bg-white dark:bg-gray-900">
          {!isPreview ? (
            <>
              <button
                onClick={onClose}
                className="px-4 py-1.5 text-xs font-bold text-gray-500 hover:bg-gray-50 rounded-lg transition-all border-none bg-transparent cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsPreview(true)}
                className="px-6 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-sm text-xs font-bold transition-all cursor-pointer border-none shadow-lg"
              >
                Review Updates
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsPreview(false)}
                className="px-4 py-1.5 text-xs font-bold text-gray-500 hover:bg-gray-50 rounded-lg transition-all border-none bg-transparent cursor-pointer"
              >
                Back to Edit
              </button>
              <button
                disabled={isLoading}
                onClick={handleSubmit}
                className="px-8 py-2 bg-primary hover:bg-primary-dark text-white rounded-sm text-xs font-bold shadow-lg shadow-primary/30 flex items-center gap-2 transform active:scale-95 transition-all disabled:opacity-50 cursor-pointer border-none"
              >
                {isLoading ? 'Updating...' : 'Save Changes'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ORSUpdateModal;
