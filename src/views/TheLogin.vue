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
export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    login() {

    },
  }
};
</script>
