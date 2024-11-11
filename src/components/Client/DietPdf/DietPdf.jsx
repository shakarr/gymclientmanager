import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
  Image,
} from "@react-pdf/renderer";

import { BackendClient } from "../../../utils/backendClient";

import {
  igImage,
  pdfImg,
  phoneIco,
} from "../../../assets";

const styles = StyleSheet.create({
  page: {
    padding: 10,
    backgroundColor: "#f4f4f4",
    position: "relative",
  },
  header: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 15,
    color: "#2a9d8f",
    fontFamily: "Helvetica-Bold",
  },
  subHeader: {
    fontSize: 16,
    textAlign: "left",
    marginTop: 5,
    marginBottom: 8,
    color: "#264653",
    fontFamily: "Helvetica-Bold",
  },
  contactSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: "2px",
    marginBottom: 5,
    padding: 2,
  },
  igContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    marginBottom: 5,
    padding: 5,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  },
  calorieSection: {
    width: 300,
    marginLeft: "auto",
    marginRight: "auto",
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  text: {
    fontSize: 12,
    color: "#333",
    lineHeight: 1.5,
    marginBottom: 4,
    fontFamily: "Helvetica",
  },
  list: {
    marginTop: 10,
    padding: 10,
  },
  listItem: {
    marginBottom: 6,
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  image: {
    marginVertical: 15,
    alignSelf: "center",
    width: 110,
    height: 110,
    borderRadius: 75,
    border: "3px solid #2a9d8f",
  },
  igImage: {
    width: 25,
    height: 25,
    marginRight: 2,
  },
  phoneImg: {
    width: 35,
    height: 35,
  },
  smallText: {
    fontSize: 14,
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
  },
});

const MyDocument = ({ data, name }) => (
  <Document>
    <Page style={styles.page} wrap>
      <Image style={styles.image} src={pdfImg} />

      <View style={styles.contactSection}>
        <Image style={styles.igImage} src={igImage} />
        <Text style={styles.smallText}>@javi10_89</Text>

        <Image style={styles.phoneImg} src={phoneIco} />
        <Text style={styles.smallText}>665 52 74 57</Text>
      </View>

      <Text style={styles.header}>Dieta Personalizada: {name}</Text>

      {data.meals.map((meal, index) => (
        <View style={styles.section} wrap={false} key={index}>
          <Text style={styles.subHeader}>{meal.name}</Text>
          {meal.items.map((item, itemIndex) => (
            <Text style={styles.listItem} key={itemIndex}>
              • {item}
            </Text>
          ))}
        </View>
      ))}

      <View style={styles.calorieSection} wrap={false}>
        <Text style={styles.smallText}>
          Total de calorías - {data.calories} cal
        </Text>
      </View>
    </Page>
  </Document>
);

export const DietPdf = (props) => {
  const client = new BackendClient();
  const { id, name } = props;

  const [diet, setDiet] = useState({
    name: "",
    calories: "",
    meals: [], // Ajuste para la estructura de meals
  });

  useEffect(() => {
    const getDietById = async () => {
      try {
        const { data } = await client.get(`/api/diets/${id}`);
        setDiet({
          meals: data.meals, // Ajuste para traer la estructura de meals desde el backend
          name: data.name,
          calories: data.calories,
        });
      } catch (error) {
        const { msg } = error.response.data;
        toast.error(msg);
      }
    };
    getDietById();
  }, [id, client]);

  return (
    <div>
      <PDFDownloadLink
        document={<MyDocument data={diet} name={name} />}
        fileName={`${diet.name}-${name}.pdf`}
      >
        {({ blob, url, loading, error }) => (
          <Button disabled={loading} variant="contained" size="medium">
            {loading ? "Cargando datos..." : "Descargar Dieta"}
          </Button>
        )}
      </PDFDownloadLink>
    </div>
  );
};
