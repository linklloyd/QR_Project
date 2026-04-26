import { QRCodeCanvas } from "qrcode.react";
import { restaurant } from "../data/menu";
import { IconPin, IconClock, IconPhone, IconDownload } from "./Icons";
import "./Admin.css";

const URL_MENU = window.location.origin;

function descargarQR() {
  const canvas = document.getElementById("qr-canvas");
  const url = canvas.toDataURL("image/png");
  const a = document.createElement("a");
  a.href = url;
  a.download = "menu-qr.png";
  a.click();
}

export default function Admin() {
  return (
    <div className="admin-container">
      <div className="admin-card">
        <h1>{restaurant.nombre}</h1>
        <p className="admin-sub">Código QR de tu menú digital</p>

        <div className="qr-box">
          <QRCodeCanvas id="qr-canvas" value={URL_MENU} size={210} fgColor="#000000" />
        </div>

        <p className="qr-hint">El cliente escanea esto y ve el menú completo</p>

        <button className="download-btn" onClick={descargarQR}>
          <IconDownload /> Descargar QR
        </button>

        <div className="admin-info">
          <div className="info-row">
            <IconPin />
            <span>{restaurant.direccion}</span>
          </div>
          <div className="info-row">
            <IconClock />
            <span>{restaurant.horario}</span>
          </div>
          <div className="info-row">
            <IconPhone />
            <span>{restaurant.telefono}</span>
          </div>
        </div>

        <a className="menu-link" href="/" target="_blank">
          Ver menú →
        </a>
      </div>
    </div>
  );
}
