const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const replacements = [
  { search: /bg-\[#09090b\]/g, replace: 'bg-[var(--color-fit-bg)]' },
  { search: /bg-black/g, replace: 'bg-[var(--color-fit-bg)]' }, // In some places I used bg-black
  { search: /bg-\[#121217\]/g, replace: 'bg-[var(--color-fit-panel)]' },
  { search: /bg-\[#1C1C23\]/g, replace: 'bg-[var(--color-fit-panel-2)]' },
  { search: /text-\[#D4FF00\]/g, replace: 'text-[var(--color-fit-green)]' },
  { search: /bg-\[#D4FF00\]/g, replace: 'bg-[var(--color-fit-green)]' },
  { search: /border-\[#D4FF00\]/g, replace: 'border-[var(--color-fit-green)]' },
  { search: /stroke-\[#D4FF00\]/g, replace: 'stroke-[var(--color-fit-green)]' },
  { search: /text-zinc-400/g, replace: 'text-[var(--color-fit-muted)]' },
  { search: /text-zinc-500/g, replace: 'text-[var(--color-fit-muted)]' },
  { search: /font-display/g, replace: 'font-sans' } // Since we set font-sans and font-display to Montserrat
];

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;
      for (const { search, replace } of replacements) {
        if (search.test(content)) {
          content = content.replace(search, replace);
          changed = true;
        }
      }
      if (changed) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDir(srcDir);
console.log('Color replacement complete.');
