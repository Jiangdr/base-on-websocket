<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
    /*css reset*/
    *,*:before,*:after{
        margin: 0px;
        padding: 0px;
        box-sizing: border-box;
    }
    ul,li{
        list-style: none;
    }
    a{
        color: #333;
        text-decoration: none;
    }
    /*清除浮动*/
    .clearFix:before,.clearFix:after{
        content: "";
        display: table;
    }
    .clearFix:after{
        clear: both;
    }
    .fl{
        float: left;
    }
    .fr{
        float: right;
    }
    /*base*/
    html,body{
        font-size: 16px;
        color: #efefef;
        width: 100vw;
        height: 100vh;
        font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
    }
    @media screen and (min-width:1400px) {
        html,body{font-size: 18px;}
    }
    @media screen and (min-width:1500px) {
        html,body{font-size: 20px;}
    }
</style>
