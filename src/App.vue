<template>
  <div style="width: 700px; margin: auto; padding-top: 50px;">
    <router-view name="header"></router-view>
    <transition
        name="fade"
        mode="out-in"
        @before-enter="beforeEnter"
    >
      <router-view></router-view>
    </transition>
    <h3>掲示板に投稿する</h3>
    <label for="name">ニックネーム：</label>
    <input id="name" type="text" v-model="name">
    <br>
    <label for="comment">コメント：</label>
    <textarea id="comment" v-model="comment"></textarea>
    <br>
    <button @click="createComment">コメントをサーバーに送る</button>
    <h2>掲示板</h2>
    <div v-for="comment in comments" :key="comment.name">
      <div>名前：{{ comment.fields.name.stringValue }}</div>
      <div>コメント：{{ comment.fields.comment.stringValue }}</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      name: '',
      comment: '',
      comments: []
    }
  },
  created() {
    axios.get(
        'https://firestore.googleapis.com/v1/projects/vue-axios-test-cbbdf/databases/(default)/documents/comments',
    )
    .then(response => {
      console.log(response);
       this.comments = response.data.documents;
    })
    .catch(error => {
      console.log(error);
    });
  },
  methods: {
    beforeEnter() {
      this.$root.$emit("triggerScroll");
    },
    createComment() {
      axios.post(
          'https://firestore.googleapis.com/v1/projects/vue-axios-test-cbbdf/databases/(default)/documents/comments',
          {
            fields: {
              name: {
                stringValue: this.name
              },
              comment: {
                stringValue: this.comment
              },
            }
          }
      )
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
      this.name = '';
      this.comment = '';
    }
  }
};
</script>


<style scoped>
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
</style>

