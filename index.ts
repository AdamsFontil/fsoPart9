import express from 'express';
import { bmiCalculator } from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello FullStack');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight) || (!height || !weight)) {
    res.status(400).send('malformatted parameters');
    return;
  }

  const result = bmiCalculator(height, weight);
  res.json({ weight, height, result });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
