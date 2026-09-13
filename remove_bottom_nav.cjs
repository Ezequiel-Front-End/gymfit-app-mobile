const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src', 'screens');

const screensToUpdate = [
  'HomeScreen.tsx',
  'ActivitiesScreen.tsx',
  'WorkoutsScreen.tsx',
  'WorkoutDetailsScreen.tsx',
  'ProfileScreen.tsx'
];

for (const file of screensToUpdate) {
  const fullPath = path.join(srcDir, file);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Remove the BottomNavigation rendering block. Since the component is different in each file (some have comments, some have multiline), 
    // it's easier to use a regex that matches from <BottomNavigation to />
    // Wait, in HomeScreen it's <BottomNavigation activeTab="inicio" onTabChange={(tab) => {\n        if (onNavigateTab) {\n          onNavigateTab(tab);\n        }\n      }} />
    // In others it's <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} />
    
    content = content.replace(/\{\/\*\s*Bottom Navigation\s*\*\/\}/g, '');
    content = content.replace(/<BottomNavigation[\s\S]*?\/>/g, '');
    
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Removed BottomNavigation from ${file}`);
  }
}
