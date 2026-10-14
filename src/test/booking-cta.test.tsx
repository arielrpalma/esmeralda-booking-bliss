import { act, render, waitFor } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import FloatingBookingBar from "@/components/FloatingBookingBar";

it("opens the vendor date picker when a Motoviajeros booking CTA is activated", async () => {
  vi.stubGlobal("ResizeObserver", class {
    observe() {}
    disconnect() {}
  });
  if (!customElements.get("hotel-booking")) {
    customElements.define("hotel-booking", class extends HTMLElement {
      connectedCallback() {
        const root = this.attachShadow({ mode: "open" });
        const field = document.createElement("button");
        field.id = "fd";
        root.appendChild(field);
      }
    });
  }
  const { container, unmount } = render(<FloatingBookingBar />);
  const field = container.querySelector("hotel-booking")?.shadowRoot?.querySelector<HTMLElement>("#fd");
  if (!field) throw new Error("Vendor date field not mounted");
  const onClick = vi.fn();
  field.addEventListener("click", onClick);
  act(() => { window.dispatchEvent(new Event("motoviajeros:open-booking")); });
  await waitFor(() => expect(onClick).toHaveBeenCalledTimes(1));
  unmount();
  act(() => { window.dispatchEvent(new Event("motoviajeros:open-booking")); });
  await new Promise((resolve) => setTimeout(resolve, 10));
  expect(onClick).toHaveBeenCalledTimes(1);
  vi.unstubAllGlobals();
});