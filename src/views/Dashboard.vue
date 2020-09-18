<template>
  <div>
    <v-row>
      <v-col>
        <CreateForm></CreateForm>
      </v-col>
    </v-row>
    <v-row>
      <transition name="fade" mode="out-in">
      <v-col cols="12" v-for="bot in bots" :key="bot.id"
        ><Bot :bot="bot"></Bot></v-col
    ></transition></v-row>
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

<style>
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
