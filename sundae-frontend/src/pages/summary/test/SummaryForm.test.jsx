import {
  render,
  screen,
  waitForElementToBeRemoved
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SummaryForm from '../SummaryForm';

test('Initial state', () => {
  render(<SummaryForm />);
  const cbElement = screen.getByRole('checkbox', {
    name: /terms and conditions/i
  });
  expect(cbElement).not.toBeChecked();
  const confirmBtn = screen.getByRole('button', { name: /Confirm orders/i });
  expect(confirmBtn).toBeDisabled();
});

test('Checkbox disables button on first click and enables on second click', () => {
  render(<SummaryForm />);
  const cbElement = screen.getByRole('checkbox', {
    name: /terms and conditions/i
  });
  const confirmBtn = screen.getByRole('button', { name: /Confirm orders/i });

  userEvent.click(cbElement);
  expect(confirmBtn).toBeEnabled();

  userEvent.click(cbElement);
  expect(confirmBtn).toBeDisabled();
});

test('popover responds to hover', async () => {
  render(<SummaryForm />);
  const textIceCream = /no ice cream will actually be delivered/i;
  const termsText = /terms and conditions/i;

  // popover starts out hidden
  const nullPopover = screen.queryByText(textIceCream);
  expect(nullPopover).not.toBeInTheDocument(termsText);

  // popover appears upon mouseover of checkbox label
  const termsAndConditions = screen.getByText(termsText);
  // userEvent.hover(termsAndConditions);
  userEvent.hover(termsAndConditions);
  const popover = screen.getByText(textIceCream);
  expect(popover).toBeInTheDocument();

  // popover disappears when we mouse out
  userEvent.unhover(termsAndConditions);
  await waitForElementToBeRemoved(() => screen.queryByText(textIceCream));
});
