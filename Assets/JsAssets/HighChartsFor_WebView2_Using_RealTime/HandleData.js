// 这个是实时更新数据
let x_interval = 1.0;
let store_array = [1,1,1,1,1,1];
let simulation_time = 0.0;
let simulation_iteration = 0;
/**
 * 批量数据处理函数
 * @param patch_msg
 * num[0-1/6] 这个是实时转速
 * num[1/6-4/6] 代表输出力矩
 * num[4/6-6/6] 代表电流电压
 * @returns no return
 */
Highcharts.setOptions({
    credits: {enabled:false},
    chart:{
        type: 'spline',
        zooming:{
            type:'x',
        }
    },
    legend: {
        enabled:false,
        align: 'left',
        verticalAlign: 'left',
        borderWidth: 0
    },
    accessibility: {
        announceNewData: {
            enabled: true,
            minAnnounceInterval: 15000,
            announcementFormatter: function (allSeries, newSeries, newPoint) {
                if (newPoint) {
                    return 'New point added. Value: ' + newPoint.y;
                }
                return false;
            }
        }
    },
    xAxis: {
        /*等价于xAxis-label*/
        title: {
            text: 'Time(s)',
            style:{
                fontSize: 15,
                color: 'black',
                fontStyle: 'Times New Roman',
                fontWeight: 'bold'
            },

        },
        type: 'linear', // 线性轴（如果是时间轴，改为 'datetime'）
        tickPixelInterval: 150,
        maxPadding: 1,
        gridLineWidth: 1,
        gridLineColor: '#e6e6e6',
        gridLineDashStyle: 'Dash',
        /* 轴线*/
        lineColor: 'black',
        /* 标签*/
        labels: {
            style: {
                color: 'black'  // 设置X轴标签的颜色
            }
        },
    },

    yAxis: {
        title: {
            style: {
                fontSize: 15,
                color: 'black',
                fontStyle: 'Times New Roman',
                fontWeight: 'bold'
            },
        },
        gridLineWidth: 1,
        gridLineColor: '#e6e6e6',
        gridLineDashStyle: 'Dash',
        /* 轴线*/
        lineColor: 'black',
        /* 标签*/
        labels: {
            format:'{value:.3f}',
            style: {
                color: 'black'  // 设置Y轴标签的颜色
            }
        },
    },
    tooltip: {
        formatter: function () {
            return 'X: ' + this.x.toFixed(4) + '<br>Y: ' + this.y.toFixed(4); // X 保留 2 位小数，Y 不变
        },
    }

})
function GetCMGPatchMsgFromWINUIApp(patch_msg)
{
    if(x_interval===0.0)
    {
        x_interval = 0.1;
    }
    //* 先集中处理一下
    store_array = [];
    for(let i=0; i<patch_msg.length/8; i++)
    {
        let result = hex2float("0x"+patch_msg.slice(i*8,i*8+8));
        store_array.push(result);
    }
}
/**
 * 处理重要的仿真数据
 * @param important_msg
 * 第一个数:采样时间
 * 第二个数：参考转速
 TODO Waiting for other parameter
 * @returns no return
 */
function GetCMGImportantMsgFromWINUIApp(important_msg)
{
    x_interval = hex2float("0x"+important_msg.slice(0,8));
}
/** hex_to_float
 *
 * @param num hex type string
 * @returns {number} decimal type number
 */
function hex2float(num) {
    var sign = (num & 0x80000000) ? -1 : 1;
    var exponent = ((num >> 23) & 0xff) - 127;
    var mantissa = 1 + ((num & 0x7fffff) / 0x7fffff);
    return sign * mantissa * Math.pow(2, exponent);
}

const UpdateAllFig = function (patch_msg) {
    let chart = Highcharts.charts.find(c => c.renderTo.id === 'chart');
    let chart_series = chart.series[0];
    GetCMGPatchMsgFromWINUIApp(patch_msg);
    simulation_iteration ++;
    simulation_time = simulation_iteration * x_interval;
    // 获取当前 x 和 y 值
    const x = simulation_time;
    let y = store_array[0];
    // 添加新数据点，这个设置可千万别动，好不容易挑个最好的效果
    chart_series.addPoint([x, y], false); // 禁用默认动画
    chart.xAxis[0].setExtremes(x - 10, x+5, false); // 禁用范围调整动画
    // 手动重绘图表
    chart.redraw(true);
};

//Create the initial data
const data = (function () {
    const data = [];
    const time = new Date().getTime();

    for (let i = -19; i <= 0; i += 1) {
        data.push({
            x: i*0.5,
            y: Math.random()
        });
    }
    return data;
}());
// Plugin to add a pulsating marker on add point
Highcharts.addEvent(Highcharts.Series, 'addPoint', e => {
    const point = e.point,
        series = e.target;

    if (!series.pulse) {
        series.pulse = series.chart.renderer.circle()
            .add(series.markerGroup);
    }

    setTimeout(() => {
        series.pulse
            .attr({
                x: series.xAxis.toPixels(point.x, true),
                y: series.yAxis.toPixels(point.y, true),
                r: series.options.marker.radius,
                opacity: 1,
                fill: series.color
            })
            .animate({
                r: 20,
                opacity: 0
            }, {
                duration: 500
            });
    }, 1);
});


Highcharts.chart('chart', {
    chart: {
        type: 'spline',
    },
    title: {
        text: 'Velocity track'
    },
    yAxis: {
        title: {
            text: 'Value'
        }
    },
    series: [
        {
            name: 'Velocity',
            lineWidth: 2,
            color: '#4394E5',
            data
        }
    ]
});
