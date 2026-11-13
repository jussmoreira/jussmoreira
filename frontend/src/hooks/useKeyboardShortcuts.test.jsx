import React from "react";
import { renderHook, act } from "@testing-library/react";
import i18n from "@/i18n";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";

const wrapper = ({ children }) => <ThemeProvider>{children}</ThemeProvider>;

const press = (key, target = document.body, init = {}) =>
  act(() => {
    target.dispatchEvent(new KeyboardEvent("keydown", { key, bubbles: true, cancelable: true, ...init }));
  });

describe("useKeyboardShortcuts", () => {
  let scrollIntoView;
  let onToggleHelp;

  beforeAll(async () => {
    await i18n.changeLanguage("es");
  });

  beforeEach(() => {
    window.localStorage.clear();
    document.body.innerHTML = `
      <section id="home"></section>
      <section id="about"></section>
      <section id="projects"></section>
      <input id="terminal-input" />
    `;
    scrollIntoView = jest.fn();
    Element.prototype.scrollIntoView = scrollIntoView;
    onToggleHelp = jest.fn();
    renderHook(() => useKeyboardShortcuts({ onToggleHelp }), { wrapper });
  });

  it("las teclas numéricas llevan a la sección con ese número", () => {
    press("1");
    expect(scrollIntoView).toHaveBeenCalledTimes(1);
    expect(scrollIntoView.mock.instances[0].id).toBe("about");

    press("0");
    expect(scrollIntoView.mock.instances[1].id).toBe("home");
  });

  it("'?' pide mostrar u ocultar la ayuda", () => {
    press("?");
    expect(onToggleHelp).toHaveBeenCalledTimes(1);
  });

  it("'/' enfoca la terminal", () => {
    press("/");
    expect(document.activeElement).toBe(document.getElementById("terminal-input"));
  });

  it("no actúa mientras se escribe en un campo", () => {
    const input = document.getElementById("terminal-input");
    input.focus();
    press("1", input);
    press("?", input);
    expect(scrollIntoView).not.toHaveBeenCalled();
    expect(onToggleHelp).not.toHaveBeenCalled();
  });

  it("no actúa con Ctrl, Alt o Meta", () => {
    press("1", document.body, { ctrlKey: true });
    press("1", document.body, { metaKey: true });
    expect(scrollIntoView).not.toHaveBeenCalled();
  });

  it("no actúa con un diálogo abierto", () => {
    const dialog = document.createElement("div");
    dialog.setAttribute("role", "dialog");
    dialog.setAttribute("aria-modal", "true");
    document.body.appendChild(dialog);

    press("1");
    press("?");
    expect(scrollIntoView).not.toHaveBeenCalled();
    expect(onToggleHelp).not.toHaveBeenCalled();
  });

  it("'T' alterna el tema", () => {
    const before = document.documentElement.classList.contains("dark");
    press("t");
    expect(document.documentElement.classList.contains("dark")).toBe(!before);
  });
});
