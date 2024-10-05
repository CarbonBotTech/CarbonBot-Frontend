const initialState = {
    dark_mode: false,
    loggedin: false,
    user: null,
    token: null,
    sidebar: false
};

export default (state = initialState, action) => {

    switch(action.type) {

        case 'TOGGLE_DARK_MODE': 

            return {
                ...state,
                dark_mode: !state.dark_mode
            };

        case 'TOGGLE_SIDEBAR': 

            return {
                ...state,
                sidebar: !state.sidebar
            };
            
        case 'SET_USER': 

            return {
                ...state,
                user: action.payload,
                loggedin: true
            };

        case 'SET_TOKEN': 

            return {
                ...state,
                token: action.payload
            };

        case 'UPDATE_PROFILE': 

            return {
                ...state,
                user: {
                    ...state.user,
                    profile: action.payload
                }
            };

        case 'UPDATE_COMPANY': 

            return {
                ...state,
                user: {
                    ...state.user,
                    company: action.payload
                }
            };

        case 'LOGOUT': 

            return {
                ...state,
                user: null,
                loggedin: false,
                token: null
            };

        default:
            return state;
    }

}