import express from 'express';
import { bmiCalculator } from './bmiCalculator';
import { exerciseCalculator } from './exerciseCalculator';

const app = express();
app.use(express.json());

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


app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    return res.status(400).json({ error: 'malformated parameters' });
  }

  const result = exerciseCalculator(daily_exercises, target);
  return res.json(result);
});



const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
