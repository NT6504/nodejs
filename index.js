const process = require('process');
const crypto = require('crypto');

// Function
function calculate(operation, operands) {
  switch (operation) {
    case 'add':
      return operands.reduce((acc, num) => acc + Number(num), 0);
    case 'sub':
      return operands.reduce((acc, num, index) => (index === 0 ? num : acc - Number(num)), 0);
    case 'mult':
      return operands.reduce((acc, num) => acc * Number(num), 1);
    case 'divide':
      if (operands[1] === '0') {
        return 'Error: Division by zero';
      }
      return operands.reduce((acc, num, index) => (index === 0 ? num : acc / Number(num)), 0);
    case 'sin':
    case 'cos':
    case 'tan':
      const num = Number(operands[0]);
      const radians = num * Math.PI / 180;  // Convert to radians
      switch (operation) {
        case 'sin':
          return Math.sin(radians);
        case 'cos':
          return Math.cos(radians);
        case 'tan':
          if (Math.cos(radians) === 0) {
            return 'Error: Tangent undefined at PI/2 + k*PI';
          }
          return Math.tan(radians);
      }
    case 'random':
      const length = operands.length > 1 ? Number(operands[1]) : 0;
      if (length === 0) {
        return 'Provide length for random number generation.';
      }
      return crypto.randomBytes(length).toString('hex');
    default:
      return 'Invalid operation';
  }
}

// Retrieve and validate arguments
const args = process.argv.slice(2);
if (args.length < 2 || args.length > 3) {
  console.error('Usage: node index.js <operation> <number1> [<number2>]');
  process.exit(1);
}

const operation = args[0].toLowerCase();
const operands = args.slice(1);

// Perform calculation and handle errors
try {
  const result = calculate(operation, operands);
  console.log(result);
} catch (error) {
  console.error(error.message);
}
