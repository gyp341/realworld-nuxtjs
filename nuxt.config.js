/**
 * Nuxt.js 配置文件
 */

module.exports = {
  router: {
    // 高亮路由对应的tab
    linkActiveClass: 'active',
    // 自定义路由表规则
    extendRoutes (routes, resolve) {
      // 清除 Nuxt.js 基于 pages 目录默认生成的路由表规则
      routes.splice(0)

      routes.push(...[
        {
          path: '/',
          component: resolve(__dirname, 'pages/layout/'),
          children: [
            {
              path: '', // 默认子路由
              name: 'home',
              component: resolve(__dirname, 'pages/home/')
            },
            {
              path: '/login',
              name: 'login',
              component: resolve(__dirname, 'pages/login/')
            },
            {
              path: '/register',
              name: 'register',
              component: resolve(__dirname, 'pages/login/')
            },
            {
              path: '/profile/:username',
              name: 'profile',
              component: resolve(__dirname, 'pages/profile/')
            },
            {
              path: '/settings',
              name: 'settings',
              component: resolve(__dirname, 'pages/settings/')
            },
            {
              path: '/editor',
              name: 'editor',
              component: resolve(__dirname, 'pages/editor/')
            },
            {
              path: '/article/:slug',   // /:slug表示文章链接名称，相当于/:id
              name: 'article',
              component: resolve(__dirname, 'pages/article/')
            }
          ]
        }
      ])
    }
  },

  server: {
    host: '0.0.0.0',  // 默认值localhost只能用于本机访问，如要部署到生产环境，localhost没办法对外提供访问，因此要设置为0.0.0.0，就能监听所有网卡地址，那么生产环境可通过外网地址也能访问成功。开发环境可在局域网中访问成功。
    port: 3000  // 如果要部署到服务端。那么运行所占用的端口号就在这里配置
  },

  // 注册插件
  plugins: [
    '~/plugins/request.js',
    '~/plugins/dayjs.js'
  ]
}
