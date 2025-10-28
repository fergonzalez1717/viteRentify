import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Contacto from "../paginas/contacto";

// Mock del alert
vi.spyOn(window, "alert").mockImplementation(() => {});

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

  it("no debe enviar si hay campos vacíos", () => {
    render(
      <MemoryRouter>
        <Contacto />
      </MemoryRouter>
    );

    const boton = screen.getByRole("button", { name: /enviar/i });
    expect(boton).toBeDisabled();
  });

  it("muestra mensaje de agradecimiento si los campos son válidos", async () => {
    render(
      <MemoryRouter>
        <Contacto />
      </MemoryRouter>
    );

    // Rellenar campos válidos
    fireEvent.change(screen.getByLabelText(/nombre/i), { target: { value: "Juan" } });
    fireEvent.change(screen.getByLabelText(/apellidos/i), { target: { value: "Pérez" } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "juan@correo.com" } });
    fireEvent.change(screen.getByLabelText(/mensaje/i), {
      target: { value: "Hola, este es un mensaje válido de prueba." },
    });

    // Esperar que el botón se habilite (React necesita actualizar el estado)
    await waitFor(() =>
      expect(screen.getByRole("button", { name: /enviar/i })).not.toBeDisabled()
    );

    // Hacer clic en enviar
    fireEvent.click(screen.getByRole("button", { name: /enviar/i }));

    // Esperar a que el alert sea llamado
    await waitFor(() =>
      expect(window.alert).toHaveBeenCalledWith(
        expect.stringContaining("Gracias Juan Pérez")
      )
    );
  });
});
