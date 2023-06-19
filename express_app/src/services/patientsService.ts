import patients from '../data/patients';
import { v1 as uuid } from 'uuid'

import { NonSensitivePatientType, PatientType, NewPatientEntry, Entry, EntryWithoutId } from '../types';
// import { HealthCheckEntry } from '../../patientor/src/types';

const getPatientsNoSnn = () : NonSensitivePatientType[] => {
  console.log('testing2-----')
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const getOnePatient = (id: string): PatientType | undefined => {
  console.log('id--', id);

  const patient = patients.find(patient => patient.id === id);
  console.log('patient--', patient)

  if (patient) {
    return { ...patient };
  }

  return undefined;
};

const getEntries = (id: string): Entry[] | undefined => {
  console.log('id--', id);

  const patient = patients.find(patient => patient.id === id);
  console.log('name', patient?.name)
  console.log('patient--', patient?.entries)


  if (patient) {
    return { ...patient?.entries };
  }

  return undefined;
};


const addEntry = (entry: EntryWithoutId, id: string): Entry => {
  const patient = patients.find(patient => patient.id === id);
  console.log('patient---', patient)
  const idForEntry = uuid();
  const newEntry: Entry = {
    id: idForEntry,
    ...entry
  };
  console.log('has id', id)
  console.log(newEntry)
  console.log('entries are----', patient?.entries)

  if (patient && patient.entries) {
    patient.entries.push(newEntry);
  }

  return newEntry;
};






const addPatient = (entry: NewPatientEntry): PatientType => {
  const id = uuid();
  const newPatientEntry: PatientType = {
    id,
    ...entry,
  };
  console.log('has id', id)

  patients.push(newPatientEntry);
  return newPatientEntry;
};


export default {
  getPatientsNoSnn,
  addPatient,
  getOnePatient,
  getEntries,
  addEntry
};
