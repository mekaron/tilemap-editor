import React, { useContext } from 'react';
import EditorContext from '../context/EditorContext';

export default function ToolButtons() {
  const { editorState, setEditorState } = useContext(EditorContext);
  const { activeTool } = editorState;

  const handleToolChange = (e) => {
    setEditorState({ ...editorState, activeTool: Number(e.target.value) });
  };

  return (
    <div id="toolButtonsWrapper" className="tool_wrapper">
      <input id="tool0" type="radio" value="0" name="tool" checked={activeTool === 0} onChange={handleToolChange} className="hidden" />
      <label htmlFor="tool0" title="paint tiles" data-value="0" className="menu">
        <div id="flipBrushIndicator">🖌️</div>
        <div className="dropdown">
          <div className="item nohover">Brush tool options</div>
          <div className="item">
            <label htmlFor="toggleFlipX" className="">Flip tile on x</label>
            <input type="checkbox" id="toggleFlipX" style={{ display: 'none' }} />
            <label className="toggleFlipX"></label>
          </div>
        </div>
      </label>
      <input id="tool1" type="radio" value="1" name="tool" checked={activeTool === 1} onChange={handleToolChange} className="hidden" />
      <label htmlFor="tool1" title="erase tiles" data-value="1">🗑️</label>
      <input id="tool2" type="radio" value="2" name="tool" checked={activeTool === 2} onChange={handleToolChange} className="hidden" />
      <label htmlFor="tool2" title="pan" data-value="2">✋</label>
      <input id="tool3" type="radio" value="3" name="tool" checked={activeTool === 3} onChange={handleToolChange} className="hidden" />
      <label htmlFor="tool3" title="pick tile" data-value="3">🎨</label>
      <input id="tool4" type="radio" value="4" name="tool" checked={activeTool === 4} onChange={handleToolChange} className="hidden" />
      <label htmlFor="tool4" title="random from selected" data-value="4">🎲</label>
      <input id="tool5" type="radio" value="5" name="tool" checked={activeTool === 5} onChange={handleToolChange} className="hidden" />
      <label htmlFor="tool5" title="fill on layer" data-value="5">🌈</label>
    </div>
  );
}
