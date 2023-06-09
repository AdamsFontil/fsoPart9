import express from 'express';
import patientsService from '../services/patientsService';
import { toNewPatientEntry ,toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getPatientsNoSnn());
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const patient = patientsService.getOnePatient(id);

  if (patient) {
    res.send(patient);
  } else {
    res.status(404).send('Patient not found');
  }
});





router.post('/', (req, res) => {
  try {
    console.log('adding new patient', req.body)
    const newPatientEntry = toNewPatientEntry(req.body);

    const addedEntry = patientsService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});


router.post('/:id/entries', (req, res) => {
  try {
    const id = req.params.id;
    // const entries = patientsService.getEntries(id);
    console.log('adding new entry for patient', req.body)
    const newEntry = toNewEntry(req.body);

    const addedEntry = patientsService.addEntry(newEntry, id);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.get('/:id/entries', (req, res) => {
  const id = req.params.id;
  const entries = patientsService.getEntries(id);

  if (entries) {
    res.send(entries);
  } else {
    res.status(404).send('no entries found');
  }
});

export default router;
