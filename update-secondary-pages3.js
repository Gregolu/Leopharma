const fs = require('fs');

const files = [
  'src/app/pages/confirmation/confirmation.component.ts',
  'src/app/pages/monitoring/monitoring.component.ts',
  'src/app/pages/share/share.component.ts'
];

files.forEach(f => {
    if (fs.existsSync(f)) {
        let code = fs.readFileSync(f, 'utf8');

        // Check if Router is imported, inject it securely
        if (!code.includes('import { Router }')) {
             code = code.replace(/import\s*\{.*?\}\s*from\s*'@angular\/core';/, "$&\nimport { Router } from '@angular/router';");
        }
        
        if (!code.includes('goToRoute')) {
            // Replace export class with constructor
             code = code.replace(/export class \w+\s*\{/, "$&\n  constructor(protected router: Router) {}\n  goToRoute(path: string) { if(this.router) this.router.navigate([path]); }\n");
        }
        fs.writeFileSync(f, code, 'utf8');
    }
});

console.log("Fixed missing goToRoute!");
