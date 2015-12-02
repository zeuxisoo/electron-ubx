<template>
    <div id="app-views">
        <component :is="currentView" keep-alive></component>
    </div>
</template>

<style>
#app-views {
    -webkit-app-region: drag;
    webkit-user-select: none;
}
</style>

<script>
require('jquery');
require('bootstrap');
require('bootstrap/less/bootstrap.less');

import Home from './home.vue'

export default {
    data() {
        return {
            currentView: 'Home'
        }
    },

    components: {
        Home
    }
}
</script>
