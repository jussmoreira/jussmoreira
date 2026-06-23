import React from "react";
import { renderHook, act } from "@testing-library/react";
import { ThemeProvider, useTheme } from "@/contexts/ThemeContext";

const wrapper = ({ children }) => <ThemeProvider>{children}</ThemeProvider>;

describe("ThemeContext", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.classList.remove("dark");
  });

  it("expone el tema y permite alternarlo", () => {
    const { result } = renderHook(() => useTheme(), { wrapper });

    const initial = result.current.theme;
    expect(["light", "dark"]).toContain(initial);

    act(() => result.current.toggleTheme());

    expect(result.current.theme).not.toBe(initial);
    expect(result.current.isDark).toBe(result.current.theme === "dark");
  });

  it("persiste el tema seleccionado en localStorage", () => {
    const { result } = renderHook(() => useTheme(), { wrapper });

    act(() => result.current.setTheme("dark"));

    expect(window.localStorage.getItem("jm_theme_v1")).toBe("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });
});
