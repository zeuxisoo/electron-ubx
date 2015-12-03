<template>
    <div id="home">
        <div class="panel panel-primary">
            <div class="panel-body">
                <div class="form-group">
                    <div class="col-md-12">
                        <label for="event-number" class="control-label">Event Number</label>
                        <input type="text" class="form-control" id="event-number" placeholder="E.g. 28251" v-model="eventNumber">
                        <button class="btn btn-raised btn-primary" v-on:click="checkEventNumber()">Check</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="panel panel-primary">
            <div class="panel-body">

            </div>
        </div>
    </div>
</template>

<style>
.form-group {
    margin-top: 0px;
}
</style>

<script>
import request from 'request';

export default {
    data() {
        return {
            eventNumber: ""
        }
    },

    methods: {
        checkEventNumber() {
            if (this.eventNumber.length <= 0 || /^[0-9]+$/.test(this.eventNumber) === false) {
                alert('Please enter event number');
                return;
            }

            request({
                url: "https://httpbin.org/ip"
            }, (error, response, body) => {
                console.log(body);
            });
        }
    }
}
</script>
