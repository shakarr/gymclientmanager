import { useState } from "react";
import { toast } from "react-toastify";
import { Button, Divider, IconButton } from "@mui/material";

import FastfoodOutlinedIcon from "@mui/icons-material/FastfoodOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import FoodBankOutlinedIcon from "@mui/icons-material/FoodBankOutlined";

import { BackendClient } from "../../../utils/backendClient";

import "./newDiet.scss";

export const NewDiet = (props) => {
  const client = new BackendClient();
  const { handleCloseModal, setClients, clientId } = props;

  const [dataDiet, setDataDiet] = useState({
    name: "",
    calories: "",
    clientId,
    meals: [], // Array para manejar las comidas dinámicamente
  });

  const [mealCount, setMealCount] = useState(0); // Para almacenar el número de comidas
  const [mealNames, setMealNames] = useState([]); // Para almacenar los nombres de las comidas

  const validarCampos = () => {
    const { name, calories, meals } = dataDiet;
    if (
      name === "" ||
      calories === "" ||
      !meals.length ||
      meals.some((meal) => !meal.items.length)
    ) {
      return false;
    }
    return true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDataDiet({
      ...dataDiet,
      [name]: value,
    });
  };

  const handleMealCountChange = (e) => {
    const count = parseInt(e.target.value);
    setMealCount(count);
    setMealNames(Array(count).fill("")); // Inicializar los nombres de las comidas vacíos
    setDataDiet((prevData) => ({
      ...prevData,
      meals: Array(count).fill({ name: "", items: [] }),
    }));
  };

  const handleMealNameChange = (e, index) => {
    const newMealNames = [...mealNames];
    newMealNames[index] = e.target.value;
    setMealNames(newMealNames);

    // Actualizar el nombre de cada comida en dataDiet
    setDataDiet((prevData) => {
      const updatedMeals = [...prevData.meals];
      updatedMeals[index] = { ...updatedMeals[index], name: e.target.value };
      return {
        ...prevData,
        meals: updatedMeals,
      };
    });
  };

  const handleMealItemChange = (e, mealIndex, itemIndex) => {
    const { value } = e.target;
    setDataDiet((prevData) => {
      const updatedMeals = [...prevData.meals];
      const updatedItems = [...updatedMeals[mealIndex].items];
      updatedItems[itemIndex] = value;
      updatedMeals[mealIndex] = {
        ...updatedMeals[mealIndex],
        items: updatedItems,
      };
      return {
        ...prevData,
        meals: updatedMeals,
      };
    });
  };

  const addMealItem = (mealIndex) => {
    setDataDiet((prevData) => {
      const updatedMeals = [...prevData.meals];
      const updatedItems = [...updatedMeals[mealIndex].items, ""];
      updatedMeals[mealIndex] = {
        ...updatedMeals[mealIndex],
        items: updatedItems,
      };
      return {
        ...prevData,
        meals: updatedMeals,
      };
    });
  };

  const removeMealItem = (mealIndex, itemIndex) => {
    setDataDiet((prevData) => {
      const updatedMeals = [...prevData.meals];
      const updatedItems = updatedMeals[mealIndex].items.filter(
        (_, idx) => idx !== itemIndex
      );
      updatedMeals[mealIndex] = {
        ...updatedMeals[mealIndex],
        items: updatedItems,
      };
      return {
        ...prevData,
        meals: updatedMeals,
      };
    });
  };

  // Función para devolver un objeto `dataDiet` sin elementos vacíos en `items`
  const cleanDataDiet = (data) => {
    return {
      ...data,
      meals: data.meals.map((meal) => ({
        ...meal,
        items: meal.items.filter((item) => item.trim() !== ""), // Filtrar elementos vacíos
      })),
    };
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
    // Limpiar datos antes de enviarlos
    const cleanedDataDiet = cleanDataDiet(dataDiet);

    try {
      const { data } = await client.post(`/api/diets`, cleanedDataDiet);
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
        <div className="new-diet-container--content--input-wrapper">
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

        <div className="new-diet-container--content--input-wrapper">
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

        <div className="new-diet-container--content--input-wrapper">
          <div className="input-container">
            <span>
              <MenuBookOutlinedIcon />
            </span>
            <input
              type="number"
              placeholder="Número de comidas"
              value={mealCount}
              onChange={handleMealCountChange}
            />
          </div>
        </div>

        {mealCount !== 0 && (
          <div className="divider-container">
            <Divider />
          </div>
        )}

        <div className="meals-container">
          {mealNames.map((mealName, index) => (
            <div className="meal-section">
              <div
                key={index}
                className="new-diet-container--content--input-wrapper"
              >
                <div className="input-container">
                  <span>
                    <FoodBankOutlinedIcon />
                  </span>
                  <input
                    type="text"
                    placeholder={`Nombre de la comida`}
                    value={mealName}
                    onChange={(e) => handleMealNameChange(e, index)}
                  />
                </div>

                {dataDiet.meals[index].items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="new-diet-container--content--input-wrapper"
                  >
                    <div className="input-container">
                      <span>
                        <FastfoodOutlinedIcon />
                      </span>
                      <input
                        type="text"
                        placeholder={`Comida ${itemIndex + 1}`}
                        value={item}
                        onChange={(e) =>
                          handleMealItemChange(e, index, itemIndex)
                        }
                      />
                      {/* <IconButton
                        onClick={() => removeMealItem(index, itemIndex)}
                        aria-label="delete"
                      >
                        <DeleteOutlineOutlinedIcon />
                      </IconButton> */}
                    </div>
                  </div>
                ))}
                <Button onClick={() => addMealItem(index)}>
                  Añadir comida
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="new-diet-container--content--buttons">
          <Button variant="contained" size="medium" onClick={createDiet}>
            Guardar
          </Button>
        </div>
      </div>
    </div>
  );
};
