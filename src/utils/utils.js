 
// ============= ARRAY FUNCTIONS ============= //

// Generate random number between min and max (both included)
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Return a random element from an array.
const getRandomElement = (array) => {
  const randomIndex = getRandomNumber(0, array.length-1);
  return array[randomIndex];
}

const getLastElement = (array) => {
  const lastIndex = array.length-1;
  return array[lastIndex];
}


// ============= MATH FUNCTIONS ============= //

const roundUp = (number) => {
  return Math.ceil(number);
}


// ============= PRINT FUNCTIONS ============= //

const printTitle = (title) =>
{
    // console.log("\n\n====================================================\n");

    // Dark blue, bold and underlined.
    console.log('\x1b[34m\x1b[1m\x1b[4m%s\x1b[0m', title);
}

const printSubTitle = (subTitle) =>
{
    // Cyan
    console.log('\n\x1b[36m%s\x1b[0m\n', subTitle);
}

const print = (text) => {
  console.log(text);
}

module.exports = {
  getRandomNumber,
  getRandomElement,
  getLastElement,
  printTitle,
  printSubTitle,
  print,
  roundUp
} 