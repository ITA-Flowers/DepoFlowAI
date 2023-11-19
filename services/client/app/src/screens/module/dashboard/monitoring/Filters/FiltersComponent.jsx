import * as React from "react";
import { useState } from "react";
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
import {
  useClientsTypesService,
  useBanksService,
  usefetchChartDataService,
} from "../Charts/services/ServiceChart";
import { Button } from "@mui/material";

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

const Filters = ({ data, onDataChange }) => {
  const [bankName, setBankName] = React.useState([]);
  const [clientName, setClientName] = React.useState([]);
  const [filterParams, setFilterParams] = React.useState({
    bankIds: [],
    clientTypeIds: [],
    chartTypeId: 0,
    limitRange: [0, 1000000],
    lengthRange: [1, 60],
    rateRange: [0, 20],
  });

  const [localData, setLocalData] = useState(null);

  const clients = useClientsTypesService();
  const banks = useBanksService();

  const handleChangeBank = (event) => {
    const {
      target: { value },
    } = event;
    setBankName(typeof value === "string" ? value.split(",") : value);

    setFilterParams((prevParams) => ({
      ...prevParams,
      bankIds: value.map(
        (bankName) => banks.find((item) => item.name === bankName).id
      ),
    }));
  };

  const handleChangeClient = (event) => {
    const {
      target: { value },
    } = event;
    setClientName(typeof value === "string" ? value.split(",") : value);
    console.log(clientName);

    setFilterParams((prevParams) => ({
      ...prevParams,
      clientTypeIds: value.map(
        (clientName) => clients.find((item) => item.name === clientName).id
      ),
    }));
  };

  /////////// *** sliders *** ////////////

  const handleLimit = (event, newValue) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    setFilterParams((prevParams) => ({
      ...prevParams,
      limitRange: newValue,
    }));
  };

  const handleLength = (event, newValue) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    setFilterParams((prevParams) => ({
      ...prevParams,
      lengthRange: newValue,
    }));
  };

  const handleRate = (event, newValue) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    setFilterParams((prevParams) => ({
      ...prevParams,
      rateRange: newValue,
    }));
  };

  const handleGetDataWithFilters = () => {
    filterParams.chartTypeId = data;
    setLocalData(filterParams);
    onDataChange(filterParams);
    console.log(filterParams);
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
          {banks.length > 0 ? (
            banks.map((item) => (
              <MenuItem
                key={item.id}
                value={item}
                selected={bankName.indexOf(item) > -1}
              >
                <Checkbox checked={bankName.indexOf(item) > -1} />
                <ListItemText primary={item.name} />
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>
              <ListItemText primary="Brak danych" />
            </MenuItem>
          )}
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
          {clients.length > 0 ? (
            clients.map((item) => (
              <MenuItem
                key={item.id}
                value={item.name}
                selected={clientName.indexOf(item.name) > -1}
              >
                <Checkbox checked={clientName.indexOf(item.name) > -1} />
                <ListItemText primary={item.name} />
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>
              <ListItemText primary="Brak danych" />
            </MenuItem>
          )}
        </Select>
      </FormControl>
      <Box sx={{ width: 200 }}>
        <CustomSlider
          label="Limit depozytu"
          value={filterParams.limitRange}
          onChange={handleLimit}
          min={0}
          max={500000}
        />
        <CustomSlider
          label="Zapadalność w miesiącach"
          value={filterParams.lengthRange}
          onChange={handleLength}
          min={1}
          max={60}
        />
        <CustomSlider
          label='Oprocentowanie w "%"'
          value={filterParams.rateRange}
          onChange={handleRate}
          min={0}
          max={20}
          step={0.1}
        />
      </Box>
      <Button
        style={{ width: 100 + "%", marginTop: 1 + "rem" }}
        variant="contained"
        onClick={handleGetDataWithFilters}
      >
        Wybierz
      </Button>
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
