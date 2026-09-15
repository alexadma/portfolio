import React, { useState, useEffect } from 'react';

function Intro({ onComplete }) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const texts = ['Hello', 'Welcome To', 'My Portofolio'];

  useEffect(() => {
    const currentFullText = texts[currentTextIndex];
    let timeout;

    if (!isDeleting && displayText === currentFullText) {
      if (currentTextIndex === texts.length - 1) {
        timeout = setTimeout(() => onComplete(), 1500);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 1000);
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
  }, [displayText, isDeleting, currentTextIndex, onComplete]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@800&display=swap');

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        @keyframes introFadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .intro-overlay {
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: #0a0a0a;
          z-index: 9999;
          padding: 1rem;
          overflow: hidden;
        }

        .intro-text-wrap {
          display: flex;
          align-items: center;
          flex-wrap: nowrap;
          max-width: 100%;
          animation: introFadeIn 0.5s ease both;
        }

        .intro-text {
          font-size: clamp(2rem, 8vw, 6rem);
          font-weight: 800;
          color: #e8e8e8;
          font-family: 'Syne', sans-serif;
          letter-spacing: -0.04em;
          white-space: nowrap;
          line-height: 1.1;
        }

        .intro-hash {
          color: #c8f04a;
        }

        .intro-cursor {
          display: inline-block;
          width: clamp(2px, 0.6vw, 4px);
          height: clamp(2rem, 8vw, 6rem);
          background-color: #c8f04a;
          margin-left: clamp(6px, 1vw, 12px);
          flex-shrink: 0;
          animation: blink 1s infinite;
          border-radius: 1px;
        }

        .intro-sub {
          font-family: 'Syne', sans-serif;
          font-size: clamp(0.65rem, 2.5vw, 0.85rem);
          color: #555;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          margin-top: clamp(0.75rem, 2vw, 1.25rem);
          animation: introFadeIn 0.5s ease 0.2s both;
        }

        /* Very small screens */
        @media (max-width: 360px) {
          .intro-text {
            font-size: 1.75rem;
          }
          .intro-cursor {
            height: 1.75rem;
          }
        }
      `}</style>

      <div className="intro-overlay">
        <div className="intro-text-wrap">
          <span className="intro-text">
            <span className="intro-hash">#</span>
            {displayText}
          </span>
          <span className="intro-cursor" />
        </div>
        <p className="intro-sub">Alexander Adma Karyadi</p>
      </div>
    </>
  );
}

export default Intro;