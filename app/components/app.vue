<template>
    <div id="app-views">
        <div id="draggable" class="navbar navbar-default navbar-fixed-top">
            <div class="container-fluid">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-responsive-collapse">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="javascript:void(0)">Ubx</a>
                </div>
                <div class="navbar-collapse collapse navbar-responsive-collapse">
                    <ul class="nav navbar-nav">
                        <li class="active">
                            <a v-on:click="pathFor('core')">Core</a>
                        </li>
                        <li>
                            <a v-on:click="pathFor('about')">About</a>
                        </li>
                    </ul>

                    <ul class="nav navbar-nav navbar-right">
                        <li>
                            <a class="hand" v-on:click=""><i class="material-icons icon-size-18">remove</i></a>
                        </li>
                        <li>
                            <a class="hand" v-on:click=""><i class="material-icons icon-size-18">close</i></a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="container-fluid">
            <component :is="currentView" keep-alive></component>
        </div>
    </div>
</template>

<style>
body {
    overflow: hidden;
    margin-top: 60px;
}

.hand {
    cursor: pointer;
}

.icon-size-18 {
    font-size: 18px;
}

#draggable {
    -webkit-app-region: drag;
    webkit-user-select: none;
}
</style>

<script>
require('jquery');
require('bootstrap');
require('bootstrap/less/bootstrap.less');
require('bootstrap-material-design');
require('bootstrap-material-design/dist/css/bootstrap-material-design.css');
require('bootstrap-material-design/dist/css/ripples.css');

import Home from './home.vue'

export default {
    data() {
        return {
            currentView: 'Home'
        }
    },

    ready() {
        jQuery.material.init()
    },

    components: {
        Home
    },

    methods: {
        pathFor(name) {

        }
    }
}
</script>
