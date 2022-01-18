<template>
  <div>
    <app-header></app-header>
    <app-booktable></app-booktable>
  </div>   
</template>

<script>
import Header from "./components/Header";
import Booktable from "./components/Booktable";

export default {
  name: 'App',
  components: {
    'app-header':Header,
    'app-booktable':Booktable
  },
  data(){
    return{
    }
  }
}
</script>

<style>

</style>
