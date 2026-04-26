import { QRCodeSVG } from "qrcode.react";
import { restaurant } from "../data/menu";
import "./VistaQR.css";

const URL_MENU = "http://localhost:5173";

export default function VistaQR() {
  return (
    <div className="qr-container">
      <div className="qr-card">
        <h1>{restaurant.nombre}</h1>
        <p className="qr-subtitulo">Escanea para ver nuestro menú</p>

        <div className="qr-box">
          <QRCodeSVG value={URL_MENU} size={200} fgColor="#b5451b" />
        </div>

        <p className="qr-instruccion">
          Apunta la cámara de tu celular al código
        </p>

        <div className="qr-info">
          <p>📍 {restaurant.direccion}</p>
          <p>🕐 {restaurant.horario}</p>
          <p>📞 {restaurant.telefono}</p>
        </div>
      </div>
    </div>
  );
}
