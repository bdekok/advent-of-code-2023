input
  .split('\n')
  .map((row) => row.replace(/[^0-9]/g, ''))
  .map((row) => parseInt(row[0] + row[row.length - 1]))
  .reduce((acc, val) => acc + val, 0);

/* two */

const numberMapping = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
};
input
  .split('\n')
  .map((row) => {
    let numbers = '';
    let letters = '';
    for (const letter of row) {
      letters += letter;

      for (const [key, value] of Object.entries(numberMapping)) {
        if (letters.includes(value) || letters.includes(key)) {
          numbers += value;
          letters = key.substring(1);
        }
      }
    }
    return numbers;
  })
  .map((row) => parseInt(row[0] + row[row.length - 1]))
  .reduce((acc, val) => acc + val, 0);
