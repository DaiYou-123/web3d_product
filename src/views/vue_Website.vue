<template>
    <div class="home">
      <div class="canvas-container" ref="screenDom"></div>
      <div class="per_title">
        <div id="per_container">
          <!-- 进度条 -->
          <div id="per"> </div>
          <div id="per_bg"> </div>
      </div>
      
      </div>
      <div class="header">
        <div class="logo">使用3D场景，更好地呈现业务价值</div>
        <div class="menu">
          <a href="#" class="menuItem">首页</a>
          <a
            href="#"
            class="menuItem"
            >源码</a
          >
          <a href="#" class="menuItem">素材模型</a>
        </div>
      </div>
      <div class="pages" ref="pages">
        <div class="page">
          <h2 class="title">3D可视化产品</h2>
          <p>3D可视化前端技术</p>
        </div>
        <div class="page">
          <h2 class="title">让用户更好地理解产品！</h2>
          <p>可以对产品进行简单介绍</p>
        </div>
        <div class="page">
          <h2 class="title">ThreeJS框架</h2>
          <p>开发3D效果</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import * as THREE from "three";
  import { ref, onMounted } from "vue";
  import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
  import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
  import { gsap } from "gsap";
  let screenDom = ref(null);
  let pages = ref(null);
  
  onMounted(()=>{
     // 创建场景
     let scene = new THREE.Scene();
    // 创建相机
    let camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100000
    );
    camera.position.set(0, 0, 10);
    // 创建渲染器
    let renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    // 将画布添加到页面中
    screenDom.value.appendChild(renderer.domElement);
  
    // 跟踪所有loder进度
    const loadingManager  = new THREE.LoadingManager();
  
    
    // 设置加载进度时的回调函数
    loadingManager.onProgress = function (item, loaded, total) {
      console.log('加载中... ' + loaded + '/' + total + ' ' + item);
      item = "资源加载中......" + item;
      // 设置加载完成时的回调函数
      loadingManager.onLoad = function () {
        item ='所有资源加载完成';
      };
        // 控制台查看加载进度
        const percent = loaded/total;
        if(percent >= 1){
          item ='所有资源加载完成';
        }
        // console.log('加载进度' + percent);
        percentDiv.style.width = percent * 400 + "px"; //进度条元素长度
        percentDiv.style.textIndent = percent * 400 + 5 + "px"; //缩进元素中的首行文本
        // Math.floor:小数加载进度取整
        percentDiv.innerHTML = Math.floor(percent * 100) + '%'; //进度百分比
  
        console.log();
        var style = document.createElement('style');
        style.innerHTML = `:deep(.per_title::before){ content: "${item}"; }`
        document.head.appendChild(style);
        
  };
  
  
    // // 创建星空的背景
    let url = "../../model-Website/25s.jpg";
    let envTexture = new THREE.TextureLoader(loadingManager).load(url,function(Texture){
      Texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.background = Texture; // 设置背景
      scene.environment = Texture; // 设置环境纹理
      console.log("加载进来g----");
    }); // 将纹理图片加载进来
    
    // 添加灯光 通过设置光源的位置和方向来控制光线的方向
    let light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 0, 1);
    scene.add(light);
    let light2 = new THREE.DirectionalLight(0xffffff, 0.5); // 光白色 强度0.5
    light2.position.set(0, 0, -1);
    scene.add(light2);
    let light3 = new THREE.AmbientLight(0xffffff, 0.5);
    light3.position.set(-1, 1, 1);
    scene.add(light3);
  
     // 设置解压缩的加载器 使用 DRACOLoader 和 GLTFLoader 来加载和解码压缩的 GLTF 模型文件
    let dracoLoader = new DRACOLoader(); // 新建加载器
    dracoLoader.setDecoderPath("../../draco/gltf/");
    dracoLoader.setDecoderConfig({ type: "js" }); //使用 JavaScript 版本的 Draco 解码器
    dracoLoader.preload(); // 预加载解码器
    let loader = new GLTFLoader(loadingManager); // 解压加载器
    loader.setDRACOLoader(dracoLoader);
  
    const percentDiv = document.getElementById("per");// 获取进度条元素
  
    // 加载模型一
    loader.load("../../model-Website/xz.glb", (gltf) => {
      gltf.scene.scale.set(0.2, 0.2, 0.2); // 模型缩小10倍
      gltf.scene.position.set(1, 0, 0); // x-> 移动米
      scene.add(gltf.scene);
      // 捕捉鼠标移动
    window.addEventListener("mousemove", (e) => {
        let x = (e.clientX / window.innerWidth) * 2 - 1;
        let y = (e.clientY / window.innerHeight) * 2 - 1;
    // 添加移动动画
        let timeline = gsap.timeline();
        timeline.to(gltf.scene.rotation, {
          duration: 0.5,
          x: y,
          y: x,
          duration: 1,
        });
      });
    })
  
    // 加载模型二
    loader.load("../../model-Website/xq6.glb", (gltf) => {
      gltf.scene.scale.set(0.1, 0.1, 0.1); // 模型缩小10倍
      gltf.scene.position.set(1, -8, 0); // x-> 移动1 y->-8 
      scene.add(gltf.scene);
  
      // 捕捉鼠标移动
    window.addEventListener("mousemove", (e) => {
        let x = (e.clientX / window.innerWidth) * 2 - 1;
        let y = (e.clientY / window.innerHeight) * 2 - 1;
    // 添加移动动画
        let timeline = gsap.timeline();
        timeline.to(gltf.scene.rotation, {
          duration: 0.5,
          x: y,
          y: x,
          duration: 1,
        });
      });
    },(xhr)=>{
      // // 控制台查看加载进度xhr
      // // 通过加载进度xhr可以控制前端进度条进度   
      // const percent = xhr.loaded / xhr.total;
      // // console.log('加载进度' + percent);
      // percentDiv.style.width = percent * 400 + "px"; //进度条元素长度
      // percentDiv.style.textIndent = percent * 400 + 5 + "px"; //缩进元素中的首行文本
      // // Math.floor:小数加载进度取整
      // percentDiv.innerHTML = Math.floor(percent * 100) + '%'; //进度百分比
    })
  
    // 加载模型三
    loader.load("../../model-Website/gr75.glb", (gltf) => {
      gltf.scene.scale.set(1.5, 1.5, 1.5); // 
      gltf.scene.position.set(1, -16, 0); // 
      scene.add(gltf.scene);
  
      // 捕捉鼠标移动
    window.addEventListener("mousemove", (e) => {
        let x = (e.clientX / window.innerWidth) * 2 - 1;
        let y = (e.clientY / window.innerHeight) * 2 - 1;
    // 添加移动动画
        let timeline = gsap.timeline();
        timeline.to(gltf.scene.rotation, {
          duration: 0.5,
          x: y,
          y: x,
          duration: 1,
        });
      });
    })
    
    // 换页功能
    let page = 0;
    let timeline2 = gsap.timeline();
    window.addEventListener("mousewheel",(e) =>{
      if(e.wheelDelta < 0){
        page ++; // 往下一页
        if(page > 2){
          page = 2;
        }
      }
      if (e.wheelDelta > 0) {
        page--; // 往上一页
        if (page < 0) {
          page = 0;
        }
      }
      // 防止滑动过快 在页数转换的0.5s中不进行翻页
      if(!timeline2.isActive()){
        timeline2.to(camera.position, {
          duration: 0.5, // 相机移动时间
          y: page * -8, 
          duration: 1, // 页面位置移动时间
        });
        gsap.to(pages.value, {
          duration: 1,
          y: -page * window.innerHeight, // 文字部分的y轴移动 
          duration: 1,
        });
      }
    });
  
    // 导入星球模型
    loader.load("../../model-Website/moon.glb",(gltf)=>{
      let moon = gltf.scene.children[0];
      for (let j = 0; j < 10; j++) {
          // 在场景中高效地渲染大量相同的几何体和材质
          let moonInstance = new THREE.InstancedMesh( 
            moon.geometry, // 几何体
            moon.material, // 材质
            100 // 数量
          );
        
        for (let i = 0; i < 100; i++) { // 循环创建 100 个实例
            // 随机产生-500~500 的xyz坐标值
            let x = Math.random() * 1000 - 500;
            let y = Math.random() * 1000 - 500;
            let z = Math.random() * 1000 - 500;
            // 随机的缩放和位置
            let matrix = new THREE.Matrix4();
            let size = Math.random() * 20 - 8;
            matrix.makeScale(size, size, size);
            matrix.makeTranslation(x, y, z);
            // 将生成的矩阵应用到 moonInstance 的第 i 个实例上
            moonInstance.setMatrixAt(i, matrix);
        }
  
        // 添加动效
        gsap.to(moonInstance.position,{
          duration: Math.random() * 10 + 2,
          z: -1000, 
          ease:"linear",
          repeat:-1,
        })
        scene.add(moonInstance);
      }
      
    })
  
  
      // 进行渲染
    function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    }
    render();
  
  });
  
  </script>
  
  
  <style scoped>
  /* * {
    margin: 0;
    padding: 0;
  }
  body {
    background-color: #000;
  } */
  .container{
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: 0 auto;
  width: 78vw;
  z-index: 1;

}
.top-header {
    position: fixed;
    width: 78vw;
    height: 60px;
    /* line-height: 60px; */
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
        margin-top: 80px;
}

  .canvas-container {
    width: 100vw;
    height: 100vh;
  }
  .home {
    width: 100vw;
    height: 100vh;
    transform-origin: 0 0;
  }
  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #000;
  }
  .header .logo {
    position: relative;
    height: 100px;
    width: 400px;
    margin-top: 90px;
    margin-left: 50px;
    font-size: 1.5rem;
    opacity: 0.75;
    color: #fff;
    /* background-image: url("./assets/lcdm.png"); */
    background-size: 60%;
    background-position: center;
    background-repeat: no-repeat;
  }
   /* 进度条css样式 */
  
   .per_title{
    position:absolute;
    top: 7%;
    left:50%;
   }
   :depp(.per_title::before){
    position: relative;
    content: "模型加载";
    color: #fff; /* 文字颜色 */
    font-size: 8px; /* 文字大小 */
    font-weight: 900;
    top: 10px;
    left: 0;
  }
   #per_container {
    position: absolute;
    display: block;
    width: 400px;
    height: 16px;
    top: 5%;
    left:50%;
    margin-left: -200px;
    margin-top: -8px;
    border-radius: 8px;           
    border: 1px solid #009999;    
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 阴影效果 */      
    overflow: hidden;
  }
  
  #per {
    height: 100%;
    width: 0px;
    background: #00ffff;
    color: #00ffff;
    line-height: 15px;          
  }
  #per_bg{
    height: 16px;
    width: 0px;
    background: #00ffff;
    color: #00ffff;
    line-height: 15px;     
  }
  
  .canvas-container {
    width: 100%;
    height: 100%;
  }
  .menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 50px;
  }
  .menuItem {
    padding: 0 15px;
    text-decoration: none;
    color: #fff;
    font-weight: 900;
    font-size: 15px;
  }
  .loading {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-image: url(./assets/loading.jpg);
    background-size: cover;
    filter: blur(50px);
    z-index: 100;
  }
  .progress {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 101;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    color: #fff;
  }
  .progress > img {
    padding: 0 15px;
  }
  
  /* .title {
    width: 380px;
    height: 40px;
    position: fixed;
    right: 100px;
    top: 50px;
    background-color: rgba(0, 0, 0, 0.5);
    line-height: 40px;
    text-align: center;
    color: #fff;
    border-radius: 5px;
    z-index: 110;
  } */
  .pages {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
  }
  .pages .page {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    color: #fff;
    padding: 15%;
    box-sizing: border-box;
  }
  .pages .page .title {
    font-size: 50px;
    font-weight: 900;
    margin-bottom: 20px;
  }
  .pages .page p {
    font-size: 25px;
  }
  </style>
  