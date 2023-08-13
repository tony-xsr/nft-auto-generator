const { createBackgroundNFT, generateNumber , genNFTsNumber } = require('./utilsImage.cjs');


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
}else if (arg == 'generateNumber'){
    let maxNumber = 10
    generateNumber(maxNumber);
} else if (arg == 'genNFTsNumber'){
    genNFTsNumber();
} 
 else {
  console.log('Please provide a function name as a command line argument.');
}