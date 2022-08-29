import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import { getUser } from 'src/helpers/storageHelper';
import DiagnosisForm from './DiagnosisForm';
import DiagnosisTable from './DiagnosisTable';

const Diagnosis = () => {
  const [diagnosisList, setDiagnosisList] = useState(null);
  const user = getUser();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ marginBottom: '16px' }}>
        <Typography variant="h1">Diagnosis App</Typography>
      </Box>
      <DiagnosisForm setDiagnosisList={setDiagnosisList} />
      {!user && (
        <Box sx={{ marginTop: '8px' }}>
          <Typography variant="h5">
            Please login to use Diagnosis App
          </Typography>
        </Box>
      )}
      {diagnosisList && diagnosisList.length > 0 && (
        <DiagnosisTable diagnosisList={diagnosisList} />
      )}
      {diagnosisList && diagnosisList.length === 0 && (
        <Box sx={{ marginTop: '12px' }}>
          <Typography variant="h3">No diagnosis found</Typography>
        </Box>
      )}
    </Box>
  );
};

export default Diagnosis;
