const fs = require('fs');
const path = require('path');

const vowels = "aeiouAEIOU";

function count(text) {
  const words = text.trim().split(/\s+/);
  let vowelCount = 0;
  for (let ch of text.toLowerCase()) {
    if (vowels.includes(ch)) vowelCount++;
  }
  return { wordCount: words.length, vowelCount };
}

function readFilesRec(dirPath) {
  let totalWords = 0;
  let totalVowels = 0;

  const files = fs.readdirSync(dirPath);
  for (let file of files) {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      const result = readFilesRec(fullPath);
      totalWords += result.totalWords;
      totalVowels += result.totalVowels;
    } else if (file.endsWith('.txt')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const { wordCount, vowelCount } = count(content);
      totalWords += wordCount;
      totalVowels += vowelCount;
    }
  }

  return { totalWords, totalVowels };
}


const result = readFilesRec('./Task');
console.log(result.totalWords);
console.log(result.totalVowels);
