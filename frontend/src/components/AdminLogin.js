import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useState} from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { InputAdornment } from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {useNavigate} from 'react-router-dom';

const url = "http://localhost:3000";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © Slatki kutak'}
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {

  const [userLoging, setUserLoging] = useState([]);
  const [userLogingError, setUserLogingError] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  let logedUser = JSON.parse(localStorage.getItem('user'));

  const navigate = useNavigate();

  React.useEffect(() => {
    if(logedUser != null){
      navigate('/Home')
    }
  }, [])

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    const dataFetch = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.get("name"),
        password: data.get("password"),
    }),
  });
  let Fdata = await dataFetch.json(); 
  localStorage.setItem('user', JSON.stringify(Fdata));

  if(Fdata.role === 1) {
    navigate('/Home');
  } else {
    setUserLogingError(true);
    navigate('/AdminLogin');
  } 

  if (Fdata === "User not found") {
    Fdata = false;
    setUserLogingError(true);
    navigate('/AdminLogin');
  }
  };

  return (
    <div className="loginAdmin">
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              paddingTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'warning.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Admin prijava
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Korisničko ime"
                name="name"
                autoComplete="off"
                autoFocus
                error={userLogingError}
              />
              <TextField  type={passwordShown ? "text" : "password"} 
                margin="normal"
                required
                fullWidth
                name="password"
                label="Lozinka"
                id="password"
                error={userLogingError}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end"  onClick={togglePassword} style={{ cursor: 'pointer' }}>
                      { passwordShown ? < VisibilityOffIcon /> : <VisibilityIcon /> }
                    </InputAdornment>
                  ),
                }}
              /> 
              <br/>
              {userLogingError && <div style={{color: "red"}}>* Korisničko ime ili lozinka koju ste unijeli je pogrešna!</div>}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2}}
              >
                Prijavi se
              </Button>
            </Box>
          </Box>
          <Copyright sx={{ mt: 4, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </div>
  );
}