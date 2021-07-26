import dsm from 'redux-dsm';

export const STATUS_IDLE = 'idle';
export const STATUS_FETCHING = 'fetching';
export const STATUS_ERROR = 'error';
export const STATUS_SUCCESS = 'success';

const fetchingStates = [
  'initial',
  STATUS_IDLE,
  [
    'fetch',
    STATUS_FETCHING,
    ['cancel', STATUS_IDLE],
    ['report error', STATUS_ERROR, ['handle error', STATUS_IDLE]],
    ['report success', STATUS_SUCCESS, ['handle success', STATUS_IDLE]],
  ],
];

export const fetchController = dsm({
  component: 'fetchController',
  description: 'controls the state of the controllers for fetch',
  actionStates: fetchingStates,
});

export const getStatus = (state) => state.status;
