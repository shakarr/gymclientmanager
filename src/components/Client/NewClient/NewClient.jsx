import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { toast } from "react-toastify";

import PortraitOutlinedIcon from "@mui/icons-material/PortraitOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";

import { BackendClient } from "../../../utils/backendClient";

import "./newClient.scss";

export const NewClient = (props) => {
  const { handleCloseModal, setClients, initialValues } = props;
  const client = new BackendClient();

  const [dataClient, setDataClient] = useState({
    name: "",
    surname: "",
    age: "",
  });

  useEffect(() => {
    if (initialValues !== undefined) {
      setDataClient({
        name: initialValues.name,
        surname: initialValues.surname,
        age: initialValues.age,
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataClient((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const getClients = async () => {
    try {
      const { data } = await client.get("/api/clients");
      const transformedData = data.map((item) => {
        return {
          id: item._id,
          name: item.name,
          surname: item.surname,
          age: item.age,
          diet: item.diet,
        };
      });
      setClients(transformedData);
    } catch (error) {
      const { msg } = error.response.data;
      toast.error(msg);
    }
  };

  const validarCampos = () => {
    const { name, surname, age } = dataClient;

    if (!name || !surname || !age) {
      toast.warning("Todos los campos son obligatorios");
      return false;
    }
    return true;
  };

  const createUser = async () => {
    if (!validarCampos()) {
      return;
    }

    try {
      const { data } = await client.post("/api/clients", dataClient);
      toast.success(data.msg);
      getClients();
      handleCloseModal();
    } catch (error) {
      const { msg } = error.response.data;
      toast.error(msg);
    }
  };

  const updateUser = async () => {
    if (!validarCampos()) {
      return;
    }

    try {
      const { data } = await client.patch(
        `/api/clients/${initialValues._id}`,
        {},
        dataClient
      );
      toast.success(data.msg);
      getClients();
      handleCloseModal();
    } catch (error) {
      const { msg } = error.response.data;
      toast.error(msg);
    }
  };

  return (
    <div className="new-client-container">
      <div className="new-client-container--content">
        <div className="new-client-container--content--input-wrapper">
          <div className="input-container">
            <span>
              <PortraitOutlinedIcon />
            </span>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Nombre"
              onChange={handleChange}
              value={dataClient.name}
            />
          </div>
        </div>

        <div className="new-client-container--content--input-wrapper">
          <div className="input-container">
            <span>
              <AssignmentIndOutlinedIcon />
            </span>
            <input
              id="surname"
              name="surname"
              type="text"
              placeholder="Apellidos"
              onChange={handleChange}
              value={dataClient.surname}
            />
          </div>
        </div>

        <div className="new-client-container--content--input-wrapper">
          <div className="input-container">
            <span>
              <CakeOutlinedIcon />
            </span>
            <input
              id="age"
              name="age"
              type="text"
              placeholder="Edad"
              onChange={handleChange}
              value={dataClient.age}
            />
          </div>
        </div>

        <div className="new-client-container--content--buttons">
          <Button
            variant="contained"
            size="medium"
            onClick={initialValues !== undefined ? updateUser : createUser}
          >
            {initialValues !== undefined ? "Actualizar" : "Guardar"}
          </Button>
        </div>
      </div>
    </div>
  );
};
