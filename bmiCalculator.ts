interface bmiValues {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): bmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}



const bmiCalculator = (height: number, weight: number): string => {
  const result: number = (weight / (height ** 2)) * 10000
  console.log('height----', height);
  console.log('weight----', weight);
  console.log('result---', result)
  if (result < 18.5) {
    return 'underweight'
  } else if (result < 24.9) {
    return 'normal weight'
  } else if (result < 29.9) {
    return 'overweight'
  } else {
    return 'obese'
  }
}

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(bmiCalculator(height, weight));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong: ';
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
