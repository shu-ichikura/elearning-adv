// /state/playMode.ts

// --- イベント定義 ---

export type PlayEvent =
  | { type: 'click_next' }
  | { type: 'click_choice'; optionId: string }
  | { type: 'submit_free_input'; text: string }
  | { type: 'ai_reply_received'; aiText: string }
  | { type: 'click_menu_open' }
  | { type: 'click_menu_close' }
  | { type: 'click_menu_tab'; view: 'LOG' | 'CHAPTERS' }
  | { type: 'click_learning_start' }
  | { type: 'click_learning_complete' }
  | { type: 'click_open_external_link' };

// --- PLAYINGのsubState --- 

export type PlaySubState =
  | { kind: 'NARRATION' }
  | { kind: 'CHOICE' }
  | { kind: 'FREE_INPUT_EDITING' }
  | { kind: 'FREE_INPUT_WAIT_AI' }
  | { kind: 'ANSWER_REVIEW' }
  | { kind: 'LEARNING_INTRO' }
  | { kind: 'LEARNING_LINK' };

// --- mode（全体の状態） ---

export type PlayMode =
  | {
      mode: 'PLAYING';
      subState: PlaySubState;

      chapterId: string;
      currentNodeId: string;
    }
  | {
      mode: 'MENU_OPEN';
      menuView: 'LOG' | 'CHAPTERS';
      previous: {
        subState: PlaySubState;
        chapterId: string;
        currentNodeId: string;
      };
    };
