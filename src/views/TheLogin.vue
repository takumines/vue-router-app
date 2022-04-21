<template>
  <div>
    <h2>ログイン</h2>
    <label for="email">Email：</label>
    <input id="email" type="email" v-model="email">
    <br>
    <label for="password">Password：</label>
    <input id="password" type="password" v-model="password">
    <br>
    <button @click="login">ログイン</button>
  </div>
</template>

<script>
import axios from "../axios-auth";
export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    login() {
      axios.post(
          '/accounts:signInWithPassword?key=' + process.env.VUE_APP_FIREBASE_API_KEY,
          {
            email: this.email,
            password: this.password,
            returnSecureToken: true,
          }
      ).then(response => {
        console.log(response);
      });
      this.email = '';
      this.password = '';
    },
  }
};
</script>
