const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

let count = 0;
walkDir('src', function(filePath) {
    if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts')) return;
    
    let content = fs.readFileSync(filePath, 'utf-8');
    if (content.includes('framer-motion')) {
        let original = content;
        
        // Replace motion in imports
        content = content.replace(/(import\s+\{[^}]*?)\bmotion\b([^}]*?\}\s+from\s+['"]framer-motion['"])/g, '$1m$2');
        
        // Replace tags
        content = content.replace(/<motion\./g, '<m.');
        content = content.replace(/<\/motion\./g, '</m.');
        
        if (content !== original) {
            fs.writeFileSync(filePath, content, 'utf-8');
            console.log(`Updated ${filePath}`);
            count++;
        }
    }
});
console.log(`Total files updated: ${count}`);
