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
    let original = content;

    // 1. Find lucide-react imports
    let lucideMatch = content.match(/import\s+\{([^}]+)\}\s+from\s+['"]lucide-react['"]/);
    if (lucideMatch) {
        let icons = lucideMatch[1].split(',').map(s => s.trim()).filter(Boolean);
        for (let icon of icons) {
            // regex to match <IconName ... > and ensure it doesn't already have aria-hidden
            let iconRegex = new RegExp(`<${icon}\\b(?![^>]*aria-hidden)([^>]*)>`, 'g');
            content = content.replace(iconRegex, `<${icon} aria-hidden="true"$1>`);
        }
    }

    // 2. Find raw <svg> tags that don't have <title> and don't have aria-hidden
    let svgRegex = /<svg\b(?![^>]*aria-hidden)([^>]*)>(?![\s\S]*?<title>)/g;
    content = content.replace(svgRegex, `<svg aria-hidden="true"$1>`);
    
    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`Updated ${filePath}`);
        count++;
    }
});
console.log(`Total files updated: ${count}`);
