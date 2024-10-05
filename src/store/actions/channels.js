export const GetChannels = (channels) => async (dispatch) => {
    dispatch({
        type: 'GET_CHANNELS',
        payload: channels
    })
}