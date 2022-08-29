import { useEffect, useState } from 'react';
import { Button, Box, Autocomplete, TextField, Chip } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import healthService from 'src/services/healthService';
import {
  setSymptomsListInStorage,
  getUser,
  getSymptomsListFromStorage,
} from 'src/helpers/storageHelper';

import IDiagnosis from 'src/interfaces/Diagnosis';
import ISymptoms from 'src/interfaces/Symptoms';

interface DiagnosisFormProps {
  setDiagnosisList: (diagnosisList: IDiagnosis[]) => void;
}

const DiagnosisForm = ({ setDiagnosisList }: DiagnosisFormProps) => {
  const user = getUser();

  const [symptomsList, setSymptomsList] = useState(
    getSymptomsListFromStorage(),
  );
  const [values, setValues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getDiagnosisList = async () => {
    if (values.length > 0 && user) {
      const symptoms = {
        symptoms: values.map((value) => value.ID),
        gender: user.gender,
        year_of_birth: user.year_of_birth,
      };
      setDiagnosisList(null);
      setLoading(true);

      await healthService
        .getDiagnosisListFromSymptoms({ symptoms, userId: user._id })
        .then((diagnosis) => {
          setDiagnosisList(diagnosis);
          setError(false);
          setValues([]);
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    } else setError(true);
  };

  useEffect(() => {
    const setSymptoms = async () => {
      const symptoms: ISymptoms[] = await healthService.getSymptomsList();
      setSymptomsListInStorage(symptoms);
      setSymptomsList(symptoms);
    };
    if (!symptomsList && user) setSymptoms();
  }, [symptomsList, user]);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          width: '320px',
        }}
      >
        <Autocomplete
          sx={{ width: '100%', marginBottom: '8px' }}
          value={values}
          onChange={(_, newValue) => {
            setValues(newValue);
          }}
          multiple
          id="tags-filled"
          options={symptomsList}
          freeSolo
          getOptionLabel={(option) => option.Name}
          renderTags={(value: ISymptoms[], getTagProps) =>
            value.map((option: ISymptoms, index: number) => (
              <Chip
                key={index}
                variant="outlined"
                label={option.Name}
                {...getTagProps({ index })}
              />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              variant="filled"
              label="Symptoms"
              error={error}
              helperText={error && 'Symptoms cannot be empty'}
            />
          )}
        />

        <Button onClick={getDiagnosisList} variant="contained" disabled={!user}>
          {loading ? <CircularProgress size={14} /> : 'Get Diagnosis'}
        </Button>
      </Box>
    </>
  );
};

export default DiagnosisForm;
