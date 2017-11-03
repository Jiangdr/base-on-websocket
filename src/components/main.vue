<template>
    <main>
        <header class="nav-header">
            <figure class="logo-wrap">
                <img src="../../static/images/logo.png" alt="">
            </figure>
        </header>
        <main class="container">
            <section class="cont-wrap clearFix">
                <div class="b-left fl">
                    <h5 class="h5-title">{{newest.title}}</h5>
                    <ul id="slider" class="init">
                        <li v-for="item in newest.src" class="lf-item clearFix">
                            <div class="fl">
                                <p>
                                    <span>{{item.cName}}</span>
                                </p>
                                <p>
                                    <span>{{item.cont}}</span>
                                </p>
                                <p>
                                    <span>{{item.pName}}</span>
                                </p>
                                <p>
                                    <span>RMB:</span>
                                    <span>{{item.sum}}</span>
                                </p>
                            </div>
                            <div class="fr">
                                <p>
                                    <span>{{item.date}}</span>
                                    <span>{{item.time}}</span>
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="b-center bg-clear fl">
                    <ul class="clearFix">
                        <li class="ce-item fl" v-for="item in riskyBid.src">
                            <h5 class="h5-title">{{item.title}}</h5>
                            <div class="figure-wrap">
                                <span class="back-circle"></span>
                                <div class="mask-rotate clearFix">
                                    <div class="fl">
                                        <div></div>
                                        <div></div>
                                    </div>
                                    <div class="fl">
                                        <div></div>
                                        <div></div>
                                    </div>
                                </div>
                                <span class="figure"
                                      :class="{scale: riskyBid.scale}">{{item.count}}</span>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="b-right bg-clear fl">
                    <ul>
                        <li class="ri-item" v-for="(item, idx) in borrow.src">
                            <h5 class="h5-title">{{item.title}}</h5>
                            <article>
                                <span>{{item.cont}}</span>
                                <span
                                    :class="item.rate < 0 ? 'go-down' : 'go-up' ">
                                    {{item.rate < 0 ? item.rate : "+" + item.rate }}
                                </span>
                            </article>
                        </li>
                    </ul>
                </div>
            </section>
            <section class="cont-wrap clearfix">
                <div class="b-left fl">
                    <h5 class="h5-title"><span>{{percent.title}}</span></h5>
                    <section id="rose" class="rose-wrap"></section>
                </div>
                <div class="b-center fl">
                    <h5 class="h5-title"><span>{{lineChart.title}}</span></h5>
                    <aside class="line-legend clearFix">
                        <div class="fr">
                            <p>平台风险标的总金额</p>
                            <p>平台标的总金额</p>
                        </div>
                        <div class="fr">
                            <p>平台风险标的总数</p>
                            <p>平台标的总数</p>
                        </div>

                    </aside>
                    <section id="line" class="line-wrap"></section>
                </div>
                <div class="b-right fl">
                    <h5 class="h5-title"><span>{{company.title}}</span></h5>
                    <section id="bar" class="bar-wrap"></section>
                </div>
            </section>
        </main>
    </main>
</template>

