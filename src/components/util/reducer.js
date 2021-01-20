import { INCREMENT_RISK, DECREMENT_RISK } from './actions';

const rootReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case INCREMENT_RISK:
            return state.risk++;
        case DECREMENT_RISK:
            return state.risk--;
        default:
            return state;
    }
};

export default rootReducer;