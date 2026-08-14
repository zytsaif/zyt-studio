import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { Edit3, Check, X } from 'lucide-react';

interface InlineEditableTextProps {
  value: string;
  onSave: (newValue: string) => void;
  className?: string;
  multiline?: boolean;
  tagName?: keyof JSX.IntrinsicElements;
  placeholder?: string;
}

export const InlineEditableText: React.FC<InlineEditableTextProps> = ({
  value,
  onSave,
  className = '',
  multiline = false,
  tagName = 'span',
  placeholder = 'Double-click to edit...',
}) => {
  const { isEditMode } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  useEffect(() => {
    setText(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      if ('select' in inputRef.current) {
        inputRef.current.select();
      }
    }
  }, [isEditing]);

  const handleCommit = () => {
    if (text !== value) {
      onSave(text);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      handleCommit();
    } else if (e.key === 'Escape') {
      setText(value);
      setIsEditing(false);
    }
  };

  if (!isEditMode) {
    const Component = tagName as any;
    return <Component className={className}>{value || placeholder}</Component>;
  }

  if (isEditing) {
    return (
      <span className="relative inline-block w-full z-30">
        {multiline ? (
          <textarea
            ref={inputRef as any}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={handleCommit}
            onKeyDown={handleKeyDown}
            rows={3}
            className={`w-full p-2.5 rounded-xl bg-[#0d0e22] text-white border-2 border-cyan-400 font-sans focus:outline-none shadow-2xl ${className}`}
          />
        ) : (
          <input
            ref={inputRef as any}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={handleCommit}
            onKeyDown={handleKeyDown}
            className={`w-full px-3 py-1.5 rounded-lg bg-[#0d0e22] text-white border-2 border-cyan-400 font-sans focus:outline-none shadow-2xl ${className}`}
          />
        )}
        <span className="absolute -top-3 -right-2 flex gap-1 bg-cyan-950 p-1 rounded-full border border-cyan-500 shadow-lg">
          <button
            onClick={handleCommit}
            className="p-1 rounded-full bg-cyan-500 text-black hover:scale-110 transition-transform"
            title="Save (Enter)"
          >
            <Check className="w-3 h-3" />
          </button>
          <button
            onClick={() => { setText(value); setIsEditing(false); }}
            className="p-1 rounded-full bg-red-500 text-white hover:scale-110 transition-transform"
            title="Cancel (Esc)"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      </span>
    );
  }

  const Component = tagName as any;

  return (
    <Component
      onDoubleClick={() => setIsEditing(true)}
      onClick={() => setIsEditing(true)}
      title="Click or double-click to edit text visually"
      className={`group relative cursor-pointer rounded transition-all duration-200 hover:outline-2 hover:outline-dashed hover:outline-purple-400 hover:bg-purple-500/10 ${className}`}
    >
      {value || placeholder}
      <span className="opacity-0 group-hover:opacity-100 absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-950 text-purple-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border border-purple-500/40 pointer-events-none transition-opacity shadow-lg z-20 flex items-center gap-1 whitespace-nowrap">
        <Edit3 className="w-2.5 h-2.5 text-cyan-400" /> Click to Edit
      </span>
    </Component>
  );
};
