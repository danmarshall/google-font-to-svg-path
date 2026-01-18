import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Output from './Output';
import { loadGoogleFonts, renderSvg } from '../lib/fontUtils';
import { defaultState } from '../store/appStore';

export default function App() {
  const [state, setState] = useState(defaultState);

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
