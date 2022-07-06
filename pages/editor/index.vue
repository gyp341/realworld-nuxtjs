<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-10 offset-md-1 col-xs-12">
          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                  <input type="text" v-model="article.title" class="form-control form-control-lg" placeholder="文章标题">
              </fieldset>
              <fieldset class="form-group">
                  <input type="text" v-model="article.description" class="form-control" placeholder="文章关于什么">
              </fieldset>
              <fieldset class="form-group">
                  <textarea class="form-control" v-model="article.body" rows="8" placeholder="请填写文章主题（markdown格式）"></textarea>
              </fieldset>
              <fieldset class="form-group">
                  <input type="text" v-model="article.tagList" class="form-control" placeholder="输入标签，用“,”分隔">
                  <!-- <div class="tag-list" v-for="item in article.tagList" :key="item">
                    <span class="tag-default tag-pill ng-binding ng-scope">
                      <i class="ion-close-round"></i>
                      {{item}}
                    </span>
                  </div> -->
              </fieldset>
              <button class="btn btn-lg pull-xs-right btn-primary" type="submit">
                  {{is_new_post ? '发布' : '修改'}}文章
              </button>
            </fieldset>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { postArticles, getArticle, updateArticles } from '@/api/article'
export default {
  // 在路由匹配组件渲染之前会先执行中间件处理
  middleware: 'authenticated',
  name: 'EditorIndex',
  async asyncData ({ params }) {
    console.log(params);
    if(!params.slug){
      return {
        article: {
          title: '',
          description: '',
          body: '',
          tagList: ''
        },
      }
    }
    // if(!params) return;
    const { data } = await getArticle(params.slug)
    const { article } = data
    console.log(article, this);
    // this.article = article;
    return {
      article,
      is_new_post: params.slug ? false : true
    }
  },
  methods: {
    async onSubmit(){
      const url = this.is_new_post 
      ? postArticles
      : updateArticles

      const form = this.is_new_post 
      ? {
        article: {
          ...this.article,
          tagList: typeof this.article.tagList === 'string' ? this.article.tagList.split(',') : this.article.tagList
        }
      }
      : {
        article: {
          ...this.article
        }
      }

      const data = await url(form)
      
      if(data){
        this.$router.push('/')
      }
    }
  }
}
</script>

<style>

</style>
