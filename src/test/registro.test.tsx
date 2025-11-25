import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Registro from "../paginas/Registro";

const navigateMock = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

describe("Registro Component", () => {
  beforeEach(() => {
    localStorage.clear();
    navigateMock.mockClear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("muestra todos los campos del formulario", () => {
    render(
      <MemoryRouter>
        <Registro onRegisterSuccess={vi.fn()} />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^contraseña$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirmar contraseña/i)).toBeInTheDocument();
  });

  it("muestra errores si se intenta enviar vacío", async () => {
    render(
      <MemoryRouter>
        <Registro onRegisterSuccess={vi.fn()} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /registrarse/i }));

    expect(await screen.findByText(/el correo es obligatorio/i)).toBeInTheDocument();
    expect(await screen.findByText(/la contraseña es obligatoria/i)).toBeInTheDocument();
  });

  it("muestra error si las contraseñas no coinciden", async () => {
    render(
      <MemoryRouter>
        <Registro onRegisterSuccess={vi.fn()} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/correo electrónico/i), { target: { value: "test@test.com" } });
    fireEvent.change(screen.getByLabelText(/^contraseña$/i), { target: { value: "1234" } });
    fireEvent.change(screen.getByLabelText(/confirmar contraseña/i), { target: { value: "0000" } });

    fireEvent.click(screen.getByRole("button", { name: /registrarse/i }));

    expect(await screen.findByText(/las contraseñas no coinciden/i)).toBeInTheDocument();
  });

  it("guarda datos válidos y redirige a perfil", () => {
    const onRegisterSuccess = vi.fn();
    vi.stubGlobal("alert", () => {}); // ignorar alert

    render(
      <MemoryRouter>
        <Registro onRegisterSuccess={onRegisterSuccess} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/correo electrónico/i), { target: { value: "test@test.com" } });
    fireEvent.change(screen.getByLabelText(/^contraseña$/i), { target: { value: "1234" } });
    fireEvent.change(screen.getByLabelText(/confirmar contraseña/i), { target: { value: "1234" } });

    fireEvent.click(screen.getByRole("button", { name: /registrarse/i }));

    expect(localStorage.getItem("isLoggedIn")).toBe("true");
    expect(localStorage.getItem("userEmail")).toBe("test@test.com");

    expect(onRegisterSuccess).toHaveBeenCalled();
    expect(navigateMock).toHaveBeenCalledWith("/perfil");
  });
});
