const fs = require('fs');
const path = require('path');

const descriptionsPath = path.join(__dirname, 'docs', 'descriptions.json');
const descriptions = JSON.parse(fs.readFileSync(descriptionsPath, 'utf-8'));

for (const apiName in descriptions) {
    if (descriptions.hasOwnProperty(apiName)) {
        const description = descriptions[apiName].description;
        const fileName = apiName + '.md';
        const filePath = path.join('docs', 'api', 'v2', fileName);

        if (fs.existsSync(filePath)) {
            let mdContent = fs.readFileSync(filePath, 'utf-8');
            mdContent = mdContent.replace('[Description]', description);
            fs.writeFileSync(filePath, mdContent);
            console.log(`Updated description for ${fileName}`);
        } else {
            console.log(`File not found: ${filePath}`);
        }
    }
}

console.log("Description update complete.");