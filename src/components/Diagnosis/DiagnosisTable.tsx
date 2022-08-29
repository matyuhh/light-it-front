import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import Diagnosis from 'src/interfaces/Diagnosis';
import CircularProgressWithLabel from '../components/CircularProgressWithLabel';

const DiagnosisTable = ({ diagnosisList }: { diagnosisList: Diagnosis[] }) => {
  return (
    <TableContainer component={Paper} sx={{ maxWidth: 650, marginTop: '12px' }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Accuracy</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {diagnosisList.map((diagnosis) => (
            <TableRow
              key={diagnosis.Issue.ID}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Typography>{diagnosis.Issue.Name}</Typography>
              </TableCell>
              <TableCell align="right">
                <CircularProgressWithLabel value={diagnosis.Issue.Accuracy} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DiagnosisTable;
