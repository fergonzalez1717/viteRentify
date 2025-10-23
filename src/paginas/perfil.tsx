// Perfil.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Perfil: React.FC = () => {
  const [name, setName] = useState<string>(""); // Para el nombre de usuario
  const [image, setImage] = useState<string | null>(""); // Para la imagen de perfil
  const navigate = useNavigate();

  // Cargar datos del perfil (nombre e imagen) desde localStorage si existen
  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    const storedImage = localStorage.getItem("userImage");
    if (storedName) setName(storedName);
    if (storedImage) setImage(storedImage);
  }, []);

  // Manejar la carga de la foto
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result as string;
        setImage(base64Image);
      };
      reader.readAsDataURL(file);
    }
  };

  // Manejar el guardado de datos en localStorage
  const handleSave = () => {
    localStorage.setItem("userImage", image || ""); // Guardar imagen en localStorage
    localStorage.setItem("userName", name); // Guardar nombre
    navigate("/"); // Redirigir al Home
  };

  return (
    <div className="main-content d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <div className="profile-container p-4 bg-light rounded shadow" style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Editar Perfil</h2>

        <div className="mb-3">
          <label htmlFor="name" className="form-label fw-bold">Nombre</label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label fw-bold">Foto de Perfil</label>
          <input
            type="file"
            id="image"
            className="form-control"
            accept="image/*"
            onChange={handleImageChange}
          />
          {image && <img src={image} alt="Perfil" style={{ width: "100%", marginTop: "10px" }} />}
        </div>

        <button onClick={handleSave} className="btn btn-primary w-100 mt-2">Guardar</button>
      </div>
    </div>
  );
};

export default Perfil;
