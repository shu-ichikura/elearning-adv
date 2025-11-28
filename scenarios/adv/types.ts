// /scenarios/adv/types.ts
export type AdvCharacter = 'athos' | 'porthos' | 'aramis' | 'dartagnan';
export type AdvExpression = 'plain' | 'happy' | 'angry';

export type AdvNodeBase = {
  id: string;
  background: 'officeroom_day' | 'officeroom_night';
  character: AdvCharacter;
  expression: AdvExpression;
  speakerName: string;
};

export type AdvLineNode = AdvNodeBase & {
  kind: 'line';
  text: string;
  nextId?: string; // 次がなければチャプター終了など
};

export type AdvChoiceOption = {
  id: string;      // PlayEvent.click_choice.optionId と紐づく
  label: string;   // ボタン文言
  nextId: string;  // 遷移先ノードID
};

export type AdvChoiceNode = AdvNodeBase & {
  kind: 'choice';
  text: string;            // 質問文
  options: AdvChoiceOption[];
};

export type AdvNode = AdvLineNode | AdvChoiceNode;

export type AdvChapter = {
  id: string;
  firstNodeId: string;
  nodes: Record<string, AdvNode>;
};
