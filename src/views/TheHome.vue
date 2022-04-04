<template>
  <div>
    <h3>Home</h3>
    <button @click="toUsers">Usersのページに行く</button>
    <p>{{ doubleCount }}</p>
    <p>{{ tripleCount }}</p>
    <input type="text" v-model="messages">
    <p>{{ messages }}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters("count", ["doubleCount", "tripleCount"]),
    messages: {
      get() {
        return this.$store.getters["message/message"];
      },
      set(value) {
        this.$store.dispatch('message/updateMessage', value)
      }
    }
  },
  methods: {
    toUsers() {
      this.$router.push({
        name: "users-id-profile",
        params: { id: 1 }
      });
    }
  }
};
</script>
