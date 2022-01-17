<template>
    <div class="counter">
        {{ count }}
        <div class="counter_button" @click="increment"> + </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                count: 0
            }
        },
        methods: {
            increment () {
                this.count++
            }
        }
    }
</script>

<style>
    .counter{
        font-weight: blod;
        width: 20 px;
        height: 20 px;
        text-align: center;
        background-color: rgb(180, 180, 180);
    }

    .counter_button{
        padding: 10px;
        border: 1px solid black;
    }
</style>