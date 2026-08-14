import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Check, X, Link, RefreshCw } from 'lucide-react';

interface ImageUploaderProps {
  value: string;
  onChange: (newUrl: string) => void;
  label?: string;
  onTriggerToast?: (msg: string) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  value,
  onChange,
  label = 'Upload Image or Enter URL',
  onTriggerToast,
}) => {
  const [dragOver, setDragOver] = useState(false);
  const [urlMode, setUrlMode] = useState(false);
  const [tempUrl, setTempUrl] = useState(value);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const processFile = (file: File) => {
    if (!file) return;

    // Check supported file types: PNG, JPG, JPEG, WEBP
    const validTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'];
    if (!validTypes.includes(file.type.toLowerCase())) {
      onTriggerToast?.('Invalid file type! Please upload PNG, JPG, JPEG, or WEBP.');
      return;
    }

    // Check size limit (e.g. 5MB)
    if (file.size > 5 * 1024 * 1024) {
      onTriggerToast?.('File size exceeds 5MB limit.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        onChange(dataUrl);
        setTempUrl(dataUrl);
        onTriggerToast?.(`Uploaded ${file.name} successfully!`);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleUrlSubmit = () => {
    if (tempUrl) {
      onChange(tempUrl);
      onTriggerToast?.('Updated image URL successfully.');
    }
  };

  return (
    <div className="space-y-3 text-xs">
      <div className="flex items-center justify-between">
        <label className="font-semibold text-gray-300 flex items-center gap-1.5">
          <ImageIcon className="w-3.5 h-3.5 text-purple-400" /> {label}
        </label>
        <button
          type="button"
          onClick={() => setUrlMode(!urlMode)}
          className="text-[11px] text-cyan-400 hover:underline flex items-center gap-1 font-mono"
        >
          <Link className="w-3 h-3" /> {urlMode ? 'Switch to Upload File' : 'Switch to URL Link'}
        </button>
      </div>

      {urlMode ? (
        /* Direct URL Input Mode */
        <div className="flex gap-2">
          <input
            type="text"
            value={tempUrl}
            onChange={(e) => setTempUrl(e.target.value)}
            placeholder="Paste image URL (https://... or /zyt_mascot.jpg)"
            className="flex-1 px-3.5 py-2.5 rounded-xl glass-input font-mono text-xs"
          />
          <button
            type="button"
            onClick={handleUrlSubmit}
            className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold flex items-center gap-1"
          >
            <Check className="w-4 h-4" /> Apply
          </button>
        </div>
      ) : (
        /* Drag & Drop Upload Zone Mode */
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-2 ${
            dragOver
              ? 'border-purple-500 bg-purple-950/40 scale-[1.01]'
              : 'border-white/15 bg-white/5 hover:border-purple-500/50 hover:bg-white/10'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png, image/jpeg, image/jpg, image/webp"
            onChange={handleFileSelect}
            className="hidden"
          />

          <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center">
            <Upload className="w-5 h-5 text-purple-400" />
          </div>

          <div>
            <p className="font-semibold text-white">
              Drag & Drop Image Here or <span className="text-cyan-400 underline">Choose File</span>
            </p>
            <p className="text-[11px] text-gray-400 mt-0.5">
              Supports PNG, JPG, JPEG, WEBP (Max 5MB)
            </p>
          </div>
        </div>
      )}

      {/* Image Live Preview */}
      {value && (
        <div className="p-3 rounded-2xl glass-card border border-purple-500/30 flex items-center justify-between gap-4 bg-[#090a18]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-black/60 border border-white/10 shrink-0">
              <img src={value} alt="Preview" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="font-bold text-white font-mono text-xs">Image Preview</div>
              <div className="text-[10px] text-gray-400 font-mono truncate max-w-[240px]">
                {value.startsWith('data:') ? 'Custom Uploaded Data (Base64)' : value}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] font-semibold flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3 text-cyan-400" /> Replace
            </button>

            <button
              type="button"
              onClick={() => onChange('/zyt_mascot.jpg')}
              className="p-1.5 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-300 border border-red-800"
              title="Reset to Default Mascot"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
