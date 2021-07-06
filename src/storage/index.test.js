import { getSavedState } from './index.js';

test('I get undefined if nothing has been saved into the local storage', () => {
  const actual = getSavedState();
  const expected = undefined;

  expect(actual).toBe(expected);
});
