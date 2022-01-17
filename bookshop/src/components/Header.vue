<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand href="#">Bookshop</b-navbar-brand>
                <!--search form-->
               <b-form class="inline">
                    <b-form-input class="mr-sm-2" placeholder="Search"></b-form-input>
                    <b-button variant="outline-success" class="my-2 my-sm-0" type="submit">Search</b-button>
                </b-form>
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
        display: flex;
        width: auto;
        //faire un alignement à droite 
    }
</style>