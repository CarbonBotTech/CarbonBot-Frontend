export const toggleDarkMode = () => async (dispatch) => {
    dispatch({
        type: 'TOGGLE_DARK_MODE'
    })
}

export const toggleSidebar = () => async (dispatch) => {
    dispatch({
        type: 'TOGGLE_SIDEBAR'
    })
}

export const setAuthToken = (token) => async (dispatch) => {
    localStorage.setItem('token', token);
    dispatch({
        type: 'SET_TOKEN',
        payload: token
    })
}

export const setUser = (user) => async (dispatch) => {
    dispatch({
        type: 'SET_USER',
        payload: user
    })
}

export const RestoreUser = (user, token) => async (dispatch) => {
    dispatch({
        type: 'SET_TOKEN',
        payload: token
    });
    dispatch({
        type: 'SET_USER',
        payload: user
    });
}

export const Logout = (token) => async (dispatch) => {
    localStorage.removeItem('token');
    dispatch({
        type: 'LOGOUT'
    });
}

export const updateProfile = (profile) => async (dispatch) => {
    dispatch({
        type: 'UPDATE_PROFILE',
        payload: profile
    })
}

export const updateCompany = (company) => async (dispatch) => {
    dispatch({
        type: 'UPDATE_COMPANY',
        payload: company
    })
}