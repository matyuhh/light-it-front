import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import healthService from 'src/services/healthService';
import { formatDiagnosisList } from 'src/helpers/diagnosisHelper';
import { useState } from 'react';

const DiagnosisHistoryTable = ({
  diagnosisHistory,
  setDiagnosisHistory,
}: {
  diagnosisHistory: {
    _id: string;
    diagnosisItems: string;
    isValid?: boolean;
  }[];
  setDiagnosisHistory: (boolean) => void;
}) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const setDiagnosisValidity = async (id, status) => {
    setIsDisabled(true);
    const diagnosisHistory = await healthService
      .setDiagnosisValidity({
        id,
        isValid: status,
      })
      .then((diagnosisList) => formatDiagnosisList(diagnosisList))
      .finally(() => setIsDisabled(false));
    setDiagnosisHistory(diagnosisHistory);
  };

  return (
    <TableContainer component={Paper} sx={{ maxWidth: 650, marginTop: '12px' }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Diagnosis</TableCell>
            <TableCell align="right">Valid</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {diagnosisHistory.map((diagnosis, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {diagnosis.diagnosisItems}
              </TableCell>
              <TableCell align="right">
                {diagnosis.isValid === undefined ? (
                  <Box sx={{ display: 'flex' }}>
                    <IconButton
                      onClick={() => setDiagnosisValidity(diagnosis._id, false)}
                      disabled={isDisabled}
                    >
                      <CheckCircleIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => setDiagnosisValidity(diagnosis._id, true)}
                      disabled={isDisabled}
                    >
                      <CancelIcon />
                    </IconButton>
                  </Box>
                ) : diagnosis.isValid ? (
                  <CheckCircleIcon />
                ) : (
                  <CancelIcon />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DiagnosisHistoryTable;
