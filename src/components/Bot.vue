<template
  ><v-row
    ><v-col cols="12"
      ><v-card raised>
        <v-card-title primary-title>
          <div>
            <h3 class="mb-0">
              {{ bot.ticker }}
            </h3>

            <h5 class="subtitle mb-0">{{ bot.interval }}</h5>
          </div>
          <v-spacer></v-spacer>
          <h5>STATUS</h5>
          <v-icon color="green" v-if="bot.running" right
            >mdi-checkbox-marked-circle</v-icon
          >
          <v-icon color="red" v-if="!bot.running" right>mdi-cancel</v-icon>
        </v-card-title>
        <v-card-subtitle>
          <v-row v-if="lastCandle != undefined">
            <v-col cols="2"> OPEN: {{ lastCandle.open }}</v-col>
            <v-col cols="2"> HIGH: {{ lastCandle.high }}</v-col>
            <v-col cols="2"> LOW: {{ lastCandle.low }}</v-col>
            <v-col cols="2"> CLOSE: {{ lastCandle.close }}</v-col>
          </v-row>
          <template>
            <v-divider></v-divider>
          </template>
        </v-card-subtitle>
        <v-card-text>
          <v-row>
            <v-col>
              <h4 class="subtitle mb-5">BUY CONDITIONS</h4>
              <v-data-table
                dense
                v-model="selectedBuyConditions"
                :headers="conditionHeaders"
                :items="bullishSignals"
                v-ripple
                item-key="signal"
                class="elevation-1"
              >
                <template v-slot:item.active="{ item }">
                  <v-simple-checkbox
                    @click="toggleBuyCondition(item)"
                    v-model="item.active"
                  ></v-simple-checkbox>
                </template>
                <template v-slot:item.value="{ item }">
                  <v-icon color="success" v-if="item.value == true"
                    >fas fa-check</v-icon
                  >
                  <v-icon color="error" v-if="item.value == false"
                    >fas fa-times</v-icon
                  >
                </template>
              </v-data-table>
            </v-col>
            <v-col>
              <h4 class="subtitle mb-5">SELL CONDITIONS</h4>
              <v-data-table
                dense
                v-ripple
                v-model="selectedSellConditions"
                :headers="conditionHeaders"
                :items="bearishSignals"
                item-key="signal"
                class="elevation-1"
              >
                <template v-slot:item.active="{ item }">
                  <v-simple-checkbox
                    @click="toggleSellCondition(item)"
                    v-model="item.active"
                  ></v-simple-checkbox>
                </template>
                <template v-slot:item.value="{ item }">
                  <v-icon color="success" v-if="item.value == true"
                    >fas fa-check</v-icon
                  >
                  <v-icon color="error" v-if="item.value == false"
                    >fas fa-times</v-icon
                  >
                </template>
              </v-data-table>
            </v-col>
          </v-row>
          <v-row>
            <v-row>
              <v-switch class="ml-4" label="LOG" v-model="showLog"></v-switch>
              <v-col
                v-show="showLog"
                cols="12"
                v-for="(item, i) in bot.history"
                :key="i"
              >
                <v-card :style="getLogStyle(item.TYPE)"
                  ><v-card-title primary-title>
                    {{ item.TYPE }}
                  </v-card-title>
                  <v-card-subtitle>
                    {{ new Date(item.Date) }}
                  </v-card-subtitle>
                </v-card> </v-col
              ><v-col
                ><v-dialog
                  id="chartmodal"
              
                  v-model="showChart"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn text color="primary" dark v-bind="attrs" v-on="on">
                      show chart
                    </v-btn>
                  </template>
                  <Chart :title="bot.ticker" :ohlcv="bot.cache"></Chart>
                  <v-btn color="red darken-1" text @click="showChart = false"
                    >close</v-btn
                  >
                </v-dialog></v-col
              >
            </v-row>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn text color="success" @click="start()"
            ><v-icon left>fas fa-play</v-icon> start</v-btn
          >
          <v-btn text color="error" @click="stop()"
            ><v-icon left>fas fa-stop</v-icon> stop</v-btn
          ><v-spacer></v-spacer
          ><v-btn text color="error" @click="deleteBot()"
            ><v-icon left>fas fa-trash</v-icon> delete</v-btn
          >
        </v-card-actions>
      </v-card></v-col
    >
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-row>
</template>

<script>
import Chart from "./Chart";
export default {
  name: "Bot",
  props: ["bot"],
  data: function() {
    return {
      showChart: false,
      overlay: false,
      showLog: false,
      logEntry: "",
      selectedBuyConditions: [],
      selectedSellConditions: [],
      conditionHeaders: [
        {
          text: "SIGNAL",
          align: "start",
          sortable: true,
          value: "signal",
        },
        {
          text: "MATCH",
          align: "start",
          sortable: true,
          value: "value",
        },
        {
          text: "ACTIVE",
          align: "start",
          sortable: true,
          value: "active",
        },
      ],
    };
  },
  components: {
    Chart,
  },

  computed: {
    lastCandle: function() {
      return this.bot.cache[this.bot.cache.length - 1];
    },
    bullishSignals: function() {
      let signals = [];
      Object.keys(this.bot.bullishSignals).forEach((key) => {
        signals.push({
          signal: key,
          value: this.bot.bullishSignals[key],
          active: this.bot.buyConditions.includes(key),
        });
      });

      return signals;
    },
    bearishSignals: function() {
      let signals = [];
      Object.keys(this.bot.bearishSignals).forEach((key) => {
        signals.push({
          signal: key,
          value: this.bot.bearishSignals[key],
          active: this.bot.sellConditions.includes(key),
        });
      });

      return signals;
    },

    buyConditions: function() {
      return this.bot.buyConditions;
    },
    sellConditions: function() {
      return this.bot.sellConditions;
    },
  },
  watch: {
    overlay(val) {
      val &&
        setTimeout(() => {
          this.overlay = false;
        }, 3000);
    },
  },
  methods: {
    getIcon() {
      let icon = this.bot.ticker.split("USDT");
      return icon[0].toLowerCase();
    },
    toggleBuyCondition(e) {
      this.$store.dispatch("CREATE_BUYCONDITION", {
        id: this.bot.id,
        condition: e.signal,
      });
    },
    toggleSellCondition(e) {
      this.$store.dispatch("CREATE_SELLCONDITION", {
        id: this.bot.id,
        condition: e.signal,
      });
    },
    start() {
      this.$store.dispatch("START_BOT", this.bot.id);
    },
    stop() {
      this.$store.dispatch("STOP_BOT", this.bot.id);
    },
    deleteBot() {
      this.$store.dispatch("DELETE_BOT", { id: this.bot.id });
      this.overlay = !this.overlay;
    },
    getLogStyle(type) {
      if (type === "BUY") {
        return "background: green;";
      } else {
        return "background: red";
      }
    },
  },
};
</script>

<style></style>
