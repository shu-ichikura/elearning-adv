'use client';

import { useReducer } from 'react';
import {
  PlayMode,
  PlayEvent,
  PlaySubState,
} from '@/state/playMode';
import { playReducer, initialPlayState } from '@/state/playReducer';
import { MainMenuModal } from '@/components/adv/MainMenuModal';
import { AdvSceneLayout } from '@/components/adv/AdvSceneLayout';

export default function PlayPage() {
  const [state, dispatch] = useReducer(playReducer, initialPlayState);

  // ---- UIレンダリング ------------------------------------------------------

  const renderContent = () => {
    if (state.mode === 'MENU_OPEN') {
      return (
        <MainMenuModal onClose={() => dispatch({ type: 'click_menu_close' })} />
      );
    }

    // PLAYING mode
    const sub = state.subState;

    switch (sub.kind) {
      case 'NARRATION':
        return (
        <AdvSceneLayout
          background="officeroom_day"
          character="athos"
          expression="plain"
          speakerName="アトス"
          text="……お前の“人類幸福計画”とやら、少しだけ話を聞いてやろう。"
          onNext={() => dispatch({ type: 'click_next' })}
        />
        );

      case 'CHOICE':
        return (
          <div className="p-4">
            <p>（質問文）</p>
            <div className="mt-4 space-y-2">
              {/* 実際には options 配列をシナリオから取得 */}
              <button
                onClick={() =>
                  dispatch({ type: 'click_choice', optionId: 'opt1' })
                }
                className="block w-full px-4 py-2 bg-green-500 text-white rounded"
              >
                選択肢1
              </button>

              <button
                onClick={() =>
                  dispatch({ type: 'click_choice', optionId: 'opt2' })
                }
                className="block w-full px-4 py-2 bg-green-500 text-white rounded"
              >
                選択肢2
              </button>
            </div>
          </div>
        );

      case 'FREE_INPUT_EDITING':
        return (
          <div className="p-4">
            <p>（自由入力の質問文）</p>
            <textarea
              id="freeInput"
              className="border w-full p-2"
              placeholder="入力してください"
            />
            <button
              onClick={() => {
                const el = document.getElementById(
                  'freeInput'
                ) as HTMLTextAreaElement | null;
                dispatch({
                  type: 'submit_free_input',
                  text: el?.value ?? '',
                });
              }}
              className="mt-4 px-4 py-2 bg-purple-500 text-white rounded"
            >
              送信
            </button>
          </div>
        );

      case 'FREE_INPUT_WAIT_AI':
        return (
          <div className="p-4">
            <p>AI返信待ち…</p>
          </div>
        );

      case 'LEARNING_INTRO':
        return (
          <div className="p-4">
            <p>（学習導入セリフ）</p>
            <button
              onClick={() => dispatch({ type: 'click_learning_start' })}
              className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded"
            >
              学習へ進む
            </button>
          </div>
        );

      case 'LEARNING_LINK':
        return (
          <div className="p-4">
            <p>（動画リンク）</p>
            <a
              href="https://example.com"
              target="_blank"
              className="underline text-blue-600"
            >
              外部動画を開く
            </a>

            <button
              onClick={() =>
                dispatch({
                  type: 'click_learning_complete',
                })
              }
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
            >
              受講完了
            </button>
          </div>
        );

      case 'ANSWER_REVIEW':
        return (
          <div className="p-4">
            <p>（正誤・解説テキスト）</p>
            <button
              onClick={() => dispatch({ type: 'click_next' })}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
            >
              次へ
            </button>
          </div>
        );
    }
  };

  // ---- ページ全体のレイアウト --------------------------------------------

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100 relative">
      <button
        onClick={() => dispatch({ type: 'click_menu_open' })}
        className="absolute top-4 right-4 bg-gray-700 text-white px-3 py-2 rounded"
      >
        MENU
      </button>

      <div className="w-[800px] h-[600px] bg-white shadow-lg p-6">
        {renderContent()}
      </div>
    </div>
  );
}
