<template>
    <div class="wrapper">
    </div>
    <div class="container-all">
        <!-- 标题 -->
        <div class="top-header">
            作品可视化平台
        </div>
        <!-- 内容区域 -->
        <div class="main-content">
            <div class="container">
                <RouterLink to="/website" target="_blank">
                    <div class="card">
                        <div class="imgBx" :style="{ '--img': `url(${imagePath1})` }"></div>
                        <div class="content">
                            <!-- <h3>12133145 <br><span>134256</span></h3> -->
                            <h3>Three.js打造的3D网站<br></h3>
                            <p>    
                                <br>
                                使用three.js 粒子特效
                                <br>
                                <br>
                                <hr>
                                <br>
                                创建炫酷的3D场景</p>
                        </div>
                    </div>
                </RouterLink>

                <RouterLink to="/macRoom" target="_blank">
                    <div class="card">
                        <div class="imgBx" :style="{ '--img': `url(${imagePath2})` }"></div>
                        <div class="content">
                            <!-- <h3>12133145 <br><span>134256</span></h3> -->
                            <h3>可视化三维机房案例 <br></h3>
                            <p> 
                                <br>
                                企业需要对IT机房进行更加妥善的管理和监控，比如实时监控机房的温度和湿度等重要参数
                                <br> <br> <hr> <br>
                                三维IT机房可以将机房数据可视化，让企业更好的监控和管理IT机柜!
                            </p>
                        </div>
                    </div>
                </RouterLink>
                <RouterLink to="/3DGS" target="_blank">
                    <div class="card">
                        <div class="imgBx" :style="{ '--img': `url(${imagePath3})` }"></div>
                        <div class="content">
                            <!-- <h3>12133145 <br><span>134256</span></h3> -->
                            <h3>利用3D高斯成像技术，导入网页进行可视化交互 <br></h3>
                            <p><br>
                                3D Gaussian Splatting 成像技术利用若干2D图片生成3D场景
                            <br> <br> <hr> <br>
                            使得物体的细节还原度非常高，拥有更加真实的交互性，用户通过网页获得更沉浸式的体验，
                            </p>
                        </div>
                    </div>
                </RouterLink>
                <RouterLink to="/train" target="_blank">
                    <div class="card">
                        <div class="imgBx" :style="{ '--img': `url(${imagePath4})` }"></div>
                        <div class="content">
                            <!-- <h3>12133145 <br><span>134256</span></h3> -->
                            <h3>不依赖图片或视频--全方位的展现物体 <br></h3>
                            <p><br>
                                向3D场景/物体的实际展现，表现高于其他图片或视频带来的效果
                            <br> <br> <hr> <br>
                                使得三维图像拥有更加真实的交互性，用户通过网页获得更沉浸式的体验
                            </p>
                        </div>
                    </div>
                </RouterLink>
             
            </div>
        </div>
    </div>

</template>

<script setup>

import { RouterLink } from "vue-router";
const imagePath1 = new URL('../assets/images/website.png', import.meta.url).href;
const imagePath2 = new URL('../assets/images/macRoom.png', import.meta.url).href;
const imagePath3 = new URL('../assets/images/nike.png', import.meta.url).href;
const imagePath4 = new URL('../assets/images/train.png', import.meta.url).href;

</script>

<style scoped>
/* body{
    margin: 0;
    padding: 100px 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background:#fff ;
    font-family:'Courier New', Courier, monospace;
} */
.container-all {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: 0 auto;
    width: 78vw;
    z-index: 1;
}

.container {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    /* padding-top: 50px; */
    flex-wrap: wrap;
    gap: 50px;
}

.top-header {
    position: fixed;
    width: 78vw;
    height: 60px;
    line-height: 60px;
    text-align: center;
    font-size: 1.8rem;
    font-family: space;
    color: rgba(255, 255, 255, 1);
    letter-spacing: 0.5em;
    font-weight: 600;
    text-shadow: 1px 1px 1px #82c8e6, 0px 2px 2px #2d6cca, 0px 4px 8px #22cbdb;
    background-color: skyblue;
}

.main-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 100px 100px;
}

.container .card {
    position: relative;
    width: 300px;
    height: 300px;
    /* background: skyblue; */
    background: #fff;
    border-radius: 40px;
    box-shadow: 0 20px 25px rgba(0, 0, 0, 0.25);
    transition: 0.5s;
    overflow: hidden;
}

.container .card:hover {
    height: 420px;
}

.container .card .imgBx {
    position: relative;
    width: 100%;
    height: 260px;
    background: var(--img) no-repeat;
    background-size: 100%;
    background-position: center;
    transition: 0.5s;
}

.container .card:hover .imgBx {
    background-size: 110%;
}

/* .container .card .imgBx::before{
    content: '';
    position: absolute;
    bottom: -10px;
    width: 100%;
    height: 60px;
    background: #fff;
    border-radius: 40px;
} */
/* .container .card .imgBx::after{
    content: '';
    position: absolute;
    right: 0;
    bottom: 40px;
    width: 80px;
    height: 80px;
    background: transparent;
    border-radius: 50%;
    box-shadow: 75px 75px 0 40px #fff;
} */
.container .card .content {
    position: relative;
    bottom: 40px;
    z-index: 10;
    padding: 0 10px;
    transition: 0.5s;
}

.container .card .content h3 {
    position: relative;
    font-size: 1.25em;
    color: #333;
}

.container .card .content h3 span {
    position: absolute;
    bottom: -15px;
    font-weight: 400;
    font-size: 0.65em;
    opacity: 0.75;

}

.container .card .content p {
    position: relative;
    opacity: 0;
    transition: 0.5;
    color: #333;
}

.container .card:hover .content p {
    opacity: 1;
}
</style>