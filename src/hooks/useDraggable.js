import { useState, useEffect, useCallback } from 'react';

export default function useDraggable(handleRef) {
  const [isDragging, setIsDragging] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);
  const [dropTarget, setDropTarget] = useState(null);

  const onPointerDown = useCallback((e) => {
    if (e.target.closest('[tile-layer],[vis-layer],[lock-layer],[rename-layer],[trash-layer]')) {
      return;
    }
    e.preventDefault();
    setIsDragging(true);
    setDraggedItem(e.target.closest('.layer'));
  }, []);

  const onPointerMove = useCallback((e) => {
    if (!isDragging) return;
    e.preventDefault();

    const targetElement = document.elementFromPoint(e.clientX, e.clientY);
    const targetLayer = targetElement ? targetElement.closest('.layer') : null;

    document.querySelectorAll('.layer').forEach(layer => {
      if (layer !== targetLayer) {
        layer.classList.remove('drop-target');
      }
    });

    if (targetLayer && targetLayer !== draggedItem) {
      targetLayer.classList.add('drop-target');
      setDropTarget(targetLayer);
    } else {
      setDropTarget(null);
    }
  }, [isDragging, draggedItem]);

  const onPointerUp = useCallback((e) => {
    if (!isDragging) return;
    e.preventDefault();
    setIsDragging(false);
    if (draggedItem) {
      draggedItem.classList.remove('dragging');
    }
    if (dropTarget) {
      dropTarget.classList.remove('drop-target');
    }
  }, [isDragging, draggedItem, dropTarget]);

  useEffect(() => {
    const handle = handleRef.current;
    if (handle) {
      handle.addEventListener('pointerdown', onPointerDown);
      document.addEventListener('pointermove', onPointerMove);
      document.addEventListener('pointerup', onPointerUp);
    }

    return () => {
      if (handle) {
        handle.removeEventListener('pointerdown', onPointerDown);
      }
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerup', onPointerUp);
    };
  }, [handleRef, onPointerDown, onPointerMove, onPointerUp]);

  return { isDragging, draggedItem, dropTarget };
}