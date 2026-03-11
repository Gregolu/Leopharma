const fs = require('fs');

let f = 'src/app/pages/questionnaire/questionnaire.component.ts';
let code = fs.readFileSync(f, 'utf8');

// Fix header positioning
code = code.replace(
    /style="display:flex; justify-content: space-between; align-items: center; width: 100%;"/,
    'style="display:flex; justify-content: space-between; align-items: center; width: 100%; position: relative;"'
);

code = code.replace(
    /<h1 class="header-title"(.*?)>Mes bilans santé<\/h1>/,
    '<h1 class="header-title" $1 style="margin:0; font-size:20px; position:absolute; left:50%; transform:translateX(-50%); font-weight:700; width:max-content;">Mes bilans santé</h1>'
);
// In case it has been duplicated
code = code.replace(/style="margin:0; font-size:20px;" style=".*?"/, 'style="margin:0; font-size:20px; position:absolute; left:50%; transform:translateX(-50%); font-weight:700; width:max-content;"');

// Replace the two icons carefully
const newIcons = `
            <div class="notification-icon" style="position:relative; width:28px; height:28px; display:flex; align-items:center; justify-content:center; cursor:pointer;" (click)="goToRoute('/notifications')">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
            </div>
            <div class="profile-icon" style="background:white; color:#00854d; border-radius:50%; width:28px; height:28px; display:flex; align-items:center; justify-content:center; cursor:pointer;" (click)="goToRoute('/profile')">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </div>
`;
code = code.replace(
    /<div class="notification-icon"[\s\S]*?<\/svg>\s*<\/div>\s*<div class="profile-icon"[\s\S]*?<\/svg>\s*<\/div>/,
    newIcons
);

fs.writeFileSync(f, code, 'utf8');

// Dashboard redesign
let d = 'src/app/pages/dashboard/dashboard.component.ts';
let dcode = fs.readFileSync(d, 'utf8');

// Dashboard background color and padding container
dcode = dcode.replace(
    /\.dashboard-wrapper {\s*background: #[A-Fa-f0-9]+;/,
    '.dashboard-wrapper {\n      background: #F5F7FA;'
);

// Mettre à jour mon dossier (black button)
dcode = dcode.replace(
    /<button class="primary-btn center-btn mt-3" \(click\)="goTo\('\/questionnaire'\)">Mettre à jour mon dossier<\/button>/,
    `<button class="primary-btn center-btn mt-3" style="background:#111; color:white; border:none; width:100%; border-radius:30px; font-weight:700; padding:16px; margin-top:20px; cursor:pointer;" (click)="goTo('/questionnaire')">Mettre à jour mon dossier</button>`
);

// Voir mon dossier (green button)
dcode = dcode.replace(
    /<button class="primary-btn center-btn mt-4" \(click\)="goTo\('\/dossier'\)">Voir mon dossier<\/button>/,
    `<button class="primary-btn center-btn mt-4" style="background:#00854d; color:white; border:none; width:100%; border-radius:30px; font-weight:700; padding:16px; margin-top:20px; cursor:pointer;" (click)="goTo('/dossier')">Voir mon dossier</button>`
);

fs.writeFileSync(d, dcode, 'utf8');

console.log("Fixed questionnaire and dashboard");
