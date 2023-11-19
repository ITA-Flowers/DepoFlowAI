import { useState, useEffect } from "react";
import { backendUrl } from "../../../../../../env";
import { Bank } from "./../models/ModelBanks";
import { ClientType } from "./../models/ModelClients";
import { TypeOfChart } from "./../models/ModelTypeOfChart";
import { RequestModelBanks } from "./../models/RequestModelBanks";

export const useClientsTypesService = () => {
  const [clientTypes, setClientTypes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(backendUrl + "api/db/clients");
        const data = await response.json();

        const clientTypesData = data.map(
          (item) => new ClientType(item.id, item.name)
        );
        setClientTypes(clientTypesData);
      } catch (error) {
        console.error("Error fetching user types:", error);
      }
    };

    fetchData();
  }, []);
  return clientTypes;
};

export const useBanksService = () => {
  const [banks, setBanks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(backendUrl + "api/db/banks");
        const data = await response.json();

        const banksData = data.map(
          (item) => new Bank(item.id, item.name, item.domain)
        );
        setBanks(banksData);
      } catch (error) {
        console.error("Error fetching user types:", error);
      }
    };

    fetchData();
  }, []);

  return banks;
};

export const useChartTypesService = () => {
  const [typeOfChart, setTypeOfChart] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(backendUrl + "api/db/clients");
        const data = await response.json();

        const typeOfChartData = data.map(
          (item) => new TypeOfChart(item.id, item.name)
        );
        setTypeOfChart(typeOfChartData);
      } catch (error) {
        console.error("Error fetching user types:", error);
      }
    };

    fetchData();
  }, []);
  return typeOfChart;
};

export const usefetchChartDataService = (
  bankIds,
  clientTypeIds,
  chartTypeId,
  limitRange,
  interestRange,
  timeRange
) => {
  const [dataChart, setdataChart] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestData = new RequestModelBanks(
          bankIds,
          clientTypeIds,
          chartTypeId,
          limitRange,
          interestRange,
          timeRange
        );
        console.log(requestData);
        const response = await fetch(backendUrl + "api/db/chart-data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });
        const data = await response.json();

        // Zakładam, że masz zdefiniowane klasy ChartData i DataPoint
        const chartDataList = new ChartData(
          data.x,
          data.y.map((dataPoint) => new DataPoint(dataPoint.name, dataPoint.y))
        );
        setdataChart(chartDataList);
      } catch (error) {
        console.error("Error fetching chart data:", error);
        throw error;
      }
    };

    fetchData();
  }, [
    bankIds,
    clientTypeIds,
    chartTypeId,
    limitRange,
    interestRange,
    timeRange,
  ]);

  return dataChart;
};
