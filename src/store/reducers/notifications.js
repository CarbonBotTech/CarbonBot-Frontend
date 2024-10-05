const initialState = 0

export default (state = initialState, action) => {

    switch(action.type) {

        case 'SET_COUNT': 
            return action.payload
        case 'MARK_READ': 
            return 0
        default:
            return state;
    }

}