import React, { useState, useEffect } from "react";
import {
  Button,
  FormGroup,
  Input,
  Label,
  Col,
  Alert,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "../styles/addresses.css";

const AddressManager = ({ checkout }) => {
  const userUsername = Cookies.get("userLogin");
  const userToken = Cookies.get("userAuth");
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    name: "",
    phone: "",
    street: "",
    number: "",
    city: "",
    CEP: "",
  });
  const [showNewAddressFields, setShowNewAddressFields] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState(null);
  const [showSaveAddressButton, setShowSaveAddressButton] = useState(false);

  const navigate = useNavigate();

  const handleCancel = () => {
    setNewAddress({
      name: "",
      phone: "",
      street: "",
      number: "",
      city: "",
      CEP: "",
    });
    setShowNewAddressFields(false);
    setShowSaveAddressButton(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://z0vlzp3ki1.execute-api.sa-east-1.amazonaws.com/dev/addresses",
          {
            params: {
              username: userUsername,
              token: userToken,
            },
          }
        );
        setAddresses(response.data.addresses);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchData();
  }, [userUsername, userToken]);

  const toggleConfirmationModal = () =>
    setConfirmationModal(!confirmationModal);

  const handleDeleteAddress = async (address) => {
    setAddressToDelete(address);
    toggleConfirmationModal();
  };

  const onDeleteAddress = (deletedAddress) => {
    setAddresses((prevAddresses) =>
      prevAddresses.filter((address) => address !== deletedAddress)
    );
  };

  const confirmDelete = async () => {
    try {
      const deleteRequestObject = {
        username: userUsername,
        address: addressToDelete,
      };

      await axios.delete(
        "https://z0vlzp3ki1.execute-api.sa-east-1.amazonaws.com/dev/addresses",
        {
          data: deleteRequestObject,
        }
      );

      onDeleteAddress(addressToDelete);
      toggleConfirmationModal();
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  const handleSaveAddress = async () => {
    try {
      const saveRequestObject = {
        username: userUsername,
        address: {
          name: newAddress.name,
          phone: newAddress.phone,
          street: newAddress.street,
          number: newAddress.number,
          city: newAddress.city,
          CEP: newAddress.CEP,
        },
      };

      await axios.post(
        "https://z0vlzp3ki1.execute-api.sa-east-1.amazonaws.com/dev/addresses",
        saveRequestObject
      );

      const response = await axios.get(
        "https://z0vlzp3ki1.execute-api.sa-east-1.amazonaws.com/dev/addresses",
        {
          params: {
            username: userUsername,
            token: userToken,
          },
        }
      );

      setAddresses(response.data.addresses);
      setShowNewAddressFields(false);
      setShowSaveAddressButton(false);
    } catch (error) {
      console.error("Error saving address:", error);
    }
  };

  const handleSelectAddress = async (address) => {
    const userShippingAddress = {
      name: address.name,
      phone: address.phone,
      street: address.street,
      streetNumber: address.number,
      city: address.city,
      postalCode: address.CEP,
    };

    let shippingInfo = []

    shippingInfo.push(userShippingAddress);

    navigate("/payment", { state: { shippingInfo } });
  };

  return (
    <div>
      <h4>Endereços:</h4>
      {addresses.length === 0 ? (
        <Alert color="info">Nenhum endereço registrado.</Alert>
      ) : (
        <ul>
          {addresses.map((address, index) => (
            <li key={index}>
              <p>Nome: {address.name}</p>
              <p>Telefone: {address.phone}</p>
              <p>Rua: {address.street}</p>
              <p>Número: {address.number}</p>
              <p>Cidade: {address.city}</p>
              <p>CEP: {address.CEP}</p>
              <Button
                color="danger"
                size="sm"
                onClick={() => handleDeleteAddress(address)}
                className="mb-4"
              >
                Excluir
              </Button>
              {checkout && (
                <Button
                  color="primary"
                  className="mb-4 mr"
                  size="sm"
                  onClick={() => handleSelectAddress(address)}
                >
                  SELECT
                </Button>
              )}
            </li>
          ))}
        </ul>
      )}

      {showNewAddressFields && (
        <div>
          <FormGroup>
            <Label for="newAddressName">Nome:</Label>
            <Input
              type="text"
              id="newAddressName"
              value={newAddress.name}
              onChange={(e) =>
                setNewAddress({ ...newAddress, name: e.target.value })
              }
            />
          </FormGroup>
          <FormGroup>
            <Label for="newAddressPhone">Telefone:</Label>
            <Input
              type="text"
              id="newAddressPhone"
              value={newAddress.phone}
              onChange={(e) =>
                setNewAddress({ ...newAddress, phone: e.target.value })
              }
            />
          </FormGroup>
          <FormGroup>
            <Label for="newAddressStreet">Rua:</Label>
            <Input
              type="text"
              id="newAddressStreet"
              value={newAddress.street}
              onChange={(e) =>
                setNewAddress({ ...newAddress, street: e.target.value })
              }
            />
          </FormGroup>
          <FormGroup>
            <Label for="newAddressNumber">Número:</Label>
            <Input
              type="text"
              id="newAddressNumber"
              value={newAddress.number}
              onChange={(e) =>
                setNewAddress({ ...newAddress, number: e.target.value })
              }
            />
          </FormGroup>
          <FormGroup>
            <Label for="newAddressCity">Cidade:</Label>
            <Input
              type="text"
              id="newAddressCity"
              value={newAddress.city}
              onChange={(e) =>
                setNewAddress({ ...newAddress, city: e.target.value })
              }
            />
          </FormGroup>
          <FormGroup>
            <Label for="newAddressCEP">CEP:</Label>
            <Input
              type="text"
              id="newAddressCEP"
              value={newAddress.CEP}
              onChange={(e) =>
                setNewAddress({ ...newAddress, CEP: e.target.value })
              }
            />
          </FormGroup>
        </div>
      )}

      {!showSaveAddressButton && (
        <Button
          color="primary"
          onClick={() => {
            setShowNewAddressFields(true);
            setShowSaveAddressButton(true);
          }}
        >
          Novo Endereço
        </Button>
      )}

      {showSaveAddressButton && (
        <Col>
          <div className="d-flex justify-content-between mt-5">
            <Button color="success" onClick={handleSaveAddress}>
              Salvar Endereço
            </Button>
            <Button color="danger" onClick={handleCancel}>
              Cancelar
            </Button>
          </div>
        </Col>
      )}

      <Modal
        isOpen={confirmationModal}
        toggle={toggleConfirmationModal}
        zIndex={9999}
        modalClassName="confirmation-modal"
      >
        <ModalHeader toggle={toggleConfirmationModal}>
          Você tem certeza?
        </ModalHeader>
        <ModalBody>
          {addressToDelete && (
            <p>
              Deseja excluir o endereço"
              {addressToDelete.name}"?
            </p>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={confirmDelete}>
            Sim, excluir!
          </Button>{" "}
          <Button color="secondary" onClick={toggleConfirmationModal}>
            Voltar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default AddressManager;
