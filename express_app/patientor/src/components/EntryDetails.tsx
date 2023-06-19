import { Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from "../types";

const EntryDetails: React.FC<{ entry?: Entry[] }> = ({ entry }) => {
  if (!entry) {
    return <div>No entry to display</div>;
  }

  console.log('entry from details---', entry);

  return (
    <div>
      {entry.map((entryItem) => {
        switch (entryItem.type) {
          case "HealthCheck":
            return <HealthCheck key={entryItem.id} info={entryItem} />;
          case "OccupationalHealthcare":
            return <OccupationalHealthcare key={entryItem.id} info={entryItem} />;
          case "Hospital":
            return <Hospital key={entryItem.id} info={entryItem} />;
          default:
            return assertNever(entryItem);
        }
      })}
    </div>
  );
};

function assertNever(arg0: any): React.ReactElement<any, any> | null {
  throw new Error("Function not implemented.");
}
// export default EntryDetails;


const HealthCheck = ({ info }: { info: HealthCheckEntry }) => {
  console.log('info from specific',info);

  return (
    <div style={{ border: '1px solid black', padding: '5px', marginBottom: '5px', borderRadius: '5px' }}>

      <h4>{info.date} {info.type}</h4>
      <i>{info.description}</i>
      <p>HealthCheck rating {info.healthCheckRating}</p>
      <p>codes: {info.diagnosisCodes}</p>
      <p>diagnose by {info.specialist}</p>
    </div>
  );
};

const Hospital = ({ info }: { info: HospitalEntry }) => {
  console.log('info from specific',info);
  return (
    <div style={{ border: '1px solid black', padding: '5px', marginBottom: '5px', borderRadius: '5px' }}>

      <h4>{info.date} {info.type}</h4>
      <i>{info.description}</i>
      <p>diagnose by {info.specialist}</p>
      <p>codes: {info.diagnosisCodes}</p>
      <p>discharged: {info.discharge.date} for {info.discharge.criteria} </p>
    </div>
  )
}

const OccupationalHealthcare = ({ info }: { info: OccupationalHealthcareEntry }) => {
  console.log('info from specific',info);
  return (
    <div style={{ border: '1px solid black', padding: '5px', marginBottom: '5px', borderRadius: '5px' }}>

      <h4>{info.date} {info.type} employer {info.employerName}</h4>
      <i>{info.description}</i>
      <p>diagnose by {info.specialist}</p>
      <p>codes: {info.diagnosisCodes}</p>
      <p>sickLeave from: {info.sickLeave?.startDate} to {info.sickLeave?.endDate} </p>
    </div>
  )
}


export default EntryDetails
