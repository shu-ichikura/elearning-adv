'use client';

import Image from 'next/image';

type CharacterSpriteProps = {
  character: 'athos' | 'porthos' | 'aramis' | 'dartagnan';
  expression: 'plain' | 'happy' | 'angry'; // 用意してる差分に合わせて増減
};

export const CharacterSprite = ({ character, expression }: CharacterSpriteProps) => {
  // images are placed in `public/characters/` (e.g. public/characters/athos_plain.png)
  const src = `/characters/${character}_${expression}.png`;

  return (
    <div className="w-1/2 h-full flex items-center justify-center">
      {/* 強めに拡大して下半分を大胆に切る（頭の位置を下げる） */}
      <div className="relative w-[560px] h-[720px] overflow-hidden">
        <Image
          src={src}
          alt={`${character} ${expression}`}
          fill
          className="
            object-contain
            scale-180       /* 拡大率：好みに応じて 1.2〜1.6 くらいで調整 */
            translate-y-40  /* 画像を少し下にずらす → 頭が中央寄りになる */
          "
          priority
        />
      </div>
    </div>
  );
};
