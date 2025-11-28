// /components/adv/AdvSceneLayout.tsx
'use client';

import Image from 'next/image';
import { CharacterSprite } from './CharacterSprite';
import { ChoicePopup } from './ChoicePopup';

type BackgroundKey = 'officeroom_day' | 'officeroom_night';

type AdvSceneLayoutProps = {
  background: BackgroundKey;
  character: 'athos' | 'porthos' | 'aramis' | 'dartagnan';
  expression: 'plain' | 'happy' | 'angry';
  speakerName: string;
  text: string;

  // NARRATION のときだけ「次へ」ボタンを出したい
  onNext?: () => void;

  // CHOICE のときだけ渡す
  choiceOptions?: { id: string; label: string }[];
  onSelectChoice?: (optionId: string) => void;
};

const backgroundMap: Record<BackgroundKey, string> = {
  officeroom_day: '/backgrounds/officeroom_day.png',
  officeroom_night: '/backgrounds/officeroom_night.png',
};

export const AdvSceneLayout: React.FC<AdvSceneLayoutProps> = ({
  background,
  character,
  expression,
  speakerName,
  text,
  onNext,
  choiceOptions,
  onSelectChoice,
}) => {
  const hasChoice = choiceOptions && choiceOptions.length > 0 && onSelectChoice;

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* 背景 */}
      <Image
        src={backgroundMap[background]}
        alt="background"
        fill
        className="object-cover"
        priority
      />

      {/* 上部：立ち絵エリア（全体の上 70% くらい） */}
      <div className="absolute inset-x-0 top-0 bottom-40">
        {/* 立ち絵 */}
        <div className="w-full h-full flex items-end justify-center pointer-events-none">
          <CharacterSprite character={character} expression={expression} />
        </div>

        {/* 選択肢ポップアップ（あれば） */}
        {hasChoice && (
          <ChoicePopup
            options={choiceOptions!}
            onSelect={onSelectChoice!}
          />
        )}
      </div>

      {/* 下部：セリフウィンドウ（固定高さ） */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-black/70 text-white px-6 py-3 flex flex-col justify-between z-10">
        <div className="font-semibold">{speakerName}</div>
        <div className="flex-1 mt-1 text-sm leading-relaxed">{text}</div>
        {onNext && (
          <div className="mt-2 flex justify-end">
            <button
              onClick={onNext}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 rounded-md text-sm"
            >
              次へ
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
