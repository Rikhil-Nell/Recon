import fs from 'fs';
let content = fs.readFileSync('recon-app/src/App.jsx', 'utf8');
content = content.replace(/<\/(path|polyline|rect|circle|line|img|hr|br|input)>/g, '');
// Also fix any other possible syntax issues like unescaped apostrophes
// "India's premier" -> "India&apos;s premier" or wrap in {} isn't needed in valid JSX text nodes unless it's in a prop.
// Wait, "Let's Build This Together" might be unescaped JS in JSX text? React allows ' inside text nodes: <div>India's</div> is valid.

// There's one more invalid JSX syntax: font-family: ''JetBrains Mono'' inside style={{ fontFamily: ''JetBrains Mono'' }}
// Oh! The CSS conversion script produced `fontFamily: ''JetBrains Mono''` because it was `font-family: 'JetBrains Mono'` and the script did `${camelKey}: '${v}'`.
// So `'JetBrains Mono'` became `''JetBrains Mono''` which is invalid JS!
content = content.replace(/''JetBrains Mono''/g, "'JetBrains Mono'");

fs.writeFileSync('recon-app/src/App.jsx', content);
console.log('Cleaned orphaned tags and string issues');
