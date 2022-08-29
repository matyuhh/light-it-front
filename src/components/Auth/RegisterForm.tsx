import {
  Button,
  Box,
  TextField,
  MenuItem,
  FormHelperText,
  FormControl,
  IconButton,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Controller, useForm } from 'react-hook-form';

import userService from 'src/services/userService';

import { IUserRegister } from 'src/interfaces/User';

interface RegisterFormProps {
  setRegisterModalOpen: (bool) => void;
}

const RegisterForm = ({ setRegisterModalOpen }: RegisterFormProps) => {
  const { control, handleSubmit, watch } = useForm({});
  const password = watch('password', '');

  const register = async (user: IUserRegister) => {
    await userService.register(user).then(() => {
      setRegisterModalOpen(false);
      window.location.reload();
    });
  };

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
        <IconButton onClick={() => setRegisterModalOpen(false)}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box sx={{ marginBottom: '12px' }}>
        <Typography variant="h2">Register</Typography>
      </Box>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(register)}
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Controller
          control={control}
          name="username"
          rules={{
            required: true,
          }}
          defaultValue=""
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              name="username"
              label="Username"
              error={error !== undefined}
              helperText={error && 'Username is required'}
            />
          )}
        />

        <Controller
          control={control}
          name="name"
          rules={{
            required: true,
          }}
          defaultValue=""
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              id="name"
              label="Name"
              error={error !== undefined}
              helperText={error && 'Name is required'}
            />
          )}
        />

        <Controller
          control={control}
          name="surname"
          rules={{
            required: true,
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              id="surname"
              label="Surname"
              error={error !== undefined}
              helperText={error && 'Surname is required'}
            />
          )}
        />

        <Controller
          control={control}
          name="gender"
          rules={{
            required: true,
          }}
          render={({ field, fieldState }) => (
            <FormControl variant="standard">
              <TextField
                select
                name="gender"
                error={!!fieldState.error}
                value={field.value}
                label="Gender"
                variant="outlined"
                onChange={field.onChange}
              >
                <MenuItem key="female" value="female">
                  Female
                </MenuItem>
                <MenuItem key="male" value="male">
                  Male
                </MenuItem>
              </TextField>
              <FormHelperText style={{ color: fieldState.error ? 'red' : '' }}>
                {fieldState.error ? 'Gender is required' : ''}
              </FormHelperText>
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name="year_of_birth"
          rules={{
            required: true,
          }}
          render={({ field, fieldState }) => (
            <FormControl variant="standard">
              <TextField
                select
                name="year_of_birth"
                error={!!fieldState.error}
                value={field.value}
                label="Year of Birth"
                variant="outlined"
                onChange={field.onChange}
              >
                {[...Array(100).keys()]
                  .map((n) => n + 1923)
                  .sort((a, b) => b - a)
                  .map((n) => (
                    <MenuItem key={n} value={n}>
                      {n}
                    </MenuItem>
                  ))}
              </TextField>
              <FormHelperText style={{ color: fieldState.error ? 'red' : '' }}>
                {fieldState.error ? 'Gender is required' : ''}
              </FormHelperText>
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name="password"
          rules={{
            required: true,
          }}
          defaultValue=""
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              name="password"
              label="Password"
              type="password"
              error={error !== undefined}
              helperText={error && 'Password is required'}
            />
          )}
        />
        <Controller
          control={control}
          name="confirmPassword"
          rules={{
            required: true,
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              helperText={
                !!error &&
                field.value !== password &&
                'The passwords do not match'
              }
            />
          )}
        />

        <Button type="submit" variant="contained">
          Register
        </Button>
      </Box>
    </Box>
  );
};

export default RegisterForm;
