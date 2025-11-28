// /state/playReducer.ts
import { PlayMode, PlayEvent } from './playMode';
import { chapter1AthosIntro } from '@/scenarios/adv/chapter1_athos_intro';

const chapterMap = {
  [chapter1AthosIntro.id]: chapter1AthosIntro,
};

// 初期状態：チャプター1の最初のノード
export const initialPlayState: PlayMode = {
  mode: 'PLAYING',
  subState: { kind: 'NARRATION' },
  chapterId: chapter1AthosIntro.id,
  currentNodeId: chapter1AthosIntro.firstNodeId,
};

export function playReducer(state: PlayMode, event: PlayEvent): PlayMode {
  // MENU 系 --------------------------------------------------
  if (event.type === 'click_menu_open' && state.mode === 'PLAYING') {
    return {
      mode: 'MENU_OPEN',
      menuView: 'LOG',
      previous: {
        subState: state.subState,
        chapterId: state.chapterId,
        currentNodeId: state.currentNodeId,
      },
    };
  }

  if (event.type === 'click_menu_close' && state.mode === 'MENU_OPEN') {
    return {
      mode: 'PLAYING',
      subState: state.previous.subState,
      chapterId: state.previous.chapterId,
      currentNodeId: state.previous.currentNodeId,
    };
  }

  // PLAYING 以外はここで終了
  if (state.mode !== 'PLAYING') return state;

  const chapter = chapterMap[state.chapterId];
  const currentNode = chapter.nodes[state.currentNodeId];
  const sub = state.subState;

  // --- PLAYING中のサブ状態遷移 --------------------------------

  switch (sub.kind) {
    case 'NARRATION': {
      if (event.type !== 'click_next') break;

      // シナリオ node.kind が line のときだけ扱う
      if (currentNode.kind !== 'line') break;

      if (!currentNode.nextId) {
        // ここでは「次がない」→ とりあえずそのままにしておく（後でチャプター終了処理など）
        return state;
      }

      const nextNode = chapter.nodes[currentNode.nextId];

      return {
        ...state,
        currentNodeId: nextNode.id,
        subState:
          nextNode.kind === 'line'
            ? { kind: 'NARRATION' }
            : { kind: 'CHOICE' },
      };
    }

    case 'CHOICE': {
      if (event.type !== 'click_choice') break;
      if (currentNode.kind !== 'choice') break;

      const option = currentNode.options.find(
        (opt) => opt.id === event.optionId
      );
      if (!option) break;

      const nextNode = chapter.nodes[option.nextId];

      return {
        ...state,
        currentNodeId: nextNode.id,
        subState:
          nextNode.kind === 'line'
            ? { kind: 'NARRATION' }
            : { kind: 'CHOICE' },
      };
    }

    // ↓ ここから下は、既存ロジックそのまま（シナリオ非依存）でOK
    case 'FREE_INPUT_EDITING':
      if (event.type === 'submit_free_input') {
        return {
          ...state,
          subState: { kind: 'FREE_INPUT_WAIT_AI' },
        };
      }
      break;

    case 'FREE_INPUT_WAIT_AI':
      if (event.type === 'ai_reply_received') {
        return {
          ...state,
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
          ...state,
          subState: { kind: 'LEARNING_LINK' },
        };
      }
      break;

    case 'LEARNING_LINK':
      if (event.type === 'click_learning_complete') {
        return {
          ...state,
          subState: { kind: 'ANSWER_REVIEW' },
        };
      }
      break;

    case 'ANSWER_REVIEW':
      if (event.type === 'click_next') {
        return {
          ...state,
          subState: { kind: 'NARRATION' },
        };
      }
      break;
  }

  return state;
}
