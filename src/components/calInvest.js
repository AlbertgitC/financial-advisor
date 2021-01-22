import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import * as Actions from './util/actions';
import RiskForm from './riskForm';
import './calInvest.css';
import { Link } from 'react-router-dom';

function CalInvest(props) {
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
        
        let endAmount = calEndAmount(startAmount);
        let diff = calDiff(startAmount, endAmount);

        setState({
            ...localState,
            diff: toFixTwo(diff),
            endAmount: toFixTwo(endAmount),
            transactions: calTrans(diff),
            error: ""
        });

        function calEndAmount(amount) {
            let total = amount.reduce((accumulator, currentValue) => accumulator + currentValue);
            let endAmount = [];
            let percent = Object.values(globalState.riskChart[globalState.risk]);
            for (let val of percent) {
                endAmount.push(total * val);
            };
            return endAmount;
        };

        function calDiff(startAmount, endAmount) {
            let diff = [];
            for (let i = 0; i < startAmount.length; i++) {
                diff.push(endAmount[i] - startAmount[i]);
            };
            return diff;
        };

        function toFixTwo(amount) {
            let newAmount = amount.map(val => (
                (Math.round(val * 100) / 100).toFixed(2)
            ));
            return newAmount;
        };

        function calTrans(arr) {
            let diff = arr.slice(0);
            let trans = [];
            let done = false;
            
            for (let i = 0; i < diff.length - 1; i++) {
                if (diff[i] === 0) continue;
                for (let j = i + 1; j < diff.length; j++) {
                    if (diff[j] === 0) continue;
                    if (diff[i] + diff[j] === 0) {
                        let negativeIdx = diff[i] < 0 ? i : j;
                        let positiveIdx = negativeIdx === i ? j : i;
                        let amount = (Math.round(diff[positiveIdx] * 100) / 100).toFixed(2);
                        trans.push([negativeIdx, positiveIdx, amount]);
                        diff.splice(i, 1, 0);
                        diff.splice(j, 1, 0);
                    };
                };
            };

            while (!done) {
                done = true;
                for (let i = 0; i < diff.length - 1; i++) {
                    if (diff[i] === 0) continue;
                    for (let j = i + 1; j < diff.length; j++) {
                        if (diff[j] === 0 || diff[i] === 0) {
                            continue;
                        } else if (diff[i] > 0 && diff[j] > 0) {
                            continue;
                        } else if (diff[i] < 0 && diff[j] < 0) {
                            continue;
                        };
                        done = false;
                        let negativeIdx = diff[i] < 0 ? i : j;
                        let positiveIdx = negativeIdx === i ? j : i;
                        let sum = diff[i] + diff[j];
                        if (sum > 0) {
                            let amount = (Math.round(-diff[negativeIdx] * 100) / 100).toFixed(2);
                            trans.push([negativeIdx, positiveIdx, amount]);
                            diff.splice(negativeIdx, 1, 0);
                            diff.splice(positiveIdx, 1, sum);
                        } else {
                            let amount = (Math.round(diff[positiveIdx] * 100) / 100).toFixed(2);
                            trans.push([negativeIdx, positiveIdx, amount]);
                            diff.splice(negativeIdx, 1, sum);
                            diff.splice(positiveIdx, 1, 0);
                        };
                    };
                };
            };
            return trans;
        };
    }

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
                            {localState.diff.map((val, i) => <li key={i}>
                                {val}
                            </li>)}
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