<template>
  <header class="sticky">
      <div class="logo-wrapper">
          <router-link to="/">
            <img class="header-logo" src="@/assets/logo.png" alt="">
          </router-link> 
      </div>
      <div class="nav-wrapper">

          <div class="search-box">
              <input type="text" placeholder="Search a post...">
              <!-- <div class="search-results">
                  <p>uno</p>
                  <p>dos</p>
              </div> -->
          </div>
          <button @click="toggleAdminMode">{{loginBtnMsg}}</button>
          <router-link to="/"><button>Home</button></router-link> 
      </div>
  </header>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    computed:{
        loginBtnMsg(){
        if (this.getAdminStatus == false) {
            return 'Log in as Admin'
        }
        else{
            return 'Log out'
        }
        },
        ...mapGetters(['getAdminStatus'])
    },
    methods:{
        toggleAdminMode(){
            this.$store.dispatch('updateAdminStatus', !this.getAdminStatus)
        }
    }
}
</script>


<style lang="scss">
    header{
        position: -webkit-sticky;
        position: sticky;
        top: 0;
        padding: 5px;
        background-color: #00121ddf;
        z-index: 1;
        
        height: 6rem;
        padding: 2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        a{
            text-decoration: none;
            color: white;
        }
        .header-logo{
            height: 3.4rem;
        }
        .nav-wrapper{
            display: flex;
            button{
                font-size: 1rem;
                padding: 0.6rem 1rem;
                margin: 1rem;
                outline: none;
                border: none;
                box-shadow: 0px 0px 8px white;
                color: white;
                border-radius: 0.4rem;
                background-color: rgba(73, 144, 117, 0);
            }
            button:hover{
                cursor: pointer;
                transform: scale(1.1);
            }
            .search-box{
                display: flex;
                align-items: center;
                position: relative;
                padding: 0 1rem;
                input{
                    font-size: 1rem;
                    color: white;
                    border: none;
                    border-bottom: 1px solid rgb(255, 255, 255);
                    outline: none;
                    background-color: rgba(4, 122, 226, 0);
                    &::placeholder{
                        font-size: 1rem;
                        color: white;
                    }
                }
                .search-results{
                    position: absolute;
                    bottom: -10px;
                }
            }
        }

    }
</style>