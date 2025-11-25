import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Contacto from "../paginas/contacto";

describe("Contacto Component", () => {
  it("muestra todos los campos del formulario", () => {
    render(
      <MemoryRouter>
        <Contacto />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/apellidos/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mensaje/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /enviar/i })).toBeInTheDocument();
  });

  it("el botón está deshabilitado con campos vacíos", () => {
    render(
      <MemoryRouter>
        <Contacto />
      </MemoryRouter>
    );

    const boton = screen.getByRole("button", { name: /enviar/i });
    expect(boton).toBeDisabled();
  });

  it("muestra mensaje de éxito cuando el formulario es válido", async () => {
    render(
      <MemoryRouter>
        <Contacto />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/nombre/i), { target: { value: "Juan" } });
    fireEvent.change(screen.getByLabelText(/apellidos/i), { target: { value: "Pérez" } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "juan@correo.com" } });
    fireEvent.change(screen.getByLabelText(/mensaje/i), {
      target: { value: "Hola, este es un mensaje válido." },
    });

    await waitFor(() =>
      expect(screen.getByRole("button", { name: /enviar/i })).not.toBeDisabled()
    );

    fireEvent.click(screen.getByRole("button", { name: /enviar/i }));

    await waitFor(() =>
      expect(screen.getByText(/Gracias Juan Pérez/i)).toBeInTheDocument()
   );

  });
});
