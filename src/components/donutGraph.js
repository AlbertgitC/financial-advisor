import './donutGraph.css';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import CreateChart from './util/createChart';
import * as Actions from './util/actions';
import { Link } from 'react-router-dom';

function DonutGraph() {
    const globalState = useSelector(state => state);
    const dispatch = useDispatch();

    const [dataState, setData] = useState([]);
    const [donutChart, setChart] = useState(null);
    const [tableState, setTable] = useState("table-hide");
    const [chartState, setChartDisplay] = useState("");

    const chartRef = useRef(null);
    useEffect(() => {
        setData(Object.values(globalState.riskChart[globalState.risk]));
        setChart(CreateChart(chartRef, dataState));
    }, []);

    useEffect(() => {
        if (donutChart) updateChart(donutChart);
    }, [dataState]);

    function updateChart(chart) {
        chart.data.datasets[0].data = dataState;
        chart.update();
    };

    function selectLevel(target) {
        dispatch(Actions.changeRisk(target.id));
        setData(Object.values(globalState.riskChart[target.id]));
    };

    function handleClick(e) {
        selectLevel(e.target);
    };

    function toggleTable() {
        if (tableState === "table-hide") {
            setTable("");
            setChartDisplay("chart-hide");
        } else {
            setTable("table-hide");
            setChartDisplay("");
        };
    };

    return (
        <div className="donut-container">
            <p>Please Select A Risk Level For Your Investment Portfolio</p>
            <div className="risk-indicator">
                <p>Low</p>
                <p>High</p>
            </div>
            <div className="risk-levels">
                {
                    Object.keys(globalState.riskChart).map((risk, i) => {
                        let riskString = globalState.risk.toString();
                        if (riskString === risk) {
                            return <div key={i} className="level clicked" id={risk} onClick={handleClick}>{risk}</div>;
                        };
                        return <div key={i} className="level" id={risk} onClick={handleClick}>{risk}</div>;
                    })
                }
            </div>
            <p className="table-link" onClick={toggleTable}>See All Risk Levels Table</p>
            <div className={`table-container ${tableState}`}>
                <table>
                    <tbody>
                        <tr>
                            <th>Risk</th>
                            <th>Bonds %</th>
                            <th>Large Cap %</th>
                            <th>Mid Cap %</th>
                            <th>Foreign %</th>
                            <th>Small Cap %</th>
                        </tr>
                        {
                            Object.entries(globalState.riskChart).map(([risk, value], i) => {
                                return (<tr key={i}>
                                    <th>{risk}</th>
                                    <th>{value.bonds * 100}</th>
                                    <th>{value.largeCap * 100}</th>
                                    <th>{value.midCap * 100}</th>
                                    <th>{value.foreign * 100}</th>
                                    <th>{value.smallCap * 100}</th>
                                </tr>);
                            })
                        }
                    </tbody>
                </table>
            </div>
            <div className={`chart-container ${chartState}`}>
                <canvas id="donut-chart" ref={chartRef}></canvas>
            </div>
            <div>
                <Link to="/calculator">
                    <button>Calculate Your Investment</button>
                </Link>
            </div>
        </div>
    );
}

export default DonutGraph;