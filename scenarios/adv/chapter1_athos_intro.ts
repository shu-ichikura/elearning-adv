// /scenarios/adv/chapter1_athos_intro.ts
import type { AdvChapter } from './types';

export const chapter1AthosIntro: AdvChapter = {
  id: 'chapter1_athos_intro',
  firstNodeId: 'athos_intro_1',
  nodes: {
    // ① アトス最初のセリフ
    athos_intro_1: {
      id: 'athos_intro_1',
      kind: 'line',
      background: 'officeroom_day',
      character: 'athos',
      expression: 'plain',
      speakerName: 'アトス',
      text: '……お前の“人類幸福計画”とやら、少しだけ話を聞いてやろう。',
      nextId: 'athos_intro_choice_1',
    },

    // ② 質問＋選択肢
    athos_intro_choice_1: {
      id: 'athos_intro_choice_1',
      kind: 'choice',
      background: 'officeroom_day',
      character: 'athos',
      expression: 'plain',
      speakerName: 'アトス',
      text: 'で――お前は、本気でその計画が「みんなの幸福」につながると信じているのか？',
      options: [
        {
          id: 'opt_believe',
          label: 'もちろん。本気で人類の幸福を最適化するつもりだ。',
          nextId: 'athos_react_happy',
        },
        {
          id: 'opt_doubt',
          label: '正直、まだ自分でも怖い。でも……やらなきゃいけない気がする。',
          nextId: 'athos_react_angry',
        },
      ],
    },

    // ③ 選択肢1 → 表情：happy
    athos_react_happy: {
      id: 'athos_react_happy',
      kind: 'line',
      background: 'officeroom_day',
      character: 'athos',
      expression: 'happy',
      speakerName: 'アトス',
      text: 'ふ……言い切ったな。だったら、その覚悟が本物かどうか、俺が見極めてやろう。',
      // 必要なら次のノードへ
      nextId: undefined,
    },

    // ④ 選択肢2 → 表情：angry
    athos_react_angry: {
      id: 'athos_react_angry',
      kind: 'line',
      background: 'officeroom_day',
      character: 'athos',
      expression: 'angry',
      speakerName: 'アトス',
      text: '迷いを抱えたまま走るやつほど、周りを巻き込んで転ぶ。……そのことは忘れるな。',
      nextId: undefined,
    },
  },
};
