import Vue from 'vue'
import Router from 'vue-router'

/****************/
//region  //import components
import Main from '@/components/main'


//endregion

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main
    }
  ]
})
