<template>
  <div>
    <h3>Home</h3>
    <button @click="toUsers">Usersのページへ</button>
  </div>
</template>

<script>
export default {
  name: 'TheHome',
  methods: {
    toUsers() {
      this.$router.push({ path: 'users/1'});
    }
  }
}
</script>

<style scoped>

</style>