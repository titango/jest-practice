import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import { replaceCamelWithSpaces } from "./App";

test("button has correct initial color", () => {
  render(<App />);

  // find an element with a role of button and text of 'Change to blue'
  const colorButton = screen.getByRole("button", {
    name: "Change to MidnightBlue",
  });

  // expect the background color to be red
  expect(colorButton).toHaveStyle({ backgroundColor: "MediumVioletRed" });

  // Click button
  fireEvent.click(colorButton);

  // expect the background color to be blue
  expect(colorButton).toHaveStyle({ backgroundColor: "MidnightBlue" });

  // expect the button text to be 'Change to red'
  expect(colorButton).toHaveTextContent("Change to MediumVioletRed");
});

test("initial conditions", () => {
  render(<App />);

  // check that the button starts out enabled
  const colorButton = screen.getByRole("button", {
    name: "Change to MidnightBlue",
  });
  expect(colorButton).toBeEnabled();

  // check that the checkbox starts out unchecked
  const checkbox = screen.getByRole("checkbox");
  expect(checkbox).not.toBeChecked();
});

test("Checkbox checked and disabled button, reopen to be enabled", () => {
  render(<App />);
  const colorButton = screen.getByRole("button", {
    name: "Change to MidnightBlue",
  });
  const checkbox = screen.getByRole("checkbox", { name: "Disable button" });

  // Click checkbox
  fireEvent.click(checkbox);

  // Check checkbox is checked and button is disabled
  expect(checkbox).toBeChecked();
  expect(colorButton).toBeDisabled();

  // Reopen state
  fireEvent.click(checkbox);
  expect(checkbox).not.toBeChecked();
  expect(colorButton).toBeEnabled();
});

test("Click checkbox and make button gray background, then re-enabled", () => {
  render(<App />);
  const colorButton = screen.getByRole("button", {
    name: "Change to MidnightBlue",
  });
  const checkbox = screen.getByRole("checkbox", { name: "Disable button" });

  // Click checkbox
  expect(checkbox).not.toBeChecked();
  fireEvent.click(checkbox);

  // Check checkbox is checked and button is disabled
  expect(checkbox).toBeChecked();
  expect(colorButton).toBeDisabled();
  expect(colorButton).toHaveStyle({ backgroundColor: "gray" });

  // Re-enabled
  fireEvent.click(checkbox);
  expect(checkbox).not.toBeChecked();
  expect(colorButton).toBeEnabled();
  expect(colorButton).toHaveStyle({ backgroundColor: "MediumVioletRed" });
});

test("Change button to blue and disabled then re-enabled", () => {
  render(<App />);
  const colorButton = screen.getByRole("button", {
    name: "Change to MidnightBlue",
  });
  const checkbox = screen.getByRole("checkbox", { name: "Disable button" });

  // click button to change color
  fireEvent.click(colorButton);
  expect(colorButton).toHaveStyle({ backgroundColor: "MidnightBlue" });

  // click checkbox and button disabled
  fireEvent.click(checkbox);
  expect(checkbox).toBeChecked();
  expect(colorButton).toBeDisabled();
  expect(colorButton).toHaveStyle({ backgroundColor: "gray" });

  // Re-enabled
  fireEvent.click(checkbox);
  expect(checkbox).not.toBeChecked();
  expect(colorButton).toBeEnabled();
  expect(colorButton).toHaveStyle({ backgroundColor: "MidnightBlue" });
});

describe("spaces before camel-case capital letters", () => {
  test("Works for no inner capital letters", () => {
    expect(replaceCamelWithSpaces("Red")).toBe("Red");
  });
  test("Works for one inner capital letter", () => {
    expect(replaceCamelWithSpaces("MidnightBlue")).toBe("Midnight Blue");
  });
  test("Works for multiple inner capital letters", () => {
    expect(replaceCamelWithSpaces("MediumVioletRed")).toBe("Medium Violet Red");
  });
});
