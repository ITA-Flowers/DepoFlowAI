import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Typography } from "@mui/material";
import { useClientsTypesService } from "../Charts/services/ServiceChart";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 5;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const minLength = 1;
const minLimit = 1000;
const minRate = 0.2;

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

const Filters = () => {
  const [bankName, setBankName] = React.useState([]);
  const [clientName, setClientName] = React.useState([]);
  const clients = useClientsTypesService();

  const handleChangeBank = (event) => {
    const {
      target: { value },
    } = event;
    setBankName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleChangeClient = (event) => {
    const {
      target: { value },
    } = event;
    setClientName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  /////////// *** sliders *** ////////////

  const [limit, setLimit] = React.useState([0, 1000000]);
  const [length, setLength] = React.useState([1, 60]);
  const [rate, setRate] = React.useState([1, 10]);

  const handleLimit = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setLimit([Math.min(newValue[0], limit[1] - minLimit), limit[1]]);
    } else {
      setLimit([limit[0], Math.max(newValue[1], limit[0] + minLimit)]);
    }
  };

  const handleLength = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minLength) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minLength);
        setLength([clamped, clamped + minLength]);
      } else {
        const clamped = Math.max(newValue[1], minLength);
        setLength([clamped - minLength, clamped]);
      }
    } else {
      setLength(newValue);
    }
  };
  const handleRate = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setRate([Math.min(newValue[0], rate[1] - minRate), limit[1]]);
    } else {
      setRate([limit[0], Math.max(newValue[1], rate[0] + minRate)]);
    }
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 200 }}>
        <InputLabel id="multiple-checkbox-label">Banki</InputLabel>
        <Select
          labelId="multiple-checkbox-label"
          id="multiple-checkbox"
          multiple
          value={bankName}
          onChange={handleChangeBank}
          input={<OutlinedInput label="Banki" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={bankName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, width: 200 }}>
        <InputLabel id="multiple-checkbox-label">Rodzaj klientów</InputLabel>
        <Select
          labelId="multiple-checkbox-label"
          id="multiple-checkbox"
          multiple
          value={clientName}
          onChange={handleChangeClient}
          input={<OutlinedInput label="Rodzaj klientów" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {clients.map((item) => (
            <MenuItem key={item.id} value={item}>
              <Checkbox checked={clientName.indexOf(item) > -1} />
              <ListItemText primary={item.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box sx={{ width: 200 }}>
        <CustomSlider
          label="Limit depozytu"
          value={limit}
          onChange={handleLimit}
          min={0}
          max={500000}
        />
        <CustomSlider
          label="Zapadalność w miesiącach"
          value={length}
          onChange={handleLength}
          min={1}
          max={60}
        />
        <CustomSlider
          label='Oprocentowanie w "%"'
          value={rate}
          onChange={handleRate}
          min={0}
          max={20}
          step={0.1}
        />
      </Box>
    </div>
  );
};

export default Filters;

const CustomSlider = ({ label, value, onChange, min, max, step }) => (
  <Box sx={{ width: 200, mt: 2 }}>
    <Typography id={`${label}-slider`} gutterBottom>
      {label}
    </Typography>
    <Slider
      aria-labelledby={`${label}-slider`}
      value={value}
      onChange={onChange}
      valueLabelDisplay="auto"
      min={min}
      max={max}
      step={step}
      disableSwap
    />
  </Box>
);
