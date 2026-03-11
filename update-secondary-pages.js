const fs = require('fs');

const files = [
  'src/app/pages/confirmation/confirmation.component.ts',
  'src/app/pages/monitoring/monitoring.component.ts',
  'src/app/pages/share/share.component.ts'
];

files.forEach(f => {
    if (fs.existsSync(f)) {
        let code = fs.readFileSync(f, 'utf8');
        code = code.replace(
            /<div class="notification-icon">/,
            '<div class="notification-icon" (click)="goToRoute(\\'/notifications\\')" style="cursor:pointer;">'
        );
        code = code.replace(
            /<div class="profile-icon">/,
            '<div class="profile-icon" (click)="goToRoute(\\'/profile\\')" style="cursor:pointer;">'
        );
        
        // ensure goToRoute exists
        if (!code.includes('goToRoute(')) {
            code = code.replace(
                /export class [A-Za-z0-9]+ \{/,
                '$&\n  goToRoute(route: string) { if(this.router) this.router.navigate([route]); }\n'
            );
            // also we need to make sure router is injected if we add and it wasn't there
            if (!code.includes('private router:') && !code.includes('router = inject(')) {
                // let's just make it simple
                code = code.replace(
                    /import \{ CommonModule \} from '@angular\/common';/,
                    "import { CommonModule } from '@angular/common';\nimport { Router } from '@angular/router';"
                );
                code = code.replace(
                    /export class [A-Za-z0-9]+ \{/,
                    '$&\n  constructor(protected router: Router) {}\n'
                );
            }
        }
        
        fs.writeFileSync(f, code, 'utf8');
    }
});

console.log("Fixed secondary pages");
