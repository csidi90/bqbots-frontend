<template>
  <div>
    <v-row>
      <v-col>
        <TradingVue
          ref="tradingVue"
          :data="candleData"
          :color-back="colors.colorBack"
          :color-grid="colors.colorGrid"
          :color-text="colors.colorText"
          :titleTxt="title"
          :width="this.width"
          :height="this.height"
        ></TradingVue>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import TradingVue from "trading-vue-js";
export default {
  name: "Chart",
  components: { TradingVue },
  props: ["title", "ohlcv", "interval"],
  data() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      colors: {
        colorBack: "#000000",
        colorGrid: "#000000",
        colorText: "#333",
      },
    };
  },
  methods: {
    onResize(event) {
      console.log(event);
      this.width = window.innerWidth;
      this.height = window.innerHeight;
    },
  },
  mounted() {
    window.addEventListener("resize", this.onResize);
    this.onResize();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  computed: {
    candleData: function() {
      let candles = [];

      for (let c of this.ohlcv) {
        candles.push([c.openTime, c.open, c.high, c.low, c.close, c.volume]);
      }

      return {
        chart: {
          data: candles,
        },
      };
    },
  },
};
</script>

<style></style>
