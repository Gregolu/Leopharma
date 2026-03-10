const fs = require('fs');
const qPath = 'src/app/pages/questionnaire/questionnaire.component.ts';
let qCode = fs.readFileSync(qPath, 'utf8');

if (!qCode.includes('retakePhoto() {')) {
  qCode = qCode.replace(
    /takePhoto\(\) \{([\s\S]*?)\}/,
    `takePhoto() {$1}\n\n  retakePhoto() {\n    this.photoState = 'capture';\n    this.markers = [];\n  }`
  );
  fs.writeFileSync(qPath, qCode, 'utf8');
}
console.log('Fixed2');
