import React from 'react';
import render from 'riteway/render-component';
import { describe } from 'riteway';
import match from 'riteway/match';

import { CurrentStreak } from './currentStreak.js';

describe('CurrentStreak component', async (assert) => {
  const renderCurrentStreak = (currentStreak) =>
    render(<CurrentStreak currentStreak={currentStreak} />);

  {
    const $ = renderCurrentStreak();
    const contains = match($('span').html());

    assert({
      given: 'No props',
      should: 'Display 0 as the current streak',
      actual: contains('Current Streak: 0'),
      expected: 'Current Streak: 0',
    });
  }

  {
    const $ = renderCurrentStreak(11);
    const contains = match($('span').html());

    assert({
      given: 'A current streak',
      should: 'Display the current streak passed',
      actual: contains('Current Streak: 11'),
      expected: 'Current Streak: 11',
    });
  }
});
