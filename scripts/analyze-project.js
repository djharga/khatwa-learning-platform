import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const SRC_DIR = path.join(__dirname, '..', 'src');
const EXCLUDE_DIRS = ['node_modules', '.next', '.git', 'dist', 'build'];
const FILE_EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js'];

// Results storage
const results = {
  duplicates: {
    byName: [],
    byContent: [],
  },
  oldFiles: [],
  unusedFiles: [],
  conflicts: {
    naming: [],
    imports: [],
    circular: [],
  },
  dependencies: {
    orphaned: [],
    broken: [],
  },
  stats: {
    totalFiles: 0,
    totalSize: 0,
  },
};

/**
 * Get all files recursively
 */
function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);

    if (EXCLUDE_DIRS.some((exclude) => filePath.includes(exclude))) {
      return;
    }

    if (stat.isDirectory()) {
      arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
    } else {
      const ext = path.extname(filePath);
      if (FILE_EXTENSIONS.includes(ext)) {
        arrayOfFiles.push(filePath);
      }
    }
  });

  return arrayOfFiles;
}

/**
 * Calculate file hash
 */
function getFileHash(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  return crypto.createHash("sha256").update(content).digest('hex');
}

/**
 * Get file stats
 */
function getFileStats(filePath) {
  const stat = fs.statSync(filePath);
  return {
    path: filePath,
    relativePath: path.relative(SRC_DIR, filePath),
    name: path.basename(filePath),
    size: stat.size,
    modified: stat.mtime,
    ageInDays: Math.floor((Date.now() - stat.mtime.getTime()) / (1000 * 60 * 60 * 24)),
  };
}

/**
 * Find duplicate files by name
 */
function findDuplicatesByName(files) {
  const nameMap = {};
  
  files.forEach((filePath) => {
    const stats = getFileStats(filePath);
    const name = stats.name;
    
    if (!nameMap[name]) {
      nameMap[name] = [];
    }
    nameMap[name].push(stats);
  });

  Object.entries(nameMap).forEach(([name, files]) => {
    if (files.length > 1) {
      results.duplicates.byName.push({
        name,
        files: files.map(f => ({
          path: f.relativePath,
          fullPath: f.path,
          size: f.size,
          modified: f.modified,
        })),
        count: files.length,
      });
    }
  });
}

/**
 * Find duplicate files by content
 */
function findDuplicatesByContent(files) {
  const hashMap = {};
  
  files.forEach((filePath) => {
    try {
      const hash = getFileHash(filePath);
      const stats = getFileStats(filePath);
      
      if (!hashMap[hash]) {
        hashMap[hash] = [];
      }
      hashMap[hash].push(stats);
    } catch (error) {
      console.error(`Error reading ${filePath}:`, error.message);
    }
  });

  Object.entries(hashMap).forEach(([hash, files]) => {
    if (files.length > 1) {
      results.duplicates.byContent.push({
        hash,
        files: files.map(f => ({
          path: f.relativePath,
          fullPath: f.path,
          size: f.size,
          modified: f.modified,
        })),
        count: files.length,
        totalSize: files.reduce((sum, f) => sum + f.size, 0),
      });
    }
  });
}

/**
 * Find old files
 */
function findOldFiles(files, daysThreshold = 180) {
  files.forEach((filePath) => {
    const stats = getFileStats(filePath);
    
    if (stats.ageInDays > daysThreshold) {
      results.oldFiles.push({
        path: stats.relativePath,
        fullPath: stats.path,
        ageInDays: stats.ageInDays,
        modified: stats.modified,
        size: stats.size,
        category: stats.ageInDays > 365 ? 'very-old' : stats.ageInDays > 180 ? 'old' : 'moderate',
      });
    }
  });
  
  // Sort by age
  results.oldFiles.sort((a, b) => b.ageInDays - a.ageInDays);
}

/**
 * Check if file is imported
 */
