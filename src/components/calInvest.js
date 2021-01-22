import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import * as Actions from './util/actions';
import RiskForm from './riskForm';
import './calInvest.css';
import { Link } from 'react-router-dom';
import * as CalAlgos from './util/calculationAlgo';

function CalInvest() {
    const globalState = useSelector(state => state);
    const dispatch = useDispatch();
    const defaultState = {
        investment: { "Bonds": 0, "Large Cap": 0, "Mid Cap": 0, "Foreign": 0, "Small Cap": 0 },
        diff: [0, 0, 0, 0, 0],
        endAmount: [0, 0, 0, 0, 0],
        transactions: [],
        error: ""
    };
    const [localState, setState] = useState(defaultState);

    useEffect(() => {
        setState(s => ({
            ...s, investment: globalState.investment
        }));
    }, [])

    function handleMoneyInput(e) {
        dispatch(Actions.changeInvest({ [e.target.name]: e.target.value }));
        setState({ ...localState, investment: { ...localState.investment, [e.target.name]: e.target.value } });
    };

    function handleSubmit() {
        let startAmount = Object.values(localState.investment);
        for (let i = 0; i < startAmount.length; i++) {
            if (isNaN(startAmount[i])) {
                setState({ ...localState, error: "Please enter number only" });
                return;
            } else {
                let num;
                if (startAmount[i] === "") {
                    num = 0;
                } else {
                    num = parseFloat(startAmount[i]);
                };
                startAmount.splice(i, 1, num);
            };
        };

        let percent = Object.values(globalState.riskChart[globalState.risk]);
        let endAmount = CalAlgos.calEndAmount(startAmount, percent);
        let diff = CalAlgos.calDiff(startAmount, endAmount);

        setState({
            ...localState,
            diff: toFixTwo(diff),
            endAmount: toFixTwo(endAmount),
            transactions: CalAlgos.calTrans(diff),
            error: ""
        });

        function toFixTwo(amount) {
            let newAmount = amount.map(val => (
                (Math.round(val * 100) / 100).toFixed(2)
            ));
            return newAmount;
        };
    };

    return (
        <div className="cal-invest-container">
            <div className="risk-level-container">
                <p>Risk Level {globalState.risk}: 
                    Bonds {globalState.riskChart[globalState.risk].bonds * 100}% | 
                    Large Cap {globalState.riskChart[globalState.risk].largeCap * 100}% |
                    Mid Cap {globalState.riskChart[globalState.risk].midCap * 100}% |
                    Foreign {globalState.riskChart[globalState.risk].foreign * 100}% |
                    Small Cap {globalState.riskChart[globalState.risk].smallCap * 100}%
                </p>
                <RiskForm />
                <Link to="/chart">
                    <button>Back to Risk Chart</button>
                </Link>
            </div>
            <div className="cal-container">
                <h3>Please Enter Your Current Portfolio</h3>
                <form>
                    {Object.keys(globalState.investment).map((type, i) => {
                        return (
                            <div key={i} className="amount-input">
                                <label>{type}</label>
                                <input
                                    name={type}
                                    value={localState.investment[type]}
                                    onChange={handleMoneyInput}
                                ></input>
                            </div>
                        );
                    })}
                </form>
                <div className="result">
                    <div className="diff">
                        <p>Difference</p>
                        <ul className="diff-ul">
                            {localState.diff.map((val, i) => {
                                if (val > 0) return <li key={i}>+{val}</li>;
                                return <li key={i}>{val}</li>;
                            })}
                        </ul>
                    </div>
                    <div className="end-total">
                        <p>New Amount</p>
                        <ul className="end-total-ul">
                            {localState.endAmount.map((val, i) => <li key={i}>
                                {val}
                            </li>)}
                        </ul>
                    </div>
                    <div className="transactions">
                        <p>Recommended Transfers</p>
                        <ul className="transactions-ul">
                            {
                                localState.transactions.length === 0 ? null :
                                    localState.transactions.map((transaction, i) => {
                                        let types = Object.keys(localState.investment);
                                        return <li key={i}>
                                            - Transfer ${transaction[2]} from {types[transaction[0]]} to {types[transaction[1]]}.
                                        </li>
                                    })
                            }
                        </ul>
                    </div>
                </div>
                <button className="rebalance-button" onClick={handleSubmit}>Rebalance</button>
                <p>{localState.error}</p>
            </div>
        </div>
    );
};

export default CalInvest;