<template>
  <nav>
    <h2>Home</h2>
    <router-link
        to="/"
        active-class="link--active"
        exact
        class="link"
    >Home</router-link>
    <router-link
        :to="{ name: 'users-id-profile', params: { id: 1 }, query: { lang: 'ja', page: 2 }, hash: '#next-user' }"
        active-class="link--active"
        exact
        class="link"
    >Users</router-link>
  </nav>
</template>

<style scoped>
.link {
  margin-right: 10px;
}
.link--active {
  font-size: 20px;
}
</style>