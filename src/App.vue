<template>
  <div ref="app" id="app">
    <the-header class="sticky" />
    <div v-if="home" class="hero-wrapper">
      <p class="hero-text">Welcome to the Vue Blog.</p>
    </div>
    <router-view></router-view>

    <footer>
    </footer>
  </div>
</template>
<script>


import TheHeader from './components/TheHeader.vue';
export default {
  components:{
    TheHeader
  },
  computed:{
    home(){
      return this.$route.path === "/"
    }
  },
   created(){
    console.log('app');
    this.$store.dispatch('readPost')
    // window.addEventListener('scroll', this.handleScroll);
    // console.log(this.$store.getters.getPostList)
  },
  mounted(){
    // console.log(this.$store.getters.getPostList)

  },

}
</script>

<style lang="scss">
*{
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
  
}

body{
  background-color: rgb(245, 245, 245);
  font-size: 10px;
  // max-width: 1800px;
  margin: 0 auto;
}
#app {
  // padding-bottom: 6rem;
  position: relative;
  // border: solid red 2px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  .hero-wrapper{
      position: relative;
      width: 100%;
      height: 600px;
      display: flex;
      justify-content: center;
      align-items: center;

      .hero-text{
        font-size: 4rem;
      }
  }
  .hero-wrapper::after{
    content: "";
    // width: 100vw;
    background: url("./assets/clouds.jpg");
    background-image: url("./assets/clouds.jpg"); 
    background-repeat: no-repeat;
    background-size: cover;
    background-position: bottom;
    opacity: 0.7;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    z-index: -1;   
  }

}


#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
footer{
  height: 12rem;
  background-color: rgb(15, 15, 15);
}



</style>
