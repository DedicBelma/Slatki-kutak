import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Grid, InputLabel, TextField } from '@mui/material';
import moment from 'moment';
import { useLocation, useNavigate } from 'react-router-dom';

const rx_live = /^[0-9]?\d*(?:[-]\d*)?(?:[0-9]\d*)?(?:[-]\d*)?(?:[0-9]\d*)?$/;

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

let logedUser = null;

export default function CustomizedDialogs({User, sort, size, inscriptions, textInscriptions, floorsNumber, shape, otherShape, date, notes, fullPrice}
     ){
  const location = useLocation();
  const [user, setUser] = useState(location.state.user);
  const [open, setOpen] = React.useState(false);
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [Adress, setAdress] = useState('');
  const [City, setCity] = useState('');
  const [PhoneNumber, setPhoneNuber] = useState('');
  const Status = 0;

  const navigate = useNavigate();

  logedUser = location.state.user;
  
  React.useEffect(() => {
    setUser(logedUser);
  }, [logedUser])

  const dateNow = new Date();
  let dateOfOrder = moment(dateNow, 'MM/DD/YYYY').format("DD/MM/YYYY");
  dateOfOrder= dateOfOrder.split('T')[0];

  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  const addSpecialOrder = async(e) => {
    e.preventDefault(); 
    
    const url = 'http://localhost:3000/Sweet/addSpecialOrder';
    await fetch(url, {
      method: 'POST',
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        userId: user._id,
        sort: sort,
        size: size,
        inscriptions: inscriptions,
        textInscriptions: textInscriptions,
        floorsNumber: floorsNumber,
        shape: shape,
        otherShape: otherShape,
        date: date,
        notes: notes,
        fullPrice: fullPrice,
        Status: Status,
        FirstName: FirstName,
        LastName: LastName,
        Adress: Adress,
        City: City,
        PhoneNumber: PhoneNumber,
        dateOfOrder: dateOfOrder
      })
    })
    .then(() => {
      navigate('/Sweet/specialOrders', {state: {user:  logedUser}});
    })
  }

  const checkAndSetPrice = (e) => {
    if (rx_live.test(e)) {
        setPhoneNuber(e);
    }
  } 
 
  return (
    <div>
      <Grid container justify="center">
        {(sort === "" || size === "" || inscriptions === "" || (inscriptions === "Sa natpisom" && textInscriptions === "") || floorsNumber === "" || shape === "" || (shape === "Drugo" && otherShape === "") || date === null) ?
          <Button  variant="contained" disabled style={{margin: "auto", marginBottom: "3%"}} >
            Ispunite obavezne podatke
          </Button> : <Button  variant="contained" color="secondary" style={{margin: "auto", marginBottom: "3%"}} onClick={handleClickOpen} >
              Pošalji narudžbu
          </Button>
        }
      </Grid>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        ><form onSubmit={addSpecialOrder}  className='order'>
          <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
            Lični podaci
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <div style={{display: "flex", justifyContent: "space-between"}}>
              <InputLabel className="orderLabel" sx={{mb: 0.5}} style={{color: "revert", width: "48%"}}>
                Unesite ime
              </InputLabel>
              <InputLabel className="orderLabel" sx={{mb: 0.5}} style={{color: "revert", width: "48%"}}>
                  Unesite prezime
              </InputLabel></div>
                  <div style={{display: "flex"}}>
              <TextField fullWidth required id="outlined-required" label="Ime" autoComplete="off" value={FirstName}
              onChange={(e) => setFirstName(e.target.value)} sx={{mr: 2}} inputProps={{ minLength: 3, maxLength: 15}} />  
              <TextField fullWidth required id="outlined-required" label="Prezime" autoComplete="off" value={LastName}
              onChange={(e) => setLastName(e.target.value)} inputProps={{ minLength: 4, maxLength: 15}} />   </div>
              <InputLabel className="orderLabel" sx={{mt: 1.2, mb: 0.5, mr: 0.5}} style={{color: "revert"}}>
                  Unesite adresu
              </InputLabel>
              <TextField style={{maxWidth: "100%"}} fullWidth required id="outlined-required" label="Adresa" autoComplete="off" value={Adress}
              onChange={(e) => setAdress(e.target.value)} sx={{width: 500}} inputProps={{ minLength: 5, maxLength: 40}} />
              <InputLabel className="orderLabel" sx={{mt: 1.2, mb: 0.5, mr: 0.5}} style={{color: "revert"}}>
                  Unesite grad
              </InputLabel>
              <TextField style={{maxWidth: "100%"}} fullWidth required id="outlined-required" label="Grad" autoComplete="off" value={City}
              onChange={(e) => setCity(e.target.value)}  sx={{width: 500}} inputProps={{ minLength: 4, maxLength: 25}} />
              <InputLabel className="orderLabel" sx={{mt: 1.2, mb: 0.5, mr: 0.5}} style={{color: "revert"}}>
                  Unesite broj telefona
              </InputLabel>
              <TextField style={{maxWidth: "100%"}} required id="outlined-required" label="Broj telefona" autoComplete="off" helperText="Format: 061111111"
              value={PhoneNumber} onChange={(e) => checkAndSetPrice(e.target.value)} sx={{width: 500}} inputProps={{ minLength: 9, maxLength: 10}} />
          </DialogContent>
        <DialogActions>
          <Button className='makeOrder' autoFocus variant='contained' color='secondary' type='submit'>
            Pošalji narudžbu
          </Button>
        </DialogActions> </form>
      </BootstrapDialog>
    </div>
  );
}