const { execSync } = require('child_process');
const path = require('path');

const migrations = {
  webdev: 'migrateWebDev.js',
  plt: 'migratePLT.js',
  mysql: 'migrateMySQL.js',
  php: 'migratePHP.js',
  dreamweaver: 'migrateDreamweaver.js',
  iwcd: 'migrateIWCD.js'
};

function runMigration(subject) {
  const scriptPath = path.join(__dirname, migrations[subject]);
  console.log(`\n🚀 Running ${subject.toUpperCase()} migration...`);
  
  try {
    execSync(`node "${scriptPath}"`, { stdio: 'inherit' });
    console.log(`✅ ${subject.toUpperCase()} migration completed successfully!\n`);
  } catch (error) {
    console.error(`❌ ${subject.toUpperCase()} migration failed:`, error.message);
  }
}

function runAllMigrations() {
  console.log('🎯 Starting all subject migrations...\n');
  
  Object.keys(migrations).forEach(subject => {
    runMigration(subject);
  });
  
  console.log('🎉 All migrations completed!');
}

// Get command line arguments
const args = process.argv.slice(2);
const subject = args[0];

if (!subject) {
  console.log('Usage: node runMigrations.js [subject|all]');
  console.log('Available subjects:', Object.keys(migrations).join(', '));
  console.log('Use "all" to run all migrations');
  process.exit(1);
}

if (subject === 'all') {
  runAllMigrations();
} else if (migrations[subject]) {
  runMigration(subject);
} else {
  console.log(`❌ Unknown subject: ${subject}`);
  console.log('Available subjects:', Object.keys(migrations).join(', '));
  process.exit(1);
}