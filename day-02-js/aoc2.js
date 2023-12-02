const gameResults = input.split('\n').reduce((acc, current) => {
  const [index, value] = current.replace('Game ', '').split(':');
  const results = value
    .replaceAll(';', ',')
    .split(',')
    .reduce(
      (acc, value) => {
        const [score, color] = value.trim().split(' ');
        const newColorValue = { [color]: [...acc[color], parseInt(score)] };
        return {
          ...acc,
          ...newColorValue,
        };
      },
      { blue: [], red: [], green: [] }
    );
  return {
    ...acc,
    [index]: results,
  };
}, {});

const answer = Object.entries(gameResults).reduce(({ answerOne, answerTwo }, [index, scores]) => {
  const blueScoreRequired = 14;
  const redScoreRequired = 12;
  const greenScoreRequired = 13;
  const maxBlue = Math.max(...scores.blue);
  const maxRed = Math.max(...scores.red);
  const maxGreen = Math.max(...scores.green);

  let newAnwserOne = answerOne;
  if (
    maxBlue <= blueScoreRequired &&
    maxRed <= redScoreRequired &&
    maxGreen <= greenScoreRequired
  ) {
    newAnwserOne = answerOne + parseInt(index);
  }
  const newAnwserTwo = answerTwo + (maxBlue * maxRed * maxGreen)
  return { answerOne: newAnwserOne, answerTwo: newAnwserTwo};
}, { answerOne: 0, answerTwo: 0 });


console.log(answer);
