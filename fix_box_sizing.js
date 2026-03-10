const fs = require('fs');

const stylesPath = 'src/styles.scss';
let styles = fs.readFileSync(stylesPath, 'utf8');
if (!styles.includes('*, *::before, *::after')) {
  styles = styles.replace(':root', '*, *::before, *::after {\n  box-sizing: border-box;\n}\n\n:root');
  fs.writeFileSync(stylesPath, styles);
  console.log('Added box-sizing to styles.scss');
}

const layoutPath = 'src/styles/layout.scss';
if (fs.existsSync(layoutPath)) {
  let layout = fs.readFileSync(layoutPath, 'utf8');
  if (!layout.includes('*, *::before, *::after')) {
    layout = layout.replace('body {', '*, *::before, *::after {\n  box-sizing: border-box;\n}\n\nbody {');
    fs.writeFileSync(layoutPath, layout);
    console.log('Added box-sizing to layout.scss');
  }
}
