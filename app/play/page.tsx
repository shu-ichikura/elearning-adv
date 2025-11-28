// /app/play/page.tsx
'use client';

import { useReducer } from 'react';
import { PlayMode } from '@/state/playMode';
import { playReducer, initialPlayState } from '@/state/playReducer';
import { MainMenuModal } from '@/components/adv/MainMenuModal';
import { AdvSceneLayout } from '@/components/adv/AdvSceneLayout';
import { FreeInputPopup } from '@/components/adv/FreeInputPopup';
import { chapter1AthosIntro } from '@/scenarios/adv/chapter1_athos_intro';

export default function PlayPage() {
  const [state, dispatch] = useReducer(playReducer, initialPlayState);

  const renderContent = () => {
    if (state.mode === 'MENU_OPEN') {
      return (
        <MainMenuModal onClose={() => dispatch({ type: 'click_menu_close' })} />
      );
    }

    // --- PLAYING モードのとき ---
    const chapter = chapter1AthosIntro; // 今は 1 章固定。将来は state.chapterId から引く
    const currentNode = chapter.nodes[state.currentNodeId];

    switch (state.subState.kind) {
      case 'NARRATION':
        // node.kind === 'line' を想定
        if (currentNode.kind !== 'line') return null;

        const renderedText = currentNode.text.replace(
          '{userName}',
          state.userName
        );

        return (
          <AdvSceneLayout
            background={currentNode.background}
            character={currentNode.character}
            expression={currentNode.expression}
            speakerName={currentNode.speakerName}
            text={renderedText}
            onNext={() => dispatch({ type: 'click_next' })}
          />
        );

      case 'CHOICE':
        if (currentNode.kind !== 'choice') return null;
        return (
          <AdvSceneLayout
            background={currentNode.background}
            character={currentNode.character}
            expression={currentNode.expression}
            speakerName={currentNode.speakerName}
            text={currentNode.text} // ← 質問文はここに表示
            choiceOptions={currentNode.options.map((opt) => ({
              id: opt.id,
              label: opt.label,
            }))}
            onSelectChoice={(optionId) =>
              dispatch({ type: 'click_choice', optionId })
            }
          />
        );

      // 他の subState はいったん既存のままでもOK
      case 'FREE_INPUT_EDITING':
        if (currentNode.kind !== 'input') return null;
        return (
          <AdvSceneLayout
            background={currentNode.background}
            character={currentNode.character}
            expression={currentNode.expression}
            speakerName={currentNode.speakerName}
            text={currentNode.promptText} // ← セリフとして質問文
          >
            <FreeInputPopup
              prompt={currentNode.promptText}
              defaultValue={state.userName} // デフォ名を入れておいても良い
              onSubmit={(value: string) =>
                dispatch({ type: 'submit_free_input', text: value })
              }
            />
          </AdvSceneLayout>
        );

      // ... FREE_INPUT_WAIT_AI / LEARNING_* / ANSWER_REVIEW は今のまま流用

      default:
        return null;
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100 relative">
      <button
        onClick={() => dispatch({ type: 'click_menu_open' })}
        className="absolute top-4 right-4 bg-gray-700 text-white px-3 py-2 rounded"
      >
        MENU
      </button>

      <div className="w-[800px] h-[600px] bg-white shadow-lg p-6 relative overflow-hidden">
        {renderContent()}
      </div>
    </div>
  );
}
