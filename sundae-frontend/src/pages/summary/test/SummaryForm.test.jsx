import { fireEvent, render, screen } from "@testing-library/react";
import SummaryForm from "../SummaryForm";

test("Initial state", () => {
  render(<SummaryForm />);
  const cbElement = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  expect(cbElement).not.toBeChecked();
  const confirmBtn = screen.getByRole("button", { name: /Confirm orders/i });
  expect(confirmBtn).toBeDisabled();
});

test("Checkbox disables button on first click and enables on second click", () => {
  render(<SummaryForm />);
  const cbElement = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const confirmBtn = screen.getByRole("button", { name: /Confirm orders/i });

  fireEvent.click(cbElement);
  expect(confirmBtn).toBeEnabled();

  fireEvent.click(cbElement);
  expect(confirmBtn).toBeDisabled();
});
