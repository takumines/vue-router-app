<template>
  <div>
    <h2>登録</h2>
    <label for="email">Email：</label>
    <input id="email" type="email" v-model="email">
    <br>
    <label for="password">Password：</label>
    <input id="password" type="password" v-model="password">
    <br>
    <button @click="register">登録</button>
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
    register() {
      axios.post(
          '/accounts:signUp?key=' + process.env.VUE_APP_FIREBASE_API_KEY,
          {
            email: this.email,
            password: this.password,
            returnSecureToken: true,
          }
      ).then(response => {
        console.log(response);
      })
    },
  }
};
</script>
