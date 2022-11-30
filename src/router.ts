import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
import { cancelToken } from './utils/cancelToken'

const routes = setupLayouts(generatedRoutes)

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from) => {
  if (to.path === from.path) return

  cancelToken.cancelAllPending()

  // const useStore = containStore()
  // useStore.changeLoading(true)

  // to.matched.forEach((item) => {
  //   if (needTokenList.includes(item.path)) {
  //     if (!token) {
  //       router.push('/')
  //       useStore.changeLoading(false)
  //     }
  //   }
  // })

  // 判斷特定頁面給予不同 transition 效果
  // needFadeList.includes(to.path) ? to.meta.transitionName = 'scale' : to.meta.transitionName = 'slide'
})

export default router
