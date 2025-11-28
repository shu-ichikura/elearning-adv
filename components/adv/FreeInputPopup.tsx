// /components/adv/FreeInputPopup.tsx
'use client';

import { useEffect, useRef, useState } from 'react';

type FreeInputPopupProps = {
  prompt: string;
  defaultValue?: string;
  onSubmit: (value: string) => void;
};

export const FreeInputPopup: React.FC<FreeInputPopupProps> = ({
  prompt,
  defaultValue = '',
  onSubmit,
}) => {
  const [value, setValue] = useState<string>(defaultValue);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // フォーカスを確実に当て、テキストを全選択する
    inputRef.current?.focus();
    inputRef.current?.select();
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center z-30">
      <div className="bg-black/60 absolute inset-0" />
      <div className="relative bg-white rounded-xl px-6 py-4 max-w-md w-[90%] shadow-xl z-40">
        <p className="mb-3 text-sm text-black">{prompt}</p>
        <input
          ref={inputRef}
          type="text"
          className="w-full border rounded px-3 py-2 text-sm text-black"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => inputRef.current?.select()}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              onSubmit(value);
            }
          }}
        />
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => {
              onSubmit(value);
            }}
            className="px-4 py-2 bg-emerald-500 text-white rounded text-sm"
          >
            決定
          </button>
        </div>
      </div>
    </div>
  );
};
