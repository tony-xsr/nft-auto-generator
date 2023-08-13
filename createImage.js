const { createBackgroundNFT } = require('./utilsImage.cjs');


function createBackground(){
    console.log('CreateBackgroundNFT.');
    createBackgroundNFT();
}

// Read the command line argument
const arg = process.argv[2];

console.log('arg.'+ arg);
// Call the specific function if provided
if (arg == 'createBackground') {
    createBackground();
} else {
  console.log('Please provide a function name as a command line argument.');
}