<template>
  <div class="article-meta">
    <nuxt-link :to="{
      name: 'profile',
      params: {
        username: article.author.username
      }
    }">
      <img :src="article.author.image" />
    </nuxt-link>
    <div class="info">
      <nuxt-link class="author" :to="{
        name: 'profile',
        params: {
          username: article.author.username
        }
      }">
        {{ article.author.username }}
      </nuxt-link>
      <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
    </div>
      <!-- :class="{
        active: article.author.following
      }" -->
    <button
      class="btn btn-sm btn-outline-secondary"
      @click="editArticle"
    >
      <i class="ion-edit"></i>
      &nbsp;
      编辑文章
    </button>
    &nbsp;&nbsp;
      <!-- :class="{
        active: article.favorited
      }" -->
    <button
      class="btn btn-sm btn-outline-primary"
      @click="delArticle"
    >
      <i class="ion-trash-a"></i>
      &nbsp;
      删除文章
    </button>
  </div>
</template>

<script>
import { deleteArticles } from '@/api/article'
export default {
  name: 'ArticleMeta',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  methods: {
    editArticle(){
      this.$router.push({
        name: 'editor',
        params: {
          slug: this.article.slug
        }
      })
    },
    async delArticle(){
      const res = await deleteArticles(this.article.slug)
      console.log(res);
      this.$router.push('/')
    }
  }
}
</script>

<style>

</style>
