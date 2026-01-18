import React, { useMemo } from 'react';
// @ts-ignore
import makerjs from 'makerjs';
import * as opentype from 'opentype.js';

interface SidebarProps {
  state: any;
  setState: (updater: (prev: any) => any) => void;
}

export default function Sidebar({ state, setState }: SidebarProps) {
  const {
    fontList,
    fontFamily,
    fontVariant,
    text,
    size,
    lineHeight,
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
          <label>
            Google font: 
            <select 
              id="font-select" 
              className="input"
              value={fontFamily}
              onChange={(e) => setState(prev => ({ ...prev, fontFamily: e.target.value }))}
            >
              {fontOptions}
            </select>
          </label>

          <label>
            (optional) upload font: 
            <input 
              id="font-upload" 
              type="file" 
              className="input"
              onChange={handleFileUpload}
              accept=".ttf,.otf,.woff,.woff2"
            />
          </label>
          <button onClick={handleRemoveFont} className="input">Remove</button>

          <label>
            variant: 
            <select 
              id="font-variant" 
              className="input"
              value={fontVariant}
              onChange={(e) => setState(prev => ({ ...prev, fontVariant: e.target.value }))}
            >
              {fontVariants.map((variant: string) => (
                <option key={variant} value={variant}>
                  {variant}
                </option>
              ))}
            </select>
          </label>
        </div>
      </details>

      <details open>
        <summary>Text Settings</summary>
        <div>
          <label>
            text: 
            <textarea 
              id="input-text" 
              className="input-text input" 
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
              className="input-size input" 
            />
          </label>

          <label>
            line height: 
            <input 
              type="number" 
              id="input-line-height" 
              value={lineHeight}
              onChange={(e) => setState(prev => ({ ...prev, lineHeight: Number(e.target.value) }))}
              step="0.1" 
              min="0.1" 
              className="input" 
            />
          </label>
        </div>
      </details>

      <details open>
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
            kerning: 
            <input 
              type="checkbox" 
              id="input-kerning"
              checked={kerning}
              onChange={(e) => setState(prev => ({ ...prev, kerning: e.target.checked }))}
            />
          </label>

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
              className="input"
              value={bezierAccuracy}
              onChange={(e) => setState(prev => ({ ...prev, bezierAccuracy: e.target.value }))}
            />
          </label>

          <label>
            Dxf Units: 
            <select 
              id="dxf-units" 
              className="input"
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

      <details open>
        <summary>Styling</summary>
        <div>
          <label>
            Fill: 
            <input 
              type="color" 
              id="input-fill" 
              value={fill}
              onChange={(e) => setState(prev => ({ ...prev, fill: e.target.value }))}
              className="input-fill input" 
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
            Stroke: 
            <input 
              type="color" 
              id="input-stroke" 
              value={stroke}
              onChange={(e) => setState(prev => ({ ...prev, stroke: e.target.value }))}
              className="input-stroke input" 
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
              className="input-stroke-width input"
            />
          </label>

          <label>
            Non-scaling stroke: 
            <input 
              type="checkbox" 
              id="input-stroke-non-scaling"
              checked={strokeNonScaling}
              onChange={(e) => setState(prev => ({ ...prev, strokeNonScaling: e.target.checked }))}
              className="input-stroke-non-scaling input"
            />
          </label>

          <label>
            Fill rule: 
            <select 
              id="input-fill-rule" 
              className="input"
              value={fillRule}
              onChange={(e) => setState(prev => ({ ...prev, fillRule: e.target.value as 'evenodd' | 'nonzero' }))}
            >
              <option value="evenodd">evenodd</option>
              <option value="nonzero">nonzero</option>
            </select>
          </label>
        </div>
      </details>
    </aside>
  );
}
