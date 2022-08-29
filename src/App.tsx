import { Routes, Route } from 'react-router-dom';
import Box from '@mui/material/Box';
import Home from './pages/Home';

const App = () => {
  return (
    <Box className="App">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Box>
  );
};

export default App;
