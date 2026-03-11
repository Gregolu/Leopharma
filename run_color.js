const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    let filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(filePath));
    } else if (filePath.match(/\.(ts|scss|html)$/)) {
      results.push(filePath);
    }
  });
  return results;
}

const files = walk('./src');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  const replacements = [
    { regex: /#00af6c/gi, replace: '#204131' },
    { regex: /#00854d/gi, replace: '#204131' },
    { regex: /#000000/gi, replace: '#020b42' },
    { regex: /#111111/gi, replace: '#020b42' },
    { regex: /#000(?![0-9a-fA-F])/gi, replace: '#020b42' },
    { regex: /#111(?![0-9a-fA-F])/gi, replace: '#020b42' },
    { regex: /:\s*black\b/gi, replace: ': #020b42' }
  ];

  let newContent = content;
  replacements.forEach(r => {
    newContent = newContent.replace(r.regex, r.replace);
  });

  if (content !== newContent) {
    fs.writeFileSync(file, newContent);
    console.log('Updated', file);
  }
});