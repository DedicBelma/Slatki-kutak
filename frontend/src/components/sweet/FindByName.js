import { InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';

const rx_live = /^[a-zA-Z ]*$/;

const FindByName = ({ passSetName }) => {
  const [name, setName] = useState("");

  const handleChange = async (event) => {
    if (rx_live.test(event.target.value)) {
      setName(event.target.value);
      if(event.target.value.length > 0){
        await passSetName(event.target.value);
      }else {
        passSetName("default");
      }
    }  
  };

  return (
    <TextField id="outlined-size-small" size="small" value={name} label="Naziv poslastice" variant="outlined" onChange={handleChange}
      autoComplete="off" pattern="[+-]?\d+(?:[.,]\d+)?"
      InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              < SearchIcon />
            </InputAdornment>
          ),
        }}
  	/>
  );
};

export default FindByName;
