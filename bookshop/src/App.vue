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
//import axios from "axios";

export default {
  components: {
    'app-header':Header,
    'app-booktable':Booktable,
    'app-sidebar':Sidebar,
  },
  data () {
    return {
      basket: [
        ['price_1KGPlDCjyN8XrbQRmEVVv2BV', 0],
        ['price_1KLX53CjyN8XrbQRAyoxMmMz', 0],
        ['price_1KLX60CjyN8XrbQRRiXPyzlY', 0]
      ],

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
