const fs = require('fs');
const path = 'src/app/pages/questionnaire/questionnaire.component.ts';
let code = fs.readFileSync(path, 'utf8');

// Find the block and replace it cleanly
code = code.replace(
  /takePhoto\(\) \{\s*\}\s*retakePhoto\(\) \{\s*this\.photoState = 'capture';\s*this\.markers = \[\];\s*this\.photoState = 'analyze';\s*\}/,
  `takePhoto() {\n    this.photoState = 'analyze';\n  }\n\n  retakePhoto() {\n    this.photoState = 'capture';\n    this.markers = [];\n  }`
);

fs.writeFileSync(path, code, 'utf8');
console.log('Fixed block');
