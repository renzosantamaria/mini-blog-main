<template>
  <button>
      <slot />
  </button>
</template>

<script>
export default {

}
</script>

<style scoped>
    button{
        padding: 1rem 2rem;
        margin: 2rem 0;
        outline: none;
        font-size: 1.6rem;
        border: none;
        border-radius: 0.6rem;
        background-color: rgb(247, 141, 102);
        box-shadow: 2px 2px 8px grey;
    }
    button:hover{
        cursor: pointer;
        transform: scale(1.04);
    }
</style>