import React from 'react';

export default function LayerSettings({
  layerName = '',
  opacity = 1,
  onOpacityChange = () => {},
  onRename = () => {},
  onDelete = () => {},
}) {
  const handleChange = (e) => {
    onOpacityChange(Number(e.target.value));
  };

  return (
    <div className="layer-settings-container">
      <div className="layer-settings-header">
        <h5 id="activeLayerName">{layerName}</h5>
        <button className="rename-layer" title="Rename layer" onClick={onRename}>
          Rename
        </button>
        <button className="delete-layer" title="Delete layer" onClick={onDelete}>
          Delete
        </button>
      </div>
      <div className="slider-wrapper">
        <label htmlFor="layerOpacitySlider">Opacity</label>
        <input
          type="range"
          min="0"
          max="1"
          value={opacity}
          id="layerOpacitySlider"
          step="0.01"
          onChange={handleChange}
        />
        <output htmlFor="layerOpacitySlider" id="layerOpacitySliderValue">
          {opacity}
        </output>
      </div>
    </div>
  );
}
