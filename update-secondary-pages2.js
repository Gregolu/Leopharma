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
            `<div class="notification-icon" (click)="goToRoute('/notifications')" style="cursor:pointer;">`
        );
        code = code.replace(
            /<div class="profile-icon">/,
            `<div class="profile-icon" (click)="goToRoute('/profile')" style="cursor:pointer;">`
        );
        
        fs.writeFileSync(f, code, 'utf8');
    }
});

console.log("Fixed secondary pages");