function isFileImported(filePath, allFiles) {
  const stats = getFileStats(filePath);
  const baseName = stats.name.replace(/\.(tsx|ts|jsx|js)$/, '');
  const relativePath = stats.relativePath.replace(/\\/g, '/');
  const dirName = path.dirname(relativePath);
  
  // Patterns to search for
  const patterns = [
    `from ['"].*${baseName}['"]`,
    `from ['"].*${relativePath.replace(/\.(tsx|ts|jsx|js)$/, '')}['"]`,
    `from ['"].*@/.*${dirName}/${baseName}['"]`,
    `import.*${baseName}`,
    `require.*${baseName}`,
  ];
  
  for (const otherFile of allFiles) {
    if (otherFile === filePath) continue;
    
    try {
      const content = fs.readFileSync(otherFile, 'utf8');
      
      for (const pattern of patterns) {
        const regex = new RegExp(pattern, 'i');
        if (regex.test(content)) {
          return true;
        }
      }
      
      // Check for JSX usage
      const componentName = baseName.replace(/Component$/, '').replace(/^./, m => m.toUpperCase());
      if (content.includes(`<${componentName}`) || content.includes(`<${baseName}`)) {
        return true;
      }
    } catch (error) {
      // Skip files that can't be read
    }
  }
  
  return false;
}

/**
 * Find unused files
 */
function findUnusedFiles(files) {
  const specialFiles = ['page.tsx', 'layout.tsx', 'route.ts', 'error.tsx', 'loading.tsx', 'not-found.tsx'];
  
  files.forEach((filePath) => {
    const stats = getFileStats(filePath);
    
    // Skip special Next.js files
    if (specialFiles.some(sf => stats.name === sf)) {
      return;
    }
    
    // Skip index files
    if (stats.name === 'index.ts' || stats.name === 'index.tsx') {
      return;
    }
    
    // Skip data files
    if (stats.name.includes('data.ts') || stats.name.includes('types.ts')) {
      return;
    }
    
    if (!isFileImported(filePath, files)) {
      results.unusedFiles.push({
        path: stats.relativePath,
        fullPath: stats.path,
        size: stats.size,
        modified: stats.modified,
      });
    }
  });
}

/**
 * Find naming conflicts
 */
function findNamingConflicts(files) {
  const exportMap = {};
  
  files.forEach((filePath) => {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const stats = getFileStats(filePath);
      
      // Extract default exports
      const defaultExportMatch = content.match(/export\s+default\s+(?:function\s+)?(\w+)|export\s+default\s+(\w+)/);
      if (defaultExportMatch) {
        const exportName = defaultExportMatch[1] || defaultExportMatch[2];
        if (!exportMap[exportName]) {
          exportMap[exportName] = [];
        }
        exportMap[exportName].push({
          name: exportName,
          path: stats.relativePath,
          type: 'default',
        });
      }
      
      // Extract named exports
      const namedExports = content.match(/export\s+(?:const|function|class|interface|type)\s+(\w+)/g);
      if (namedExports) {
        namedExports.forEach((exportLine) => {
          const match = exportLine.match(/(\w+)/);
          if (match) {
            const exportName = match[1];
            if (!exportMap[exportName]) {
              exportMap[exportName] = [];
            }
            exportMap[exportName].push({
              name: exportName,
              path: stats.relativePath,
              type: 'named',
            });
          }
        });
      }
    } catch (error) {
      // Skip files that can't be read
    }
  });
  
  Object.entries(exportMap).forEach(([name, exports]) => {
    if (exports.length > 1) {
      const uniquePaths = [...new Set(exports.map(e => e.path))];
      if (uniquePaths.length > 1) {
        results.conflicts.naming.push({
          name,
          exports,
          paths: uniquePaths,
          count: exports.length,
        });
      }
    }
  });
}

/**
 * Find broken imports
 */
