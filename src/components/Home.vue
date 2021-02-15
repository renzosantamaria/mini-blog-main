<template>
  <div class="hello">
    <!-- <button @click="toggleAdminMode">{{loginBtnMsg}}</button> -->
    <div  v-if="getAdminStatus" class="create-box">
      <div  class="form-wrapper">
        <h1>WRITE A NEW POST</h1>
        <div class="title-box">
          <label for="title">Enter your post title</label>
          <input v-model="newPost.title" id="title" name="title" type="text" placeholder="My title">
        </div>

        <div class="content-box">
          <label for="content">Enter your text here!</label>
          <textarea style="resize: none" v-model="newPost.content" name="content" id="content" cols="30" rows="10" placeholder="Write your post here"></textarea>
        </div>
        <green-button @click.native="createPost">Upload your post!</green-button> 
        <!-- <button @click="createPost">Upload your post!</button> -->
      </div>
    </div>

    <div class="posts">
      <ul>
        <blog-item
          v-for=" post in getPostList"
          :key="post.id"
          :Blog="post"
        >
          <template v-slot:deleteButton>
            <!-- <button  >Delete post!</button> -->
            <img v-if="showDeleteIcon" class="delete-button" @click="deletePost(post)" src="@/assets/icons/delete-icon-black.svg" alt="delete-button">
          </template> 
        </blog-item>
        
      </ul>
    </div>
    <!-- <button @click="scrollUp" ref="topBtn" id="topBtn">TOP</button> -->
    <img @click="scrollUp" ref="topBtn" id="topBtn" src="@/assets/icons/arrow-up-white.svg" alt="">
    <transition name="fade">
      <div v-if="deleteModeActive" class="confirmation-msg-wrapper">
        <div class="confirmation-msg">

          <h1>ARE YOU SURE ?</h1>
          <p>You will not be able to recover this post</p>
          <green-button @click.native="confirmDelete">Yes, delete it!</green-button>
          <green-button @click.native="cancelDelete">Cancel</green-button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import BlogItem from './BlogItem.vue'
import GreenButton from './GreenButton.vue'
export default {
  components: { BlogItem, GreenButton },
  data(){
    return{
      id: null,
      newPost:{title: "", content: ""},
      deleteMode: false,
      postToDelete: null,
    }
  },
  computed:{
    deleteModeActive(){
      return this.deleteMode
    },
    showDeleteIcon(){
      if (this.getAdminStatus == true) {
        return true
      }else{
        return false
      }
    },
    ...mapGetters(['getPostList', 'getAdminStatus'])
  },

   created(){
    window.addEventListener('scroll', this.handleScroll);
  },
   destroyed(){
    window.removeEventListener('scroll', this.handleScroll);
  },

  methods:{
    createPost(){
      this.$store.dispatch('createPost', this.newPost)
      this.$store.dispatch('readPost')
      this.newPost.title = ''
      this.newPost.content = ''
    },

    updatePost(post){
      const payload = {title: post.title, content: post.content, id:post._id}
      this.$store.dispatch('updatePost', payload)
      this.$store.dispatch('readPost')
    },
    deletePost(post){
      this.postToDelete = post._id
      this.deleteMode= true
      document.body.style.overflow = 'hidden'

    },
    confirmDelete(){
      this.$store.dispatch('deletePost', this.postToDelete)
      document.body.style.overflow = 'auto'
      this.deleteMode = false
      this.$store.dispatch('readPost')
    },
    cancelDelete(){
      document.body.style.overflow = 'auto'
      this.deleteMode = false
    },

    handleScroll(){
      if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        this.$refs.topBtn.style.display = 'block';
      } else {
        this.$refs.topBtn.style.display = "none";
      }
    },
    scrollUp(){
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0
    },
    toggleAdminMode(){
      this.admin = !this.admin
    },
    
  
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  background-color: aliceblue;
  list-style-type: none;
  padding: 6rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

label{
  font-size: 1rem;
}
// button{
//   width: 200px;
//   margin: 0 auto;
// }
.create-box{
  margin: 1rem auto;
  padding: 2rem;
  background-color: aliceblue;
  width: 100%;
  box-shadow: 2px 2px 10px rgba(65, 65, 65, 0.253);
}
.title-box, .content-box{
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 1rem 0;
  width: 100%;
}
.form-wrapper{
  background-color: white;
  // width: 60%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 4rem 6rem;
  display: flex;
  flex-direction: column;
  position: relative;
  box-shadow: 2px 2px 10px rgba(65, 65, 65, 0.253);
  border-radius: 10px;
}
// .delete{
//   border: red 1px solid;
//   position: absolute;
//   right: -20px;
//   z-index: 2;
// }
ul{
  display: flex;
  flex-direction: column;
  // border-top: rgb(255, 255, 255) 1px solid;
}
.delete-button{
  width: 1.6rem;
}
  
.delete-button:hover{
  cursor: pointer;
  transform: scale(1.2);
}

#topBtn {
  height: 5rem;
  width: 5rem;
  display: none;
  position: fixed;
  bottom: 60px;
  right: 30px;
  outline: none;
  cursor: pointer;
  background-color: rgb(0, 0, 0);
  padding: 1rem;
  border-radius: 50%;
}
.confirmation-msg-wrapper{
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.692);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.confirmation-msg{
  color: black;
  background-color: white;
  padding: 4rem;
}



.fade-enter-active, .fade-leave-active {
  transition: opacity .6s;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}
</style>
