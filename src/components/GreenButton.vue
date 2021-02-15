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
</style>