<template>
  <div>
    <v-row>
      <v-col>
        <CreateForm></CreateForm>
      </v-col>
    </v-row>

    <v-row
      ><v-col>
        <v-tabs v-model="tab" color="primary" dark slider-color="primary">
          <v-tab v-for="bot in bots" :key="bot.id"
            >{{ bot.ticker }} {{ bot.interval }}
            <v-icon v-if="bot.running" color="success" right>mdi-circle</v-icon>
            <v-icon v-else color="error" right>mdi-circle</v-icon>
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item v-for="bot in bots" :key="bot.id">
            <Bot :bot="bot"></Bot>
          </v-tab-item>
        </v-tabs-items> </v-col
    ></v-row>
  </div>
</template>

<script>
import Bot from "../components/Bot";
import CreateForm from "../components/CreateForm";
export default {
  name: "Dashboard",
  data: () => {
    return {
      tab: null,
    };
  },
  components: {
    Bot,
    CreateForm,
  },
  computed: {
    bots: function() {
      return this.$store.state.bots;
    },
  },
};
</script>
