const fs = require('fs');
let text = fs.readFileSync('src/app/pages/confirmation/confirmation.component.ts', 'utf8');

text = text.replace(/<h1 class="conf-title">Félicitations !<\/h1>/, `<h1 class="conf-title" style="color:white;">Félicitations !</h1>`);

// Remove stripes background
text = text.replace(/background-image:\s*repeating-linear-gradient[^;]+;/g, '');

fs.writeFileSync('src/app/pages/confirmation/confirmation.component.ts', text, 'utf8');
