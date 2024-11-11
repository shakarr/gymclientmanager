import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import PersonOffOutlinedIcon from "@mui/icons-material/PersonOffOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";

import {
  NewClient,
  NewDiet,
  HeaderActions,
  BasicModal,
} from "../../components";

import { fadeIn, staggerContainer } from "../../utils/motion";
import { BackendClient } from "../../utils/backendClient";

import "./dietas.scss";

const RenderListActions = (props) => {
  const { handleOpenModal } = props;

  return (
    <div className="w-full flex p-2">
      <Button
        variant="contained"
        size="small"
        startIcon={<AddIcon />}
        onClick={handleOpenModal}
      >
        Crear Cliente
      </Button>
    </div>
  );
};

export const Dietas = () => {
  const client = new BackendClient();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [contentModal, setContentModal] = useState(null);
  const [widthModal, setWidthModal] = useState("auto");

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Nombre",
      flex: 1,
    },
    {
      field: "surname",
      headerName: "Apellidos",
      flex: 1,
    },
    {
      field: "age",
      headerName: "Edad",
      flex: 1,
    },
    {
      field: "diet",
      headerName: "Dieta",
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            {params.row.diet.length === 0 ? (
              <CancelOutlinedIcon color="error" />
            ) : (
              <CheckCircleOutlinedIcon color="success" />
            )}
          </>
        );
      },
    },
    {
      field: "action",
      flex: 1,
      headerName: "Acciones",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <IconButton onClick={() => handleCreateDiet(params.row.id)}>
              <RestaurantOutlinedIcon color="success" />
            </IconButton>

            <IconButton
              onClick={() =>
                navigate(`/dietas-cliente/${params.row.id}/${params.row.name}`)
              }
            >
              <RemoveRedEyeOutlinedIcon color="primary" />
            </IconButton>

            <IconButton onClick={() => handleUpdateClient(params.row.id)}>
              <PeopleAltOutlinedIcon color="primary" />
            </IconButton>

            <IconButton onClick={() => handleDeleteClient(params.row.id)}>
              <PersonOffOutlinedIcon color="error" />
            </IconButton>
          </>
        );
      },
    },
  ];

  useEffect(() => {
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
    getClients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const closeModal = () => {
    setShowModal(false);
    setTitleModal("");
    setContentModal(null);
    setWidthModal("auto")
  };

  const handleCreateClient = () => {
    setWidthModal("auto")
    setShowModal(true);
    setTitleModal("Crear Cliente");
    setContentModal(
      <NewClient handleCloseModal={closeModal} setClients={setClients} />
    );
  };

  const handleDeleteClient = async (id) => {
    try {
      const { data } = await client.delete(`/api/clients/${id}`);
      toast.success(data.msg);
      const updatedClients = clients.filter((client) => client.id !== id);
      setClients(updatedClients);
    } catch (error) {
      const { msg } = error.response.data;
      toast.error(msg);
    }
  };

  const handleUpdateClient = async (id) => {
    try {
      const { data } = await client.get(`/api/clients/${id}`);
      setShowModal(true);
      setTitleModal("Actualizar Cliente");
      setContentModal(
        <NewClient
          handleCloseModal={closeModal}
          title={titleModal}
          initialValues={data}
          setClients={setClients}
        />
      );
    } catch (error) {
      const { msg } = error.response.data;
      toast.error(msg);
    }
  };

  const handleCreateDiet = (id) => {
    setWidthModal("auto")
    setShowModal(true);
    setTitleModal("Crear Dieta");
    setContentModal(
      <NewDiet
        handleCloseModal={closeModal}
        title={titleModal}
        setClients={setClients}
        clientId={id}
      />
    );
  };

  return (
    <div className="dietas-page">
      <motion.section
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        <HeaderActions
          actions={<RenderListActions handleOpenModal={handleCreateClient} />}
        />

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
              {clients.length === 0 ? (
                <>
                  <div className="container-no-data">
                    <p>No hay clientes registrados aún</p>
                  </div>
                </>
              ) : (
                <DataGrid
                  rows={clients}
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
