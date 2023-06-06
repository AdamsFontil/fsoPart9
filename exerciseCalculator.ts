interface result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}



const parseArguments2 = (args: string[]): number[] => {
  if (args.length <= 2) throw new Error('No exercise data provided');

  const numbers = args.slice(3).map(Number);

  if (numbers.some(isNaN)) {
    throw new Error('Provided values were not numbers!');
  }

  return numbers;
};

const exerciseCalculator = (array: Array<number>): result => {
  const periodLength = array.length;
  const trainingDays = array.filter(n => n > 0).length;
  const target = 2;
  let success;
  let rating;
  let total = 0;

  array.forEach((number) => {
    total += number;
  });

  const average = total / periodLength;

  if (average > target) {
    success = true;
    rating = 3;
  } else {
    success = false;
    rating = (target - average) > 0.5 ? 1 : 2;
  }

  let ratingDescription;

  switch (rating) {
    case 1:
      ratingDescription = 'you did poorly';
      break;
    case 2:
      ratingDescription = 'you were close';
      break;
    default:
      ratingDescription = 'fantastic you reached your goal';
      break;
  }

  const result: result = {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };

  return result;
};

try {
  const array = parseArguments2(process.argv);
  const result = exerciseCalculator(array);
  console.log(result);
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