function findBrokenImports(files) {
  files.forEach((filePath) => {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const stats = getFileStats(filePath);
      
      // Find all imports
      const importRegex = /from\s+['"]([^'"]+)['"]|require\s*\(\s*['"]([^'"]+)['"]\)/g;
      let match;
      
      while ((match = importRegex.exec(content)) !== null) {
        const importPath = match[1] || match[2];
        
        // Skip node_modules and external packages
        if (importPath.startsWith('.') || importPath.startsWith('@/')) {
          const resolvedPath = resolveImportPath(importPath, filePath);
          if (resolvedPath && !fs.existsSync(resolvedPath)) {
            results.conflicts.imports.push({
              file: stats.relativePath,
              import: importPath,
              resolvedPath,
            });
          }
        }
      }
    } catch (error) {
      // Skip files that can't be read
    }
  });
}

/**
 * Resolve import path
 */
function resolveImportPath(importPath, fromFile) {
  const fromDir = path.dirname(fromFile);
  
  if (importPath.startsWith('@/')) {
    // Resolve @/ alias (assuming it points to src/)
    const relativePath = importPath.replace('@/', '');
    const resolvedPath = path.join(SRC_DIR, relativePath);
    
    // Try with extensions
    for (const ext of ['.tsx', '.ts', '.jsx', '.js', '/index.tsx', '/index.ts']) {
      const fullPath = resolvedPath + ext;
      if (fs.existsSync(fullPath)) {
        return fullPath;
      }
    }
    
    return resolvedPath;
  } else if (importPath.startsWith('.')) {
    // Relative import
    const resolvedPath = path.resolve(fromDir, importPath);
    
    // Try with extensions
    for (const ext of ['.tsx', '.ts', '.jsx', '.js', '/index.tsx', '/index.ts']) {
      const fullPath = resolvedPath + ext;
      if (fs.existsSync(fullPath)) {
        return fullPath;
      }
    }
    
    return resolvedPath;
  }
  
  return null;
}

/**
 * Calculate statistics
 */
function calculateStats(files) {
  files.forEach((filePath) => {
    const stats = getFileStats(filePath);
    results.stats.totalFiles++;
    results.stats.totalSize += stats.size;
  });
}

/**
 * Main analysis function
 */
function analyzeProject() {
  console.log('🔍 بدء تحليل المشروع...\n');
  
  const files = getAllFiles(SRC_DIR);
  console.log(`📁 تم العثور على ${files.length} ملف\n`);
  
  // Calculate stats
  calculateStats(files);
  
  // Find duplicates by name
  console.log('🔍 البحث عن الملفات المكررة بالاسم...');
  findDuplicatesByName(files);
  console.log(`✅ تم العثور على ${results.duplicates.byName.length} ملف مكرر بالاسم\n`);
  
  // Find duplicates by content
  console.log('🔍 البحث عن الملفات المكررة بالمحتوى...');
  findDuplicatesByContent(files);
  console.log(`✅ تم العثور على ${results.duplicates.byContent.length} ملف مكرر بالمحتوى\n`);
  
  // Find old files
  console.log('🔍 البحث عن الملفات القديمة...');
  findOldFiles(files);
  console.log(`✅ تم العثور على ${results.oldFiles.length} ملف قديم\n`);
  
  // Find unused files
  console.log('🔍 البحث عن الملفات غير المستخدمة...');
  findUnusedFiles(files);
  console.log(`✅ تم العثور على ${results.unusedFiles.length} ملف غير مستخدم\n`);
  
  // Find naming conflicts
  console.log('🔍 البحث عن تعارضات الأسماء...');
  findNamingConflicts(files);
  console.log(`✅ تم العثور على ${results.conflicts.naming.length} تعارض في الأسماء\n`);
  
  // Find broken imports
  console.log('🔍 البحث عن imports مكسورة...');
  findBrokenImports(files);
  console.log(`✅ تم العثور على ${results.conflicts.imports.length} import مكسور\n`);
  
  return results;
}

// Run analysis
const analysisResults = analyzeProject();

// Save results to JSON
const outputPath = path.join(__dirname, '..', 'PROJECT_ANALYSIS.json');
fs.writeFileSync(outputPath, JSON.stringify(analysisResults, null, 2), 'utf8');
console.log(`\n✅ تم حفظ النتائج في ${outputPath}`);

// Export for use in report generation
export default analysisResults;

