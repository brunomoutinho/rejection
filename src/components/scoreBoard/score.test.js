import React from 'react';
import render from 'riteway/render-component';
import { describe } from 'riteway';
import match from 'riteway/match';

import { Score } from './score.js';

describe('Score component', async (assert) => {
  const renderScore = (score) => render(<Score score={score} />);

  {
    const $ = renderScore();
    const contains = match($('span').html());

    assert({
      given: 'No props',
      should: 'Display 0 as the score',
      actual: contains('Score: 0'),
      expected: 'Score: 0',
    });
  }

  {
    const $ = renderScore(11);
    const contains = match($('span').html());

    assert({
      given: 'A score',
      should: 'Display the score passed',
      actual: contains('Score: 11'),
      expected: 'Score: 11',
    });
  }
});
