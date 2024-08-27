<template>
    <!-- <canvas class="webgl"></canvas> -->
    <div class="name-box" ref="nameDom"></div>
</template>
<style scoped>
.name-box {
    display: none;
    position: absolute;
    width: 170px;
    height: 150px;
    text-align: center;
    top: 0;
    left: 100px;
    color: #fff;
    font-size: large;
    background-color: rgba(241, 149, 154, 0.724);
}
</style>

<script setup>
import { onMounted,ref } from "vue";
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

//后期处理
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js'

let scene, camera, renderer
let stats, controls, gui
// 后期处理
let effectComposer = null
let outlinePass = null
//像素比
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
let nameDom = ref([])

// 自适应屏幕
// let onWindowsResize = () => {

// sizes.width = window.innerWidth
// sizes.height = window.innerHeight
// camera.aspect = sizes.width / sizes.height
// camera.updateProjectionMatrix()
// renderer.setSize(sizes.width, sizes.height)
// renderer.setPixelRatio(window.devicePixelRatio)

// effectComposer.setSize(sizes.width, sizes.height)
// effectComposer.setPixelRatio(window.devicePixelRatio)

// }



onMounted(()=>{

    init();

    addModel();

    raycastCamera();

    addPostProcessing();

    
    // 定义一个渲染函数 让它动起来
    let animate = () =>{
        controls.update(); // 
        raycast.setFromCamera(mouse, camera)
        const intersects = raycast.intersectObjects(machinePart) // 光线投影检测  检测光线与 machinePart 数组中的对象的交集（返回一个对象的数组） 
        if (intersects.length > 0) {

            const target = intersects[0].object.name // 获取相交对象的名称
            if (!rejectPart.includes(target)) { //检查 target 是否在 rejectPart 数组中
                nameDom.value.style.display = 'block'
                nameDom.value.innerHTML = `名称：${target}，<br>机箱温度：35，<br>机箱状态：良好`
                nameDom.value.style.left = `${namePosition.x + 30}px`
                nameDom.value.style.top = `${namePosition.y}px`
                outlinePass.selectedObjects = [intersects[0].object] // 相交对象添加到 outlinePass.selectedObjects 数组中，以便为其添加高亮描边效果。
            }
            else{
                nameDom.value.style.display = 'block'
                nameDom.value.innerHTML = `您没有相关权限，请联系管理员`
                nameDom.value.style.left = `${namePosition.x + 30}px`
                nameDom.value.style.top = `${namePosition.y}px`
                outlinePass.selectedObjects = [intersects[0].object] // 相交对象添加到 outlinePass.selectedObjects 数组中，以便为其添加高亮描边效果。
              
            }
                console.log("条件实现了");
        } else {
            nameDom.value.style.display = 'none'
            outlinePass.selectedObjects = []

             
            console.log("条件没有实现了");
        }
        //帧率检测
        stats.update();
        effectComposer.render();
        requestAnimationFrame(animate); // 渲染帧 自动渲染下一帧
        // renderer.render(scene,camera)
    };
    animate();
    expandFunction();
   
})

let init = ()=>{
    //初始化操作
   // 创建场景
    scene = new THREE.Scene();
    // 创建相机
    camera = new THREE.PerspectiveCamera(
        45, //视角，可观测的视野范围
        window.innerWidth/window.innerHeight, // 宽高比 
        0.1, // 近平面
        1000, // 远
    );
    camera.position.set(0, 12, 18) // 设置相机位置
    camera.lookAt(scene.position) // 相机看向
    // 创建渲染器
    renderer = new THREE.WebGL1Renderer();
    renderer.setSize(window.innerWidth,window.innerHeight); //设置渲染区域为整个页面大小
    document.body.appendChild(renderer.domElement); // 将画布添加到浏览器body
    renderer.setPixelRatio(window.devicePixelRatio) // 根据设备的像素比（window.devicePixelRatio）来调整渲染器的分辨率
   
    // 添加坐标辅助器 以便查看
    // const axeshelper = new THREE.AxesHelper(5);
    // scene.add(axeshelper); // 添加到场景中 z轴看不到，正对我
    // 添加控制器
    controls = new OrbitControls(camera, renderer.domElement);
    // 设置带有 阻尼 的惯性
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;

    //帧率检测
    stats = new Stats()
    document.body.appendChild(stats.domElement)
}

// 自适应屏幕
let onWindowsResize = () => {

sizes.width = window.innerWidth
sizes.height = window.innerHeight
camera.aspect = sizes.width / sizes.height
camera.updateProjectionMatrix()
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(window.devicePixelRatio)

effectComposer.setSize(sizes.width, sizes.height)
effectComposer.setPixelRatio(window.devicePixelRatio)

}
//双击全屏
let onWindowsScreen = () => {
    let isFullScreen = document.fullscreenElement
    if (!isFullScreen) {
        renderer.domElement.requestFullscreen()
    } else {
        document.exitFullscreen()
    }
}

let expandFunction = () => {
    window.addEventListener('resize', onWindowsResize)
    window.addEventListener('dblclick', onWindowsScreen)

}

// 加载模型
console.log("加载machineRoom----");
const gltfLoader = new GLTFLoader()
const machinePart = []
let rejectPart = ['door-001', 'door-002', 'floor01', 'floor02', 'wall-f', 'wall-l', 'wall-t']
let addModel = () => {
    gltfLoader.load('../../MachineRoom/machineRoom.gltf', (gltf) => {
        const machine = gltf.scene

        machine.traverse(child => {
            if (child instanceof THREE.Mesh) {
                machinePart.push(child)
            }
        })
        scene.add(machine)
    },(error)=>{
        console.log("加载machineRoom模型失败",error);
    })
}


// 选中物体
let mouse = new THREE.Vector2(5, 5)
let namePosition = {
    x: 0,
    y: 0
}
const raycast = new THREE.Raycaster()
// const nameDom = document.querySelector('.name-box')
let raycastCamera = () => {
    window.addEventListener('mousemove', (event) => {
        event.preventDefault()
        namePosition.x = event.clientX
        namePosition.y = event.clientY

        mouse.x = 2 * (event.x / sizes.width) - 1
        mouse.y = -2 * (event.x / sizes.width) + 1
        console.log("鼠标移动了----",mouse.x,mouse.y);
    })
}
// 增加效果
let addPostProcessing = () => {
    effectComposer = new EffectComposer(renderer)
    effectComposer.setSize(sizes.width, sizes.height)
    effectComposer.setPixelRatio(window.devicePixelRatio)


    const renderPass = new RenderPass(scene, camera)
    effectComposer.addPass(renderPass)

    outlinePass = new OutlinePass(new THREE.Vector2(sizes.width, sizes.height), scene, camera)
    outlinePass.edgeStrength = 5
    outlinePass.edgeGlow = 1
    outlinePass.pulsePeriod = 2
    outlinePass.visibleEdgeColor.set("#35f2d1")
    outlinePass.hiddenEdgeColor.set("#00ffff")
    effectComposer.addPass(outlinePass)
}

</script>



