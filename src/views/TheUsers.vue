<template>
  <div>
    <h3>Users</h3>
    <router-link to="/users/1">ユーザー1</router-link>
    <router-link to="/users/2">ユーザー2</router-link>
    <hr>
    <h1>User No. {{ id }}</h1>
    <router-link :to="{ name: 'users-id-profile', params: {id: Number(id) + 1} }">次のユーザー</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'TheUsers',
  props: [
      'id'
  ],
}
</script>

<style scoped>

</style>