import express from 'express';
import diagnosesService from '../services/diagnosesService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diagnosesService.getAllDiagnoses());
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const diagnose = diagnosesService.getOneDiagnose(id);

  if (diagnose) {
    res.send(diagnose);
  } else {
    res.status(404).send('diagnose not found');
  }
});

router.post('/', (_req, res) => {
    res.send('Saving a diary!');
});

export default router;
