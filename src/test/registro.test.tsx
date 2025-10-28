import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Registro from "../paginas/Registro";

describe("Registro Component", () => {
  it("muestra todos los campos del formulario", () => {
    render(
      <MemoryRouter>
        <Registro onRegisterSuccess={vi.fn()} />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^contraseña$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirmar contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /registrarse/i })).toBeInTheDocument();
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
    fireEvent.change(screen.getByLabelText(/confirmar contraseña/i), { target: { value: "abcd" } });

    fireEvent.click(screen.getByRole("button", { name: /registrarse/i }));

    expect(await screen.findByText(/las contraseñas no coinciden/i)).toBeInTheDocument();
  });

  it("guarda datos y llama a onRegisterSuccess cuando es válido", async () => {
    const onRegisterSuccess = vi.fn();

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
  });
});
