import { INCREMENT_RISK, DECREMENT_RISK } from './actions';

const rootReducer = (state = { risk: 1 }, action) => {
    // Object.freeze(state);
    switch (action.type) {
        case INCREMENT_RISK:
            return { risk: state.risk + 1 }
        case DECREMENT_RISK:
            return { risk: state.risk - 1 }
        default:
            return state;
    }
};

export default rootReducer;