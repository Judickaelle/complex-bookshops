<template>
  <div>
    <app-header></app-header>
    <app-booktable></app-booktable>
    <app-sidebar></app-sidebar>
  </div>
</template>

<script>
import Header from "./components/Header";
import Booktable from "./components/Booktable";
import Sidebar from "./components/Sidebar";

export default {
  components: {
    'app-header':Header,
    'app-booktable':Booktable,
    'app-sidebar':Sidebar,
  },
  data () {
    return {
    };
  },
  methods: {
    submit () {
    },
  },
};
</script>

<style>

</style>
