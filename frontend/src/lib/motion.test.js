import { prefersReducedMotion } from "@/lib/motion";

describe("prefersReducedMotion", () => {
  const original = window.matchMedia;
  afterEach(() => {
    window.matchMedia = original;
  });

  it("es verdadero cuando el sistema pide menos movimiento", () => {
    window.matchMedia = (query) => ({ matches: query.includes("reduce") });
    expect(prefersReducedMotion()).toBe(true);
  });

  it("es falso sin matchMedia", () => {
    window.matchMedia = undefined;
    expect(prefersReducedMotion()).toBe(false);
  });
});
