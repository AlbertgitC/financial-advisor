import { useSelector, useDispatch } from 'react-redux';

function CalInvest() {
    const globalState = useSelector(state => state);

    return (
        <div className="cal-invest-container">
            <ul>
                {Object.entries(globalState.investment).map(([key, value], i) => {
                    return (
                        <li key={i}>
                            <p>{key}</p>
                            <p>{value}</p>
                        </li>
                    );
                })}
            </ul>
            calculation here
        </div>
    );
};

export default CalInvest;