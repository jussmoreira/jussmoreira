import { renderHook } from "@testing-library/react";
import i18n from "@/i18n";
import { useContent, useList, asList } from "@/hooks/useContent";

describe("useContent", () => {
  beforeAll(async () => {
    await i18n.changeLanguage("en");
  });

  it("devuelve el objeto de una sección", () => {
    const { result } = renderHook(() => useContent("about"));
    expect(result.current.eyebrow).toBeTruthy();
  });

  it("devuelve null si la clave no existe", () => {
    const { result } = renderHook(() => useContent("does.not.exist"));
    expect(result.current).toBeNull();
  });

  it("useList devuelve lista vacía si la clave no existe", () => {
    const { result } = renderHook(() => useList("does.not.exist"));
    expect(result.current).toEqual([]);
  });

  it("asList solo acepta arreglos", () => {
    expect(asList("x")).toEqual([]);
    expect(asList([1])).toEqual([1]);
  });
});
