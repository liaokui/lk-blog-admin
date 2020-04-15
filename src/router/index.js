import Vue from 'vue'
import Router from 'vue-router'

const Login = () => import('../views/login/login.vue')
const Manage = () => import('../views/manage/manage.vue')
const Error = () => import('../views/error/error.vue')

const Home = () => import('../views/home/home.vue')
const Tag = () => import('../views/tag/tag.vue')
const Article = () => import('../views/article/article.vue')
const ArticleEdit = () => import('../views/article/edit.vue')
const Project = () => import('../views/project/project.vue')
const ProjectEdit = () => import('../views/project/edit.vue')
const Message = () => import('../views/message/message.vue')



Vue.use(Router)
export default new Router({
  // mode: 'history',
  base: '/admin/',
  routes: [
    {
      path: '/', 
      redirect: '/login'
    },
    {
      path: '/manage',
      name: 'manage',
      component: Manage,
      redirect: '/manage/article',
      children: [
        {
          path: 'home',
          name: 'home',
          component: Home,
          meta: {
            belong: 'home',
            navigation: []
          },
        },
        {
          path: 'tag',
          name: 'tag',
          component: Tag,
          meta: {
            belong: 'tag',
            navigation: [
              {
                label: '标签',
                link: '/manage/tag'
              }
            ]
          },
        },
        {
          path: 'article',
          name: 'article',
          component: Article,
          meta: {
            belong: 'article',
            navigation: [
              {
                label: '文章',
                link: '/manage/article'
              }
            ]
          },
        },
        {
          path: 'article/edit',
          name: 'articleEdit',
          component: ArticleEdit,
          meta: {
            belong: 'article',
            navigation: [
              {
                label: '文章',
                link: '/manage/article'
              },
              {
                label: '添加',
                link: '/manage/article/edit'
              }
            ]
          },
        },
        {
          path: 'project',
          name: 'project',
          component: Project,
          meta: {
            belong: 'project',
            navigation: [
              {
                label: '项目',
                link: '/manage/project'
              }
            ]
          },
        },
        {
          path: 'project/edit',
          name: 'projectEdit',
          component: ProjectEdit,
          meta: {
            belong: 'project',
            navigation: [
              {
                label: '项目',
                link: '/manage/project'
              },
              {
                label: '添加',
                link: '/manage/project/edit'
              }
            ]
          },
        },
        {
          path: 'message',
          name: 'message',
          component: Message,
           meta: {
            belong: 'message',
             navigation: [
               {
                label: '留言',
                link: '/manage/message'
               }
             ]
          },
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '**',
      name: 'error',
      component: Error,
    }
  ]
})

