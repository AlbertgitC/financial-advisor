import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import * as Actions from './util/actions';

function RiskForm() {
    const globalState = useSelector(state => state);
    const dispatch = useDispatch();
    const [riskForm, setRiskForm] = useState(globalState.risk);

    function radioFormClick() {
        let radioForm = document.getElementsByClassName("risk-radio")[0];
        if (radioForm.style.display === "flex") {
            radioForm.style.display = "none";
        } else {
            radioForm.style.display = "flex";
        };
    };

    function handleChangeRiskInput(e) {
        setRiskForm(e.target.value);
    };

    function handleChangeRisk(e) {
        e.preventDefault();
        dispatch(Actions.changeRisk(riskForm));
        radioFormClick();
    }

    return (
        <div className="risk-form-container">
            <button onClick={radioFormClick}>Change Risk Level</button>
            <form className="risk-radio" onSubmit={handleChangeRisk}>
                {
                    Object.keys(globalState.riskChart).map((riskLevel, i) => {
                        if (globalState.risk === riskLevel) {
                            return (
                                <div key={riskLevel} className={`radio-button item${i}`}>
                                    <input type="radio" name="risk" id={riskLevel}
                                        value={riskLevel} defaultChecked="checked" onChange={handleChangeRiskInput} /><br />
                                    <label htmlFor={riskLevel}>{riskLevel}</label>
                                </div>
                            );
                        } else {
                            return (
                                <div key={riskLevel} className={`radio-button item${i}`}>
                                    <input type="radio" name="risk" id={riskLevel}
                                        value={riskLevel} onChange={handleChangeRiskInput} /><br />
                                    <label htmlFor={riskLevel}>{riskLevel}</label>
                                </div>
                            );
                        };
                    })
                }
                <button className="radio-button item10">Confirm</button>
            </form>
        </div>
    );
};

export default RiskForm;