import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Output from './Output';
import { loadGoogleFonts, renderSvg } from '../lib/fontUtils';

export default function App() {
  const [state, setState] = useState({
    fontList: null as any,
    fontFamily: 'ABeeZee',
    fontVariant: 'regular',
    customFont: undefined as any,
    text: 'Verb',
    size: 100,
    lineHeight: 1.2,
    union: false,
    kerning: true,
    filled: false,
    separate: false,
    bezierAccuracy: '',
    dxfUnits: '',
    fill: '#000000',
    stroke: '#000000',
    strokeWidth: '0.25mm',
    strokeNonScaling: true,
    fillRule: 'evenodd' as 'evenodd' | 'nonzero',
    svgOutput: '',
    dxfOutput: '',
    errorMessage: '',
  });

  useEffect(() => {
    loadGoogleFonts().then(data => {
      setState(prev => ({ ...prev, fontList: data }));
    });
  }, []);

  useEffect(() => {
    if (state.fontList && state.fontFamily && state.fontVariant) {
      renderSvg(state).then(result => {
        setState(prev => ({ ...prev, ...result }));
      });
    }
  }, [
    state.fontList,
    state.fontFamily,
    state.fontVariant,
    state.customFont,
    state.text,
    state.size,
    state.lineHeight,
    state.union,
    state.filled,
    state.kerning,
    state.separate,
    state.bezierAccuracy,
    state.dxfUnits,
    state.fill,
    state.stroke,
    state.strokeWidth,
    state.strokeNonScaling,
    state.fillRule,
  ]);

  return (
    <>
      <Sidebar state={state} setState={setState} />
      <Output state={state} />
    </>
  );
}
