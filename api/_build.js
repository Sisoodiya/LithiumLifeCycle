// This file is used by Vercel to build the API serverless functions
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Ensure the output directory exists
const outputDir = path.join(__dirname, '..', '.vercel', 'output', 'functions', 'api');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Build the API serverless function
console.log('Building API serverless function...');
execSync('esbuild api/index.js --platform=node --packages=external --bundle --format=esm --outfile=.vercel/output/functions/api/index.js', {
  stdio: 'inherit'
});

console.log('API build complete!');
