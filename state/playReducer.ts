import { PlayMode, PlayEvent } from './playMode';

export const initialPlayState: PlayMode = {
  mode: 'PLAYING',
  subState: { kind: 'NARRATION' },
};

export function playReducer(state: PlayMode, event: PlayEvent): PlayMode {
  // MENU系は mode の切り替えが先に入る
  if (event.type === 'click_menu_open' && state.mode === 'PLAYING') {
    return {
      mode: 'MENU_OPEN',
      menuView: 'LOG',
      previous: state.subState,
    };
  }

  if (event.type === 'click_menu_close' && state.mode === 'MENU_OPEN') {
    return {
      mode: 'PLAYING',
      subState: state.previous,
    };
  }

  // --- PLAYING中のサブ状態遷移 ---
  if (state.mode !== 'PLAYING') return state;

  const sub = state.subState;

  switch (sub.kind) {
    case 'NARRATION':
      if (event.type === 'click_next') {
        // 仮：毎回CHOICEへ飛ばす例
        return {
          mode: 'PLAYING',
          subState: { kind: 'CHOICE' },
        };
      }
      break;

    case 'CHOICE':
      if (event.type === 'click_choice') {
        return {
          mode: 'PLAYING',
          subState: { kind: 'NARRATION' },
        };
      }
      break;

    case 'FREE_INPUT_EDITING':
      if (event.type === 'submit_free_input') {
        return {
          mode: 'PLAYING',
          subState: { kind: 'FREE_INPUT_WAIT_AI' },
        };
      }
      break;

    case 'FREE_INPUT_WAIT_AI':
      if (event.type === 'ai_reply_received') {
        return {
          mode: 'PLAYING',
          subState: { kind: 'NARRATION' },
        };
      }
      break;

    case 'LEARNING_INTRO':
      if (
        event.type === 'click_learning_start' ||
        event.type === 'click_next'
      ) {
        return {
          mode: 'PLAYING',
          subState: { kind: 'LEARNING_LINK' },
        };
      }
      break;

    case 'LEARNING_LINK':
      if (event.type === 'click_learning_complete') {
        return {
          mode: 'PLAYING',
          subState: { kind: 'ANSWER_REVIEW' },
        };
      }
      break;

    case 'ANSWER_REVIEW':
      if (event.type === 'click_next') {
        return {
          mode: 'PLAYING',
          subState: { kind: 'NARRATION' },
        };
      }
      break;
  }

  return state;
}
