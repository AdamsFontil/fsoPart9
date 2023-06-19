import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientService from "../services/patients";
import { Diagnosis, HealthCheckRating, Patient } from "../types";
import EntryDetails from "./EntryDetails";
import { Alert, Button, MenuItem, Select, TextField } from "@mui/material";

const PatientDetails = () => {
  const { id } = useParams<{ id?: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [translateCode, setTranslateCode] = useState<Diagnosis[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const onePatient = await patientService.getOne(id ?? "");
        setPatient(onePatient);
      } catch (error) {
        console.log("Error fetching patient details:", error);
        setPatient(null);
      }
    })();

    if (patient?.entries[0]?.diagnosisCodes && translateCode.length === 0) {
      fetchDiagnoses(patient?.entries[0]?.diagnosisCodes);
    }
  }, [id]);

  const fetchDiagnoses = async (codes: string[]) => {
    try {
      const diagnosisPromises = codes.map((code) => patientService.getOneDiagnose(code));
      const fetchedDiagnoses = await Promise.all(diagnosisPromises);
      console.log("fetchedDiagnoses", fetchedDiagnoses);
      setTranslateCode(fetchedDiagnoses);
      // Do something with the fetched diagnoses, e.g., set them in state
    } catch (error) {
      console.log("Error fetching diagnoses:", error);
    }
  };

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    specialist: "",
    description: "",
    diagnosisCodes: [] as string[],
    type: "",
    discharge: {
      date: "",
      criteria: "",
    },
    employerName: "",
    healthCheckRating: "",
    sickLeave: {
      startDate: "",
      endDate: "",
    },
  });

  const handleChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;

    // Check if the field being changed is diagnosisCodes
    if (name === "diagnosisCodes") {
      // Split the input value by commas and remove any leading/trailing spaces
      const diagnosisCodes = value.split(",").map((code: string) => code.trim());
      setFormData((prevFormData) => ({
        ...prevFormData,
        diagnosisCodes,
      }));
    } else if (name.startsWith("discharge")) {
      // Handle changes for the discharge object properties
      const dischargeProperty = name.split(".")[1]; // Extract the property name (date or criteria)
      setFormData((prevFormData) => ({
        ...prevFormData,
        discharge: {
          ...prevFormData.discharge,
          [dischargeProperty]: value,
        },
      }));
    } else if (name.startsWith("sickLeave")) {
      // Handle changes for the sickLeave object properties
      const sickLeaveProperty = name.split(".")[1]; // Extract the property name (startDate or endDate)
      setFormData((prevFormData) => ({
        ...prevFormData,
        sickLeave: {
          ...prevFormData.sickLeave,
          [sickLeaveProperty]: value,
        },
      }));
    } else {
      // Handle changes for other top-level properties
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const parseHealthCheckRating = (rating: string): HealthCheckRating => {
    switch (rating) {
      case "0":
        return HealthCheckRating.Healthy;
      case "1":
        return HealthCheckRating.LowRisk;
      case "2":
        return HealthCheckRating.HighRisk;
      case "3":
        return HealthCheckRating.CriticalRisk;
      default:
        setErrorMessage("Health ratings are from 0 to 3");
        throw new Error("Invalid health check rating");
    }
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    // Handle form submission here
    const {
      date,
      specialist,
      description,
      diagnosisCodes,
      type,
      discharge,
      employerName,
      healthCheckRating,
      sickLeave,
    } = formData;

    // Create a new entry object based on the selected type
    let newEntry;
    switch (type) {
      case "Hospital":
        newEntry = {
          date,
          specialist,
          description,
          diagnosisCodes,
          type,
          discharge,
        };
        break;
      case "OccupationalHealthcare":
        newEntry = {
          date,
          specialist,
          description,
          diagnosisCodes,
          type,
          employerName,
          sickLeave,
        };
        break;
      case "HealthCheck":
        newEntry = {
          date,
          specialist,
          description,
          diagnosisCodes,
          type,
          healthCheckRating: parseHealthCheckRating(healthCheckRating),
        };
        break;
      default:
        console.log("Invalid entry type");
        setErrorMessage("Invalid entry type");
        return;
    }

    try {
      const addedEntry = await patientService.addEntry(newEntry, patient?.id);
      console.log("Added entry:", addedEntry);

      // Update the patient's entries state with the added entry
      if (patient) {
        console.log('patient---',patient)
        const updatedPatient = { ...patient, entries: [...patient.entries, addedEntry] };
        setPatient(updatedPatient);
      }

      // Reset form fields
      setFormData({
        date: "",
        specialist: "",
        description: "",
        diagnosisCodes: [],
        type: "",
        discharge: {
          date: "",
          criteria: "",
        },
        employerName: "",
        sickLeave: {
          startDate: "",
          endDate: "",
        },
        healthCheckRating: "",
      });
    } catch (error: any) {
      console.log("Error adding entry:", error);
      console.log("Error better:", error.response.data);
      setErrorMessage(error.response.data);
    }
  };


  const handleOpenForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleCloseAlert = () => {
    setErrorMessage(null);
  };

  useEffect(() => {
    if (errorMessage) {
      const timeout = setTimeout(() => {
        setErrorMessage(null);
      }, 15000);
      return () => clearTimeout(timeout);
    }
  }, [errorMessage]);

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
          <Button type="button" variant="contained" color="primary" onClick={handleOpenForm}>
            Add an entry
          </Button>
          {errorMessage && (
            <Alert severity="warning" onClose={handleCloseAlert}>
              {errorMessage}
            </Alert>
          )}

          {showForm && (
            <form style={{ border: "dotted", padding: "20px", marginTop: "20px" }} onSubmit={handleSubmit}>
              <TextField
                name="date"
                label="Date"
                type="date"
                placeholder=""
                value={formData.date}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                name="specialist"
                label="Specialist"
                type="text"
                value={formData.specialist}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                name="description"
                label="Description"
                type="text"
                value={formData.description}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                name="diagnosisCodes"
                label="Diagnosis Code(s)"
                type="text"
                value={formData.diagnosisCodes.join(",")} // Join the array with commas for display
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <Select name="type" label="Entry Type" value={formData.type} onChange={handleChange} fullWidth margin="dense">
                <MenuItem value="">Select an entry type</MenuItem>
                <MenuItem value="HealthCheck">HealthCheck</MenuItem>
                <MenuItem value="Hospital">Hospital</MenuItem>
                <MenuItem value="OccupationalHealthcare">Occupational</MenuItem>
              </Select>

              {formData.type === "Hospital" && (
                <>
                  <TextField
                    name="discharge.date"
                    label="Discharge Date"
                    type="date"
                    value={formData.discharge.date}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    name="discharge.criteria"
                    label="Discharge Criteria"
                    type="text"
                    value={formData.discharge.criteria}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                  />
                </>
              )}
              {formData.type === "OccupationalHealthcare" && (
                <>
                  <TextField
                    name="employerName"
                    label="Employer Name"
                    type="text"
                    value={formData.employerName}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    name="sickLeave.startDate"
                    label="Start of SickLeave"
                    type="date"
                    value={formData.sickLeave.startDate}
                    onChange={handleChange}
                    fullWidth
                    margin="none"
                  />
                  <TextField
                    name="sickLeave.endDate"
                    label="End of SickLeave"
                    type="date"
                    value={formData.sickLeave.endDate}
                    onChange={handleChange}
                    fullWidth
                    margin="dense"
                  />
                </>
              )}
              {formData.type === "HealthCheck" && (
                <TextField
                  name="healthCheckRating"
                  label="Health Check Rating"
                  type="text"
                  value={formData.healthCheckRating}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
              )}

              <Button type="submit" variant="contained" color="success">
                Add
              </Button>
              <Button variant="contained" color="warning" onClick={handleCloseForm}>
                Cancel
              </Button>
            </form>
          )}
          <h2>Entries</h2>
        </div>
      )}
      <EntryDetails entry={patient?.entries} />
    </div>
  );
};

export default PatientDetails;
