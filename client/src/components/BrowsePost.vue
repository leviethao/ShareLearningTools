<template>
<div id="browsePost">
  <div v-for="post in posts" :key="post._id">
    <div class="post-component">
      <post :post_data="post">
        <div v-show="!post.allow" class="floatBtnAdd noselect" @click="onBtnAddClicked(post)">+</div>
        <div v-show="post.allow" class="floatBtnSub noselect" @click="onBtnAddClicked(post)">-</div>
      </post>
    </div>
  </div>
</div>
</template>

<script>
import Post from './Post'
import PostService from '../services/PostService'

export default {
  components: {
    Post
  },
  data () {
    return {
      posts: []
    }
  },
  async mounted () {
    let postsRes = await PostService.getPosts()
    this.posts = postsRes.data.posts
  },
  methods: {
    async onBtnAddClicked (post) {
      let postRes = await PostService.allowPost(post._id)
      if (postRes.data.post) {
        post.allow = true
      }
    }
  }
}
</script>

<style>
#browsePost {
  width: 500px;
}
#browsePost .post-component {
  margin-bottom: 12px;
}
.floatBtnAdd {
  width: 50px;
  height: 50px;
  background-color: rgb(21, 214, 21);
  border-radius: 50%;
  font-size: 50px;
  font-weight: bold;

  text-align: center;
  vertical-align: middle;
  line-height: 50px;

  cursor:default;
  margin-left: 475px;
  color: white;
}
.floatBtnSub {
  width: 50px;
  height: 50px;
  background-color: rgb(214, 34, 21);
  border-radius: 50%;
  font-size: 50px;
  font-weight: bold;

  text-align: center;
  vertical-align: middle;
  line-height: 45px;

  cursor:default;
  margin-left: 475px;
  color: white;
}
.floatBtnAdd:hover {
  background-color: #00ff00dc;
}
.floatBtnAdd:active {
  background-color: #00ff0080;
}
.floatBtnSub:hover {
  background-color: rgb(255, 17, 0);
}
.floatBtnSub:active {
  background-color: rgba(255, 17, 0, 0.63);
}
.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
}
</style>
