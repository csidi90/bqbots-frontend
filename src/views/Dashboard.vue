<template>
  <div>
    <v-row>
      <v-col>
        <CreateForm></CreateForm>
      </v-col>
    </v-row>
    
    <v-row>
      
      <v-col cols="12" v-for="bot in bots" :key="bot.id"
        ><Bot :bot="bot"></Bot></v-col
    ></v-row>
  </div>
</template>

<script>
import Bot from "../components/Bot";
import CreateForm from "../components/CreateForm";
export default {
  name: "Dashboard",
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

