const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
  try {
    fs.readdirSync(dir).forEach(f => {
      let dirPath = path.join(dir, f);
      let isDirectory = fs.statSync(dirPath).isDirectory();
      isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
    });
  } catch(e) {}
}

const files = [];
walk('app', f => { if (f.endsWith('.tsx') || f.endsWith('.ts')) files.push(f); });
walk('components', f => { if (f.endsWith('.tsx') || f.endsWith('.ts')) files.push(f); });

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf-8');
  let original = content;

  // Currency & Prices
  content = content.replace(/\$599\.99/g, '₹49,999');
  content = content.replace(/\$429\.99/g, '₹35,999');
  content = content.replace(/\$399\.99/g, '₹32,999');
  content = content.replace(/\$150\.00/g, '₹12,499');
  content = content.replace(/\$120\.00/g, '₹9,999');
  content = content.replace(/\$85\.00/g, '₹6,999');
  content = content.replace(/\$19\.99/g, '₹1,500');
  content = content.replace(/\$15\.00/g, '₹1,200');
  
  // Format general currency
  content = content.replace(/\$(\d+(?:,\d+)*(?:\.\d+)?)/g, (match, p1) => {
      const num = parseFloat(p1.replace(/,/g, ''));
      const inr = Math.round(num * 83).toLocaleString('en-IN');
      return '₹' + inr;
  });

  // Locations
  content = content.replace(/DOWNTOWN LA/g, 'BANDRA, MUMBAI');
  content = content.replace(/Downtown Arts District/g, 'Bandra West, Mumbai');
  content = content.replace(/SOHO NEW YORK/g, 'DEFENCE COLONY, DELHI');
  content = content.replace(/SoHo New York/g, 'Defence Colony, Delhi');
  content = content.replace(/WEST LONDON/g, 'KORAMANGALA, BLR');
  content = content.replace(/West London Studio/g, 'Koramangala Studio');
  content = content.replace(/East Side/g, 'Jubilee Hills');

  // Aesthetic and Typography
  // To make it minimalistic, replacing heavy styles with lighter variations.
  content = content.replace(/font-black/g, 'font-medium');
  content = content.replace(/\buppercase\b/g, 'tracking-normal'); 
  content = content.replace(/tracking-\[[a-zA-Z0-9.-]+\]/g, 'tracking-normal');
  content = content.replace(/tracking-tighter/g, 'tracking-tight');
  content = content.replace(/tracking-widest/g, 'tracking-normal');
  // Replacing italic
  content = content.replace(/\bitalic\b/g, '');
  content = content.replace(/\bitalic-none\b/g, '');

  content = content.replace(/render=\{([^}]+)\}/g, (match, p1) => {
    if (match.includes('nativeButton') || p1.startsWith('`')) return match; 
    return `render={${p1}} nativeButton={false}`;
  });

  if (content !== original) {
    fs.writeFileSync(f, content, 'utf-8');
    console.log('Updated', f);
  }
});
