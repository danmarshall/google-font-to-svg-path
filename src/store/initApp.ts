import { appStore } from './appStore';
// @ts-ignore
import makerjs from 'makerjs';
import * as opentype from 'opentype.js';

type FillRule = 'nonzero' | 'evenodd';

let isInitialized = false;
let lastRenderState = '';

export function initApp() {
  if (isInitialized) return;
  isInitialized = true;
  
  // Subscribe to state changes and render
  appStore.subscribe(() => {
    const state = appStore.getState();
    if (state.fontList && state.fontFamily && state.fontVariant) {
      // Create a signature of render-relevant state
      const renderSignature = JSON.stringify({
        fontFamily: state.fontFamily,
        fontVariant: state.fontVariant,
        text: state.text,
        size: state.size,
        lineHeight: state.lineHeight,
        union: state.union,
        filled: state.filled,
        kerning: state.kerning,
        separate: state.separate,
        bezierAccuracy: state.bezierAccuracy,
        dxfUnits: state.dxfUnits,
        fill: state.fill,
        stroke: state.stroke,
        strokeWidth: state.strokeWidth,
        strokeNonScaling: state.strokeNonScaling,
        fillRule: state.fillRule,
        customFont: !!state.customFont,
      });
      
      // Only render if something relevant changed
      if (renderSignature !== lastRenderState) {
        lastRenderState = renderSignature;
        renderSvg();
      }
    }
  });

  // Load Google Fonts
  const apiKey = 'AIzaSyAOES8EmKhuJEnsn9kS1XKBpxxp-TgN8Jc';
  fetch(`https://www.googleapis.com/webfonts/v1/webfonts?key=${apiKey}`)
    .then(res => res.json())
    .then(data => {
      appStore.setState({ fontList: data });
      
      // Read query params after fonts are loaded
      const urlSearchParams = new URLSearchParams(window.location.search);
      const params: any = {};
      
      const selectFamily = urlSearchParams.get('font-select');
      const selectVariant = urlSearchParams.get('font-variant');
      const unionParam = urlSearchParams.get('input-union');
      const filledParam = urlSearchParams.get('input-filled');
      const kerningParam = urlSearchParams.get('input-kerning');
      const separateParam = urlSearchParams.get('input-separate');
      const textParam = urlSearchParams.get('input-text');
      const bezierParam = urlSearchParams.get('input-bezier-accuracy');
      const unitsParam = urlSearchParams.get('dxf-units');
      const sizeParam = urlSearchParams.get('input-size');
      const lineHeightParam = urlSearchParams.get('input-line-height');
      const fillParam = urlSearchParams.get('input-fill');
      const strokeParam = urlSearchParams.get('input-stroke');
      const strokeWidthParam = urlSearchParams.get('input-stroke-width');
      const strokeNonScalingParam = urlSearchParams.get('input-stroke-non-scaling');
      const fillRuleParam = urlSearchParams.get('input-fill-rule');

      if (selectFamily) params.fontFamily = selectFamily;
      if (selectVariant) params.fontVariant = selectVariant;
      if (unitsParam) params.dxfUnits = unitsParam;
      if (unionParam !== null) params.union = unionParam === 'true';
      if (filledParam !== null) params.filled = filledParam === 'true';
      if (kerningParam !== null) params.kerning = kerningParam === 'true';
      if (separateParam !== null) params.separate = separateParam === 'true';
      if (textParam) params.text = textParam;
      if (bezierParam) params.bezierAccuracy = bezierParam;
      if (sizeParam) params.size = Number(sizeParam);
      if (lineHeightParam) params.lineHeight = Number(lineHeightParam);
      if (fillParam) params.fill = fillParam;
      if (strokeParam) params.stroke = strokeParam;
      if (strokeWidthParam) params.strokeWidth = strokeWidthParam;
      if (strokeNonScalingParam !== null) params.strokeNonScaling = strokeNonScalingParam === 'true';
      if (fillRuleParam) params.fillRule = fillRuleParam as FillRule;

      // Set default font if no query params
      if (!selectFamily && data.items.length > 0) {
        params.fontFamily = data.items[0].family;
        params.fontVariant = data.items[0].variants[0];
      }

      console.log('Setting initial params:', params);
      if (Object.keys(params).length > 0) {
        appStore.setState(params);
      }
      console.log('Init complete, state:', appStore.getState());
    })
    .catch(err => {
      console.error('Error loading fonts:', err);
      appStore.setState({ errorMessage: err.toString() });
    });
}

function renderSvg() {
  const state = appStore.getState();
  const { fontList, customFont, fontFamily, fontVariant, text, size, lineHeight, union, filled, kerning, separate, bezierAccuracy, dxfUnits, fill, stroke, strokeWidth, strokeNonScaling, fillRule } = state;

  if (!fontList) return;

  const fontIndex = fontList.items.findIndex((f: any) => f.family === fontFamily);
  if (fontIndex === -1) return;

  const font = fontList.items[fontIndex];
  const variantIndex = font.variants.indexOf(fontVariant);
  if (variantIndex === -1) return;

  if (customFont) {
    callMakerjs(customFont);
  } else {
    const url = font.files[fontVariant].replace('http:', 'https:');
    opentype.load(url, (err: any, loadedFont: any) => {
      if (err) {
        appStore.setState({ errorMessage: err.toString() });
      } else {
        callMakerjs(loadedFont);
      }
    });
  }
}

function callMakerjs(font: any) {
  try {
    const state = appStore.getState();
    const { text, size, lineHeight, union, filled, kerning, separate, bezierAccuracy, dxfUnits, fill, stroke, strokeWidth, strokeNonScaling, fillRule } = state;
    
    appStore.setState({ errorMessage: '' });
    
    const lines = text.split('\n');
    const containerModel: any = { models: {} };
    
    lines.forEach((line, lineIndex) => {
      if (line.length === 0) return;
      
      const accuracy = parseFloat(bezierAccuracy) || undefined;
      const lineModel = new makerjs.models.Text(font, line, size, union, false, accuracy, { kerning });
      const yOffset = -lineIndex * size * lineHeight;
      
      makerjs.model.move(lineModel, [0, yOffset]);
      containerModel.models[`line_${lineIndex}`] = lineModel;
    });
    
    if (separate) {
      let charIndex = 0;
      for (const lineKey in containerModel.models) {
        const lineModel = containerModel.models[lineKey];
        for (const charKey in lineModel.models) {
          lineModel.models[charKey].layer = String(charIndex);
          charIndex++;
        }
      }
    }

    const svg = makerjs.exporter.toSVG(containerModel, {
      fill: filled ? fill : undefined,
      stroke: stroke ? stroke : undefined,
      strokeWidth: strokeWidth ? strokeWidth : undefined,
      fillRule: fillRule ? fillRule : undefined,
      scalingStroke: !strokeNonScaling,
    });
    
    const dxf = makerjs.exporter.toDXF(containerModel, { 
      units: dxfUnits, 
      usePOLYLINE: true 
    });

    appStore.setState({
      svgOutput: svg,
      dxfOutput: dxf,
    });
  } catch (err: any) {
    appStore.setState({ errorMessage: err.toString() });
  }
}
