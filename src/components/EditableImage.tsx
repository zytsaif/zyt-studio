import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ImageUploader } from './ImageUploader';
import { Upload, Camera, X } from 'lucide-react';

interface EditableImageProps {
  src: string;
  alt: string;
  onSave: (newSrc: string) => void;
  className?: string;
  containerClassName?: string;
  onTriggerToast?: (msg: string) => void;
}

export const EditableImage: React.FC<EditableImageProps> = ({
  src,
  alt,
  onSave,
  className = '',
  containerClassName = '',
  onTriggerToast,
}) => {
  const { isEditMode } = useStore();
  const [modalOpen, setModalOpen] = useState(false);

  if (!isEditMode) {
    return <img src={src} alt={alt} className={className} />;
  }

  return (
    <div className={`relative group cursor-pointer ${containerClassName}`}>
      <img src={src} alt={alt} className={`transition-all duration-200 group-hover:brightness-75 ${className}`} />

      {/* Visual Edit Mode Overlay Badge */}
      <div
        onClick={() => setModalOpen(true)}
        className="absolute inset-0 bg-purple-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 p-2 rounded-2xl border-2 border-dashed border-cyan-400 backdrop-blur-sm z-20"
      >
        <div className="w-9 h-9 rounded-full bg-purple-600 border border-purple-400 flex items-center justify-center shadow-lg">
          <Camera className="w-5 h-5 text-cyan-300" />
        </div>
        <span className="text-[11px] font-bold text-white font-mono bg-black/80 px-2.5 py-1 rounded-full border border-purple-500/40">
          Click to Change Image
        </span>
      </div>

      {/* Upload Modal */}
      {modalOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        >
          <div className="relative w-full max-w-md glass-panel p-6 rounded-3xl border border-purple-500/40 space-y-4 shadow-2xl bg-[#090a1a]">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                <Upload className="w-4 h-4 text-cyan-400" /> Replace Image
              </h4>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg bg-white/10 text-gray-300 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <ImageUploader
              label="Select or Drop New Image File"
              value={src}
              onChange={(newUrl) => {
                onSave(newUrl);
                setModalOpen(false);
                onTriggerToast?.('Image updated successfully!');
              }}
              onTriggerToast={onTriggerToast}
            />

            <button
              onClick={() => setModalOpen(false)}
              className="w-full py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
