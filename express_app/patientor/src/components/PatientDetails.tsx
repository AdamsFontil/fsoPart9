import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientService from "../services/patients";
import { Patient } from "../types";

const PatientDetails = () => {
  const { id } = useParams<{ id?: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const onePatient = await patientService.getOne(id ?? "");
        // console.log('Patient details:', onePatient);
        setPatient(onePatient)
      } catch (error) {
        console.log('Error fetching patient details:', error);
        setPatient(null);
        return (
          <div>Patient not found</div>
        )
      }
    })();
  }, [id]);

  console.log('patient from PD comp is---', patient);

  return (
    <div>
    {patient && (
      <div>
        <h1>Patient Details</h1>
        <p>Name: {patient.name}</p>
        <p>Gender: {patient.gender}</p>
        <p>SSN: {patient.ssn}</p>
        <p>Occupation: {patient.occupation}</p>
        <p>Date of Birth: {patient.dateOfBirth}</p>
      </div>
    )}
  </div>
  );
};

export default PatientDetails;
