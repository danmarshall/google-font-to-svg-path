// @ts-ignore
import makerjs from 'makerjs';
import * as opentype from 'opentype.js';

const apiKey = 'AIzaSyAOES8EmKhuJEnsn9kS1XKBpxxp-TgN8Jc';

export async function loadGoogleFonts() {
  const res = await fetch(`https://www.googleapis.com/webfonts/v1/webfonts?key=${apiKey}`);
  return res.json();
}

export async function renderSvg(state: any) {
  try {
    const { fontList, fontFamily, fontVariant, customFont, text, size, lineHeight, letterSpacing, union, filled, kerning, separate, bezierAccuracy, dxfUnits, fill, stroke, strokeWidth, strokeNonScaling, fillRule } = state;

    let font: any;

    if (customFont) {
      font = customFont;
    } else {
      const fontItem = fontList.items.find((f: any) => f.family === fontFamily);
      if (!fontItem) return { errorMessage: 'Font not found' };

      const url = fontItem.files[fontVariant]?.replace('http:', 'https:');
      if (!url) return { errorMessage: 'Font variant not found' };

      font = await new Promise((resolve, reject) => {
        opentype.load(url, (err: any, loadedFont: any) => {
          if (err) reject(err);
          else resolve(loadedFont);
        });
      });
    }

    const lines = text.split('\n');
    const containerModel: any = { models: {} };

    lines.forEach((line: string, lineIndex: number) => {
      if (line.length === 0) return;

      const accuracy = parseFloat(bezierAccuracy) || undefined;
      const lineModel = new makerjs.models.Text(font, line, size, union, false, accuracy, { kerning });
      const yOffset = -lineIndex * size * lineHeight;

      // Apply letter spacing by adjusting each character's origin
      if (letterSpacing !== 0) {
        let charIndex = 0;
        for (const charKey in lineModel.models) {
          const charModel = lineModel.models[charKey];
          if (charIndex > 0) {
            makerjs.model.move(charModel, [charIndex * letterSpacing, 0]);
          }
          charIndex++;
        }
      }

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

    return {
      svgOutput: svg,
      dxfOutput: dxf,
      errorMessage: '',
    };
  } catch (err: any) {
    return {
      errorMessage: err.toString(),
    };
  }
}
