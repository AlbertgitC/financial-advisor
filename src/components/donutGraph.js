import './donutGraph.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import * as Actions from './util/actions';
import CalInvest from './calInvest';

function DonutGraph(props) {
    const globalState = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => {
        let level = document.getElementById(globalState.risk);
        selectLevel(level);
    }, [])

    function renderChart(data) {
        const ctx = document.getElementById("donut-chart").getContext("2d");
        const configChart = {
            type: "doughnut",
            data: {
                labels: ["Bonds", "Large Cap", "Mid Cap", "Foreign", "Small Cap"],
                datasets: [{
                    data: data,
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
    };

    function selectLevel(target) {
        let clicked = document.getElementsByClassName("clicked")[0];
        if (clicked) clicked.classList.remove("clicked");
        target.classList.add("clicked");
        dispatch(Actions.changeRisk(target.id));
        renderChart(Object.values(globalState.riskChart[target.id]));
    };

    function handleClick(e) {
        selectLevel(e.target);
    };

    function buttonClick() {
        props.setComponent({ component: <CalInvest setComponent={props.setComponent}/> });
    };

    return (
        <div className="donut-container">
            <p>Please Select A Risk Level For Your Investment Portfolio</p>
            <div className="risk-indicator">
                <p>Low</p>
                <p>High</p>
            </div>
            <div className="risk-levels">
                <div className="level" id="1" onClick={handleClick}>1</div>
                <div className="level" id="2" onClick={handleClick}>2</div>
                <div className="level" id="3" onClick={handleClick}>3</div>
                <div className="level" id="4" onClick={handleClick}>4</div>
                <div className="level" id="5" onClick={handleClick}>5</div>
                <div className="level" id="6" onClick={handleClick}>6</div>
                <div className="level" id="7" onClick={handleClick}>7</div>
                <div className="level" id="8" onClick={handleClick}>8</div>
                <div className="level" id="9" onClick={handleClick}>9</div>
                <div className="level" id="10" onClick={handleClick}>10</div>
            </div>
            <div className="chart-container">
                <canvas id="donut-chart"></canvas>
            </div>
            <div className="inv-portfolio">
                <div>INVESTMENT</div>
                <div>PORTFOLIO</div>
            </div>
            <div>
                <button onClick={buttonClick}>Calculate Your Investment</button>
            </div>
        </div>
    );
}

export default DonutGraph;