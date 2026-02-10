import os
import re

favicon_tag = '<link rel="icon" href="assets/favicon.svg" type="image/svg+xml">'

for filename in os.listdir('.'):
    if filename.endswith('.html'):
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Regex to find any existing link[rel="icon"] tag, even if multi-line
        new_content = re.sub(r'<!-- Favicon -->\s*<link rel="icon".*?>', f'<!-- Favicon -->\n    {favicon_tag}', content, flags=re.DOTALL)
        # If the comment isn't there, just replace the tag
        if new_content == content:
            new_content = re.sub(r'<link rel="icon".*?>', favicon_tag, content, flags=re.DOTALL)
        
        if new_content != content:
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {filename}")
        else:
            print(f"No changes for {filename}")
