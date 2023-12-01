import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Button, Input } from "reactstrap";
import CommonSection from "../components/UI/common-section/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import { useLocation, useNavigate } from "react-router-dom";
import qrcode from "../assets/images/qrcode.png";
import ClipboardJS from "clipboard";
import "../styles/checkout.css";

const PaymentPix = () => {
  const paymentInfo = [];
  const location = useLocation();
  const shippingInfo = location.state && location.state.shippingInfo;
  const navigate = useNavigate();

  const [copied, setCopied] = useState(false);
  const textToCopy =
    "00020126420014BR.GOV.BCB.PIX0120cid.cakess@gmail.com5204000053039865802BR5917Cid Cakes Comerc.6013Caraguatatuba62150511CIDCAKES1236304FCB4";

  const submitHandler = (e) => {
    e.preventDefault();
    const userPaymentInfo = {
      type: "pix",
    };
    paymentInfo.push(userPaymentInfo);
    navigate("/review", { state: { paymentInfo, shippingInfo } });
  };

  const inputRef = useRef(null);

  useEffect(() => {
    const clipboard = new ClipboardJS(".copy-btn", {
      text: () => textToCopy,
    });

    clipboard.on("success", () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });

    return () => {
      clipboard.destroy();
    };
  }, []);

  return (
    <Helmet title="Pagamento">
      <CommonSection title="Pagamento" />
      <section className="d-flex align-items-center justify-content-center">
        <Container>
          <Row>
            <Col className="text-center">
              <h6 className="mb-4">Leia o QRCODE abaixo no seu app bancário</h6>
              <img src={qrcode} alt="pix" className="mb-5 mt-5" />
            </Col>
          </Row>
          <Row className="mt-4">
            <Col className="text-center">
              <Input
                type="text"
                readOnly
                value={textToCopy}
                innerRef={inputRef}
                className="mb-2"
              />
              <Button
                color="primary"
                onClick={() => {
                  inputRef.current.select();
                  document.execCommand("copy");
                }}
                className="copy-btn"
              >
                {copied ? "Copiado!" : "Copiar"}
              </Button>
            </Col>

              <div className="mt-5 d-flex align-items-center justify-content-center">
                <Button
                  onClick={submitHandler}
                  style={{ backgroundColor: "#F875AA", color: "black" }}
                >
                  Avançar
                </Button>
              </div>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default PaymentPix;
