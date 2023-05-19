import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";

const FindByCategory = ({ passSetCategory }) => {
  const [categoryId, setCategoryId] = useState("");

  const handleChange = async (event) => {
    setCategoryId(event.target.value);
    await passSetCategory(event.target.value);
  }

  return (
    <FormControl sx={{ minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small">Kategorija</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={categoryId}
        label="Kategorija"
        onChange={handleChange}
      >
        <MenuItem value="default">
          <em>Sve</em>
        </MenuItem>
        <MenuItem value={'627a5d820138cd807dd32cbe'}>Kolač</MenuItem>
        <MenuItem value={'627a5dc00138cd807dd32cbf'}>Torta</MenuItem>
        <MenuItem value={'627a5dcd0138cd807dd32cc0'}>Rolat</MenuItem>
        <MenuItem value={'627a5de80138cd807dd32cc1'}>Ostalo</MenuItem>
      </Select>
    </FormControl>
  );
}
 
export default FindByCategory;