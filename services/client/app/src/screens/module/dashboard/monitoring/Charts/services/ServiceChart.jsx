import { useState, useEffect } from "react";
import { backendUrl } from "../../../../../../env";
import { Bank } from "./../models/ModelBanks";
import { ClientType } from "./../models/ModelClients";
import { TypeOfChart } from "./../models/ModelTypeOfChart";

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
        const response = await fetch(backendUrl + "api/db/chart-type");
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
