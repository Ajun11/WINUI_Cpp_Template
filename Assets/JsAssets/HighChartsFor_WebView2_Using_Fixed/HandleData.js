let x_interval = 1.0;
let x_series = [];
let y_series = [];

/**
 * 批量数据处理函数
 * @param patch_msg
 * num[0-1/6] 这个是实时转速
 * num[1/6-4/6] 代表输出力矩
 * num[4/6-6/6] 代表电流电压
 * @returns no return
 */
function GetCMGPatchMsgFromWINUIApp(patch_msg)
{
    //* 原来一共比如有10000个采样数据，变成hex有80000个，要除以8才是真正的采样数据个数
    let length = patch_msg.length/8;
    if(x_interval===0.0)
    {
        x_interval = 1.000;
    }
    x_series = Array.from({ length }, (_, i) =>  i * x_interval);
    //* 先集中处理一下
    let middle_array = [];
    for(let i=0; i<patch_msg.length/8; i++)
    {
        let result = hex2float("0x"+patch_msg.slice(i*8,i*8+8));
        middle_array.push(result);
    }
    y_series = middle_array.slice(0,length);
}
/**
 * 处理重要的仿真数据
 * @param important_msg
 * 第一个数:仿真步长
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


let chart_y_map_x = [];
//* window.function 暴露给控制台，使得App可调用脚本执行命令

Highcharts.setOptions({
    credits: {enabled:true},
    chart:{
        zooming:{
            type:'x',
        }
    },
    legend: {
        enabled:false,
        align: 'center',
        verticalAlign: 'bottom',
        borderWidth: 0
    },
    xAxis: {
        /*等价于xAxis-label*/
        title: {
            text: 'Time(s)',
            style:{
                fontSize: 15,
                color: 'black',
                fontStyle: 'Times New Roman',
                fontWeight: 'bold',
                align: 'center'
            },

        },
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
    exporting: {
        enabled:true,
        scale:3,
        buttons: {
            contextButton: {
                // 获取默认菜单项并添加自定义项
                menuItems: [
                    'viewFullscreen',
                    'printChart',           // 打印图表
                    'separator',            // 分隔线
                    'downloadPNG',          // 下载 PNG
                    'downloadJPEG',         // 下载 JPEG
                    'downloadSVG',          // 下载 SVG
                    'separator',            // 分隔线
                    'downloadCSV',          // 下载 CSV（需要 export-data.js）
                    'downloadXLS',           // 下载 XLS（需要 export-data.js）
                ]
            }
        }
    },
    tooltip: {
        formatter: function () {
            return 'X: ' + this.x.toFixed(4) + '<br>Y: ' + this.y.toFixed(4); // X 保留 2 位小数，Y 不变
        },
    }

})
let Change_time = [0.1,0.2,0.3,0.4,0.5];
let Change_data = [2,4,2,8,10];
let ssa = Change_time.map((time, index) => [time,Change_data[index]])
Highcharts.chart('chart', {
    title: {
        text: 'Velocity track',
    },
    exporting: {
        filename:"Velocity Track Fig",
    },
    series: [{
        color: '#4394E5',
        name: 'Velocity',
        data:ssa
    },]
});
function UpdateAllFig(patch_msg)
{
    GetCMGPatchMsgFromWINUIApp(patch_msg);
    chart_y_map_x = x_series.map((time, index) => [time,y_series[index]]);
    updateChart();
}
function updateChart() {
    let chart = Highcharts.charts.find(c => c.renderTo.id === 'chart');
    chart.update({
        series: [{name:'Velocity', data:chart_y_map_x}],
        exporting: {
            filename:"Velocity Track Fig",
        }
    });


}
