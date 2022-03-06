import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

  userEvent.click(cbElement);
  expect(confirmBtn).toBeEnabled();

  userEvent.click(cbElement);
  expect(confirmBtn).toBeDisabled();
});

test("popover responds to hover", () => {
  // popover starts out hidden
  // popover appears upon mouseover of checkbox label
  // popover disappears when we mouse out
});
