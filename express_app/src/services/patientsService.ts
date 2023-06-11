import patients from '../data/patients';
import { v1 as uuid } from 'uuid'

import { NonSensitivePatientType, PatientType, NewPatientEntry } from '../types';

const getPatientsNoSnn = () : NonSensitivePatientType[] => {
  console.log('testing2-----')
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
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
  addPatient
};
