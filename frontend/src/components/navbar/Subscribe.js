import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Unsubscribe from './Unsubscribe';
import { useLocation } from 'react-router-dom';


export default function FormDialog() {
  const location = useLocation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [userSubscribed, setUserSubscribed] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [mail, setMail] = useState("");
  const [subs, setSubs] = useState(JSON.parse(localStorage.getItem('user')).email);
  const [unsubs, setUnsubs] = useState("");

  const handleUnsubscribe = () => {
    setMail('');
    setSubs('');
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const subscribe = async(e) => {
    e.preventDefault();
    const ifUserSubscribed = await fetch("http://localhost:3000/ifSubscribeExist/" + email);
    const ifUserSubscribedJson = await ifUserSubscribed.json();

    if(ifUserSubscribedJson === false) {
      const url = 'http://localhost:3000/Sweet/subscribe/' + user._id;
      fetch(url, {
        method: 'POST',
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          email: email
        })
      })
      .then((data) => {
        setRefresh(!refresh);
        setOpen(false);
        setUserSubscribed(false);
        if(refresh) {
          setSubs(mail);
        } else {
          setSubs(unsubs);
        }
      })
    } else {
      setUserSubscribed(true);
    }
  }

  useEffect(() => {
    setMail(email);
    setEmail("");
  }, [refresh])

  const checking = () => {
    if(refresh) {
      setSubs(mail);
    } else {
      setSubs(unsubs);
    }
  }

  return (
    <div className='subscribe'> {checking}
      {subs === "" && mail === "" && <Button variant="contained" color="success" className="button" onClick={handleClickOpen}>
        Pretplati se
      </Button> }
      {(subs !== "" || mail !== "") && < Unsubscribe handleUnsubscribe={handleUnsubscribe} />}
      <Dialog open={open} onClose={handleClose}>
        <form className='subscribeForNews' onSubmit={subscribe}>
          <DialogTitle>Pretplati se</DialogTitle>
          <DialogContent>
            <DialogContentText style={{color: "black", fontWeight: 400, paddingRight: "60px"}}>
              Ako želite biti prvi obaviješteni o novoj poslastici, pretplatite se!
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email adresa"
              autoComplete='off'
              type="email"
              fullWidth
              required
              variant="standard"
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
            />
            {userSubscribed && <div style={{color: "red"}}>* Uneseni email je već pretplaćen. Pokušajte sa drugim!<br/></div>}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} style={{color: "brown"}}>Odustani</Button>
            <Button type='submit' style={{color: "brown"}}>Pretplati se</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
