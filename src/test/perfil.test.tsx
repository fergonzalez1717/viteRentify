import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Perfil from "../paginas/perfil";

// Mock de useNavigate antes de cualquier test
const navigateMock = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

describe("Perfil Component", () => {
  // Limpiar localStorage y mocks antes de cada test
  beforeEach(() => {
    localStorage.clear();
    navigateMock.mockClear();
  });

  it("muestra todos los campos del formulario", () => {
    render(
      <MemoryRouter>
        <Perfil />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/foto de perfil/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/rut/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/teléfono/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/dirección/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/nacionalidad/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/foto de carnet/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /guardar/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /crear nuevo usuario/i })).toBeInTheDocument();
  });

  it("resetea los datos al presionar 'Crear Nuevo Usuario'", () => {
    localStorage.setItem("userName", "Juan");
    localStorage.setItem("userRut", "12345678-9");

    render(
      <MemoryRouter>
        <Perfil />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /crear nuevo usuario/i }));

    expect(localStorage.getItem("userName")).toBeNull();
    expect(localStorage.getItem("userRut")).toBeNull();
    expect(screen.getByLabelText(/nombre/i)).toHaveValue("");
    expect(screen.getByLabelText(/rut/i)).toHaveValue("");
  });

  it("muestra alerta si RUT o teléfono son inválidos", () => {
    const alertMock = vi.fn();
    vi.stubGlobal("alert", alertMock);

    render(
      <MemoryRouter>
        <Perfil />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/rut/i), { target: { value: "111" } });
    fireEvent.change(screen.getByLabelText(/teléfono/i), { target: { value: "123" } });
    fireEvent.click(screen.getByRole("button", { name: /guardar/i }));

    expect(alertMock).toHaveBeenCalledWith("RUT inválido");

    // Ahora un RUT válido pero teléfono inválido
    fireEvent.change(screen.getByLabelText(/rut/i), { target: { value: "12345678-5" } });
    fireEvent.click(screen.getByRole("button", { name: /guardar/i }));

    expect(alertMock).toHaveBeenCalledWith("Teléfono inválido");
  });

  it("guarda datos válidos en localStorage y navega al Home", () => {
    vi.stubGlobal("alert", () => {}); // ignorar alert

    render(
      <MemoryRouter>
        <Perfil />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/nombre/i), { target: { value: "Ana" } });
    fireEvent.change(screen.getByLabelText(/rut/i), { target: { value: "12345678-5" } });
    fireEvent.change(screen.getByLabelText(/teléfono/i), { target: { value: "+56912345678" } });
    fireEvent.change(screen.getByLabelText(/dirección/i), { target: { value: "Calle Falsa 123" } });
    fireEvent.change(screen.getByLabelText(/nacionalidad/i), { target: { value: "Chilena" } });

    fireEvent.click(screen.getByRole("button", { name: /guardar/i }));

    expect(localStorage.getItem("userName")).toBe("Ana");
    expect(localStorage.getItem("userRut")).toBe("12345678-5");
    expect(localStorage.getItem("userTelefono")).toBe("+56912345678");
    expect(localStorage.getItem("userDireccion")).toBe("Calle Falsa 123");
    expect(localStorage.getItem("userNacionalidad")).toBe("Chilena");
    expect(navigateMock).toHaveBeenCalledWith("/");
  });
});
