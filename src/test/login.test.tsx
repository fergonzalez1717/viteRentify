import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "../paginas/Login";



// Bloque de pruebas para el componente Login
describe("Login Component", () => {
  // 🧪 PRUEBA 1: Verificar que los campos se muestren correctamente
  it("muestra los campos de correo y contraseña", () => {
    render(
      <MemoryRouter>
        <Login onLoginSuccess={() => {}} />
      </MemoryRouter>
    );

    // Verificamos que los inputs estén presentes
    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();

    // Verificamos que el botón exista
    expect(screen.getByRole("button", { name: /iniciar sesión/i })).toBeInTheDocument();
  });

  // 🧪 PRUEBA 2: Verificar que no se pueda iniciar sesión si faltan campos
  it("no llama a onLoginSuccess si faltan datos", () => {
    const onLoginSuccess = vi.fn(); // función simulada
    render(
      <MemoryRouter>
        <Login onLoginSuccess={onLoginSuccess} />
      </MemoryRouter>
    );

    // Simulamos click sin escribir nada
    fireEvent.click(screen.getByRole("button", { name: /iniciar sesión/i }));

    // Como no se ingresó nada, no debe llamar a onLoginSuccess
    expect(onLoginSuccess).not.toHaveBeenCalled();
  });

  // 🧪 PRUEBA 3: Verificar que se llama onLoginSuccess con credenciales correctas
  it("llama a onLoginSuccess si se ingresan correo y contraseña válidos", () => {
    const onLoginSuccess = vi.fn(); // simulamos función
    render(
      <MemoryRouter>
        <Login onLoginSuccess={onLoginSuccess} />
      </MemoryRouter>
    );

    // Simulamos escribir en los inputs
    fireEvent.change(screen.getByLabelText(/correo electrónico/i), {
      target: { value: "usuario@ejemplo.com" },
    });
    fireEvent.change(screen.getByLabelText(/contraseña/i), {
      target: { value: "1234" },
    });

    // Click en el botón
    fireEvent.click(screen.getByRole("button", { name: /iniciar sesión/i }));

    // ✅ onLoginSuccess debe haberse llamado
    expect(onLoginSuccess).toHaveBeenCalled();

    // ✅ Verificamos que se haya guardado la sesión
    expect(localStorage.getItem("isLoggedIn")).toBe("true");
  });
});
