export const GetPlatforms = (platforms) => async (dispatch) => {
    dispatch({
        type: 'GET_PLATFORMS',
        payload: platforms
    })
}