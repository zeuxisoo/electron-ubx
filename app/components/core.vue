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

        <div class="well" v-if="eventName === ''">
            Master, We are waiting for your action :)
        </div>

        <div class="alert alert-dismissible alert-primary" v-if="eventName !== ''">
            {{ eventName }}
        </div>

        <div class="row events-block" v-if="events.length > 0">
            <div class="col-xs-4" v-for="(index, event) in events">
                <div class="panel panel-primary">
                    <div class="panel-heading">Event #{{ index + 1 }}</div>
                    <div class="panel-body">
                        <div class="row row-event-detail">
                            <div class="col-xs-3 text-right">Date</div>
                            <div class="col-xs-9">{{ event.month }} {{ event.date }} {{ event.year }}</div>
                        </div>
                        <div class="row row-event-detail">
                            <div class="col-xs-3 text-right">Day</div>
                            <div class="col-xs-9">{{ event.day }}</div>
                        </div>
                        <div class="row row-event-detail">
                            <div class="col-xs-3 text-right">State</div>
                            <div class="col-xs-9">
                                <span class="text-danger" v-if="event.buyState !== ''">{{ event.buyState }}</span>
                                <span class="text-muted" v-if="event.buyState === ''">N/A</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
button:focus {
    outline: 0 !important;
}

.form-group {
    margin-top: 0px;
}

.events-block {
    overflow-y: auto;
    height: 330px;
}

.row-event-detail {
    margin-top: 2px;
    margin-bottom: 2px;
}
</style>

<script>
import fs from 'fs';
import request from 'request';
import cheerio from 'cheerio';

let cookieJar = request.jar();
let agent = request.defaults({
    headers: {
        "Accept"          : "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language" : "en-US,en;q=0.8",
        "Connection"      : "keep-alive",
        "User-Agent"      : "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.73 Safari/537.36"
    },
    jar: cookieJar,
    followRedirect: false
});

export default {
    data() {
        return {
            eventNumber: "",
            eventName  : "",
            events     : []
        }
    },

    methods: {
        async checkEventNumber() {
            if (this.eventNumber.length <= 0 || /^[0-9]+$/.test(this.eventNumber) === false) {
                alert('Please enter event number');
                return;
            }

            try {
                await this.fetchAuth();
            }catch(reason) {
                alert(reason);
                return;
            }

            this.fetchList();
        },

        fetchAuth() {
            return new Promise((resolve, reject) => {
                agent({
                    url: "http://www.urbtix.hk/"
                }, (error, response, body) => {
                    if (error) {
                        reject("Can not connect to website");
                    }else if (response.headers.location !== "https://ticket.urbtix.hk/") {
                        reject("Website response incorrect");
                    }else{
                        resolve(body);
                    }
                });
            });
        },

        fetchList() {
            const targetURL = `https://ticket.urbtix.hk/internet/zh_TW/eventDetail/${this.eventNumber}`;

            agent({
                url: targetURL
            }, (error, response, body) => {
                if (error) {
                    alert("Can not connect to event page");
                }else{
                    this.parseEvent(body);
                }
            })
        },

        parseEvent(html) {
            let $ = cheerio.load(html);
            let eventTable = $("table#evt-perf-items-tbl");
            let eventList  = eventTable.find("tr");

            let events = [];

            eventList.each((eventIndex, eventItem) => {
                // Calendar column
                let calendar = $(eventItem).find("td.perf-cal-col .perf-cal-div");
                let month    = calendar.find(".month").text().trim();
                let date     = calendar.find(".date").text().trim();
                let day      = calendar.find(".day").text().trim();
                let year     = calendar.find(".year").text().trim();

                // Other
                let time = $(eventItem).find("td.perf-time-col span").text().replace(/\r?\n|\r/g, "").replace(/\s+/g, "").trim();
                let name = $(eventItem).find("td.perf-name-col").text().trim();

                // Purchase column
                let purchase = $(eventItem).find("td.perf-purchase-col .event-buy-status-col");
                let buyState = purchase.find(".perf-limited-span").text().trim();

                // console.log(`${month} - ${date} - ${day} - ${year} - ${time} - ${name} - ${buyState}`)

                events.push({
                    month, date, day, year, time, name, buyState
                });
            })

            this.eventName = events[0].name;
            this.events = events
        }
    }
}
</script>
