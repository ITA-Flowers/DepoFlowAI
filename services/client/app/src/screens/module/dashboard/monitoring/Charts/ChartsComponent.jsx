import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";

import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { generateColor } from "./../../../utils/ColorsGenerator";

const data = [
  { name: "Punkt A", x: 10, y1: 25, y2: 30, y3: 18, y4: 20 },
  { name: "Punkt B", x: 20, y1: 15, y2: 40, y3: 28, y4: 25 },
  { name: "Punkt C", x: 30, y1: 35, y2: 20, y3: 32, y4: 29 },
  { name: "Punkt D", x: 40, y1: 20, y2: 25, y3: 38, y4: 12 },
  { name: "Punkt E", x: 50, y1: 30, y2: 35, y3: 20, y4: 34 },
];

const dataSource = [
  { id: 0, name: "Oprocentowanie" },
  { id: 1, name: "Czas trwania" },
  { id: 2, name: "Liczba nowych ofert" },
];

const Chart = () => {
  const yKeys = Object.keys(data[0]).filter(
    (key) => key !== "name" && key !== "x"
  );

  const [activeButton, setActiveButton] = useState(0); // Indeks aktywnego przycisku

  const handleButtonClick = (index) => {
    setActiveButton(index);
    // logika po kliknięciu przycisku
  };

  return (
    <div style={{ width: 100 + "%" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          "& > *": {
            m: 1,
          },
        }}
      >
        <ButtonGroup size="small" aria-label="small button group">
          {dataSource.map((item) => (
            <Button
              key={item.id}
              onClick={() => handleButtonClick(item.id)}
              variant={item.id === activeButton ? "contained" : "outlined"}
            >
              {item.name}
            </Button>
          ))}
        </ButtonGroup>
      </Box>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="x"
            type="number"
            label={{
              value: "Data",
              position: "insideBottom",
              offset: -5,
            }}
          />
          <YAxis
            label={{
              value: dataSource[activeButton]?.name, // podmiana wyświetlania
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
          {yKeys.map((yKey, index) => (
            <Line
              key={index}
              type="monotone"
              dataKey={yKey}
              stroke={generateColor(index)}
              activeDot={{ r: 8 }}
              name={data[index].name}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
