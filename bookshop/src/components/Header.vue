<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand class="ml-7" href="#">Bookshop</b-navbar-brand>
                <!--search form-->
               <b-form class="inline right-align">
                    <b-form-input class="mr-sm-2" placeholder="Search"></b-form-input>
                     <b-button class="ml-7" type="submit">Search</b-button>
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
        display: inline-flex;
        width: auto;
    }

    .right-align{
        position: absolute;
        right: 7px;
    }

    .ml-7{
        margin-left: 7px;
    }
</style>