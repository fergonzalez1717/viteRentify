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
    expect(
      screen.getByRole("button", { name: /iniciar sesión/i })
    ).toBeInTheDocument();
  });

  it("no llama a onLogin si faltan datos", () => {
    const onLogin = vi.fn();
    render(
      <MemoryRouter>
        <Login onLogin={onLogin} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /iniciar sesión/i }));

    expect(onLogin).not.toHaveBeenCalled();
  });

  // ✅ Testea ambos correos válidos
  const correosPermitidos = ["da.olaver@duocuc.cl", "fs.gonzalez@duocuc.cl"];

  correosPermitidos.forEach((correo) => {
    it(`llama a onLogin con correo válido: ${correo}`, () => {
      const onLogin = vi.fn();
      render(
        <MemoryRouter>
          <Login onLogin={onLogin} />
        </MemoryRouter>
      );

      fireEvent.change(screen.getByLabelText(/correo electrónico/i), {
        target: { value: correo },
      });
      fireEvent.change(screen.getByLabelText(/contraseña/i), {
        target: { value: "1234" },
      });

      fireEvent.click(screen.getByRole("button", { name: /iniciar sesión/i }));

      expect(onLogin).toHaveBeenCalledWith(correo, "1234");
    });
  });
});
