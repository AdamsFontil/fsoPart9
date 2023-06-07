import diagnoses from '../data/diagnoses';

import { DiagnoseType } from '../types';

const getAllDiagnoses = () : DiagnoseType[] => {
  console.log('testing1----')
  return diagnoses;
};


export default {
  getAllDiagnoses
};
