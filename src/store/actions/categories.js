export const GetCategories = (categories) => async (dispatch) => {
    dispatch({
        type: 'GET_CATEGORIES',
        payload: categories
    })
}