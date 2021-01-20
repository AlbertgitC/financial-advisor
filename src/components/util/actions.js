export const INCREMENT_RISK = 'INCREMENT_RISK';
export const DECREMENT_RISK = 'DECREMENT_RISK';

export const increaseRisk = () => ({
    type: INCREMENT_RISK
});
export const decreaseRisk = () => ({
    type: DECREMENT_RISK
});