

<template>


          <RouterView></RouterView>
 

</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
import content from "./views/index.vue";
</script>

<style scoped>
/* .container{
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
        margin-top: 80px;
} */
</style>
