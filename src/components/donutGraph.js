import './donutGraph.css';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import * as Actions from './util/actions';
import { Link } from 'react-router-dom';

function DonutGraph(props) {
    const globalState = useSelector(state => state);
    const dispatch = useDispatch();

    const [dataState, setData] = useState([]);
    const [donutChart, setChart] = useState(null);

    useEffect(() => {
        setData(Object.values(globalState.riskChart[globalState.risk]));
        setChart(renderChart());
    }, []);

    useEffect(() => {
        if (donutChart) updateChart(donutChart);
    }, [dataState]);

    function updateChart(chart) {
        chart.data.datasets[0].data = dataState;
        chart.update();
    };
    
    const chartRef = useRef(null);
    function renderChart() {
        const ctx = chartRef.current.getContext("2d");
        const configChart = {
            type: "doughnut",
            data: {
                labels: ["Bonds", "Large Cap", "Mid Cap", "Foreign", "Small Cap"],
                datasets: [{
                    data: dataState,
                    backgroundColor: [
                        "#EF4F4F",
                        "#EE9595",
                        "#F58634",
                        "#007965",
                        "#00587A"
                    ],
                    borderColor: "#000000"
                }]
            },
            options: {
                hover: false,
                tooltips: false,
                legend: {
                    labels: {
                        fontColor: "#FFFFFF",
                        fontSize: 15
                    }
                },
                animation: {
                    duration: 1300
                },
                plugins: {
                    datalabels: {
                        display: function (context) {
                            let index = context.dataIndex;
                            let value = context.dataset.data[index];
                            if (value) return true;
                            return false;
                        },
                        formatter: function (value, context) {
                            if (value) {
                                return (
                                    context.chart.data.labels[context.dataIndex] + "\n" + (value * 100) + "%"
                                );
                            };
                        },
                        color: "#ffffff",
                        font: {
                            size: "22",
                            weight: "600"
                        }
                    }
                }
            }
        };
        const donutChart = new Chart(ctx, configChart);
        return donutChart;
    };

    function selectLevel(target) {
        dispatch(Actions.changeRisk(target.id));
        setData(Object.values(globalState.riskChart[target.id]));
    };

    function handleClick(e) {
        selectLevel(e.target);
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
            <div className="chart-container">
                <canvas id="donut-chart" ref={chartRef}></canvas>
            </div>
            <div className="inv-portfolio">
                <p>INVESTMENT<br />PORTFOLIO</p>
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