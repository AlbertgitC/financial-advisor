import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.pluginService.register({
    beforeDraw: function (chart) {
        const width = chart.chart.width,
            height = chart.chart.height,
            ctx = chart.chart.ctx;

        ctx.restore();
        const fontSize = (height / 320).toFixed(2);
        ctx.font = fontSize + "em sans-serif";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#00CED1";

        const legendHeight = chart.legend.height;
        const text1 = "INVESTMENT",
            textX = Math.round((width - ctx.measureText(text1).width) / 2),
            textY = height / 2 + legendHeight / 2 - fontSize * 10,
            text2 = "PORTFOLIO",
            text2X = Math.round((width - ctx.measureText(text2).width) / 2),
            text2Y = height / 2 + legendHeight / 2 + fontSize * 10;

        ctx.fillText(text1, textX, textY);
        ctx.fillText(text2, text2X, text2Y);
        ctx.save();
    }
});

function createChart(chartRef, data) {
    const ctx = chartRef.current.getContext("2d");
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
                display: false,
                labels: {
                    fontColor: "#FFFFFF",
                    fontSize: 15
                }
            },
            centertext: {
                display: true,
                text: "Testing",
                subText: "sub text"
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
                        size: "16",
                        weight: "600"
                    }
                }
            }
        }
    };
    const donutChart = new Chart(ctx, configChart);
    return donutChart;
};

export default createChart;