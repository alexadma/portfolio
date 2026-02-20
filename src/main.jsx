import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Intro from './intro'

function Main() {
  const [showIntro, setShowIntro] = useState(true);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  return (
    <React.StrictMode>
      {showIntro ? (
        <Intro onComplete={handleIntroComplete} />
      ) : (
        <App />
      )}
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <Main />
);