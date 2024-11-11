import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Box, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import NoMealsOutlinedIcon from "@mui/icons-material/NoMealsOutlined";

import { DietPdf, HeaderTitle, BasicModal } from "../../components";

import { fadeIn, staggerContainer } from "../../utils/motion";
import { BackendClient } from "../../utils/backendClient";

export const ClientDietsView = () => {
  const client = new BackendClient();
  const { id, name } = useParams();

  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [contentModal, setContentModal] = useState(null);
  const [clientDiets, setClientDiets] = useState([]);
  const [widthModal, setWidthModal] = useState("auto");

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Nombre Dieta",
      flex: 1,
    },
    {
      field: "action",
      flex: 1,
      headerName: "Acciones",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <IconButton
              onClick={() => generatePdfDiet(params.row.id, params.row.name)}
            >
              <NoteAddOutlinedIcon />
            </IconButton>

            <IconButton onClick={() => deleteDiet(params.row.id)}>
              <NoMealsOutlinedIcon color="error" />
            </IconButton>
          </>
        );
      },
    },
  ];

  const closeModal = () => {
    setShowModal(false);
    setTitleModal("");
    setContentModal(null);
    setWidthModal("auto")
  };

  const generatePdfDiet = (id) => {
    setWidthModal("30%")   
    setTitleModal("Descargar PDF");
    setShowModal(true);
    setContentModal(
      <DietPdf id={id} name={name}/>
    );
  };

  const deleteDiet = async (id) => {
    try {
      const { data } = await client.delete(`/api/diets/${id}`);
      toast.success(data.msg);
      const updatedClientDiets = clientDiets.filter((diet) => diet.id !== id);
      setClientDiets(updatedClientDiets);
    } catch (error) {
      const { msg } = error.response.data;
      toast.error(msg);
    }
  };

  useEffect(() => {
    const getClientDiets = async () => {
      try {
        const { data } = await client.get(`/api/diets/client-diets/${id}`);
        console.log("getClientDiets: ", data);
        const transformedData = data.map((item) => {
          return {
            id: item._id,
            name: item.name,
            mañana: item.mañana,
            mediaMañana: item.mediaMañana,
            almuerzo: item.almuerzo,
            mediaTarde: item.mediaTarde,
            cena: item.cena,
          };
        });
        setClientDiets(transformedData);
      } catch (error) {
        const { msg } = error.response.data;
        toast.error(msg);
      }
    };
    getClientDiets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="dietas-page">
      <motion.section
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        <HeaderTitle pageName={`Dietas del Cliente: ${name}`} />

        <motion.div variants={fadeIn("up", "spring", 0.3, 0.6)}>
          <Box margin="auto">
            <Box
              m="30px 0 0 0"
              height="70vh"
              sx={{
                "& .MuiDataGrid-root": {
                  border: "none",
                  color: "#fff",
                },
                "& .MuiDataGrid-cell": {
                  borderBottom: "none",
                },
                "& .name-column--cell": {
                  color: "#101013",
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#101013",
                  borderBottom: "none",
                  justifyContent: "center !important",
                  textAlign: "center !important",
                  flex: 1,
                },
                "& .MuiDataGrid-cell--textLeft": {
                  justifyContent: "center !important",
                },
                "& .MuiButtonBase-root": {
                  color: "#fff !important",
                },
                "& .MuiTablePagination-selectLabel": {
                  display: "none !important",
                },
                "& .MuiTablePagination-displayedRows": {
                  margin: "0 !important",
                },
                "& .MuiSelect-icon": {
                  color: "#fff !important",
                },
                "& .MuiSelect-select": {
                  color: "#fff !important",
                },
                "& .MuiTablePagination-actions": {
                  color: "#fff !important",
                },
                "& .MuiDataGrid-columnHeaderTitleContainer": {
                  justifyContent: "center !important",
                },
                "& .MuiDataGrid-virtualScroller": {
                  backgroundColor: "#101013",
                },
                "& .MuiDataGrid-footerContainer": {
                  borderTop: "none",
                  backgroundColor: "#101013",
                },
                "& .MuiCheckbox-root": {
                  color: `#101013 !important`,
                },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                  color: `#101013 !important`,
                },
              }}
            >
              {clientDiets.length === 0 ? (
                <>
                  <div className="container-no-data">
                    <p>No hay dietas para este cliente</p>
                  </div>
                </>
              ) : (
                <DataGrid
                  rows={clientDiets}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 10 },
                    },
                  }}
                  pageSizeOptions={[5, 10]}
                />
              )}
            </Box>
          </Box>
        </motion.div>
      </motion.section>

      <BasicModal
        show={showModal}
        width={widthModal}
        onClose={closeModal}
        title={titleModal}
        children={contentModal}
        size="tiny"
      />
    </div>
  );
};
