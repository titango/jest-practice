import { render, screen } from '../../../test-utils/testing-library-utils';

import Options from '../Options';

test('displays image for each scoop option from server', async () => {
  render(<Options optionType="scoops" />);

  // Find images
  const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  // Confirm alt text of images
  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});

test('Topping images', async () => {
  render(<Options optionType="toppings" />);

  // Find images
  const toppingImages = await screen.findAllByRole('img', {
    name: /toppings$/i
  });
  expect(toppingImages).toHaveLength(3);

  // Confirm alt text of images
  const altText = toppingImages.map((element) => element.alt);
  expect(altText).toEqual([
    'M&Ms toppings',
    'Hot fudge toppings',
    'Cherries toppings'
  ]);
});
