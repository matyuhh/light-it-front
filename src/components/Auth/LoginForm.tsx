import { Button, Box, TextField, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Controller, useForm } from 'react-hook-form';

import { setUser } from 'src/helpers/storageHelper';
import userService from 'src/services/userService';

interface LoginFormProps {
  setLoginModalOpen: (bool) => void;
}

const LoginForm = ({ setLoginModalOpen }: LoginFormProps) => {
  const { control, handleSubmit } = useForm();

  const login = async (user) => {
    await userService.login(user).then((data) => {
      setUser(data);
      setLoginModalOpen(false);
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
        <IconButton onClick={() => setLoginModalOpen(false)}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box sx={{ marginBottom: '12px' }}>
        <Typography variant="h2">Login</Typography>
      </Box>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(login)}
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
              id="username"
              label="Username"
              error={error !== undefined}
              helperText={error && 'Username is required'}
            />
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
              id="password"
              label="Password"
              type="password"
              error={error !== undefined}
              helperText={error && 'Password is required'}
            />
          )}
        />

        <Button type="submit" variant="contained">
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default LoginForm;
