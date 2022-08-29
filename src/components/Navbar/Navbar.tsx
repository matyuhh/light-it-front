import { useState } from 'react';
import { Modal } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { getUser } from 'src/helpers/storageHelper';

import LoginForm from '../Auth/LoginForm';
import RegisterForm from '../Auth/RegisterForm';
import DiagnosisModal from '../Diagnosis/DiagnosisModal';

const Navbar = () => {
  const user = getUser();

  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [diagnosisModalOpen, setDiagnosisModalOpen] = useState(false);

  return (
    <Box
      sx={{
        flexGrow: 1,
        width: '100%',
        minHeight: '46px',
        display: 'flex',
        justifyContent: 'end',
        marginBottom: '12px',
        marginTop: '8px',
      }}
    >
      {user ? (
        <Box
          sx={{
            margin: '0 4px',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Button
            variant="contained"
            onClick={() => {
              setDiagnosisModalOpen(true);
            }}
          >
            History
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              localStorage.removeItem('user');
              window.location.reload();
            }}
          >
            Logout
          </Button>
        </Box>
      ) : (
        <Box sx={{ marginRight: '4px' }}>
          <Button
            variant="contained"
            onClick={() => setLoginModalOpen(true)}
            style={{ marginRight: '4px' }}
          >
            Login
          </Button>
          <Button variant="outlined" onClick={() => setRegisterModalOpen(true)}>
            Register
          </Button>
        </Box>
      )}

      <Modal
        open={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        aria-labelledby="login-modal"
        aria-describedby="login-modal"
      >
        <LoginForm setLoginModalOpen={setLoginModalOpen} />
      </Modal>
      <Modal
        open={registerModalOpen}
        onClose={() => setRegisterModalOpen(false)}
        aria-labelledby="register-modal"
        aria-describedby="register-modal"
      >
        <RegisterForm setRegisterModalOpen={setRegisterModalOpen} />
      </Modal>
      <Modal
        open={diagnosisModalOpen}
        onClose={() => setDiagnosisModalOpen(false)}
        aria-labelledby="diagnosisModal"
        aria-describedby="diagnosisModal"
      >
        <DiagnosisModal setDiagnosisModalOpen={setDiagnosisModalOpen} />
      </Modal>
    </Box>
  );
};

export default Navbar;
