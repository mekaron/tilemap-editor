import React, { useEffect, useRef } from 'react';
import { GoldenLayout } from 'golden-layout';

/**
 * Wrapper component that instantiates GoldenLayout inside a React component.
 * The layout is created when the component mounts.
 */
export default function GoldenLayoutWrapper({ config }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const gl = new GoldenLayout(containerRef.current);
    if (config) {
      gl.loadLayout(config);
    }
    return () => {
      try {
        gl.destroy();
      } catch (e) {
        // ignore
      }
    };
  }, [config]);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
}
