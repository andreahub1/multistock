import { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";
import DashboardLayout from "../layouts/DashboardLayout";

type Producto = {
  id: number;
  codigo: string;
  nombre: string;
  categoria: string;
  precio: string;
  stock: number;
  codigo_barras: string;
};

function Escaner() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [producto, setProducto] = useState<Producto | null>(null);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    let controls: { stop: () => void } | undefined;

    const iniciarEscaner = async () => {
      try {
        if (!videoRef.current) return;

        controls = await codeReader.decodeFromVideoDevice(
          undefined,
          videoRef.current,
          async (result) => {
            if (result) {
              const codigo = result.getText();
              setMensaje(`Código detectado: ${codigo}`);

              try {
                const respuesta = await fetch(
                  `http://127.0.0.1:8000/api/productos/codigo/${codigo}/`
                );

                if (!respuesta.ok) {
                  setProducto(null);
                  setMensaje("Producto no encontrado");
                  return;
                }

                const data: Producto = await respuesta.json();
                setProducto(data);
              } catch {
                setMensaje("Error al conectar con el servidor");
              }
            }
          }
        );
      } catch {
        setMensaje("No se pudo acceder a la cámara");
      }
    };

    iniciarEscaner();

    return () => {
      if (controls) {
        controls.stop();
      }
    };
  }, []);

  return (
    <DashboardLayout>
      <h1 className="page-title">Escanear producto</h1>

      <div className="scanner-container">
        <video ref={videoRef} className="scanner-video" />

        <p className="scanner-message">{mensaje}</p>

        {producto && (
          <div className="product-result">
            <h2>{producto.nombre}</h2>
            <p>
              <strong>Categoría:</strong> {producto.categoria}
            </p>
            <p>
              <strong>Precio:</strong> ${producto.precio}
            </p>
            <p>
              <strong>Stock:</strong> {producto.stock} unidades
            </p>

            {producto.stock <= 0 ? (
              <p className="stock-danger">Producto agotado</p>
            ) : producto.stock <= 5 ? (
              <p className="stock-warning">Stock bajo</p>
            ) : (
              <p className="stock-ok">Disponible</p>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default Escaner;