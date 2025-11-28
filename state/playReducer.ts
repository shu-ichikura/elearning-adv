// /state/playReducer.ts
import { PlayMode, PlayEvent } from './playMode';
import { chapter1AthosIntro } from '@/scenarios/adv/chapter1_athos_intro';
import type { AdvInputNode } from '@/scenarios/adv/types';

const chapterMap = {
  [chapter1AthosIntro.id]: chapter1AthosIntro,
};

// 初期状態：チャプター1の最初のノード
export const initialPlayState: PlayMode = {
  mode: 'PLAYING',
  subState: { kind: 'NARRATION' },
  chapterId: chapter1AthosIntro.id,
  currentNodeId: chapter1AthosIntro.firstNodeId,
  userName: 'ダルタニャン', // ★ デフォルト名
};

export function playReducer(state: PlayMode, event: PlayEvent): PlayMode {
  // ===================== MENU 系 =====================
  if (event.type === 'click_menu_open' && state.mode === 'PLAYING') {
    return {
      mode: 'MENU_OPEN',
      menuView: 'LOG',
      userName: state.userName,
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
      userName: state.userName,
      subState: state.previous.subState,
      chapterId: state.previous.chapterId,
      currentNodeId: state.previous.currentNodeId,
    };
  }

  // ===================== PLAYING 以外は何もしない =====================
  if (state.mode !== 'PLAYING') return state;

  const chapter = chapterMap[state.chapterId];
  const currentNode = chapter.nodes[state.currentNodeId];
  const sub = state.subState;

  // ===================== PLAYING 中のサブ状態遷移 =====================
  switch (sub.kind) {
    // ---------- NARRATION：セリフのみ ----------
    case 'NARRATION': {
      if (event.type !== 'click_next') break;
      if (currentNode.kind !== 'line') break;

      // 次のノードがなければそのまま（チャプター終了などは後で実装）
      if (!currentNode.nextId) return state;

      const nextNode = chapter.nodes[currentNode.nextId];

      return {
        ...state,
        currentNodeId: nextNode.id,
        subState:
          nextNode.kind === 'line'
            ? { kind: 'NARRATION' }
            : nextNode.kind === 'choice'
            ? { kind: 'CHOICE' }
            : { kind: 'FREE_INPUT_EDITING' }, // kind: 'input'
      };
    }

    // ---------- CHOICE：選択肢 ----------
    case 'CHOICE': {
      if (event.type !== 'click_choice') break;
      if (currentNode.kind !== 'choice') break;

      const option = currentNode.options.find(
        (opt) => opt.id === event.optionId,
      );
      if (!option) break;

      const nextNode = chapter.nodes[option.nextId];

      return {
        ...state,
        currentNodeId: nextNode.id,
        subState:
          nextNode.kind === 'line'
            ? { kind: 'NARRATION' }
            : nextNode.kind === 'choice'
            ? { kind: 'CHOICE' }
            : { kind: 'FREE_INPUT_EDITING' }, // kind: 'input'
      };
    }

    // ---------- FREE_INPUT_EDITING：名づけ（＆将来自由入力） ----------
    case 'FREE_INPUT_EDITING': {
      if (event.type !== 'submit_free_input') break;
      if (currentNode.kind !== 'input') break;

      const inputNode = currentNode as AdvInputNode;
      const raw = event.text ?? '';
      const trimmed = raw.trim();

      // いまは「名づけ」専用
      if (inputNode.inputKind === 'NAME' && inputNode.variableKey === 'userName') {
        const newUserName = trimmed || state.userName; // 空入力なら前のまま

        const nextNode = chapter.nodes[inputNode.nextIdAfterSubmit];

        return {
          ...state,
          userName: newUserName,
          currentNodeId: nextNode.id,
          subState:
            nextNode.kind === 'line'
              ? { kind: 'NARRATION' }
              : nextNode.kind === 'choice'
              ? { kind: 'CHOICE' }
              : { kind: 'FREE_INPUT_EDITING' },
        };
      }

      // 名づけ以外の inputKind を追加したとき用のフォールバック
      return state;
    }

    // ---------- FREE_INPUT_WAIT_AI：②のときに使う（今は温存） ----------
    case 'FREE_INPUT_WAIT_AI': {
      if (event.type === 'ai_reply_received') {
        return {
          ...state,
          subState: { kind: 'NARRATION' },
        };
      }
      break;
    }

    // ---------- LEARNING_INTRO ----------
    case 'LEARNING_INTRO': {
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
    }

    // ---------- LEARNING_LINK ----------
    case 'LEARNING_LINK': {
      if (event.type === 'click_learning_complete') {
        return {
          ...state,
          subState: { kind: 'ANSWER_REVIEW' },
        };
      }
      break;
    }

    // ---------- ANSWER_REVIEW ----------
    case 'ANSWER_REVIEW': {
      if (event.type === 'click_next') {
        return {
          ...state,
          subState: { kind: 'NARRATION' },
        };
      }
      break;
    }
  }

  return state;
}
