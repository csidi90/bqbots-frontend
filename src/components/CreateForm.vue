<template>
  <v-form>
    <v-icon>fas fa-robot</v-icon>

    <v-row>
      <v-col cols="12" sm="6" md="2">
        <v-autocomplete v-model="ticker" :items="tickers" label="TICKER">
        </v-autocomplete>
      </v-col>
      <v-col cols="12" sm="6" md="2">
        <v-autocomplete
          v-model="interval"
          label="INTERVAL"
          :items="intervals"
        ></v-autocomplete>
      </v-col>
      <v-col cols="12" sm="6" md="2">
        <v-btn tile @click="create()" class="mt-4" color="success"
          ><v-icon left>fas fa-plus</v-icon>create
        </v-btn></v-col
      ></v-row
    >
    <v-overlay :value="overlay">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular> </v-overlay
  ></v-form>
</template>

<script>
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
export default {
  name: "CreateForm",
  data: () => {
    return {
      ticker: "",
      interval: "",
      intervals: ["5m", "15m", "30m", "1h"],
      tickers: [],
      overlay: false,
    };
  },
  methods: {
    create() {
      this.$store.dispatch("CREATE_BOT", {
        id: uuidv4(),
        ticker: this.ticker,
        interval: this.interval,
      });
      this.overlay = !this.overlay;
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
  created() {
    console.log("created");
    axios
      .get(this.$store.state.base_url + "tickers")
      .then((response) => {
        Object.keys(response.data).forEach((key) => {
          this.tickers.push(response.data[key].symbol);
        });
      })
      .catch((err) => console.log(err));
  },
};
</script>

<style></style>
