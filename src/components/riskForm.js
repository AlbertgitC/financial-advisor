import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import * as Actions from './util/actions';

function RiskForm() {
    const globalState = useSelector(state => state);
    const dispatch = useDispatch();

    const defaultMobileState = {
        show: "mobile-hide",
        mobileRisk: globalState.risk,
        error: ""
    };
    const [riskForm, setRiskForm] = useState(globalState.risk);
    const [formState, setform] = useState("hide");
    const [mobileState, setMobile] = useState(defaultMobileState);

    function radioFormClick() {
        if (formState === "hide") {
            setform("");
        } else {
            setform("hide");
        };
    };

    function mobileFormClick() {
        if (mobileState.show === "mobile-hide") {
            setMobile({ ...mobileState, show: "", error: "" });
        } else {
            setMobile({ ...mobileState, show: "mobile-hide", error: "" });
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

    function handleInput(e) {
        setMobile({ ...mobileState, mobileRisk: e.target.value});
    };

    function handleMobileSubmit(e) {
        e.preventDefault();
        const levels = { 1: true, 2: true, 3: true, 4: true, 
            5: true, 6: true, 7: true, 8: true, 9: true, 10: true,};
        if (!(mobileState.mobileRisk in levels)) {
            setMobile({ ...mobileState, error: "Invalid risk level" });
        } else {
            dispatch(Actions.changeRisk(mobileState.mobileRisk));
            mobileFormClick();
        };
    };

    return (
        <div className="risk-form-container">
            <button className="risk-radio button" onClick={radioFormClick}>Change Risk Level</button>
            <form className={`risk-radio ${formState} form`} onSubmit={handleChangeRisk}>
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
            <div className="risk-radio-mobile">
                <div className="risk-radio-mobile-input">
                    <button onClick={mobileFormClick}>Change Risk Level</button>
                    <form className={`mobile-input ${mobileState.show}`}>
                        <label htmlFor="risk-input">Please Enter 1 - 10</label>
                        <input type="text" id="risk-input" 
                            value={mobileState.mobileRisk}
                            onChange={handleInput}
                        ></input>
                    </form>
                    <button className={`mobile-input ${mobileState.show}`} onClick={handleMobileSubmit}>Confirm</button>
                </div>
                <div>
                    <p>{mobileState.error}</p>
                </div>
            </div>
        </div>
    );
};

export default RiskForm;