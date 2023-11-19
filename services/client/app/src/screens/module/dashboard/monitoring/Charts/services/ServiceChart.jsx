import { useState, useEffect } from "react";
import { backendUrl } from "../../../../../../env";

export const useClientsTypesService = () => {
  const [clientTypes, setClientTypes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(backendUrl + "api/db/clients");
        const data = await response.json();

        const clientTypesData = data.map((item) => ({
          name: item.name,
          id: item.id,
        }));
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
  const [clientTypes, setClientTypes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(backendUrl + "api/db/clients", {
          mode: "no-cors",
        });
        const data = await response.json();

        const clientTypesData = data.map((item) => ({
          name: item.name,
          id: item.id,
        }));
        setClientTypes(clientTypesData);
      } catch (error) {
        console.error("Error fetching user types:", error);
      }
    };

    fetchData();
  }, []);

  return clientTypes;
};
