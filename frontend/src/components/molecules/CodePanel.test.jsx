import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import i18n from "@/i18n";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { CodePanel } from "@/components/molecules/CodePanel";

const renderPanel = () =>
  render(
    <ThemeProvider>
      <CodePanel />
    </ThemeProvider>,
  );

const getInput = () => screen.getByLabelText(i18n.t("hero.code.terminal.label"));

const submit = (input, text) => {
  fireEvent.change(input, { target: { value: text } });
  fireEvent.submit(input.closest("form"));
};

describe("CodePanel · terminal", () => {
  beforeAll(async () => {
    await i18n.changeLanguage("es");
  });

  beforeEach(() => {
    window.localStorage.clear();
  });

  it("Tab completa un comando a partir de su prefijo", () => {
    renderPanel();
    const input = getInput();

    fireEvent.change(input, { target: { value: "pro" } });
    fireEvent.keyDown(input, { key: "Tab" });

    expect(input).toHaveValue("proyectos");
  });

  it("Tab sin coincidencia no cambia el valor ni atrapa el foco", () => {
    renderPanel();
    const input = getInput();

    fireEvent.change(input, { target: { value: "zzz" } });
    const notPrevented = fireEvent.keyDown(input, { key: "Tab" });

    expect(input).toHaveValue("zzz");
    expect(notPrevented).toBe(true);
  });

  it("las flechas recorren el historial de comandos", () => {
    renderPanel();
    const input = getInput();

    submit(input, "ayuda");
    submit(input, "limpiar");
    expect(input).toHaveValue("");

    fireEvent.keyDown(input, { key: "ArrowUp" });
    expect(input).toHaveValue("limpiar");
    fireEvent.keyDown(input, { key: "ArrowUp" });
    expect(input).toHaveValue("ayuda");
    fireEvent.keyDown(input, { key: "ArrowDown" });
    expect(input).toHaveValue("limpiar");
    fireEvent.keyDown(input, { key: "ArrowDown" });
    expect(input).toHaveValue("");
  });

  it("un comando desconocido muestra el error en la terminal", () => {
    renderPanel();
    submit(getInput(), "nada");

    expect(screen.getByText(/comando no encontrado: nada/)).toBeInTheDocument();
  });
});
