import { IconButton, Box, CircularProgress, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DiagnosisHistoryTable from './DiagnosisHistoryTable';
import { useEffect, useState } from 'react';
import healthService from 'src/services/healthService';
import { getUser } from 'src/helpers/storageHelper';
import { formatDiagnosisList } from 'src/helpers/diagnosisHelper';

interface DiagnosisModalProps {
  setDiagnosisModalOpen: (bool) => void;
}

const DiagnosisModal = ({ setDiagnosisModalOpen }: DiagnosisModalProps) => {
  const user = getUser();
  const [diagnosisHistory, setDiagnosisHistory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getDiagnosis = async () => {
      setIsLoading(true);
      const diagnosis = await healthService
        .getDiagnosisHistory(user._id)
        .then((diagnosisList) => formatDiagnosisList(diagnosisList))
        .finally(() => setIsLoading(false));
      setDiagnosisHistory(diagnosis);
    };
    getDiagnosis();
  }, [user._id]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        background: 'white',
        maxWidth: '650px',
        minWidth: '320px',
        minHeight: '320px',
        borderRadius: '10px',
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'end',
          marginBottom: '8px',
        }}
      >
        <IconButton onClick={() => setDiagnosisModalOpen(false)}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box sx={{ marginBottom: '8px' }}>
        <Typography variant="h3">Diagnosis History</Typography>
      </Box>

      {isLoading ? (
        <CircularProgress />
      ) : diagnosisHistory?.length > 0 ? (
        <DiagnosisHistoryTable
          diagnosisHistory={diagnosisHistory}
          setDiagnosisHistory={setDiagnosisHistory}
        />
      ) : (
        <Typography>No diagnosis history found</Typography>
      )}
    </Box>
  );
};

export default DiagnosisModal;
