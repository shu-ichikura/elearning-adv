// /components/adv/ChoicePopup.tsx
'use client';

type ChoiceOption = {
  id: string;
  label: string;
};

type ChoicePopupProps = {
  options: ChoiceOption[];
  onSelect: (optionId: string) => void;
};

export const ChoicePopup: React.FC<ChoicePopupProps> = ({
  options,
  onSelect,
}) => {
  return (
    <div className="absolute inset-x-0 top-8 flex justify-center z-20">
      <div className="bg-black/70 text-white rounded-xl px-6 py-4 shadow-lg max-w-xl w-[90%]">
        <div className="space-y-2">
          {options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => onSelect(opt.id)}
              className="block w-full text-left px-4 py-2 rounded-md bg-emerald-500 hover:bg-emerald-600 transition"
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
