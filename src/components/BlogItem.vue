<template>
  <li>
    <h1>Title: {{Blog.title}}</h1>
    <!-- <p> <strong> Content: </strong> {{Blog.content}}</p> -->
    <router-link :to="`/post/${Blog._id}`"><green-button> Read the whole post..</green-button></router-link>
    <!-- <green-button> Read the whole post..</green-button> -->
    <div class="deleteButton-wrapper">
        <slot name="deleteButton">
        </slot>
    </div>

  </li>
</template>

<script>
import GreenButton from './GreenButton.vue'
export default {
  components: { GreenButton },
props:{
    Blog: Object,
    id: String
}
}
</script>

<style scoped>

h1{
    font-size: 1.5rem;
}

li{
    max-width: 1000px;
    position: relative;
    /* width: 1000px; */
    /* width: 80%; */
    width: 100%;
    margin: 1.5rem 0;
    padding: 3rem 2rem;
    background-color: white;
    border: none;
    border-radius: 0.6rem;
    box-shadow: 2px 4px 10px rgba(161, 161, 161, 0.657);
}
button{
    margin-top: 3rem;
    font-size: 1rem;
    padding: 0.8rem 2rem;
    border: none;
    border-radius: 8px;
    color: white;
    background-color: rgb(123, 185, 187);
    box-shadow: 3px 4px 8px rgba(161, 161, 161, 0.993);
    outline: none;
}
button:hover{
    cursor: pointer;
    transform: scale(1.025);
}

.deleteButton-wrapper{
    position: absolute;
    width: fit-content;
    top: 14px;
    right: 14px;
    
}
</style>