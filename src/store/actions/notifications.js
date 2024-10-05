export const SetCount = (count) => async (dispatch) => {
    dispatch({
        type: 'SET_COUNT',
        payload: count
    })
}

export const MarkAsRead = () => async (dispatch) => {
    dispatch({
        type: 'MARK_READ'
    })
}