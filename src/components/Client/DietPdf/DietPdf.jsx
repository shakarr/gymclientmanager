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
  bgPdf,
  foodFour,
  foodThree,
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
    position: "absolute", // Posiciona la imagen en el fondo
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: -1, // Envía la imagen al fondo, detrás de los otros elementos
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

      <View style={styles.section} wrap={false}>
        <Text style={styles.subHeader}>Desayuno</Text>
        {data.mañana.map((item, index) => (
          <Text style={styles.listItem} key={index}>
            • {item}
          </Text>
        ))}
      </View>

      <View style={styles.section} wrap={false}>
        <Text style={styles.subHeader}>Media Mañana</Text>
        {data.mediaMañana.map((item, index) => (
          <Text style={styles.listItem} key={index}>
            • {item}
          </Text>
        ))}
      </View>

      <View style={styles.section} wrap={false}>
        <Text style={styles.subHeader}>Almuerzo</Text>
        {data.almuerzo.map((item, index) => (
          <Text style={styles.listItem} key={index}>
            • {item}
          </Text>
        ))}
      </View>

      <View style={styles.section} wrap={false}>
        <Text style={styles.subHeader}>Media Tarde</Text>
        {data.mediaTarde.map((item, index) => (
          <Text style={styles.listItem} key={index}>
            • {item}
          </Text>
        ))}
      </View>

      <View style={styles.section} wrap={false}>
        <Text style={styles.subHeader}>Cena</Text>
        {data.cena.map((item, index) => (
          <Text style={styles.listItem} key={index}>
            • {item}
          </Text>
        ))}
      </View>

      <View style={styles.calorieSection} wrap={false}>
        <Text style={styles.smallText}>
          total de calorias - {data.calories} cal
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
    mañana: [""],
    mediaMañana: [""],
    almuerzo: [""],
    mediaTarde: [""],
    cena: [""],
  });

  useEffect(() => {
    const getDietById = async () => {
      try {
        const { data } = await client.get(`/api/diets/${id}`);
        console.log(data);
        const mappedResponse = {
          mañana: data.mañana,
          mediaMañana: data.mediaMañana,
          almuerzo: data.almuerzo,
          mediaTarde: data.mediaTarde,
          cena: data.cena,
          name: data.name,
          calories: data.calories,
        };
        setDiet(mappedResponse);
      } catch (error) {
        const { msg } = error.response.data;
        toast.error(msg);
      }
    };
    getDietById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
