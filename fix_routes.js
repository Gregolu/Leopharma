const fs = require('fs');

const routesFile = 'src/app/app.routes.ts';
let content = fs.readFileSync(routesFile, 'utf8');

if (!content.includes("{ path: 'profile'")) {
    content = content.replace('];', "  ,{ path: 'profile', component: ProfileComponent },\n  { path: 'notifications', component: NotificationsComponent }\n];");
    fs.writeFileSync(routesFile, content);
    console.log('Routes added');
} else {
    console.log('Routes already present');
}

