import { renderHook, act } from "@testing-library/react";
import { useCountUp } from "@/hooks/useCountUp";

describe("useCountUp", () => {
  it("parte en 0 mientras no ha empezado", () => {
    const { result } = renderHook(() => useCountUp(45, false));
    expect(result.current).toBe(0);
  });

  it("muestra la cifra final al imprimir aunque no haya empezado", () => {
    const { result } = renderHook(() => useCountUp(45, false));

    act(() => {
      window.dispatchEvent(new Event("beforeprint"));
    });

    expect(result.current).toBe(45);
  });
});
