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

export type AdvInputKind = 'NAME' | 'FREE_TALK';

export type AdvInputNode = {
  id: string;
  kind: 'input';
  background: 'officeroom_day' | 'officeroom_night';
  character: 'athos' | 'porthos' | 'aramis' | 'dartagnan';
  expression: 'plain' | 'happy' | 'angry';
  speakerName: string;

  inputKind: 'NAME';          // いまは名づけだけ
  variableKey: 'userName';    // 更新する変数キー
  promptText: string;
  nextIdAfterSubmit: string;
};

export type AdvNode = AdvLineNode | AdvChoiceNode | AdvInputNode;

export type AdvChapter = {
  id: string;
  firstNodeId: string;
  nodes: Record<string, AdvNode>;
};

