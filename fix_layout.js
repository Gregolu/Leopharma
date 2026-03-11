const fs = require('fs');
const navFile = 'src/app/components/bottom-nav/bottom-nav.component.ts';
let navContent = fs.readFileSync(navFile, 'utf8');

navContent = navContent.replace('routerLink="/profil"', 'routerLink="/profile"');
navContent = navContent.replace(/max-width: 380px;/g, 'max-width: 400px;');
navContent = navContent.replace(/\.nav-item \{\n      display: flex;/g, '.nav-item {\n      flex: 1;\n      display: flex;');
navContent = navContent.replace(/width: 45px;/g, '');
navContent = navContent.replace(/\.center-nav \{\n      position: relative;\n      top: -20px;/g, '.center-nav {\n      position: relative;\n      top: -28px;\n      flex: 1.2;\n      display: flex;\n      justify-content: center;');
navContent = navContent.replace(/\.center-circle \{\n      width: 45px;\n      height: 50px;/g, '.center-circle {\n      width: 64px;\n      height: 64px;\n      border-radius: 50%;\n      margin: 0 auto;\n      background: white;\n      box-shadow: 0 8px 24px rgba(0,175,108, 0.4);\n      border: 4px solid #fff;');

fs.writeFileSync(navFile, navContent);

const stylesFile = 'src/styles.scss';
let stylesContent = fs.readFileSync(stylesFile, 'utf8');

if (!stylesContent.includes('.page-container::before')) {
  stylesContent += `
.page-container { 
  position: relative; 
  min-height: 100vh; 
  z-index: 1; 
  background-color: var(--background-light, #FAFAFA); 
}
.page-container::before { 
  content: ""; 
  position: fixed; 
  top: 50%; 
  left: 50%; 
  transform: translate(-50%, -50%); 
  width: 80vw; 
  height: 80vw; 
  max-width: 400px; 
  max-height: 400px; 
  background-image: url('/assets/images/icone-manuderma@2x.png'); 
  background-repeat: no-repeat; 
  background-position: center; 
  background-size: contain; 
  opacity: 0.04; 
  z-index: -1; 
  pointer-events: none; 
}
`;
  fs.writeFileSync(stylesFile, stylesContent);
}