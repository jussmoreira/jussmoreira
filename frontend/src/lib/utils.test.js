import { cn } from "@/lib/utils";

describe("cn", () => {
  it("combina clases y descarta condicionales falsos", () => {
    const hidden = false;
    expect(cn("a", hidden && "b", "c")).toBe("a c");
  });

  it("resuelve conflictos de Tailwind dejando ganar la última", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
  });
});
