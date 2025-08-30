import React, { useContext } from 'react';
import EditorContext from '../context/EditorContext';

export default function LayerSettings() {
  const { editorState, setEditorState } = useContext(EditorContext);
  const { maps, activeMap, activeLayer } = editorState;

  const layer = maps[activeMap]?.layers[activeLayer];

  if (!layer) {
    return null;
  }

  const handleOpacityChange = (e) => {
    const newOpacity = Number(e.target.value);
    const newMaps = { ...maps };
    newMaps[activeMap].layers[activeLayer].opacity = newOpacity;
    setEditorState({ ...editorState, maps: newMaps });
  };

  const handleRename = () => {
    const newName = prompt('Enter new layer name', layer.name);
    if (newName) {
      const newMaps = { ...maps };
      newMaps[activeMap].layers[activeLayer].name = newName;
      setEditorState({ ...editorState, maps: newMaps });
    }
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this layer?')) {
      const newMaps = { ...maps };
      newMaps[activeMap].layers.splice(activeLayer, 1);
      setEditorState({ ...editorState, maps: newMaps, activeLayer: 0 });
    }
  };

  return (
    <div className="layer-settings-container">
      <div className="layer-settings-header">
        <h5 id="activeLayerName">{layer.name}</h5>
        <button className="rename-layer" title="Rename layer" onClick={handleRename}>
          Rename
        </button>
        <button className="delete-layer" title="Delete layer" onClick={handleDelete}>
          Delete
        </button>
      </div>
      <div className="slider-wrapper">
        <label htmlFor="layerOpacitySlider">Opacity</label>
        <input
          type="range"
          min="0"
          max="1"
          value={layer.opacity}
          id="layerOpacitySlider"
          step="0.01"
          onChange={handleOpacityChange}
        />
        <output htmlFor="layerOpacitySlider" id="layerOpacitySliderValue">
          {layer.opacity}
        </output>
      </div>
    </div>
  );
}
