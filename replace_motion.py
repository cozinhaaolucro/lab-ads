import os
import glob
import re

files = glob.glob('src/**/*.tsx', recursive=True)
count = 0
for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    if 'framer-motion' in content:
        original = content
        # Replace motion in imports
        content = re.sub(r'(\bimport\s+{[^}]*?\b)motion(\b[^}]*?}\s+from\s+[\'"]framer-motion[\'"])', r'\1m\2', content)
        
        # Replace tags
        content = content.replace('<motion.', '<m.')
        content = content.replace('</motion.', '</m.')
        
        if content != original:
            with open(f, 'w', encoding='utf-8') as file:
                file.write(content)
            print(f'Updated {f}')
            count += 1
print(f'Total files updated: {count}')
