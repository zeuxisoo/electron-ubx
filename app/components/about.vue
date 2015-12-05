<template>
    <div id="home">
        <div class="panel panel-primary">
            <div class="panel-heading">Your Info</div>
            <div class="panel-body">
                <div class="row row-margin">
                    <div class="col-xs-3 text-right"><strong>Username</strong>:</div>
                    <div class="col-xs-9">{{ yourInfo.username }}</div>
                </div>
                <div class="row row-margin">
                    <div class="col-xs-3 text-right"><strong>Home Path</strong>:</div>
                    <div class="col-xs-9">{{ yourInfo.homePath }}</div>
                </div>
            </div>
        </div>

        <div class="panel panel-primary">
            <div class="panel-heading">Application Info</div>
            <div class="panel-body">
                <div class="row row-margin">
                    <div class="col-xs-3 text-right"><strong>Name</strong>:</div>
                    <div class="col-xs-9">Ubx</div>
                </div>
                <div class="row row-margin">
                    <div class="col-xs-3 text-right"><strong>Version</strong>:</div>
                    <div class="col-xs-9">v0.1.0</div>
                </div>
                <div class="row row-margin">
                    <div class="col-xs-3 text-right"><strong>Kernel</strong>:</div>
                    <div class="col-xs-9">{{ applicationInfo.kernel }}</div>
                </div>
                <div class="row row-margin">
                    <div class="col-xs-3 text-right"><strong>Platform</strong>:</div>
                    <div class="col-xs-9">{{ applicationInfo.platform }}</div>
                </div>
                <div class="row row-margin">
                    <div class="col-xs-3 text-right"><strong>Arch</strong>:</div>
                    <div class="col-xs-9">{{ applicationInfo.arch }}</div>
                </div>
            </div>
        </div>

        <div class="panel panel-primary">
            <div class="panel-heading">Change Logs</div>
            <div class="panel-body panel-change-logs">
                <div class="row row-margin">
                    <div class="col-xs-12">
                        <h5>2015.12.05</h5>
                        <ul class="change-logs-list">
                            <li>- Finish 0.1.0</li>
                            <li>- Support to show the events list by event number</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.row-margin {
    margin-top: 5px;
    margin-bottom: 5px;
}

.panel-change-logs {
    height: 170px;
    overflow-y: auto;
}

.change-logs-list {
    list-style-type: none;
    padding-left: 5px;
}
</style>

<script>
export default {

    data() {
        return {
            yourInfo: null,
            applicationInfo: null
        }
    },

    ready() {
        this.yourInfo = {
            username: process.env.USER,
            homePath: process.env.HOME
        }

        this.applicationInfo = {
            kernel  : process.version,
            platform: process.platform,
            arch    : process.arch
        }

        console.log(process)
    }

}
</script>
