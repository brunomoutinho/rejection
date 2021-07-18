export const requestSent = () => ({
  type: requestSent.type
})
requestSent.type = 'REQUEST_SENT'

export const STATUS_IDLE = 'idle'
export const STATUS_LOADING = 'loading'
const initialState = {
  networkStatus: STATUS_IDLE
}
export const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case requestSent.type:
      return { ...state, networkStatus: STATUS_LOADING }
    default:
      return state
  }
}

export const getNetworkStatus = state => state.networkStatus