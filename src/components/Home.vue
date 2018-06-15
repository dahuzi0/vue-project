<template>
    <div class="wrapper">
        <div class="header-bg">
            <v-header></v-header>
        </div>
        <div class="content">
            <transition name="move" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>

<script>
    import vHeader from './header.vue';

    export default {
        components: {
            vHeader
        }
    }

</script>
<style scoped>
    .header-bg {
        background-color: #2F333D;
        min-width: 1230px;
    }
</style>
