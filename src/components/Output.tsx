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

      <section
        style={{
          marginTop: '40px',
          padding: '24px',
          background: '#faf5ff',
          borderRadius: '12px',
          border: '1px solid #e9d5ff',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          lineHeight: '1.6',
        }}
      >
        <h3 style={{ margin: '0 0 8px', fontSize: '18px', fontWeight: 700, color: '#1a1a2e' }}>
          This tool has a new home.
        </h3>
        <p style={{ margin: '0 0 12px', color: '#4a4a6a', fontSize: '15px' }}>
          Everything you can do here is 100% free on{' '}
          <a
            href="https://fontezzi.com/editor?ref=oss-footer"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#dc3e78', fontWeight: 600 }}
          >
            Fontezzi
          </a>{' '}
          — same fonts, same SVG output, same downloads. Plus you get shadows, outlines, layers, and more. Pro users also get batch automation and React export. You lose nothing.
        </p>
        <a
          href="https://fontezzi.com/editor?ref=oss-footer"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, #f88028, #dc3e78)',
            color: '#fff',
            fontWeight: 700,
            padding: '8px 20px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '15px',
          }}
        >
          Try Fontezzi free →
        </a>
      </section>
    </main>
  );
}
