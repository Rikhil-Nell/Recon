import fs from 'fs';
import path from 'path';

const htmlFilePath = './index.html';
const reactAppDir = './recon-app/src';

let html = fs.readFileSync(htmlFilePath, 'utf-8');

// 1. Extract CSS
const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/);
if (styleMatch) {
    fs.writeFileSync(path.join(reactAppDir, 'index.css'), styleMatch[1].trim());
}

// 2. Extract Body Content
let bodyMatch = html.match(/<body>([\s\S]*?)<\/body>/);
if (!bodyMatch) process.exit(1);
let bodyContent = bodyMatch[1];

// Strip out existing vanilla scripts
bodyContent = bodyContent.replace(/<script>[\s\S]*?<\/script>/g, '');

// Strip HTML comments
bodyContent = bodyContent.replace(/<!--[\s\S]*?-->/g, '');


const toJSX = (str) => {
    // void tags fix
    str = str.replace(/<(img|hr|br|rect|circle|path|line|polyline|input)([^>]*)((?!\/)>)/g, '<$1$2 />');
    
    // Attributes
    str = str.replace(/class="/g, 'className="');
    str = str.replace(/stroke-width="/g, 'strokeWidth="');
    str = str.replace(/stroke-linecap="/g, 'strokeLinecap="');
    str = str.replace(/stroke-linejoin="/g, 'strokeLinejoin="');
    str = str.replace(/fill-rule="/g, 'fillRule="');
    str = str.replace(/clip-rule="/g, 'clipRule="');
    str = str.replace(/viewbox="/gi, 'viewBox="');

    // Inline Styles
    str = str.replace(/style="([^"]+)"/g, (match, styles) => {
        const objStr = styles.split(';').filter(s => s.trim()).map(rule => {
            const [k, ...vParts] = rule.split(':');
            const v = vParts.join(':').trim();
            const camelKey = k.trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
            return `${camelKey}: '${v}'`;
        }).join(', ');
        return `style={{ ${objStr} }}`;
    });

    return str;
};

bodyContent = toJSX(bodyContent);

// Get the main pieces
const deckMatch = bodyContent.match(/<div className="deck" id="deck">([\s\S]*?)<\/div>\s*<div className="nav-bar"/);
let allSlidesHTML = deckMatch ? deckMatch[1].trim() : '';

let dropdownHtml = "";
const dropdownMatch = bodyContent.match(/<div className="contact-dropdown" id="contactDropdown">([\s\S]*?)<div className="deck" id="deck">/);
if (dropdownMatch) {
    let rawStr = dropdownMatch[1].trim();
    // remove the last </div> before deck
    rawStr = rawStr.replace(/<\/div>$/, '').trim(); 
    dropdownHtml = rawStr;
}

fs.writeFileSync(path.join(reactAppDir, 'App.jsx'), `
import { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const totalSlides = 15;

  useEffect(() => {
    const handleClick = (e) => {
      if (!e.target.closest('.header-logo') && !e.target.closest('.contact-dropdown')) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <>
      <div className="noise" />
      
      <div 
        className="header-logo" 
        id="headerLogo" 
        title="Contact Us"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <img src="logo/Recon Event Logo.jpeg" alt="Recon" />
      </div>

      <div className={\`contact-dropdown \${dropdownOpen ? 'open' : ''}\`} id="contactDropdown">
        ${dropdownHtml}
      </div>

      <div className="deck" id="deck" onScroll={(e) => {
        const index = Math.round(e.target.scrollTop / window.innerHeight);
        if(index !== activeIndex) setActiveIndex(index);
      }}>
        ${allSlidesHTML}
      </div>

      <div className="nav-bar" id="navBar">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <div 
            key={i} 
            className={\`nav-dot \${i === activeIndex ? 'active' : ''}\`}
            onClick={() => {
              const el = document.getElementById(\`s\${i + 1}\`);
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        ))}
      </div>
      <div className="slide-counter" id="slideCounter">
        {String(activeIndex + 1).padStart(2, '0')} / {totalSlides}
      </div>
    </>
  );
}

export default App;
`);
console.log('Migration completed successfully.');
