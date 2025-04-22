const fs = require("fs");
const path = require("path");

const baseDir = path.join(__dirname, "img", "CharacterCreatorMZ");
const categories = fs.readdirSync(baseDir).filter(folder => {
  const fullPath = path.join(baseDir, folder);
  return fs.existsSync(fullPath) && fs.statSync(fullPath).isDirectory();
});

const result = {};

categories.forEach(category => {
  const categoryPath = path.join(baseDir, category);
  const usageTypes = ["walk", "face", "sv", "dead"];
  const partsSet = new Set();

  usageTypes.forEach(type => {
    const typePath = path.join(categoryPath, type);
    if (fs.existsSync(typePath) && fs.statSync(typePath).isDirectory()) {
      const files = fs.readdirSync(typePath).filter(file => file.endsWith(".png"));
      files.forEach(file => partsSet.add(file));
    }
  });

  result[category] = Array.from(partsSet);
});

const outputPath = path.join(baseDir, "parts.json");
fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));

console.log(`✅ parts.json generated! Found: ${Object.keys(result).length} categories.`);
Object.entries(result).forEach(([category, files]) => {
  console.log(`🗂️ ${category}: ${files.length} parts`);
});
