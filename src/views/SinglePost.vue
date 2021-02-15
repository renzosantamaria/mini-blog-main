<template>
  <section>
    <div v-if="!editModeActive" class="post-wrapper">

      <h1>Title: {{postSource.title}}</h1>
      <p>Content: {{postSource.content}}</p>

    </div>
    <div v-if="editModeActive" class="create-box">
      <div  class="form-wrapper">
        <h1>EDIT YOUR POST</h1>
        <div class="title-box">
          <label for="title">Enter your post title</label>
          <input v-model="newTitle" id="title" name="title" type="text" placeholder="My title">
        </div>

        <div class="content-box">
          <label for="content">Enter your text here!</label>
          <textarea v-model="newContent" style="resize: none"  name="content" id="content" cols="30" rows="10" placeholder="Write your post here"></textarea>
        </div>
        <green-button @click.native="toggleEditMode">{{buttonMsg}}</green-button>
        <green-button @click.native="editPost">Save changes!</green-button> 
        <!-- <button @click="createPost">Upload your post!</button> -->
      </div>
    </div>

    <div v-if="!editModeActive" class="btn-wrapper">
      <router-link to="/"><green-button>Go back!</green-button></router-link>
      <green-button @click.native="toggleEditMode">{{buttonMsg}}</green-button>
    </div>

   
    
    
  </section>
</template>

<script>
import {mapGetters} from 'vuex'

import GreenButton from '../components/GreenButton.vue'
export default {
  components: { GreenButton },
  data(){
      return{
        post: null,
        newTitle: '',
        newContent: '',
        editMode: false
      }
  },
  methods:{
      editPost(){
        const payload = {title: this.newTitle, content: this.newContent, id:this.$route.params.id}
        console.log(payload)
        this.$store.dispatch('updatePost', payload)
        this.$store.dispatch('readPost')
        this.toggleEditMode()
      },
      toggleEditMode(){
        this.editMode = !this.editMode
      }
  },

    computed:{
      buttonMsg(){
        if (this.editMode) {
          return 'Cancel'
        }else{
          return 'Edit post'
        }
      },
      editModeActive(){
        return this.editMode
      },
      path(){
        return this.$route.params.id
      },
      postSource(){
        if (this.getSinglePost) {
          console.log(this.getSinglePost)
          return this.getSinglePost
        } else {
          return 'getSinglePost is empty'
        }
      },
        ...mapGetters(['getSinglePost','getPostList'])

    },
    beforeCreate(){
      // path är undefined

    },
    created(){
      console.log('created')
      console.log(this.path)
      
      // let dataFromLocalStorage = JSON.parse(localStorage.getItem('blogList'));
      // console.log(dataFromLocalStorage)

      this.$store.dispatch('updateClickedId', this.$route.params.id)
      console.log(this.getPostList) 
    },

    beforeMount(){
      console.log(this.getPostList) 
    },

    mounted(){
      console.log(this.getPostList) 
      this.newTitle = this.postSource.title
      this.newContent = this.postSource.content
    },

    beforeUpdate(){
      console.log('beforeupdate')
      this.singlePost = this.getPostList
      console.log(this.getPostList)
      console.log(this.getSinglePost)
      this.post = this.getSinglePost
    },


}
</script>

<style scoped>
section{
  height: 80vh;
  background-color: aliceblue;
  padding: 8rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

  h1{
    font-size: 1.5rem;
  }
  p{
    font-size: 1rem;
  }

  .post-wrapper{
    background-color: white;
    width: 1000px;
    min-width: 300px;
    /* margin: auto auto; */
    padding: 4rem 2rem;
    border: none;
    border-radius: 1rem;
    box-shadow: 0px 0px 20px rgba(66, 66, 66, 0.657);
  }

.create-box{
  /* margin: 1rem auto; */
  padding: 6rem;
  background-color: aliceblue;
  width: 100%;
  /* box-shadow: 2px 2px 10px rgba(65, 65, 65, 0.253); */
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
  /* width: 60%; */
  max-width: 1000px;
  margin: 0 auto;
  padding: 4rem 6rem;
  display: flex;
  flex-direction: column;
  position: relative;
  box-shadow: 2px 2px 10px rgba(65, 65, 65, 0.253);
  border-radius: 10px;
}
</style>

