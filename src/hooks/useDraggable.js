import { useEffect } from 'react';

/**
 * React hook that makes an element draggable.
 * @param {Object} options - configuration object
 * @param {Object} options.element - ref to element that will move
 * @param {Object} [options.onElement] - ref to element which listens for pointer events
 * @param {boolean} [options.isDrag=true] - whether dragging is enabled
 * @param {Function} [options.onDrag] - callback on drag
 * @param {boolean} [options.limitX=false] - limit dragging on X axis
 * @param {boolean} [options.limitY=false] - limit dragging on Y axis
 * @param {Function} [options.onRelease] - callback on release
 */
export default function useDraggable({
  element,
  onElement = null,
  isDrag = true,
  onDrag = null,
  limitX = false,
  limitY = false,
  onRelease = null,
}) {
  useEffect(() => {
    const el = element?.current;
    const handle = (onElement || element)?.current;
    if (!el || !handle) return;

    el.setAttribute('isDraggable', String(isDrag));
    let isMouseDown = false;
    let mouseX = 0;
    let mouseY = 0;
    let elementX = 0;
    let elementY = 0;

    const onMouseMove = (event) => {
      if (!isMouseDown || el.getAttribute('isDraggable') === 'false') return;
      const deltaX = event.clientX - mouseX;
      const deltaY = event.clientY - mouseY;
      if (!limitX) el.style.left = elementX + deltaX + 'px';
      if (!limitY) el.style.top = elementY + deltaY + 'px';
      if (onDrag) onDrag({ deltaX, deltaY, x: elementX + deltaX, y: elementY + deltaY, mouseX, mouseY });
    };

    const onMouseDown = (event) => {
      if (el.getAttribute('isDraggable') === 'false') return;
      mouseX = event.clientX;
      mouseY = event.clientY;
      isMouseDown = true;
    };

    const onMouseUp = () => {
      if (el.getAttribute('isDraggable') === 'false') return;
      isMouseDown = false;
      elementX = parseInt(el.style.left) || 0;
      elementY = parseInt(el.style.top) || 0;
      if (onRelease) onRelease({ x: elementX, y: elementY });
    };

    handle.addEventListener('pointerdown', onMouseDown);
    document.addEventListener('pointerup', onMouseUp);
    document.addEventListener('pointermove', onMouseMove);

    return () => {
      handle.removeEventListener('pointerdown', onMouseDown);
      document.removeEventListener('pointerup', onMouseUp);
      document.removeEventListener('pointermove', onMouseMove);
    };
  }, [element, onElement, isDrag, onDrag, limitX, limitY, onRelease]);
}
