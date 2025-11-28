'use client';

import Image from 'next/image';
import { CharacterSprite } from './CharacterSprite';
import { DialogueBox } from './DialogueBox';

type AdvSceneLayoutProps = {
  background: string; // officeroom_day / officeroom_night など
  character: 'athos' | 'porthos' | 'aramis' | 'dartagnan';
  expression: 'plain' | 'happy' | 'angry';
  speakerName: string;
  text: string;
  onNext?: () => void;
};

export const AdvSceneLayout = ({
  background,
  character,
  expression,
  speakerName,
  text,
  onNext,
}: AdvSceneLayoutProps) => {
  return (
    <div className="w-full h-full relative overflow-hidden bg-black text-slate-50">

      {/* === 背景画像 === */}
      <div className="absolute inset-0 z-0">
        <Image
          src={`/backgrounds/${background}.png`}
          alt="background"
          fill
          priority
          style={{ objectFit: 'cover' }}
        />
      </div>

      {/* === 立ち絵 === */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <CharacterSprite character={character} expression={expression} />
      </div>

      {/* === セリフウィンドウ === */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <DialogueBox speakerName={speakerName} text={text} onNext={onNext} />
      </div>
    </div>
  );
};
