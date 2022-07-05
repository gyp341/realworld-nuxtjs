<template>
  <div class="profile-page">

    <div class="user-info">
      <div class="container">
        <div class="row">

          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="user.images" class="user-img" />
            <h4>{{user.username}}</h4>
            <p>
              {{user.bio}}
            </p>
            <button class="btn btn-sm btn-outline-secondary action-btn" @click="gotoSettings">
              <i class="ion-gear-a"></i>
              &nbsp;
              修改个人资料
            </button>
          </div>

        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">

        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: tab === 'my_articles'
                  }"
                  exact
                  :to="{
                    name: 'profile',
                    query: {
                      tab: 'my_articles'
                    }
                  }"
                >我的文章</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: tab === 'my_favorited'
                  }"
                  exact
                  :to="{
                    name: 'profile',
                    query: {
                      tab: 'my_favorited'
                    }
                  }"
                >我的点赞</nuxt-link>
              </li>
            </ul>
          </div>

          <!-- <div class="article-preview">
            <div class="article-meta">
              <a href=""><img src="http://i.imgur.com/Qr71crq.jpg" /></a>
              <div class="info">
                <a href="" class="author">Eric Simons</a>
                <span class="date">January 20th</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right">
                <i class="ion-heart"></i> 29
              </button>
            </div>
            <a href="" class="preview-link">
              <h1>How to build webapps that scale</h1>
              <p>This is the description for the post.</p>
              <span>Read more...</span>
            </a>
          </div> -->

        <div
            class="article-preview"
            v-for="article in articles"
            :key="article.slug"
          >
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
              <button
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{
                  active: article.favorited
                }"
                @click="onFavorite(article)"
                :disabled="article.favoriteDisabled"
              >
                <i class="ion-heart"></i> {{ article.favoritesCount }}
              </button>
            </div>
            <nuxt-link
              class="preview-link"
              :to="{
                name: 'article',
                params: {
                  slug: article.slug
                }
              }"
            >
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>

           <!-- 分页列表 -->
          <nav>
            <ul class="pagination">
              <li
                class="page-item"
                :class="{
                  active: item === page
                }"
                v-for="item in totalPage"
                :key="item"
              >
                <nuxt-link
                  class="page-link"
                  :to="{
                    name: 'home',
                    query: {
                      page: item,
                      tag: $route.query.tag,
                      tab: tab
                    }
                  }"
                >{{ item }}</nuxt-link>
              </li>
            </ul>
          </nav>


        </div>

      </div>
    </div>

  </div>
</template>

<script>
import {
  getArticles,
} from '@/api/article'
import { mapState } from 'vuex'
export default {
  middleware: 'authenticated',
  name: 'UserProfile',
  // 返回的就是data函数
  async asyncData (ctx) {
    console.log(ctx);
    const { query, store } = ctx
    const page = Number.parseInt(query.page|| 1)
    const limit = 20
    const tab = query.tab || 'my_articles'
    const tag = query.tag

    const baseForm = {
      limit,
      offset: (page - 1) * limit,
      tag,
    }

    const form = tab === 'my_articles'
      ? {
        ...baseForm,
        author: store.state.user.username
      }
      : {
        ...baseForm,
        favorited: store.state.user.username
      }

    const [ articleRes ] = await Promise.all([
      getArticles(form),
    ])

    console.log(articleRes);

    const { articles, articlesCount } = articleRes.data

    articles.forEach(article => article.favoriteDisabled = false)

    return {
      articles, // 文章列表
      articlesCount, // 文章总数
      limit, // 每页大小
      page, // 页码
      tab, // 选项卡
    }
  },
  watchQuery: ['page', 'tab'],
  computed: {
    ...mapState(['user']),
    totalPage () {
      return Math.ceil(this.articlesCount / this.limit)
    }
  },
  methods: {
    gotoSettings(){
      this.$router.push('/settings')
    }
  }
}
</script>

<style>

</style>
