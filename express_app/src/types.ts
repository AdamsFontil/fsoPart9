export interface DiagnoseType {
  code: string;
  name: string;
  latin?: string;
}

export interface PatientType {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
  entries: Entry[];

}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Nonbinary = 'nonbinary',
  Not_Listed = 'not listed',
}

export type NonSensitivePatientType = Omit<PatientType, 'ssn' | 'entries'>;

export type NewPatientEntry = Omit < PatientType, 'id' >

export interface Entry {
}
