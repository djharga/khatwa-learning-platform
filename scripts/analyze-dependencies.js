import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load package.json
const packageJsonPath = path.join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Analyze dependencies
function analyzeDependencies() {
  const results = {
    outdated: [],
    duplicate: [],
    unused: [],
    conflicts: [],
    recommendations: [],
  };

  // Check for outdated packages
  const dependencies = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  };

  // Check Next.js version
  if (packageJson.dependencies.next) {
    const nextVersion = packageJson.dependencies.next;
    const latestNextVersion = '14.2.10';
    if (nextVersion !== `^${latestNextVersion}` && nextVersion !== latestNextVersion) {
      results.outdated.push({
        name: 'next',
        current: nextVersion,
        recommended: `^${latestNextVersion}`,
        reason: 'Next.js 14.2.10 is outdated (learn more)',
      });
    }
  }

  // Check React version compatibility
  const reactVersion = packageJson.dependencies.react;
  const reactDomVersion = packageJson.dependencies['react-dom'];
  
  if (reactVersion && reactDomVersion) {
    const reactMajor = reactVersion.match(/^(\d+)/)?.[1];
    const reactDomMajor = reactDomVersion.match(/^(\d+)/)?.[1];
    
    if (reactMajor !== reactDomMajor) {
      results.conflicts.push({
        type: 'version-mismatch',
        packages: ['react', 'react-dom'],
        versions: [reactVersion, reactDomVersion],
        issue: 'React and React DOM versions must match',
      });
    }
  }

  // Check for duplicate packages (same package in dependencies and devDependencies)
  Object.keys(packageJson.dependencies || {}).forEach(dep => {
    if (packageJson.devDependencies && packageJson.devDependencies[dep]) {
      results.duplicate.push({
        name: dep,
        inDependencies: packageJson.dependencies[dep],
        inDevDependencies: packageJson.devDependencies[dep],
      });
    }
  });

  // Recommendations
  if (results.outdated.length > 0) {
    results.recommendations.push({
      priority: 'high',
      action: 'تحديث Next.js إلى الإصدار الأحدث',
      reason: 'الإصدار الحالي قديم وقد يحتوي على ثغرات أمنية',
    });
  }

  if (results.conflicts.length > 0) {
    results.recommendations.push({
      priority: 'critical',
      action: 'تطابق إصدارات React و React DOM',
      reason: 'عدم التطابق قد يسبب مشاكل في runtime',
    });
  }

  if (results.duplicate.length > 0) {
    results.recommendations.push({
      priority: 'medium',
      action: 'حذف التكرار من devDependencies',
      reason: 'الحزم الموجودة في dependencies لا يجب أن تكون في devDependencies',
    });
  }

  return results;
}

// Analyze and save
const dependencyAnalysis = analyzeDependencies();
const outputPath = path.join(__dirname, '..', 'DEPENDENCY_ANALYSIS.json');
fs.writeFileSync(outputPath, JSON.stringify(dependencyAnalysis, null, 2), 'utf8');

console.log('✅ تم تحليل dependencies بنجاح');
console.log(`📦 النتائج: ${JSON.stringify(dependencyAnalysis, null, 2)}`);

export default dependencyAnalysis;

