import React, { useState, useEffect } from 'react';

function Intro({ onComplete }) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const texts = ['Hello', 'welcome', 'about me'];

  useEffect(() => {
    const currentFullText = texts[currentTextIndex];
    let timeout;

    if (!isDeleting && displayText === currentFullText) {
      if (currentTextIndex === texts.length - 1) {
        timeout = setTimeout(() => {
          onComplete();
        }, 1500);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 1000);
      }
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setCurrentTextIndex((prev) => (prev + 1) % texts.length);
    } else {
      timeout = setTimeout(() => {
        setDisplayText(prev =>
          isDeleting
            ? prev.slice(0, -1)
            : currentFullText.slice(0, prev.length + 1)
        );
      }, isDeleting ? 50 : 100);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentTextIndex, texts, onComplete]);

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0,
      width: '100%', height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#0a0a0a',
      zIndex: 9999
    }}>
      <div style={{
        fontSize: 'clamp(3rem, 10vw, 6rem)',
        fontWeight: '800',
        color: '#e8e8e8',
        fontFamily: "'Syne', sans-serif",
        display: 'flex',
        alignItems: 'center',
        letterSpacing: '-0.04em'
      }}>
        <span style={{ color: '#c8f04a' }}>#</span>
        {displayText}
        <span style={{
          display: 'inline-block',
          width: '4px',
          height: 'clamp(3rem, 10vw, 6rem)',
          backgroundColor: '#c8f04a',
          marginLeft: '10px',
          animation: 'blink 1s infinite'
        }} />
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@800&display=swap');
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}

export default Intro;