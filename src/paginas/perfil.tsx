// Perfil.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Perfil: React.FC = () => {
  const [name, setName] = useState<string>(""); // Para el nombre de usuario
  const [image, setImage] = useState<string | null>(""); // Para la imagen de perfil

 const [rut, setRut] = useState<string>("");
  const [telefono, setTelefono] = useState<string>("");
  const [direccion, setDireccion] = useState<string>("");
  const [nacionalidad, setNacionalidad] = useState<string>("");
  const [carnet, setCarnet] = useState<string | null>("");
  const navigate = useNavigate();

    const resetProfileData = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("userImage");
    localStorage.removeItem("userRut");
    localStorage.removeItem("userTelefono");
    localStorage.removeItem("userDireccion");
    localStorage.removeItem("userNacionalidad");
    localStorage.removeItem("userCarnet");


    setName("");
    setImage("");
    setRut("");
    setTelefono("");
    setDireccion("");
    setNacionalidad("");
    setCarnet("");
  };

  // Cargar datos del perfil (nombre e imagen) desde localStorage si existen
  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    const storedImage = localStorage.getItem("userImage");

    const storedRut = localStorage.getItem("userRut");
    const storedTelefono = localStorage.getItem("userTelefono");
    const storedDireccion = localStorage.getItem("userDireccion");
    const storedNacionalidad = localStorage.getItem("userNacionalidad");
    const storedCarnet = localStorage.getItem("userCarnet");

    if (storedName) setName(storedName);
    if (storedImage) setImage(storedImage);

    if (storedRut) setRut(storedRut);
    if (storedTelefono) setTelefono(storedTelefono);
    if (storedDireccion) setDireccion(storedDireccion);
    if (storedNacionalidad) setNacionalidad(storedNacionalidad);
    if (storedCarnet) setCarnet(storedCarnet);
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

    // Validación simple de RUT chileno
  const isValidRut = (rut: string) => {
    const cleanRut = rut.replace(/\./g, "").replace("-", "");
    if (!/^\d{7,8}[0-9kK]$/.test(cleanRut)) return false;
    const body = cleanRut.slice(0, -1);
    let dv = cleanRut.slice(-1).toLowerCase();

    let sum = 0;
    let multiplier = 2;
    for (let i = body.length - 1; i >= 0; i--) {
      sum += parseInt(body[i], 10) * multiplier;
      multiplier = multiplier < 7 ? multiplier + 1 : 2;
    }
    const dvCalc = 11 - (sum % 11);
    const dvFinal = dvCalc === 11 ? "0" : dvCalc === 10 ? "k" : dvCalc.toString();
    return dvFinal === dv;
  };

   const isValidTelefono = (tel: string) => /^\+?56?\d{9}$/.test(tel.replace(/\s+/g, ""));

  // Manejar el guardado de datos en localStorage
  const handleSave = () => {
    if (!isValidRut(rut)) {
      alert("RUT inválido");
      return;
    }
    if (!isValidTelefono(telefono)) {
      alert("Teléfono inválido");
      return;
    }

    localStorage.setItem("userImage", image || ""); // Guardar imagen en localStorage
    localStorage.setItem("userName", name); // Guardar nombre

    localStorage.setItem("userRut", rut);
    localStorage.setItem("userTelefono", telefono);
    localStorage.setItem("userDireccion", direccion);
    localStorage.setItem("userNacionalidad", nacionalidad);
    localStorage.setItem("userCarnet", carnet || "");
    navigate("/"); // Redirigir al Home
  };

  return (
    <div className="main-content d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <div className="profile-container p-4 bg-light rounded shadow" style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Editar Perfil</h2>

        <button onClick={resetProfileData} className="btn btn-danger w-100 mb-3">
          Crear Nuevo Usuario
        </button>

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


        {/* RUT */}
        <div className="mb-3">
          <label htmlFor="rut" className="form-label fw-bold">RUT</label>
          <input
            type="text"
            id="rut"
            className="form-control"
            value={rut}
            onChange={(e) => setRut(e.target.value)}
            placeholder="12.345.678-9"
          />
        </div>

        {/* Teléfono */}
        <div className="mb-3">
          <label htmlFor="telefono" className="form-label fw-bold">Teléfono</label>
          <input
            type="text"
            id="telefono"
            className="form-control"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            placeholder="+56912345678"
          />
        </div>

        {/* Dirección */}
        <div className="mb-3">
          <label htmlFor="direccion" className="form-label fw-bold">Dirección</label>
          <input
            type="text"
            id="direccion"
            className="form-control"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
          />
        </div>

        {/* Nacionalidad */}
        <div className="mb-3">
          <label htmlFor="nacionalidad" className="form-label fw-bold">Nacionalidad</label>
          <input
            type="text"
            id="nacionalidad"
            className="form-control"
            value={nacionalidad}
            onChange={(e) => setNacionalidad(e.target.value)}
          />
        </div>

        {/* Foto de carnet */}
        <div className="mb-3">
          <label htmlFor="carnet" className="form-label fw-bold">Foto de Carnet</label>
          <input
            type="file"
            id="carnet"
            className="form-control"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => setCarnet(reader.result as string);
                reader.readAsDataURL(file);
              }
            }}
          />
          {carnet && <img src={carnet} alt="Carnet" style={{ width: "100%", marginTop: "10px" }} />}
        </div>

        <button onClick={handleSave} className="btn btn-primary w-100 mt-2">Guardar</button>
      </div>
    </div>
  );
};

export default Perfil;
