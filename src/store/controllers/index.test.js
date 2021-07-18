import { requestSent, reducer, getNetworkStatus, STATUS_IDLE, STATUS_LOADING } from "./index";

const generateStore = ({ networkStatus = STATUS_IDLE } = {}) => ({ networkStatus })

describe('Controllers store', () => {
  test('Default store state', () => {
    const expected = generateStore()
    const actual = reducer()

    expect(actual).toStrictEqual(expected)
  })

  test('When I send a request, network status updates to loading', () => {
    const actions = [requestSent()]
    const expected = STATUS_LOADING
    const actual = getNetworkStatus(actions.reduce(reducer, undefined))

    expect(actual).toBe(expected)
  })
})