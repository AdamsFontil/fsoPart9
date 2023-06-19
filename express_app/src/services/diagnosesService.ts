import diagnoses from '../data/diagnoses';

import { DiagnoseType } from '../types';

const getAllDiagnoses = () : DiagnoseType[] => {
  console.log('testing1----')
  return diagnoses;
};


const getOneDiagnose = (id: string): DiagnoseType | undefined => {
  console.log('id--', id);

  const diagnose = diagnoses.find(diagnose => diagnose.code === id);
  console.log('diagnose--', diagnose)

  if (diagnose) {
    return { ...diagnose };
  }

  return undefined;
};


export default {
  getAllDiagnoses,
  getOneDiagnose
};
