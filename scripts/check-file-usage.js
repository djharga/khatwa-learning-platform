const fs = require('fs');
const path = require('path');

/**
 * Script to check if specific files are used in the codebase
 */

const projectRoot = path.join(__dirname, '..');
const srcDir = path.join(projectRoot, 'src');

// Read all source files
function getAllSourceFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      if (!['node_modules', '.next', 'dist', 'build'].includes(file)) {
        getAllSourceFiles(filePath, fileList);
      }
    } else if (/\.(ts|tsx|js|jsx|json|md)$/.test(file)) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Search for file reference in content
function searchInContent(content, searchTerms) {
  const results = [];
  searchTerms.forEach(term => {
    if (content.includes(term)) {
      results.push(term);
    }
  });
  return results;
}

// Check if a file/directory is referenced
function checkFileUsage(filePath, sourceFiles) {
  const fileName = path.basename(filePath);
  const relativePath = path.relative(projectRoot, filePath);
  const searchTerms = [
    fileName,
    relativePath.replace(/\\/g, '/'),
    relativePath.replace(/\\/g, '/').replace(/^src\//, '@/'),
  ];
  
  const matches = [];
  
  sourceFiles.forEach(sourceFile => {
    const content = fs.readFileSync(sourceFile, 'utf-8');
    const found = searchInContent(content, searchTerms);
    if (found.length > 0) {
      matches.push({
        file: path.relative(projectRoot, sourceFile),
        terms: found,
      });
    }
  });
  
  return matches;
}

// Main function
function checkFiles(filesToCheck) {
  console.log('🔍 Checking file usage...\n');
  
  const sourceFiles = getAllSourceFiles(srcDir);
  console.log(`📁 Scanning ${sourceFiles.length} source files\n`);
  
  const results = {};
  
  filesToCheck.forEach(filePath => {
    const fullPath = path.join(projectRoot, filePath);
    if (fs.existsSync(fullPath)) {
      const matches = checkFileUsage(fullPath, sourceFiles);
      results[filePath] = {
        exists: true,
        used: matches.length > 0,
        references: matches,
      };
    } else {
      results[filePath] = {
        exists: false,
        used: false,
        references: [],
      };
    }
  });
  
  return results;
}

// Check root directories
const rootDirsToCheck = [
  '3d-cards-scrollable-and-selectable-3js',
  'app-admin-menus-light-dark-modeswith-tailwind-css',
  'course-design-cards-scss',
  'css-only-navigation-with-rotating-text-hover-effect',
  '1212_images',
];

const rootFilesToCheck = [
  '1212.docx',
  '1212.md',
];

if (require.main === module) {
  const allFilesToCheck = [...rootDirsToCheck, ...rootFilesToCheck];
  const results = checkFiles(allFilesToCheck);
  
  console.log('📊 Results:\n');
  Object.entries(results).forEach(([file, result]) => {
    if (!result.exists) {
      console.log(`❌ ${file} - NOT FOUND`);
    } else if (result.used) {
      console.log(`⚠️  ${file} - USED (${result.references.length} references)`);
      result.references.forEach(ref => {
        console.log(`   → ${ref.file}`);
      });
    } else {
      console.log(`✅ ${file} - NOT USED (safe to delete)`);
    }
    console.log('');
  });
}

module.exports = { checkFiles };

