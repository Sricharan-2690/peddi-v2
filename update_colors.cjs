const fs = require('fs');
const path = require('path');

const srcDir = 'e:\\Peddi Movie Website\\New folder\\src';
const tailwindConfigPath = 'e:\\Peddi Movie Website\\New folder\\tailwind.config.js';

const replacements = [
  { regex: /#FF5B22/gi, replacement: '#FF9D00' },
  { regex: /#FF7B00/gi, replacement: '#FFB733' },
  { regex: /#C94A18/gi, replacement: '#CC7D00' },
  { regex: /255\s*,\s*91\s*,\s*34/gi, replacement: '255,157,0' },
  { regex: /255\s*,\s*123\s*,\s*0/gi, replacement: '255,183,51' },
  { regex: /201\s*,\s*74\s*,\s*24/gi, replacement: '204,125,0' },
  { regex: /#1A0D06/gi, replacement: '#1A1205' },
  { regex: /#3D1A0A/gi, replacement: '#3D260A' }
];

function processDir(dirPath) {
  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (/\.(jsx|js|css)$/.test(fullPath)) {
      processFile(fullPath);
    }
  }
}

function processFile(fullPath) {
  if (!fs.existsSync(fullPath)) return;
  let content = fs.readFileSync(fullPath, 'utf8');
  let modified = false;
  for (const { regex, replacement } of replacements) {
    if (regex.test(content)) {
      content = content.replace(regex, replacement);
      modified = true;
    }
  }
  if (modified) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log('Modified: ' + fullPath);
  }
}

processDir(srcDir);
processFile(tailwindConfigPath);
console.log('Done!');
