const defaultState = {
    risk: 1,
    riskChart: {
        1: { bonds: 0.8, largeCap: 0.2, midCap: 0, foreign: 0, smallCap: 0 },
        2: { bonds: 0.7, largeCap: 0.15, midCap: 0.15, foreign: 0, smallCap: 0 },
        3: { bonds: 0.6, largeCap: 0.15, midCap: 0.15, foreign: 0.1, smallCap: 0 },
        4: { bonds: 0.5, largeCap: 0.2, midCap: 0.2, foreign: 0.1, smallCap: 0 },
        5: { bonds: 0.4, largeCap: 0.2, midCap: 0.2, foreign: 0.2, smallCap: 0 },
        6: { bonds: 0.35, largeCap: 0.25, midCap: 0.05, foreign: 0.3, smallCap: 0.05 },
        7: { bonds: 0.2, largeCap: 0.25, midCap: 0.25, foreign: 0.25, smallCap: 0.05 },
        8: { bonds: 0.1, largeCap: 0.2, midCap: 0.4, foreign: 0.2, smallCap: 0.1 },
        9: { bonds: 0.05, largeCap: 0.15, midCap: 0.4, foreign: 0.25, smallCap: 0.15 },
        10: { bonds: 0, largeCap: 0.05, midCap: 0.25, foreign: 0.3, smallCap: 0.4 }
    },
    investment: {
        "Bonds": 0, "Large Cap": 0, "Mid Cap": 0, "Foreign": 0, "Small Cap": 0
    }
};
const rootReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "CHANGE_RISK":
            return { ...state, risk: action.payload }
        case "CHANGE_INVEST":
            return { ...state, investment: { ...state.investment, ...action.payload }}
        default:
            return state;
    }
};

export default rootReducer;