<script>
    /******************/
    /******************/
    //region    //import
    import axios from 'axios'



    //endregion

    /******************/
    /******************/
    //region    //initialize

    let data = () => {
            return {
                newest: {
                    title: "最新标的滚动简情",
                    src: [],
                },//最新标
                riskyBid: {
                    src: [
                        {
                            title: "平台风险标的总数",
                            count: 0,
                            key: "riskMarkNum",
                        },
                        {
                            title: "平台风险标的总金额",
                            count: 0,
                            key: "rishMarkMoney",
                            formatter: true,
                        },
                        {
                            title: "平台标的总数",
                            count: 0,
                            key: "allMarkNum",
                        },
                        {
                            title: "平台标的总金额",
                            count: 0,
                            key: "allMarkMoney",
                            formatter: true,
                        },
                    ],
                    scale: false,
                },//风险标
                borrow: {
                    src: [
                        {
                            title: "借款超额标的总数",
                            cont: 0,
                            rate: 0.14,
                            key: "excessMarkNum",
                        },
                        {
                            title: "借款预期标的总数",
                            cont: 0,
                            rate: 0.26,
                            key: "overdueMarkNum",
                        },
                        {
                            title: "重复借款标的总数",
                            cont: 0,
                            rate: -0.14,
                            key: "repeatMarkNum",
                        },
                        {
                            title: "主体黑名单的总数",
                            cont: 0,
                            rate: 0.00,
                            key: "blacklistNum",
                        },
                        {
                            title: "虚假标的总数",
                            cont: 0,
                            rate: -0.14,
                            key: "falseMarkNum",
                        },
                    ]
                },//借款超额
                percent: {
                    title: "风险标的占比",
                    src: [
                        {
                            value: 0.5,//风险标
                            key: "riskMarkNum",
                        },
                        {
                            value: 999.5,//正常标
                            key: "allMarkNum - riskMarkNum"
                        },
                    ]
                },//风险标占比
                lineChart: {
                    title: "折线图展示",
                    src: [
                        {
                            riskMarkNum: 10,
                            totalMarkNum: 270,
                            riskMarkMoney: 390,
                            totalMarkMoney: 420,
                            startDate: "2016-10-11",
                        },
                        {
                            riskMarkNum: 170,
                            totalMarkNum: 20,
                            riskMarkMoney: 310,
                            totalMarkMoney: 420,
                            startDate: "2016-10-11",
                        },
                        {
                            riskMarkNum: 410,
                            totalMarkNum: 20,
                            riskMarkMoney: 370,
                            totalMarkMoney: 450,
                            startDate: "2016-10-11",
                        }
                    ],
                },//折线图
                company: {
                    title: "风险企业排行",
                    src: [
                        {
                            name: "测试",
                            value: 21,
                        },
                        {
                            name: "测试",
                            value: 200,
                        },
                        {
                            name: "测试",
                            value: 300,
                        },
                    ]
                },//风险企业
                sliderTime: 600,//初始获取数据滚动时间
            }
        },
        rChart = null,//玫瑰图
        bChart = null,//柱状图
        lChart = null;//折线图

    let slideEle = null;
    //endregion

    /******************/
    /******************/
    //region    //export

    export default {
        data, mounted,
        methods: {
            onmessage, roseEcharts, barEcharts, lineEchaers
        },
        filters: {

        }
    }
    //endregion

    /******************/
    /******************/
    //region    //function

    /**
     *组件挂载成功执行函数
     */
    function mounted() {
        slideEle = document.getElementById("slider");
        axios.get("../../static/json/wsConfig.json").then(res => {
            this._global.wSocket({
                ws: res.data.ws,
                onmessage: this.onmessage,
                onopen: function () {
                    console.log("open websocket")
                },
                onclose: function () {
                    console.log("close websocker")
                }
            })

        })

        //        初始化玫瑰图
        this.roseEcharts({
            id: "rose",
            data: this.percent.src,
            type: "init",
        })
        //        初始化排行图
        this.barEcharts({
            id: "bar",
            data: this.company.src.sort((a, b) => {
                return b.value - a.value
            }),//倒序排列，方便向前插入空值
            type: "init",
        })
        //        初始化折线图
        this.lineEchaers({
            id: "line",
            data: this.lineChart.src,
            type: "init",
        })

    }

    /**
     * websocket更新后触发函数
     * @param mes
     */
    function onmessage(mes) {
        console.log(JSON.parse(mes.data), "@@");
        let {historyMarkInfos, lastMarkInfos, markStatisticsInfo, riskCompanySort} = JSON.parse(mes.data);
        let cSrc = this.company.src;
        slideConfig(this.newest, lastMarkInfos, this.sliderTime);//标的滚动详情
        this.riskyBid.scale = true;//添加放大class
        setTimeout(() => {
            this.riskyBid.scale = false;//移除放大class
        }, 400)
        this.riskyBid.src.forEach((item) => {
            if (item.formatter) {
                item.count = sumFormar(markStatisticsInfo[item.key]);
            } else {
                item.count = markStatisticsInfo[item.key];
            }
        })//平台标

        this.borrow.src.forEach((item) => {
            let getCont = markStatisticsInfo[item.key],
                cont = item.cont, rate = null;
            if (cont === 0){
                rate = "0.00";
            }else {
                rate = ((getCont - cont) / cont).toFixed(2);
            }
            item.cont = markStatisticsInfo[item.key];
            item.rate = rate;
        })//借款标

        this.percent.src.forEach((item) => {
            let key = item.key;
            if (key.indexOf("-") === -1) {
                item.value = markStatisticsInfo[key];
            } else {
                let [sum, risk] = key.split(" - ");
                item.value = markStatisticsInfo[sum] - markStatisticsInfo[risk];
            }
        })//风险标的占比

        this.company.src.length = 0;
        riskCompanySort.forEach((item) => {
            cSrc.push({value: item.rishMarkNum, name: item.fullName});
        })//风险企业排行
        this.lineChart.src = historyMarkInfos;//折线图展示

//        重置玫瑰图
        this.roseEcharts({
            id: "rose",
            data: this.percent.src,
            type: "change",
        })
        //        重置排行图
        this.barEcharts({
            id: "bar",
            data: this.company.src.sort((a, b) => {
                return b.value - a.value
            }),
            type: "change",
        })
        //        重置折线图
        this.lineEchaers({
            id: "line",
            data: this.lineChart.src,
            type: "change",
        })
    }

    /**
     * 时间格式处理函数
     * @param ori
     * @returns {{date: string, time: (*|string)}}
     */
    function dateHandle(ori) {
        let [data, time] = ori.split(" ");
        return {
            date: data.slice(data.indexOf("-") + 1).replace("-", "."),
            time: time
        }
    }

    /**
     * 配置玫瑰图
     * @param id
     */
    function roseEcharts({id, data = [{}, {}], type = "change"}) {
        if (type === "init") {
            rChart = this._echarts.init(document.getElementById(id));
        }
        let [{value: v1}, {value: v2}] = data;
        let ratio = parseFloat((v1 / (v1 + v2) * 100).toFixed(2));
        if (ratio < 5){
            Object.assign(data[0], {
                value: v2 / 19,
                prev: ratio + "%",
            })
            Object.assign(data[1], {
                prev: (100 - ratio) + "%",
            })
        }
        let obj1 = Object.assign({
            value: 0,
            name: '风险标的数量',
            selected: true,
            label: {
                normal: {
                    show: true,
                    position: "inside",
                    color: "#fff",
//                    formatter: "{d}%",
                    formatter: function (res) {
                        return res.data.prev || res.percent + "%";
                    },
                    fontSize: 18,
                }
            }
        }, data[0]), obj2 = Object.assign({
            value: 0,
            name: '正常标的数量',
            label: {
                normal: {
                    show: true,
                    position: "inside",
                    color: "#fff",
//                    formatter: "{d}%",
                    formatter: function (res) {

                        return res.data.prev || res.percent + "%";
                    },
                    fontSize: 18,
                }
            }
        }, data[1]);
        let option = {
            backgroundColor: '#292d39',
            color: ["#ffb924", "#0295ff",],
            title: {
                show: false,
            },
            tooltip: {
                show: false,
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: "vertical",
                data: [
                    {
                        name: "风险标的数量",
                        icon: "circle",
                        textStyle: {
                            color: "#ffb924",
                        },
                    },
                    {
                        name: "正常标的数量",
                        icon: "circle",
                        textStyle: {
                            color: "#0295ff",
                        }
                    },
                ],
                x: 'left',
                y: 'bottom',
            },
            series: [
                {
                    name: "占比",
                    type: 'pie',
                    radius: ['20%', '60%'],
                    data: [obj1, obj2],
//                    roseType: 'radius',
                    label: {
                        normal: {
                            show: false,
                        }
                    }
                }
            ]
        };

        rChart.setOption(option);
    }

    /**
     * 配置柱状图
     * @param id
     * @param data
     * @param type
     */
    function barEcharts({id, data, type = "change"}) {
        if (type === "init") {
            bChart = this._echarts.init(document.getElementById(id));
        }
        let charts = this._echarts.init(document.getElementById(id));
        let time = data.length > 5 ? data.length : 5,
            series_data = [], yAxis_data = [],
            max = Math.max(...data.map((item) => {
                return item.value;
            })),
            min = Math.min(...data.map((item) => {
                return item.value;
            })),
            defaultBar = max * 0.1 > min * 0.8 ? min : max * 0.1;
        for (let i = 0; i < time; i++) {
            let setValue = data[i] || {value: defaultBar};
            let setName = data[i] || {name: "$empty"};
            series_data.unshift(setValue.value);
            yAxis_data.unshift(setName.name)
        }
        let option = {
            title: {
                show: false,
            },
            grid: {
                left: '5%',
                right: '5%',
                bottom: '3%',
                top: '3%',
                containLabel: true,
            },
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01],
                splitLine: {
                    show: false,
                },
                axisLine: {
                    lineStyle: {
                        color: "#999",
                        width: 2,
                    },
                },
            },
            yAxis: {
                show: false,
                type: 'category',
                data: yAxis_data,
                scale: true,
                axisLabel: {
                    show: false,
                    inside: true,
                    color: "#fff",
                },
                logBase: 10,
            },
            series: [
                {
                    name: '2011年',
                    type: 'bar',
                    data: series_data.sort((a, b) => {return a - b;}),
                    barWidth: "50%",
//                    barGap: "100%",
                    itemStyle: {
                        normal: {
                            color: "#0295ff",
                            barBorderRadius: 10,
                            borderWidth: 5,
                        }
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'right',
                            color: "#fff",
                            formatter: (par) => {
                                return (par.name !== "$empty" && par.value) || "";
                            },
                            barMinHeight: 100,
                            fontSize: 16,
                        }
                    },
                }
            ]
        };

        charts.setOption(option);
    }

    /**
     * 直线图配置
     * @param id
     * @param data
     * @param type
     */
    function lineEchaers({id, data, type = "change"}) {
        if (type === "init") {
            lChart = this._echarts.init(document.getElementById(id));
        }
        let xAxis_data = [];

        let option = {
//            animationEasing: 'elasticOut',
//            animationDelayUpdate: function (idx) {
//                return idx * 5;
//            },
            grid: {
                left: '7%',
                right: '7%',
                bottom: '3%',
                top: '9%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: xAxis_data,
                    axisLine: {
                        lineStyle: {
                            color: "#999",
                            width: 2,
                        },
                    },
                    axisLabel: {},
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    axisLabel: {
                        inside: true,
                        color: "#fff",
                        formatter: (op) => {
                            return (op !== 0 && op) || "";
                        },
                    },
                    splitLine: {
                        show: false,
                    },
                },
                {
                    type: 'value',
                    axisLabel: {
                        inside: true,
                        color: "#fff",
                        formatter: (op) => {
                            return (op !== 0 && op) || "";
                        },
                    },
                    splitLine: {
                        show: false,
                    },
                }
            ],
            series: [
                {
                    name: '平台风险标的总数',
                    type: 'line',
                    data: [],
                    lineStyle: {
                        normal: {
                            color: "#0295ff",
                        }
                    },

                },
                {
                    name: '平台标的总数',
                    type: 'line',
                    data: [],
                    lineStyle: {
                        normal: {
                            color: "#e1b924",
                        }
                    },
                },
                {
                    name: '平台风险标的总金额',
                    type: 'line',
                    yAxisIndex: 1,
                    data: [],
                    lineStyle: {
                        normal: {
                            color: "#8cf519",
                        }
                    },

                },
                {
                    name: '平台标的总金额',
                    type: 'line',
                    yAxisIndex: 1,
                    data: [],
                    lineStyle: {
                        normal: {
                            color: "#f65828",
                        }
                    },
                }
            ]
        }, {series: [{data: ser1}, {data: ser2}, {data: ser3}, {data: ser4}]} = option;

        data.reverse().forEach((item) => {
            ser1.push(item.riskMarkNum);
            ser2.push(item.totalMarkNum);
            ser3.push(item.riskMarkMoney / 100);
            ser4.push(item.totalMarkMoney / 100);
            xAxis_data.push(item.startDate);
        })

        lChart.setOption(option);
    }

    /**
     * 金额格式化
     * @param sum
     * @returns {*}
     */
    function sumFormar(sum) {
        sum = (Math.round(sum / 100)).toString();
        let arr = sum.split("").reverse(),
            str = "";
        arr.forEach((item, idx) => {
            if (idx !== 0 && idx % 3 === 0) {
                str = "," + str;
            }
            str = item + str;
        })
        return str;
    }

    /**
     * 配置最新标滚动详情
     * @param newest    VUE实例中对应data
     * @param info  获取到的新data
     * @param time  初始滚动时间
     */
    function slideConfig(newest, info, time = 600) {
        if (newest.src.length < 3) {
            info.slice(0, 3).forEach((item) => {
                newest.src.unshift(Object.assign({
                    cName: item.company.fullName,
                    cont: item.name,
                    pName: item.type === 1 ? item.company.legalPerson : item.borrower.name,
                    sum: sumFormar(item.amount),
                    id: item.id,
                }, dateHandle(item.addedDate)))
            })
            newest.init = false;

            let hg = parseFloat(getComputedStyle(slideEle, false).height) / 3,
                step = ~~hg / time * 17;
            let int = setInterval(() => {
                hg -= step;
                if (hg <= 0) {
                    hg = 0;
                    clearInterval(int);
                }
                slideEle.style.marginTop = hg + "px";
            }, 17);

        } else {
            let add = info.filter(item => {
                return !newest.src.some(val => {
                    return val.id === item.id;
                })
            }).reverse();
            add.forEach((item) => {
                newest.src.push(Object.assign({
                    cName: item.company.fullName,
                    cont: item.name,
                    pName: item.type === 1 ? item.company.legalPerson : item.borrower.name,
                    sum: sumFormar(item.amount),
                    id: item.id,
                }, dateHandle(item.addedDate)));
            })
            let first = slideEle.children[0];
            if (!!first) {
                let hg = parseFloat(getComputedStyle(first, false).height)
                first.style.marginTop = hg * add.length * -1 + "px";
                setTimeout(() => {
                    for (let i = 0, l = add.length; i < l; i++) {
                        slideEle.removeChild(slideEle.children[0]);
                    }
                }, time * 2);
            }
        }
    }

    //endregion

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    /*variable*/
    $head-bc: #292d39;
    $cont-bc: #181c28;
    $h4-bor: #555;
    $cont-pad: 1.3vw; //盒子外边距
    $cont-pad-h: 1.3vh; //盒子上下内边距
    $box-pad: $cont-pad * 0.9; //盒子左右内边距
    $box-rad: 0.4vw;
    $h5-fz: 0.875rem;
    $item-fz: 0.75rem;
    $legend-fz: 0.6rem;
    $legend-h: calc(#{$h5-fz} + #{$cont-pad-h} * 2.25);
    $cent-pad-h: $cont-pad-h * 0.5; //中间盒子上下内边距
    $ri-pad-h: $cont-pad-h * 0.3; //右边盒子上下内边距
    $circle: 12vh;

    /*******/
    $time1: 30s;
    $time2: 30s;
    $time3: 30s;
    $time4: 30s;
    /*平台标圆环颜色*/
    $color1: rgba(50, 150, 200, 1);
    $color2: rgba(123, 248, 51, 1);
    $color3: rgba(255, 180, 58, 1);
    $color4: rgba(254, 83, 70, 1);

    /*折线图legend颜色*/
    $leg-col1: #8cf519; //风险标总金额
    $leg-col2: #f65828; //标的总金额
    $leg-col3: #0295ff; //风险标的总数
    $leg-col4: #e1b924; //标的总数

    $upColor: rgba(140, 247, 50, 1); //上升指数颜色
    $doColor: rgba(255, 89, 38, 1); //下降...
    $trig: $cont-pad-h * 0.6; //小三角大小

    /*标的滚动时间*/
    $slideTime: .6s;
    /*标放大时间*/
    $scaleTime: .4s;

    /*mixin*/
    /*盒子边距混合类*/
    @mixin boxPadding {
        padding: $cont-pad-h $box-pad $cont-pad-h * 1.5;
        .h5-title {
            padding: 0 0 $cont-pad-h $box-pad;
            margin-left: -$box-pad;
            margin-right: -$box-pad;
        }
    }

    @mixin rotateBor($time, $n, $color) {
        .ce-item:nth-of-type(#{$n}) .figure-wrap {
            .mask-rotate > div {
                height: 100%;
                width: 50%;
                position: relative;
                overflow: hidden;
                div {
                    background: $head-bc;
                    width: 200%;
                    height: 200%;
                    margin-top: -100%;
                    margin-left: -100%;
                    position: absolute;
                    top: 0;
                    left: 0;
                    &:nth-of-type(1) {
                        transform-origin: right;
                        -webkit-animation: rotate-left1 $time linear infinite;
                        -o-animation: rotate-left1 $time linear infinite;
                        animation: rotate-left1 $time linear infinite;
                    }
                    &:nth-of-type(2) {
                        transform-origin: left;
                        margin-left: 100%;
                        -webkit-animation: rotate-left2 $time linear infinite;
                        -o-animation: rotate-left2 $time linear infinite;
                        animation: rotate-left2 $time linear infinite;
                    }
                    transform-origin: right;
                }
                &:nth-of-type(2) div {
                    margin-left: 0;
                    transform-origin: left;
                    &:nth-of-type(1) {
                        -webkit-animation: rotate-right1 $time linear infinite;
                        -o-animation: rotate-right1 $time linear infinite;
                        animation: rotate-right1 $time linear infinite;
                    }
                    &:nth-of-type(2) {
                        margin-left: -200%;
                        transform-origin: right;
                        -webkit-animation: rotate-right2 $time linear infinite;
                        -o-animation: rotate-right2 $time linear infinite;
                        animation: rotate-right2 $time linear infinite;
                    }
                }
            }
            .back-circle {
                border: 2px solid $color;
            }
        }
    }

    /*header*/
    .nav-header {
        height: 8vh;
        padding: 1vh $cont-pad;
        background: $head-bc;
        .logo-wrap {
            height: 6vh;
            img {
                height: 100%;
            }
        }
    }

    /*main*/
    .container {
        height: 92vh;
        background: $cont-bc;
        padding: $cont-pad;
        & > section {
            width: 100%;
            height: calc(50% - #{$cont-pad * 0.5});
            margin-top: $cont-pad;
            &:first-child {
                margin-top: 0;
            }
        }
    }

    /*main-section*/
    .cont-wrap {
        & > div {
            height: 100%;
            margin-right: $cont-pad;
            background: $head-bc;
            border-radius: $box-rad;
            @include boxPadding;
        }
        .b-left {
            width: calc((100% - #{$cont-pad} * 2) * 0.29);
            & > ul, .rose-wrap {
                height: calc(41.45vh - 1.95vw - 1.33 * #{$h5-fz});
                overflow: hidden;
                padding-top: $cont-pad-h;
            }
            ul.init {
                margin-top: calc(41.45vh - 1.95vw - 1.33 * #{$h5-fz});
                li:first-child {
                }
            }
            ul.slide-in {
                li:first-child {
                    margin-top: 0;
                }
            }
        }
        .b-center {
            width: calc((100% - #{$cont-pad} * 2) * 0.44);
            position: relative;
            & > ul {
                height: 100%;
                li {
                    padding: $cent-pad-h $box-pad 0;
                    .h5-title {
                        padding: 0 0 $cent-pad-h $box-pad;
                        margin-left: -$box-pad;
                        margin-right: -$box-pad;
                    }
                }
            }
            .line-wrap {
                height: calc(100% - #{$h5-fz} - #{$cent-pad-h} * 2.5);
                margin-left: -$box-pad;
                margin-right: -$box-pad;
            }
            .line-legend {
                position: absolute;
                top: $ri-pad-h * 0.8;
                right: $cent-pad-h;
                height: $legend-h;
                width: 100%;
                & > div {
                    height: 90%;
                    p {
                        height: 50%;
                    }
                }
                div:nth-of-type(1) > p {
                    &:nth-of-type(1) {
                        color: $leg-col1;
                        &:before {
                            background: $leg-col1;
                        }
                    }
                    &:nth-of-type(2) {
                        color: $leg-col2;
                        &:before {
                            background: $leg-col2;
                        }
                    }
                }
                div:nth-of-type(2) > p {
                    &:nth-of-type(1) {
                        color: $leg-col3;
                        &:before {
                            background: $leg-col3;
                        }
                    }
                    &:nth-of-type(2) {
                        color: $leg-col4;
                        &:before {
                            background: $leg-col4;
                        }
                    }
                }
                p {
                    font-size: $legend-fz;
                    margin-left: $legend-h;
                    position: relative;
                    &:before {
                        content: '';
                        display: block;
                        width: calc((#{$h5-fz} + #{$cont-pad-h} * 2.5) * 0.6);
                        height: 70%;
                        position: absolute;
                        top: 15%;
                        left: calc((#{$h5-fz} + #{$cont-pad-h} * 2.5) * -0.75);
                        border-radius: 20%;
                    }
                }
            }
        }
        .b-right {
            width: calc((100% - #{$cont-pad} * 2) * 0.27);
            margin-right: 0;
            & > ul {
                height: 100%;
                li {
                    padding: $ri-pad-h $box-pad 0;
                    .h5-title {
                        padding: 0 0 $ri-pad-h $box-pad;
                        margin-left: -$box-pad;
                        margin-right: -$box-pad;
                    }
                }
            }
            .bar-wrap {
                height: calc(100% - #{$h5-fz} - #{$cent-pad-h} * 2.5);
                margin-left: -$box-pad;
                margin-right: -$box-pad;
            }
        }
        .bg-clear {
            background: $cont-bc;
            padding: 0;
        }
        .h5-title {
            font-size: $h5-fz;
            line-height: $h5-fz * 1.33;
            font-weight: 300;
            border-bottom: 1px solid $h4-bor;
            white-space: nowrap;
        }
        /*left-item*/
        .lf-item {
            height: 33.333333%;
            font-size: $item-fz;
            width: 100%;
            line-height: 150%;
            -webkit-transition: all $slideTime linear;
            -moz-transition: all $slideTime linear;
            -ms-transition: all $slideTime linear;
            -o-transition: all $slideTime linear;
            transition: all $slideTime linear;
            & > div {
                overflow: hidden;
                &:nth-of-type(1) {
                    width: 70%;
                    height: 100%;
                    p {
                        height: 23%;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;

                    }
                }
                &:nth-of-type(2) {
                    width: 30%;
                    text-align: right;
                    span:last-of-type {
                        margin-left: 4%;
                    }
                }

            }
        }
        /*center-item*/
        .ce-item {
            width: calc((100% - #{$cont-pad}) * 0.5);
            height: calc((100% - #{$cont-pad}) * 0.5);
            background: $head-bc;
            border-radius: $box-rad;
            &:nth-of-type(odd) {
                margin-right: $cont-pad;
            }
            &:nth-of-type(1), &:nth-of-type(2) {
                margin-bottom: $cont-pad;
            }
        }
        /*right-item*/
        .ri-item {
            height: calc((100% - #{$cont-pad-h} * 4) * 0.2);
            border-radius: $box-rad;
            background: $head-bc;
            margin-bottom: $cont-pad-h;
            &:last-child {
                margin-bottom: 0;
            }
            article {
                text-align: center;
                padding-top: $ri-pad-h;
                span:nth-of-type(1) {
                    font-size: 1.2rem;
                    line-height: 120%;
                }
                span:nth-of-type(2) {
                    margin-left: 2%;
                    font-size: 0.8rem;
                    position: relative;
                    &:after {
                        content: '';
                        display: block;
                        width: $trig * 2;
                        height: $trig * 2;
                        position: absolute;
                        top: 50%;
                        left: 110%;
                        margin-top: $trig * -1;
                        border: $trig solid;
                        border-color: transparent;
                        border-bottom-color: $upColor;
                        transform-origin: 50% 75%;
                        -webkit-transition: transform .3s linear;
                        -moz-transition: transform .3s linear;
                        -ms-transition: transform .3s linear;
                        -o-transition: transform .3s linear;
                        transition: transform .3s linear;
                    }
                    &.go-up {
                        color: $upColor;
                    }
                    &.go-down {
                        color: $doColor;
                        &:after {
                            border-bottom-color: $doColor;
                            -webkit-transform: rotate3d(0, 0, 1, 180deg);
                            -moz-transform: rotate3d(0, 0, 1, 180deg);
                            -ms-transform: rotate3d(0, 0, 1, 180deg);
                            -o-transform: rotate3d(0, 0, 1, 180deg);
                            transform: rotate3d(0, 0, 1, 180deg);
                        }
                    }
                }
            }
        }
        @include rotateBor($time1, 1, $color1);
        @include rotateBor($time2, 2, $color2);
        @include rotateBor($time3, 3, $color3);
        @include rotateBor($time4, 4, $color4);
        .figure-wrap {
            position: relative;
            height: calc(100% - #{$h5-fz} - #{$cont-pad-h});
            .back-circle, .figure {
                position: absolute;
                top: 50%;
                left: 50%;
                margin: -$circle * 0.5;
                width: $circle;
                height: $circle;
            }
            .mask-rotate {
                position: absolute;
                top: 50%;
                left: 50%;
                margin: -$circle * 0.6;
                width: $circle * 1.2;
                height: $circle * 1.2;
            }
            .figure {
                line-height: $circle;
                width: 200%;
                margin-left: -100%;
                text-align: center;
                font-size: 1.4rem;
            }
            .scale {
                -webkit-animation: shake $scaleTime linear backwards;
                -o-animation: shake $scaleTime linear backwards;
                animation: shake $scaleTime linear backwards;
            }
            .back-circle {
                border-radius: 50%;
            }
        }
    }

    /*动画*/
    @keyframes rotate-left1 {
        0% {
            transform: rotate3d(0, 0, 1, 0deg)
        }
        25% {
            transform: rotate3d(0, 0, 1, 0deg)
        }
        50% {
            transform: rotate3d(0, 0, 1, 180deg)
        }
        100% {
            transform: rotate3d(0, 0, 1, 180deg)
        }
    }

    @keyframes rotate-left2 {
        0% {
            transform: rotate3d(0, 0, 1, 0deg)
        }
        75% {
            transform: rotate3d(0, 0, 1, 0deg)
        }
        100% {
            transform: rotate3d(0, 0, 1, 180deg)
        }
    }

    @keyframes rotate-right1 {
        0% {
            transform: rotate3d(0, 0, 1, 0deg)
        }
        25% {
            transform: rotate3d(0, 0, 1, 180deg)
        }
        100% {
            transform: rotate3d(0, 0, 1, 180deg)
        }
    }

    @keyframes rotate-right2 {
        0% {
            transform: rotate3d(0, 0, 1, 0deg)
        }
        50% {
            transform: rotate3d(0, 0, 1, 0deg)
        }
        75% {
            transform: rotate3d(0, 0, 1, 180deg)
        }
        100% {
            transform: rotate3d(0, 0, 1, 180deg)
        }
    }

    /*抖动效果*/
    @keyframes shake {
        0% {
            transform: scale(1.25, 1.25);
        }
        10% {
            transform: scale(1, 1);
        }
        25% {
            transform: scale(1.18, 1.18);
        }
        50% {
            transform: scale(1, 1);
        }
        70% {
            transform: scale(1.14, 1.14);
        }
        100% {
            transform: scale(1, 1);
        }
    }

</style>
