<template>
  <div>
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
        '/comments',
    )
        .then(response => {
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
          '/comments',
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
