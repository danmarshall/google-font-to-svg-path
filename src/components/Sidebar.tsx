import React, { useMemo } from 'react';
// @ts-ignore
import makerjs from 'makerjs';
import * as opentype from 'opentype.js';
import { ExternalLink } from 'lucide-react';

interface SidebarProps {
  state: any;
  setState: (updater: (prev: any) => any) => void;
}

export default function Sidebar({ state, setState }: SidebarProps) {
  const {
    fontList,
    customFont,
    fontFamily,
    fontVariant,
    text,
    size,
    lineHeight,
    letterSpacing,
    union,
    kerning,
    filled,
    separate,
    bezierAccuracy,
    dxfUnits,
    fill,
    stroke,
    strokeWidth,
    strokeNonScaling,
    fillRule,
  } = state;

  const fontVariants = fontList && fontFamily
    ? fontList.items.find((f: any) => f.family === fontFamily)?.variants || []
    : [];

  const fontOptions = useMemo(() => {
    if (!fontList) return <option>Loading fonts...</option>;
    return fontList.items.map((font: any) => (
      <option key={font.family} value={font.family}>
        {font.family}
      </option>
    ));
  }, [fontList]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) {
      setState(prev => ({ ...prev, customFont: undefined }));
    } else {
      const buffer = await files[0].arrayBuffer();
      const font = opentype.parse(buffer);
      setState(prev => ({ ...prev, customFont: font }));
    }
  };

  const handleRemoveFont = () => {
    const fileInput = document.getElementById('font-upload') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
    setState(prev => ({ ...prev, customFont: undefined }));
  };

  return (
    <aside>
      <details open>
        <summary>Font Settings</summary>
        <div>
          <div className="label-with-link">
            <label>
              Google font:
            </label>
            <a
              href="https://fonts.google.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Browse fonts <ExternalLink size={14} />
            </a>
          </div>
          <select
            id="font-select"
            value={fontFamily}
            onChange={(e) => setState(prev => ({ ...prev, fontFamily: e.target.value }))}
            disabled={!!customFont}
          >
            {fontOptions}
          </select>

          <label>
            variant:
            <select
              id="font-variant"
              value={fontVariant}
              onChange={(e) => setState(prev => ({ ...prev, fontVariant: e.target.value }))}
              disabled={!!customFont}
            >
              {fontVariants.map((variant: string) => (
                <option key={variant} value={variant}>
                  {variant}
                </option>
              ))}
            </select>
          </label>

          <label>
            (optional) upload font:
            <input
              id="font-upload"
              type="file"
              onChange={handleFileUpload}
              accept=".ttf,.otf,.woff,.woff2"
            />
          </label>
          {customFont && <button onClick={handleRemoveFont}>Remove</button>}

        </div>
      </details>

      <details open>
        <summary>Text Settings</summary>
        <div>
          <label>
            text:
            <textarea
              id="input-text"
              rows={3}
              value={text}
              onChange={(e) => setState(prev => ({ ...prev, text: e.target.value }))}
            />
          </label>

          <label>
            size:
            <input
              type="number"
              id="input-size"
              value={size}
              onChange={(e) => setState(prev => ({ ...prev, size: Number(e.target.value) }))}
            />
          </label>

          <label>
            line height:
            <span title="when you have multiline text">ℹ️</span>:
            <input
              type="number"
              id="input-line-height"
              value={lineHeight}
              onChange={(e) => setState(prev => ({ ...prev, lineHeight: Number(e.target.value) }))}
              step="0.1"
              min="0.1"
            />
          </label>

          <label>
            letter spacing:
            <input
              type="range"
              id="input-letter-spacing"
              value={letterSpacing}
              onChange={(e) => setState(prev => ({ ...prev, letterSpacing: Number(e.target.value) }))}
              min="-50"
              max="100"
              step="1"
            />
            <input
              type="number"
              value={letterSpacing}
              onChange={(e) => {
                const value = Math.max(-50, Math.min(100, Number(e.target.value)));
                setState(prev => ({ ...prev, letterSpacing: value }));
              }}
              min="-50"
              max="100"
              style={{ marginLeft: '8px', width: '60px' }}
            />
          </label>

          <label>
            kerning:
            <input
              type="checkbox"
              id="input-kerning"
              checked={kerning}
              onChange={(e) => setState(prev => ({ ...prev, kerning: e.target.checked }))}
            />
          </label>

        </div>
      </details>

      <details open>
        <summary>Stroke</summary>
        <div>
          <label>
            Stroke color:
            <input
              type="color"
              id="input-stroke"
              value={stroke}
              onChange={(e) => setState(prev => ({ ...prev, stroke: e.target.value }))}
            />
            <input
              type="text"
              value={stroke}
              onChange={(e) => setState(prev => ({ ...prev, stroke: e.target.value }))}
              placeholder="#000000"
              style={{ marginLeft: '8px', width: '80px' }}
            />
          </label>

          <label>
            Stroke Width:
            <input
              type="text"
              id="input-stroke-width"
              value={strokeWidth}
              onChange={(e) => setState(prev => ({ ...prev, strokeWidth: e.target.value }))}
            />
          </label>

          <label>
            Non-scaling stroke:
            <input
              type="checkbox"
              id="input-stroke-non-scaling"
              checked={strokeNonScaling}
              onChange={(e) => setState(prev => ({ ...prev, strokeNonScaling: e.target.checked }))}
            />
          </label>
        </div>
      </details>

      <details open>
        <summary>Fill</summary>
        <div>
          <label>
            fill:
            <input
              type="checkbox"
              id="input-filled"
              checked={filled}
              onChange={(e) => setState(prev => ({ ...prev, filled: e.target.checked }))}
            />
          </label>

          <label>
            Fill color:
            <input
              type="color"
              id="input-fill"
              value={fill}
              onChange={(e) => setState(prev => ({ ...prev, fill: e.target.value }))}
            />
            <input
              type="text"
              value={fill}
              onChange={(e) => setState(prev => ({ ...prev, fill: e.target.value }))}
              placeholder="#000000"
              style={{ marginLeft: '8px', width: '80px' }}
            />
          </label>

          <label>
            Fill rule:
            <select
              id="input-fill-rule"
              value={fillRule}
              onChange={(e) => setState(prev => ({ ...prev, fillRule: e.target.value as 'evenodd' | 'nonzero' }))}
            >
              <option value="evenodd">evenodd</option>
              <option value="nonzero">nonzero</option>
            </select>
          </label>
        </div>
      </details>

      <details>
        <summary>Options</summary>
        <div>
          <label>
            union:
            <input
              type="checkbox"
              id="input-union"
              checked={union}
              onChange={(e) => setState(prev => ({ ...prev, union: e.target.checked }))}
            />
          </label>

          <label>
            separate characters:
            <input
              type="checkbox"
              id="input-separate"
              checked={separate}
              onChange={(e) => setState(prev => ({ ...prev, separate: e.target.checked }))}
            />
          </label>

          <label>
            bezier accuracy
            <span title="0.5 = accurate to half a pixel &#013;.001 = accurate to 1/1000th of a pixel &#013;smaller numbers take longer to compute &#013;leave blank for auto">ℹ️</span>:
            <input
              type="text"
              id="input-bezier-accuracy"
              placeholder="auto"
              value={bezierAccuracy}
              onChange={(e) => setState(prev => ({ ...prev, bezierAccuracy: e.target.value }))}
            />
          </label>

          <label>
            Dxf Units:
            <select
              id="dxf-units"
              value={dxfUnits}
              onChange={(e) => setState(prev => ({ ...prev, dxfUnits: e.target.value }))}
            >
              <option value="">Select units...</option>
              {Object.values(makerjs.unitType).map((unit: any) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </label>
        </div>
      </details>

    </aside >
  );
}
