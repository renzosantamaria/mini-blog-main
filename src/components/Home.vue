<template>
  <div class="hello">
    <div class="create-box">
      <h1>CREATE A POST</h1>
      <div class="post-wrapper">
        <div class="title-box">
          <label for="title">Enter a post name</label>
          <input v-model="newPost.title" id="title" name="title" type="text" placeholder="My title">
        </div>

        <div class="content-box">
          <label for="content">Enter your text here!</label>
          <textarea v-model="newPost.content" name="content" id="content" cols="30" rows="10" placeholder="Write your post here"></textarea>
        </div>
        <button @click="createPost">Upload your post!</button>
      </div>
    </div>

    <div class="search-box">
      <h1>READ A POST</h1>
      <button @click="getPost">See all posts!</button>
      <ul>
        <li
        v-for=" post in getPostList"
        :key="post.id"
        @click="updatePost(post)"
        >
          <div class="post-wrapper">
            <span class="title"><strong>Title: </strong>{{post.title}}</span>
            <span class="content"><strong>Content: </strong>{{post.content}}</span>
            <span class="delete" @click="deletePost(post)">X</span>
          </div>
        </li>
      </ul>
    </div>
        
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data(){
    return{
      id: null,
      newPost:{title: "", content: ""},

    }
  },
  computed:{
    ...mapGetters(['getPostList',])
  },
  created(){
    this.$store.dispatch('readPost')
  },
  methods:{
    createPost(){
      this.$store.dispatch('createPost', this.newPost)
      this.$store.dispatch('readPost')
      this.newPost.title = ''
      this.newPost.content = ''
    },
    getPost(){
      this.$store.dispatch('readPost')
    },

    updatePost(post){
      console.log(this.getPostList.length)
      const payload = {title: post.title, content: post.content, id:post._id}
      this.$store.dispatch('updatePost', payload)
      this.$store.dispatch('readPost')
    },
    deletePost(post){
      // console.log(post)
      this.$store.dispatch('deletePost', post._id)
      this.$store.dispatch('readPost')
      console.log('del' + this.getPostList.length)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
li:hover{
  cursor: pointer;
}
a {
  color: #42b983;
}
button{
  width: 200px;
  margin: 0 auto;
}
.post-wrapper{
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  position: relative;
}
.delete{
  border: red 1px solid;
  position: absolute;
  right: -20px;
  z-index: 2;
}
ul{
  display: flex;
  flex-direction: column;
}
li{
  margin-bottom: 40px;
  width: 85%;
}
</style>
