import {
  fetchController,
  getStatus,
  STATUS_IDLE,
  STATUS_FETCHING,
  STATUS_ERROR,
  STATUS_SUCCESS,
} from './index';

const generateStore = ({ status = STATUS_IDLE } = {}) => ({
  status,
  payload: { type: 'empty' },
});

describe('Controllers store', () => {
  test('Default store state', () => {
    const actual = fetchController.reducer();
    const expected = generateStore();

    expect(actual).toStrictEqual(expected);
  });

  test('When I send a request, network status updates to loading', () => {
    const action = fetchController.actionCreators.fetch();

    const actual = getStatus(fetchController.reducer(undefined, action));
    const expected = STATUS_FETCHING;

    expect(actual).toBe(expected);
  });

  test("When I'm in fetching state and send a cancel action, status updates to idle", () => {
    const actions = [
      fetchController.actionCreators.fetch(),
      fetchController.actionCreators.cancel(),
    ];

    const actual = getStatus(
      actions.reduce(fetchController.reducer, undefined)
    );
    const expected = STATUS_IDLE;

    expect(actual).toBe(expected);
  });

  test("When I'm in fetching state and send a report error action, status updates to error", () => {
    const actions = [
      fetchController.actionCreators.fetch(),
      fetchController.actionCreators.reportError(),
    ];

    const actual = getStatus(
      actions.reduce(fetchController.reducer, undefined)
    );
    const expected = STATUS_ERROR;

    expect(actual).toBe(expected);
  });

  test("When I'm in error state and send a handle error action, status updates to idle", () => {
    const actions = [
      fetchController.actionCreators.fetch(),
      fetchController.actionCreators.reportError(),
      fetchController.actionCreators.handleError(),
    ];

    const actual = getStatus(
      actions.reduce(fetchController.reducer, undefined)
    );
    const expected = STATUS_IDLE;

    expect(actual).toBe(expected);
  });

  test("When I'm in fetching state and send a report success action, status updates to success", () => {
    const actions = [
      fetchController.actionCreators.fetch(),
      fetchController.actionCreators.reportSuccess(),
    ];

    const actual = getStatus(
      actions.reduce(fetchController.reducer, undefined)
    );
    const expected = STATUS_SUCCESS;

    expect(actual).toBe(expected);
  });

  test("When I'm in success state and send a handle success action, status updates to idle", () => {
    const actions = [
      fetchController.actionCreators.fetch(),
      fetchController.actionCreators.reportSuccess(),
      fetchController.actionCreators.handleSuccess(),
    ];

    const actual = getStatus(
      actions.reduce(fetchController.reducer, undefined)
    );
    const expected = STATUS_IDLE;

    expect(actual).toBe(expected);
  });
});
