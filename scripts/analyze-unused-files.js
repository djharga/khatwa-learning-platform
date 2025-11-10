const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Script to analyze unused files and duplicates in the project
 */

const projectRoot = path.join(__dirname, '..');
const srcDir = path.join(projectRoot, 'src');
const publicDir = path.join(projectRoot, 'public');
const srcAssetsDir = path.join(srcDir, 'assets');
const publicAssetsDir = path.join(publicDir, 'assets');

// Get all TypeScript/TSX files in src
function getAllSourceFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Skip node_modules and .next
      if (!['node_modules', '.next', 'dist', 'build'].includes(file)) {
        getAllSourceFiles(filePath, fileList);
      }
    } else if (/\.(ts|tsx|js|jsx|json)$/.test(file)) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Read file content
function readFileContent(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch (e) {
    return '';
  }
}

// Find all imports in source files
function findImports(sourceFiles) {
  const imports = new Set();
  const importPatterns = [
    /from\s+['"]([^'"]+)['"]/g,
    /import\s+['"]([^'"]+)['"]/g,
    /require\s*\(\s*['"]([^'"]+)['"]\s*\)/g,
  ];
  
  sourceFiles.forEach(filePath => {
    const content = readFileContent(filePath);
    importPatterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        imports.add(match[1]);
      }
    });
  });
  
  return imports;
}

// Get all files in a directory recursively
function getAllFiles(dir, extensions = []) {
  const files = [];
  
  if (!fs.existsSync(dir)) {
    return files;
  }
  
  const items = fs.readdirSync(dir);
  
  items.forEach(item => {
    const itemPath = path.join(dir, item);
    const stat = fs.statSync(itemPath);
    
    if (stat.isDirectory()) {
      files.push(...getAllFiles(itemPath, extensions));
    } else if (extensions.length === 0 || extensions.some(ext => item.endsWith(ext))) {
      files.push(itemPath);
    }
  });
  
  return files;
}

// Check if a file is referenced in imports
function isFileReferenced(filePath, imports, sourceFiles) {
  const relativePath = path.relative(projectRoot, filePath);
  const fileName = path.basename(filePath);
  const fileNameWithoutExt = path.basename(filePath, path.extname(filePath));
  
  // Check direct imports
  for (const imp of imports) {
    // Check if import matches the file path
    if (imp.includes(fileNameWithoutExt) || imp.includes(fileName)) {
      return true;
    }
    
    // Check relative paths
    if (imp.startsWith('.')) {
      // This would need more complex resolution, but for now we check if the file name appears
      if (imp.includes(fileNameWithoutExt)) {
        return true;
      }
    }
  }
  
  // Check if file is referenced in source code (for images in public/assets)
  const publicPath = `/assets/${fileName}`;
  const publicPath2 = `/assets/${relativePath.replace(/\\/g, '/').replace(/^public\/assets\//, '')}`;
  
  for (const sourceFile of sourceFiles) {
    const content = readFileContent(sourceFile);
    if (content.includes(publicPath) || content.includes(publicPath2) || content.includes(fileName)) {
      return true;
    }
  }
  
  return false;
}

// Main analysis function
function analyzeProject() {
  console.log('🔍 Analyzing project...\n');
  
  // Get all source files
  const sourceFiles = getAllSourceFiles(srcDir);
  console.log(`📁 Found ${sourceFiles.length} source files\n`);
  
  // Find all imports
  const imports = findImports(sourceFiles);
  console.log(`📦 Found ${imports.size} unique imports\n`);
  
  // Analyze assets
  console.log('📸 Analyzing assets...\n');
  
  const srcAssets = getAllFiles(srcAssetsDir, ['.png', '.jpg', '.jpeg', '.svg', '.webp', '.avif']);
  const publicAssets = getAllFiles(publicAssetsDir, ['.png', '.jpg', '.jpeg', '.svg', '.webp', '.avif']);
  
  console.log(`   src/assets: ${srcAssets.length} files`);
  console.log(`   public/assets: ${publicAssets.length} files\n`);
  
  // Find duplicate assets
  const duplicateAssets = [];
  const srcAssetNames = srcAssets.map(f => path.basename(f));
  const publicAssetNames = publicAssets.map(f => path.basename(f));
  
  srcAssetNames.forEach(name => {
    if (publicAssetNames.includes(name)) {
      duplicateAssets.push({
        name,
        srcPath: srcAssets.find(f => path.basename(f) === name),
        publicPath: publicAssets.find(f => path.basename(f) === name),
      });
    }
  });
  
  console.log(`🔄 Found ${duplicateAssets.length} duplicate assets\n`);
  
  // Check unused files in root
  const rootUnusedDirs = [
    '3d-cards-scrollable-and-selectable-3js',
    'app-admin-menus-light-dark-modeswith-tailwind-css',
    'course-design-cards-scss',
    'css-only-navigation-with-rotating-text-hover-effect',
    '1212_images',
  ];
  
  const rootUnusedFiles = [
    '1212.docx',
    '1212.md',
  ];
  
  const unusedRootItems = [];
  
  rootUnusedDirs.forEach(dir => {
    const dirPath = path.join(projectRoot, dir);
    if (fs.existsSync(dirPath)) {
      unusedRootItems.push({
        path: dirPath,
        type: 'directory',
        name: dir,
      });
    }
  });
  
  rootUnusedFiles.forEach(file => {
    const filePath = path.join(projectRoot, file);
    if (fs.existsSync(filePath)) {
      unusedRootItems.push({
        path: filePath,
        type: 'file',
        name: file,
      });
    }
  });
  
  // Generate report
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalSourceFiles: sourceFiles.length,
      totalImports: imports.size,
      srcAssetsCount: srcAssets.length,
      publicAssetsCount: publicAssets.length,
      duplicateAssetsCount: duplicateAssets.length,
      unusedRootItemsCount: unusedRootItems.length,
    },
    duplicateAssets: duplicateAssets.map(dup => ({
      name: dup.name,
      srcPath: path.relative(projectRoot, dup.srcPath),
      publicPath: path.relative(projectRoot, dup.publicPath),
    })),
    unusedRootItems: unusedRootItems.map(item => ({
      name: item.name,
      path: path.relative(projectRoot, item.path),
      type: item.type,
    })),
  };
  
  // Save report
  const reportPath = path.join(projectRoot, 'CLEANUP_REPORT.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`✅ Report saved to: ${reportPath}\n`);
  
  // Print summary
  console.log('📊 Summary:');
  console.log(`   Duplicate assets: ${duplicateAssets.length}`);
  console.log(`   Unused root items: ${unusedRootItems.length}`);
  console.log('\n');
  
  return report;
}

// Run analysis
if (require.main === module) {
  try {
    analyzeProject();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

module.exports = { analyzeProject };

