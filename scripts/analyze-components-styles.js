#!/usr/bin/env node

/**
 * تحليل شامل لمجلدي /components و /styles
 * يكتشف المكونات غير المستخدمة، المكررة، وملفات الأنماط
 */

const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = path.join(__dirname, '..');
const COMPONENTS_DIR = path.join(PROJECT_ROOT, 'src', 'components');
const STYLES_DIR = path.join(PROJECT_ROOT, 'src', 'styles');
const SRC_DIR = path.join(PROJECT_ROOT, 'src');

// ============================================
// Helper Functions
// ============================================

function getAllFiles(dir, extensions = ['.tsx', '.ts', '.jsx', '.js']) {
  const files = [];
  if (!fs.existsSync(dir)) return files;

  try {
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      try {
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
          files.push(...getAllFiles(fullPath, extensions));
        } else if (extensions.some(ext => item.endsWith(ext))) {
          files.push(fullPath);
        }
      } catch (e) {
        // Skip if can't read
      }
    }
  } catch (e) {
    // Skip if can't read directory
  }
  return files;
}

function getComponentName(filePath) {
  try {
    const fileName = path.basename(filePath, path.extname(filePath));
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Try to find export default
    const defaultExportMatch = content.match(/export\s+default\s+(?:function\s+)?(\w+)/);
    if (defaultExportMatch) return defaultExportMatch[1];
    
    // Try named export
    const namedExportMatch = content.match(/export\s+(?:const|function)\s+(\w+)/);
    if (namedExportMatch) return namedExportMatch[1];
    
    // Fallback to filename (PascalCase)
    return fileName.split(/[-_]/).map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join('');
  } catch (e) {
    return path.basename(filePath, path.extname(filePath));
  }
}

function normalizePath(filePath) {
  return path.relative(PROJECT_ROOT, filePath).replace(/\\/g, '/');
}

function searchInFiles(searchPattern, excludePaths = []) {
  const results = [];
  const allFiles = getAllFiles(SRC_DIR, ['.tsx', '.ts', '.jsx', '.js']);
  
  for (const file of allFiles) {
    const relativePath = normalizePath(file);
    if (excludePaths.some(ex => relativePath.includes(ex))) continue;
    
    try {
      const content = fs.readFileSync(file, 'utf-8');
      
      // Check for import statements
      const importRegex = new RegExp(searchPattern, 'g');
      if (importRegex.test(content)) {
        // Extract import lines
        const lines = content.split('\n');
        lines.forEach((line, index) => {
          if (importRegex.test(line)) {
            results.push({
              file: relativePath,
              line: index + 1,
              content: line.trim(),
            });
          }
        });
      }
    } catch (e) {
      // Skip if can't read
    }
  }
  
  return results;
}

// ============================================
// Component Analysis
// ============================================

function analyzeComponents() {
  console.log('🔍 تحليل المكونات...\n');
  
  const componentFiles = getAllFiles(COMPONENTS_DIR, ['.tsx', '.ts']);
  const components = [];
  const unused = [];
  const duplicates = [];
  const namingConflicts = [];

  for (const filePath of componentFiles) {
    const relativePath = normalizePath(filePath);
    const fileName = path.basename(filePath);
    const componentName = getComponentName(filePath);
    const dirName = path.basename(path.dirname(filePath));
    
    // Skip index files and data files
    if (fileName === 'index.ts' || fileName === 'index.tsx' || fileName.endsWith('-data.ts')) {
      continue;
    }

    // Build search patterns
    const baseName = fileName.replace(/\.(tsx|ts)$/, '');
    const searchPatterns = [
      // Direct import by name
      `from ['"].*${baseName}['"]`,
      `from ['"].*${componentName}['"]`,
      // Import with @/components path
      `@/components/${relativePath.replace(/^src\/components\//, '')}`,
      // Import with relative path
      `components/${relativePath.replace(/^src\/components\//, '')}`,
      // Dynamic import
      `import\\(['"].*${baseName}['"]\\)`,
      `import\\(['"].*${componentName}['"]\\)`,
    ];

    let isUsed = false;
    let usageLocations = [];

    for (const pattern of searchPatterns) {
      const matches = searchInFiles(pattern, ['node_modules', relativePath]);
      if (matches.length > 0) {
        isUsed = true;
        usageLocations.push(...matches.map(m => m.file));
      }
    }

    // Also check for JSX usage
    const jsxPattern = `<${componentName}[\\s>]`;
    const jsxMatches = searchInFiles(jsxPattern, ['node_modules', relativePath]);
    if (jsxMatches.length > 0) {
      isUsed = true;
      usageLocations.push(...jsxMatches.map(m => m.file));
    }

    components.push({
      name: componentName,
      fileName,
      path: relativePath,
      dirName,
      isUsed,
      usageLocations: [...new Set(usageLocations)],
    });

    if (!isUsed && !fileName.includes('data') && !fileName.includes('index')) {
      unused.push({
        name: componentName,
        fileName,
        path: relativePath,
        expectedUsage: dirName === 'components' ? 'Root component' : `In ${dirName} related pages`,
      });
    }
  }

  // Check for naming conflicts
  const nameMap = {};
  for (const comp of components) {
    if (!nameMap[comp.name]) {
      nameMap[comp.name] = [];
    }
    nameMap[comp.name].push(comp);
  }

  for (const [name, comps] of Object.entries(nameMap)) {
    if (comps.length > 1) {
      namingConflicts.push({
        name,
        files: comps.map(c => c.path),
      });
    }
  }

  // Find duplicate components (similar file names)
  const fileGroups = {};
  for (const comp of components) {
    const baseName = comp.fileName.replace(/\.(tsx|ts)$/, '').toLowerCase();
    if (!fileGroups[baseName]) {
      fileGroups[baseName] = [];
    }
    fileGroups[baseName].push(comp);
  }

  for (const [baseName, group] of Object.entries(fileGroups)) {
    if (group.length > 1) {
      duplicates.push({
        baseName,
        components: group.map(c => ({
          name: c.name,
          path: c.path,
          isUsed: c.isUsed,
        })),
        similarity: 'Same base filename',
      });
    }
  }

  return { components, unused, duplicates, namingConflicts };
}

