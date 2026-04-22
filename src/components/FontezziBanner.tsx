import React from 'react';

export default function FontezziBanner() {
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #f88028, #dc3e78)',
        color: '#fff',
        padding: '10px 20px',
        textAlign: 'center',
        fontSize: '14px',
        lineHeight: '1.4',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        width: '100%',
        boxSizing: 'border-box',
        order: -1,
      }}
    >
      <span style={{ marginRight: '6px' }}>✨</span>
      This tool has evolved into{' '}
      <a
        href="https://fontezzi.com/editor?ref=oss"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: '#fff',
          fontWeight: 700,
          textDecoration: 'underline',
          textUnderlineOffset: '2px',
        }}
      >
        Fontezzi
      </a>{' '}
      — everything here is free there too, plus shadows, layers, effects &amp; more.{' '}
      <a
        href="https://fontezzi.com/editor?ref=oss"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-block',
          marginLeft: '8px',
          background: '#fff',
          color: '#dc3e78',
          fontWeight: 700,
          padding: '4px 14px',
          borderRadius: '6px',
          textDecoration: 'none',
          fontSize: '14px',
        }}
      >
        Try Fontezzi free →
      </a>
    </div>
  );
}
