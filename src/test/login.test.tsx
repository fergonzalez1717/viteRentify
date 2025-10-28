import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "../paginas/login";

describe("Login Component", () => {
  it("muestra los campos de correo y contraseña", () => {
    render(
      <MemoryRouter>
        <Login onLogin={() => {}} />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /iniciar sesión/i })).toBeInTheDocument();
  });

  it("no llama a onLogin si faltan datos", () => {
    const onLogin = vi.fn();
    render(
      <MemoryRouter>
        <Login onLogin={onLogin} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /iniciar sesión/i }));

    // Como no se ingresó nada, no debe llamar a onLogin
    expect(onLogin).not.toHaveBeenCalled();
  });

  it("llama a onLogin con correo y contraseña ingresados", () => {
    const onLogin = vi.fn();
    render(
      <MemoryRouter>
        <Login onLogin={onLogin} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/correo electrónico/i), {
      target: { value: "vega@gmail.com" },
    });
    fireEvent.change(screen.getByLabelText(/contraseña/i), {
      target: { value: "1234" },
    });

    fireEvent.click(screen.getByRole("button", { name: /iniciar sesión/i }));

    expect(onLogin).toHaveBeenCalledWith("vega@gmail.com", "1234");
  });
});
