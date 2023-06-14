import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes, useNavigate } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';


import { apiBaseUrl } from "./constants";
import { Patient } from "./types";


import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import PatientDetails from "./components/PatientDetails";

const App = () => {
  const navigate = useNavigate();

  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();
  }, []);

  const handlePatientName = (id: string) => async (event: React.MouseEvent<HTMLTableCellElement>) => {
    console.log('testing name----', id);
    try {
      // const onePatient = await patientService.getOne(id);
      // console.log('patient------',onePatient);
      // setTarget(onePatient)
      navigate(`/patients/${id}`)
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="App">
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} handlePatientName={handlePatientName} />} />
            <Route path="/patients/:id" element={<PatientDetails />} />
          </Routes>
        </Container>
    </div>
  );
};

export default App;
