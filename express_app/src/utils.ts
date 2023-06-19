import { HealthCheckEntry } from '../patientor/src/types';
import {
  NewPatientEntry,
  Gender,
  DiagnoseType,
  Entry,
  HealthCheckRating,
  HospitalEntry,
  OccupationalHealthcareEntry,
  EntryWithoutId,
  Discharge,
  sickLeave,
} from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isNumber = (text: unknown): text is number => {
  return typeof text === 'number' || text instanceof Number;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }

  return occupation;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }

  return name;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }

  return ssn;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).includes(param as Gender);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender as Gender;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth)) {
    throw new Error('Incorrect or missing dateOfBirth: ' + dateOfBirth);
  }
  return dateOfBirth;
};

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'occupation' in object &&
    'dateOfBirth' in object &&
    'name' in object &&
    'ssn' in object &&
    'gender' in object
  ) {
    const newEntry: NewPatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: [],
    };

    return newEntry;
  }

  throw new Error('Incorrect data: some fields are missing');
};

const parseDiagnosisCodes = (object: unknown): Array<DiagnoseType['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // We will just trust the data to be in the correct form
    return [] as Array<DiagnoseType['code']>;
  }

  return object.diagnosisCodes as Array<DiagnoseType['code']>;
};



const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing description: ' + description);
  }
  return description;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist: ' + specialist);
  }
  return specialist;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error('Incorrect or missing employerName: ' + employerName);
  }
  return employerName;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || typeof discharge !== 'object') {
    throw new Error('Incorrect or missing discharge: ' + discharge);
  }

  const { date, criteria } = discharge as Discharge;

  if (!date || !criteria || typeof date !== 'string' || typeof criteria !== 'string') {
    throw new Error('Incorrect or missing discharge: ' + discharge);
  }

  return {
    date,
    criteria,
  };
};

const parseSickLeave = (sickLeave: unknown): sickLeave => {
  if (!sickLeave || typeof sickLeave !== 'object') {
    throw new Error('Incorrect or missing sickLeave: ' + sickLeave);
  }

  const { startDate, endDate } = sickLeave as sickLeave;

  if (!startDate || !endDate || typeof startDate !== 'string' || typeof endDate !== 'string') {
    throw new Error('Incorrect or missing sickLeave: ' + sickLeave);
  }

  return {
    startDate,
    endDate
  };
};



const isType = (param: unknown): param is Entry['type'] => {
  return ['Hospital', 'OccupationalHealthcare', 'HealthCheck'].includes(param as string);
};

const parseType = (type: unknown): Entry['type'] => {
  if (!type || !isString(type) || !isType(type)) {
    throw new Error('Incorrect or missing type: ' + type);
  }
  return type as Entry['type'];
};

const isHealthCheckRating = (param: unknown): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param as HealthCheckRating);
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
  if (!healthCheckRating || !isNumber(healthCheckRating) || !isHealthCheckRating(healthCheckRating)) {
    throw new Error('Incorrect or missing healthCheckRating: ' + healthCheckRating);
  }
  return healthCheckRating as HealthCheckRating;
};


  const toNewEntry = (object: unknown): EntryWithoutId => {
    if (!object || typeof object !== 'object') {
      throw new Error('Incorrect or missing data');
    }

    if (
      'date' in object &&
      'specialist' in object &&
      'description' in object &&
      'diagnosisCodes' in object &&
      'type' in object
    ) {
      const type = parseType(object.type);

      switch (type) {
        case 'Hospital':
          if (!('discharge' in object)) {
            throw new Error('Incorrect or missing discharge');
          }
          return {

            date: parseDate(object.date),
            description: parseDescription(object.description),
            specialist: parseSpecialist(object.specialist),
            type,
            diagnosisCodes: parseDiagnosisCodes(object),
            discharge: parseDischarge(object.discharge),
          } as unknown as HospitalEntry;
        case 'OccupationalHealthcare':
          if (!('employerName' in object)) {
            throw new Error('Incorrect or missing employerName');
          } else  if (!('sickLeave' in object)) {
            throw new Error('Missing Sick Leave');
          }

          return {

            date: parseDate(object.date),
            description: parseDescription(object.description),
            specialist: parseSpecialist(object.specialist),
            type,
            diagnosisCodes: parseDiagnosisCodes(object),
            employerName: parseEmployerName(object.employerName),
            sickLeave: parseSickLeave(object.sickLeave)
          } as OccupationalHealthcareEntry;
        case 'HealthCheck':
          if (!('healthCheckRating' in object)) {
            throw new Error('Incorrect or missing healthCheckRating');
          }
          return {

            date: parseDate(object.date),
            description: parseDescription(object.description),
            specialist: parseSpecialist(object.specialist),
            type,
            diagnosisCodes: parseDiagnosisCodes(object),
            healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
          } as HealthCheckEntry;
        default:
          throw new Error('Invalid entry type');
      }
    }

    throw new Error('Incorrect data: some fields are missing');
  };



export { toNewPatientEntry, toNewEntry };
