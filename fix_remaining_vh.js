const fs = require('fs');
const path = require('path');

function replaceFile(p, oldStr, newStr) {
  const fullP = path.join(__dirname, p);
  if (fs.existsSync(fullP)) {
    let content = fs.readFileSync(fullP, 'utf8');
    content = content.replace(oldStr, newStr);
    fs.writeFileSync(fullP, content, 'utf8');
    console.log('Fixed:', p);
  } else {
    console.log('Not found:', p);
  }
}

replaceFile('src/app/pages/home/home.component.scss', "height: 100vh;", "height: 100%;");
replaceFile('src/app/pages/auth/auth.component.ts', "height: 100vh;", "height: 100%;");
replaceFile('src/app/pages/score/score.component.ts', "height: 100vh;", "height: 100%;");
replaceFile('src/app/pages/photo-analysis/photo-analysis.component.ts', "min-height: 100vh;", "min-height: 100%;");

console.log("Completed remaining vh replacements.");