// ============================================
// Style Analysis
// ============================================

function analyzeStyles() {
  console.log('🎨 تحليل ملفات الأنماط...\n');
  
  const styleFiles = getAllFiles(STYLES_DIR, ['.css', '.scss', '.sass']);
  const styles = [];
  const unused = [];
  const duplicateClasses = [];
  const orphanedClasses = [];

  // Check which CSS files are imported
  const allSrcFiles = getAllFiles(SRC_DIR, ['.tsx', '.ts', '.jsx', '.js']);
  const importedStyles = new Set();

  for (const file of allSrcFiles) {
    try {
      const content = fs.readFileSync(file, 'utf-8');
      // Match import statements for CSS files
      const importMatches = content.matchAll(/import\s+['"].*styles\/([^'"]+)['"]/g);
      for (const match of importMatches) {
        importedStyles.add(match[1]);
      }
    } catch (e) {
      // Skip
    }
  }

  // Analyze each style file
  for (const filePath of styleFiles) {
    const relativePath = normalizePath(filePath);
    const fileName = path.basename(filePath);
    
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      
      // Extract CSS classes
      const classMatches = content.matchAll(/\.([a-zA-Z0-9_-]+)\s*\{/g);
      const classes = Array.from(classMatches).map(m => m[1]);

      const isImported = Array.from(importedStyles).some(imp => 
        imp.includes(fileName) || fileName.includes(imp.replace(/\.(css|scss|sass)$/, ''))
      );

      styles.push({
        fileName,
        path: relativePath,
        isImported,
        classCount: classes.length,
        classes: classes.slice(0, 30), // First 30 classes
      });

      if (!isImported) {
        unused.push({
          fileName,
          path: relativePath,
          classCount: classes.length,
        });
      }

      // Check for orphaned classes (classes not used in components)
      for (const className of classes.slice(0, 50)) { // Limit check to first 50
        const usagePattern = `['"\`]${className}['"\`]|className.*${className}`;
        const usage = searchInFiles(usagePattern, ['node_modules', 'styles']);
        if (usage.length === 0) {
          orphanedClasses.push({
            className,
            file: relativePath,
          });
        }
      }
    } catch (e) {
      console.warn(`⚠️  Cannot read ${filePath}: ${e.message}`);
    }
  }

  return { styles, unused, duplicateClasses: [], orphanedClasses };
}

// ============================================
// Main Analysis
// ============================================

function main() {
  console.log('🚀 بدء التحليل الشامل...\n');
  console.log('='.repeat(60));

  const componentAnalysis = analyzeComponents();
  const styleAnalysis = analyzeStyles();

  // Generate report
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      components: {
        total: componentAnalysis.components.length,
        used: componentAnalysis.components.filter(c => c.isUsed).length,
        unused: componentAnalysis.unused.length,
        duplicates: componentAnalysis.duplicates.length,
        namingConflicts: componentAnalysis.namingConflicts.length,
      },
      styles: {
        total: styleAnalysis.styles.length,
        imported: styleAnalysis.styles.filter(s => s.isImported).length,
        unused: styleAnalysis.unused.length,
        orphanedClasses: styleAnalysis.orphanedClasses.length,
      },
    },
    components: {
      unused: componentAnalysis.unused,
      duplicates: componentAnalysis.duplicates,
      namingConflicts: componentAnalysis.namingConflicts,
    },
    styles: {
      unused: styleAnalysis.unused,
      orphanedClasses: styleAnalysis.orphanedClasses.slice(0, 100), // Limit to 100
    },
  };

  // Save JSON report
  const reportPath = path.join(PROJECT_ROOT, 'COMPONENTS_STYLES_ANALYSIS.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf-8');
  console.log(`\n✅ تم حفظ التقرير في: ${reportPath}\n`);

  // Print summary
  console.log('='.repeat(60));
  console.log('📊 ملخص التحليل:\n');
  console.log(`المكونات:`);
  console.log(`  - الإجمالي: ${report.summary.components.total}`);
  console.log(`  - المستخدمة: ${report.summary.components.used}`);
  console.log(`  - غير المستخدمة: ${report.summary.components.unused}`);
  console.log(`  - المكررة: ${report.summary.components.duplicates}`);
  console.log(`  - تعارضات الأسماء: ${report.summary.components.namingConflicts}`);
  console.log(`\nالأنماط:`);
  console.log(`  - الإجمالي: ${report.summary.styles.total}`);
  console.log(`  - المستوردة: ${report.summary.styles.imported}`);
  console.log(`  - غير المستوردة: ${report.summary.styles.unused}`);
  console.log(`  - الكلاسات اليتيمة: ${report.summary.styles.orphanedClasses}`);
  console.log('='.repeat(60));

  return report;
}

if (require.main === module) {
  main();
}

module.exports = { analyzeComponents, analyzeStyles };
