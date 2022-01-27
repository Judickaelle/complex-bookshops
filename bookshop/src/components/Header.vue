<template>
    <div id="header">
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand class="ml-7" href="#">Bookshop</b-navbar-brand>
        <b-button v-b-toggle.sidebar-right class="ml-7 inline right-align"><img src="..\assets\icons8-shopping-cart-60.png" width="45%" height="auto" alt=" shopping cart"></b-button>
        </b-navbar>
    </div>
</template>

<script>
export default {
    name: "Header",
    components: {
    },
    computed: {
    },
    data() {
        return {
        }
    },
    methods: {
    }
}
</script>

<style>
    .inline{
        display: inline-flex;
        width: auto;
        justify-content: center;
        align-items: center;
    }

    .right-align{
        position: absolute;
        right: 7px;
    }

    .ml-7{
        margin-left: 7px;
    }
</style>