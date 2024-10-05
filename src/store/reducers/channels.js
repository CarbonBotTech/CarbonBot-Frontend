const initialState = []

export default (state = initialState, action) => {

    switch(action.type) {

        case 'GET_CHANNELS': 

            return action.payload

        default:
            return state;
    }

}