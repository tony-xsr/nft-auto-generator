const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');
const backgroundFolder = "background"
// Define the array of 12 colors
const colors = [
  // Primary Colors
  '#FF0000', // Red
  '#00FF00', // Green
  '#0000FF', // Blue

  // Secondary Colors
  '#FFFF00', // Yellow
  '#FF00FF', // Magenta
  '#00FFFF', // Cyan

  // Tertiary Colors
  '#FF8000', // Orange
  '#FF0080', // Rose
  '#80FF00', // Chartreuse
  '#00FF80', // Spring Green
  '#0080FF', // Azure
  '#8000FF', // Violet
];
// Function to create a background image
async function createBackgroundImage(color, index) {
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
    colors.forEach(async (color, index) => {
    await createBackgroundImage(color, index);
    });
    console.log('Images created and saved.');

}



// Export the function
module.exports = {
    createBackgroundNFT: createBackgroundNFT
};