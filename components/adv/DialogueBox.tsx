'use client';

type DialogueBoxProps = {
  speakerName: string;
  text: string;
  onNext?: () => void;
};

export const DialogueBox = ({ speakerName, text, onNext }: DialogueBoxProps) => {
  return (
    <div className="h-40 bg-slate-950/90 border-t border-yellow-500/60 px-4 py-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-bold text-yellow-400">{speakerName}</span>
        {onNext && (
          <button
            onClick={onNext}
            className="px-3 py-1 text-sm rounded bg-yellow-400 text-slate-900 hover:bg-yellow-300"
          >
            次へ ▶
          </button>
        )}
      </div>
      <div className="text-sm leading-relaxed text-slate-100 whitespace-pre-line">
        {text}
      </div>
    </div>
  );
};
