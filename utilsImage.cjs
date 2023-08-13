const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const backgroundFolder = "background"
const numberFolder = "numbers"
const compositeFolder = "results"
// Define the array of 12 colors
const colors = [
  // Primary Colors
  { value: '#FF0000', name: 'Red' },
  { value: '#00FF00', name: 'Green' },
  { value: '#0000FF', name: 'Blue' },

  // Secondary Colors
  { value: '#FFFF00', name: 'Yellow' },
  { value: '#FF00FF', name: 'Magenta' },
  { value: '#00FFFF', name: 'Cyan' },

  // Tertiary Colors
  { value: '#FF8000', name: 'Orange' },
  { value: '#FF0080', name: 'Rose' },
  { value: '#80FF00', name: 'Chartreuse' },
  { value: '#00FF80', name: 'Spring Green' },
  { value: '#0080FF', name: 'Azure' },
  { value: '#8000FF', name: 'Violet' },
];


// Function to get the color name by index
function getColorName(index) {
  if (index >= 0 && index < colors.length) {
    return colors[index].name;
  }
  return 'Unknown';
}

// List all files in a directory
function listFilesInDirectory(directory) {
  return fs.readdirSync(directory);
}
 
// Function to get a random integer between min (inclusive) and max (inclusive)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
} 
// Function to create a background svg image
// Function to create an SVG background image
async function createBackgroundSVG(color, name) {
  const svgWidth = 1024;
  const svgHeight = 1024;

  // Create SVG content
  let svgContent = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n`;
  svgContent += `<svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">\n`;

  // Set background color
  svgContent += `  <rect width="100%" height="100%" fill="${color}" />\n`;

  svgContent += '</svg>';

  // Save SVG content to a file
  const svgPath = path.join(__dirname, backgroundFolder, `${name}.svg`);
  fs.writeFileSync(svgPath, svgContent);

  console.log(`SVG image created: ${svgPath}`);
}

async function createBackgroundImagePNG(color, index) {
    const canvas = createCanvas(1024, 1024);
    const ctx = canvas.getContext('2d');
  
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  
    const imageBuffer = canvas.toBuffer();
  
    // Save the image to a folder
    const imagePath = path.join(__dirname, backgroundFolder, `bg_${index}.png`);
    // Save the image buffer to a file or use it as needed
    fs.writeFileSync(imagePath, imageBuffer);
  }
  

function createBackgroundNFT(){
    console.log('createBackgroundNFT.');
    // Create a folder to save the images
    const imagesFolder = path.join(__dirname, backgroundFolder);
    fs.mkdirSync(imagesFolder, { recursive: true });
    // Create and save images for each color
    colors.forEach(async (colorObj, index) => {
      await createBackgroundSVG(colorObj.value, colorObj.name);
    });
    console.log('Images created and saved.');

}


function generateSVG(number) {
  const svgWidth = 1024;
  const svgHeight = 1024;

  const maxFontSize = 100;
  const fontSize = Math.min(maxFontSize, Math.floor(svgWidth / (number.toString().length * 0.6)));

  let svgContent = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n`;
  svgContent += `<svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">\n`;

  // Set transparent background
  svgContent += '  <rect width="100%" height="100%" fill="none" />\n';

  // Add text element for the number
  const x = svgWidth / 2;
  const y = svgHeight / 2;
  svgContent += `  <text x="${x}" y="${y}" font-family="Arial" font-size="${fontSize}" fill="black" text-anchor="middle" alignment-baseline="middle">${number}</text>\n`;

  svgContent += '</svg>';

  return svgContent;
}

// Create an SVG content for a given number
function generateSVGWithFixedFont(number) {
  const svgWidth = 1024;
  const svgHeight = 1024;

  let svgContent = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n`;
  svgContent += `<svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">\n`;

  // Set transparent background
  svgContent += '  <rect width="100%" height="100%" fill="none" />\n';

  // Add text element for the number
  const fontSize = 36;
  const x = svgWidth / 2;
  const y = svgHeight / 2;
  svgContent += `  <text x="${x}" y="${y}" font-family="Arial" font-size="${fontSize}" fill="black" text-anchor="middle" alignment-baseline="middle">${number}</text>\n`;

  svgContent += '</svg>';

  return svgContent;
}


function generateNumber(max){
  const imagesFolder = path.join(__dirname, numberFolder);
  fs.mkdirSync(imagesFolder, { recursive: true });
  // Generate SVG images and save them
  for (let i = 0; i <= max; i++) {
    const svgContent = generateSVG(i);
    const filename = `${i}.svg`;
    const imagePath = path.join(__dirname, numberFolder, filename);
    fs.writeFileSync(imagePath, svgContent);
    console.log(`SVG image created: ${filename}`);
  }
}



 
 

// Function to merge SVG background and number and save as PNG
async function mergeBackgroundAndNumber(background, number, index) {
  const backgroundPath = path.join(__dirname, backgroundFolder, background);
  const numberPath = path.join(__dirname, numberFolder, number);
  const compositePath = path.join(__dirname, compositeFolder, `${background}_${number}.png`);

  // Merge background and number using sharp
  await sharp(backgroundPath)
    .composite([{ input: numberPath, blend: 'over' }])
    .toFile(compositePath);

  console.log(`Composite image created: ${compositePath}`);
}

function createCompositeImages() {
  console.log('Creating composite images...');
  // Create a folder to save the composite images
  const compositeImagesFolder = path.join(__dirname, compositeFolder);
  fs.mkdirSync(compositeImagesFolder, { recursive: true });

  const backgroundFiles = listFilesInDirectory(path.join(__dirname, backgroundFolder));
  const numberFiles = listFilesInDirectory(path.join(__dirname, numberFolder));

  // Merge and save composite images for each background and number
  numberFiles.forEach(async (number) => {
    const randomBackgroundIndex = getRandomInt(0, backgroundFiles.length - 1);
    const background = backgroundFiles[randomBackgroundIndex];
    await mergeBackgroundAndNumber(background, number, randomBackgroundIndex);
  });

  console.log('Composite images created and saved.');
}



// Export the function
module.exports = {
    createBackgroundNFT: createBackgroundNFT,
    generateNumber:generateNumber,
    genNFTsNumber: createCompositeImages
};