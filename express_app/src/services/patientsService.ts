import patients from '../data/patients';

import { NonSensitivePatientType } from '../types';

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


export default {
  getPatientsNoSnn
};
