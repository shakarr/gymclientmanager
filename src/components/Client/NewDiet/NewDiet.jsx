import { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@mui/material";

import FastfoodOutlinedIcon from "@mui/icons-material/FastfoodOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";

import { BackendClient } from "../../../utils/backendClient";

import "./newDiet.scss";

export const NewDiet = (props) => {
  const client = new BackendClient();

  const { handleCloseModal, setClients, clientId } = props;

  const [dataDiet, setDataDiet] = useState({
    name: "",
    calories: "",
    mañana: [],
    mediaMañana: [],
    almuerzo: [],
    mediaTarde: [],
    cena: [],
    clientId,
  });

  const validarCampos = () => {
    const { mañana, mediaMañana, almuerzo, mediaTarde, cena, name, calories } =
      dataDiet;

    if (
      name === "" ||
      calories === "" ||
      !mañana.length ||
      !mediaMañana.length ||
      !almuerzo.length ||
      !mediaTarde.length ||
      !cena.length
    ) {
      return false;
    }
    return true;
  };

  const handleChange = (e, mealType, index) => {
    const { value } = e.target;

    setDataDiet((prevData) => {
      const updatedMeals = [...prevData[mealType]];
      updatedMeals[index] = value;

      return {
        ...prevData,
        [mealType]: updatedMeals,
      };
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setDataDiet({
      ...dataDiet,
      [name]: value,
    });
  };

  const addMeal = (mealType) => {
    setDataDiet((prevData) => ({
      ...prevData,
      [mealType]: [...prevData[mealType], ""],
    }));
  };

  const getClients = async () => {
    try {
      const { data } = await client.get("/api/clients");
      const transformedData = data.map((item) => ({
        id: item._id,
        name: item.name,
        surname: item.surname,
        age: item.age,
        diet: item.diet,
      }));
      setClients(transformedData);
    } catch (error) {
      const { msg } = error.response.data;
      toast.error(msg);
    }
  };

  const createDiet = async () => {
    if (!validarCampos()) {
      toast.warning("Todos los campos son obligatorios");
      return;
    }

    try {
      const { data } = await client.post(`/api/diets`, dataDiet);
      toast.success(data.msg);
      handleCloseModal();
      getClients();
    } catch (error) {
      const { msg } = error.response.data;
      toast.error(msg);
    }
  };

  return (
    <div className="new-diet-container">
      <div className="new-diet-container--content">
        <div className="new-client-container--content--input-wrapper">
          <div className="input-container">
            <span>
              <FastfoodOutlinedIcon />
            </span>
            <input
              type="text"
              name="name"
              placeholder="Nombre de la dieta"
              value={dataDiet.name}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="new-client-container--content--input-wrapper">
          <div className="input-container">
            <span>
              <MenuBookOutlinedIcon />
            </span>
            <input
              type="text"
              name="calories"
              placeholder="Total de calorías"
              value={dataDiet.calories}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="first-section">
          <div className="new-client-container--content--input-wrapper">
            <h3>Desayuno</h3>
            {dataDiet.mañana.map((item, index) => (
              <div key={index} className="input-container">
                <span>
                  <FastfoodOutlinedIcon />
                </span>
                <input
                  type="text"
                  placeholder={`Desayuno - ${index + 1}`}
                  value={item}
                  onChange={(e) => handleChange(e, "mañana", index)}
                />
              </div>
            ))}
            <Button onClick={() => addMeal("mañana")}>Añadir comida</Button>
          </div>

          <div className="new-client-container--content--input-wrapper">
            <h3>Media Mañana</h3>
            {dataDiet.mediaMañana.map((item, index) => (
              <div key={index} className="input-container">
                <span>
                  <FastfoodOutlinedIcon />
                </span>
                <input
                  type="text"
                  placeholder={`Media Mañana - ${index + 1}`}
                  value={item}
                  onChange={(e) => handleChange(e, "mediaMañana", index)}
                />
              </div>
            ))}
            <Button onClick={() => addMeal("mediaMañana")}>
              Añadir Comida
            </Button>
          </div>
        </div>

        <div className="second-section">
          <div className="new-client-container--content--input-wrapper">
            <h3>Almuerzo</h3>
            {dataDiet.almuerzo.map((item, index) => (
              <div key={index} className="input-container">
                <span>
                  <FastfoodOutlinedIcon />
                </span>
                <input
                  type="text"
                  placeholder={`Almuerzo - ${index + 1}`}
                  value={item}
                  onChange={(e) => handleChange(e, "almuerzo", index)}
                />
              </div>
            ))}
            <Button onClick={() => addMeal("almuerzo")}>Añadir Comida</Button>
          </div>

          <div className="new-client-container--content--input-wrapper">
            <h3>Media Tarde</h3>
            {dataDiet.mediaTarde.map((item, index) => (
              <div key={index} className="input-container">
                <span>
                  <FastfoodOutlinedIcon />
                </span>
                <input
                  type="text"
                  placeholder={`Media Tarde - ${index + 1}`}
                  value={item}
                  onChange={(e) => handleChange(e, "mediaTarde", index)}
                />
              </div>
            ))}
            <Button onClick={() => addMeal("mediaTarde")}>Añadir Comida</Button>
          </div>
        </div>

        <div className="new-client-container--content--input-wrapper">
          <h3>Cena</h3>
          {dataDiet.cena.map((item, index) => (
            <div key={index} className="input-container">
              <span>
                <FastfoodOutlinedIcon />
              </span>
              <input
                type="text"
                placeholder={`Cena - ${index + 1}`}
                value={item}
                onChange={(e) => handleChange(e, "cena", index)}
              />
            </div>
          ))}
          <Button onClick={() => addMeal("cena")}>Añadir Comida</Button>
        </div>

        <div className="new-client-container--content--buttons">
          <Button variant="contained" size="medium" onClick={createDiet}>
            Guardar
          </Button>
        </div>
      </div>
    </div>
  );
};
