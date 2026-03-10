const fs = require('fs');
let styles = fs.readFileSync('src/styles.scss', 'utf8');
if (!styles.includes('::-webkit-scrollbar')) {
  styles += '\n/* Hide scrollbars */\n*::-webkit-scrollbar { display: none; }\n* { -ms-overflow-style: none; scrollbar-width: none; }\n';
  fs.writeFileSync('src/styles.scss', styles);
  console.log('Fixed styles.scss');
}
