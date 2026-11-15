import { pad2, refCode } from "@/lib/format";

describe("format", () => {
  it("pad2 completa a dos cifras", () => {
    expect(pad2(1)).toBe("01");
    expect(pad2(12)).toBe("12");
  });

  it("refCode numera desde 1", () => {
    expect(refCode(0)).toBe("REF-01");
    expect(refCode(4)).toBe("REF-05");
  });
});
