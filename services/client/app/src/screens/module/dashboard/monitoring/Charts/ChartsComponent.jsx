import React, { useState, useEffect } from "react";
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
import {
  useChartTypesService,
  usefetchChartDataService,
} from "./services/ServiceChart";

var dataChartSample = {
  y: [
    { name: "Punkt A", y: [25, 30, 18, 20] },
    { name: "Punkt B", y: [15, 40, 28, 25] },
    { name: "Punkt C", y: [35, 20, 32, 29] },
    { name: "Punkt D", y: [20, 25, 38, 12] },
    { name: "Punkt E", y: [30, 35, 20, 34] },
  ],
  x: [10, 20, 30, 40],
};

const Chart = ({ data, onDataChange }) => {
  const [activeButton, setActiveButton] = useState(0);
  const dataSource = useChartTypesService();
  const [localData, setLocalData] = useState(0);
  const [dataChart, setChartData] = useState(dataChartSample);
  const yKeys = dataChart.y.map((point) => point.name);

  useEffect(() => {
    if (dataSource.length > 0) {
      handleButtonClick(0);
    }
  }, [dataSource]);

  // const bankIds = [2, 5];
  // const clientTypeIds = [3, 6];
  // const chartTypeId = 1;
  // const limitRange = [0, 10];
  // const interestRange = [0, 100000];
  // const timeRange = [0, 10];

  // Używamy funkcji usefetchChartDataService

  useEffect(() => {
    console.log("Dane zostały zmienione:", data);
    // const dataChart1 = usefetchChartDataService(
    //   bankIds,
    //   clientTypeIds,
    //   chartTypeId,
    //   limitRange,
    //   interestRange,
    //   timeRange
    // );
    // setChartData(newData);
    console.log(dataChart);
  }, [dataChart]);

  const fetchData = async () => {
    try {
      const newData = usefetchChartDataService(
        data?.bankIds,
        data?.clientTypeIds,
        data?.chartTypeId,
        data?.limitRange,
        data?.interestRange,
        data?.timeRange
      );
      setChartData(newData);
    } catch (error) {
      console.error("Błąd pobierania danych:", error);
    }
  };

  const handleButtonClick = async (index) => {
    const newData = dataSource[index]?.id;
    setLocalData(newData);
    onDataChange(newData);
    setActiveButton(index);
  };
  // /////////////////
  // Tutaj możesz zdefiniować stan do przechowywania danych z endpointa

  // const handleButtonClick = async (index) => {
  //   const newData = dataSource[index]?.id;
  //   setLocalData(newData);
  //   onDataChange(newData);
  //   setActiveButton(index);

  //   const newDataChart = await usefetchChartDataService(
  //     data?.bankIds,
  //     data?.clientTypeIds,
  //     dataSource[index]?.id,
  //     data?.limitRange,
  //     data?.interestRange,
  //     data?.timeRange
  //   );
  //   setChartData(newDataChart);
  // };

  return (
    <div style={{ width: "100%" }}>
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
          {dataSource.map((item, index) => (
            <Button
              key={index}
              onClick={() => handleButtonClick(index)}
              variant={index === activeButton ? "contained" : "outlined"}
            >
              {item.name}
            </Button>
          ))}
        </ButtonGroup>
      </Box>
      <ResponsiveContainer width="100%" height={500}>
        <LineChart
          data={dataChart.x.map((xValue, index) => ({
            x: xValue,
            ...dataChart.y.reduce(
              (acc, item) => ({ ...acc, [item.name]: item.y[index] }),
              {}
            ),
          }))}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="x"
            label={{
              value: "Data",
              position: "insideBottom",
              offset: -5,
            }}
          />
          <YAxis
            label={{
              value: dataSource[activeButton]?.name,
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
              name={yKey}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
