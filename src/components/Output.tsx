import React, { useState } from 'react';

interface OutputProps {
  state: any;
}

export default function Output({ state }: OutputProps) {
  const { svgOutput, dxfOutput, errorMessage, text } = state;
  const [copyButtonText, setCopyButtonText] = useState('copy to clipboard');

  const copyToClipboard = () => {
    const textarea = document.getElementById('output-svg') as HTMLTextAreaElement;
    if (textarea) {
      textarea.select();
      document.execCommand('copy');
      setCopyButtonText('copied');
      setTimeout(() => {
        setCopyButtonText('copy to clipboard');
      }, 2000);
    }
  };

  const downloadSvg = () => {
    const a = document.createElement('a');
    a.href = 'data:image/svg+xml;base64,' + window.btoa(svgOutput);
    a.download = `${text}.svg`;
    a.click();
  };

  const downloadDxf = () => {
    const a = document.createElement('a');
    a.href = 'data:application/dxf;base64,' + window.btoa(dxfOutput);
    a.download = `${text}.dxf`;
    a.click();
  };

  const createLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      const btn = document.getElementById('create-link');
      if (btn) {
        btn.textContent = 'copied';
        setTimeout(() => {
          btn.textContent = 'Create link';
        }, 2000);
      }
    });
  };

  return (
    <main>
      <section>
        {errorMessage && (
          <div id="error-display" style={{ color: 'red', padding: '10px' }}>
            {errorMessage}
          </div>
        )}
        <div 
          id="svg-render" 
          dangerouslySetInnerHTML={{ __html: svgOutput }}
          style={{ marginBottom: '20px' }}
        />
      </section>

      <section>
        <h2>SVG Output</h2>
        <div className="textarea-container">
          <textarea 
            id="output-svg" 
            readOnly
            value={svgOutput}
            style={{ width: '100%', minHeight: '200px', fontFamily: 'monospace' }}
          />
          <div className="buttons-container">
            <button className="btn" onClick={copyToClipboard}>
              {copyButtonText}
            </button>
            <button className="btn" onClick={downloadSvg}>
              Download Svg
            </button>
            <button id="create-link" className="btn" onClick={createLink}>
              Create link
            </button>
            <button className="btn" onClick={downloadDxf}>
              Download Dxf
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
