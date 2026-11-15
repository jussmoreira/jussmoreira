import { render, screen, act } from "@testing-library/react";
import { RotatingText } from "@/components/atoms/rotating-text";

describe("RotatingText", () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it("rota a la siguiente palabra tras el intervalo y el desvanecido", () => {
    render(<RotatingText words={["uno", "dos"]} interval={1000} />);
    expect(screen.getByText("uno")).toBeInTheDocument();

    act(() => jest.advanceTimersByTime(1000 + 300));
    expect(screen.getByText("dos")).toBeInTheDocument();
  });

  it("no deja timers vivos al desmontar a mitad del desvanecido", () => {
    const { unmount } = render(<RotatingText words={["uno", "dos"]} interval={1000} />);
    act(() => jest.advanceTimersByTime(1000));
    unmount();
    expect(jest.getTimerCount()).toBe(0);
  });
});
