# Vite TypeScript Axios封裝

## Axios封裝
- Axios實例封裝
```TypeScript
// src/utils/AxiosInstance.ts
import axios, { AxiosRequestConfig } from 'axios'

const defaultConfig = {
  timeOut: 50000,
  baseURL: 'http://110.42.184.111'
}

class Http {
  // 建構子 // 建構私有成員方法
  constructor() {
    this.httpInterceptorRequest()
    this.httpInterceptorResponse()
  }

  // 私有成員，不公開暴露
  // Axios實例
  private static axiosInstance = axios.create(defaultConfig)

  // 請求攔截
  private httpInterceptorRequest() {
    Http.axiosInstance.interceptors.request.use((config) => {
      return config
    }, err => {
      return Promise.reject(err)
    })
  }
  // 回應攔截
  private httpInterceptorResponse() {
    Http.axiosInstance.interceptors.response.use((res) => {
      return res
    }, err => {
      return Promise.reject(err)
    })
  }

  // 公有成員
  // 封裝請求 // 回傳資料為 Promise 使用泛型
  public httpRequestGet <T>(url : string, params : AxiosRequestConfig) : Promise<T> {
    return Http.axiosInstance.get(url, params).then((res) => res.data).catch()
  }

  public httpRequestPost <T>(url : string, params : AxiosRequestConfig) : Promise<T> {
    return Http.axiosInstance.post(url, params).then((res) => res.data).catch()
  }

}

// 暴露實例出去
export const http = new Http()
```
- api封裝
```TypeScript
// src/api/room.ts
// 取得 Axios 實例方法
import { http } from '../utils/AxiosInstance'

const api = {
  getRoomList: ({ ...data }) => http.httpRequestGet('/api/room/room/getRoomList', { params: { ...data } })
}

export default api

// src/api/index.ts
import room from "./room"

const api = {
  room
}

export default api
```

- Provide 到 Vue3 實例
```TypeScript
// src/main.ts
import { createApp } from 'vue'

const app = createApp(App)

// 將 api 封裝 provide 到 Vue3 實例
import api from './api/index'
app.provide('$api', api)

app
.use(router)
.mount('#app')
```

## 使用套件
- unplugin-auto-import(自動import)
```TypeScript
// vite.config.ts
import AutoImport from 'unplugin-auto-import/vite'

plugins: [
  vue(),
  AutoImport({
    imports: ['vue', 'vue-router'],
    dts: './auto.import.d.ts'
  })
]

// example
<script lang="ts" setup>
  // 不需 import { inject } from 'vue'
  const api = inject<any>('$api')

  const query = {
    pageNo: 1,
    pageSize: 3
  }

  function getRoomList (): void {
    api.room.getRoomList(query)
    .then((res: any) => console.log(res.result))
    .catch((err: any) => console.log(err))
  }

  getRoomList()
</script>
```

- unplugin-vue-components(自動引入元件)
```TypeScript
// example
// vite.config.ts
import Components from 'unplugin-vue-components/vite'

plugins: [
  vue(),
  Components(),
]
```

- vite-plugin-pages(路由套件)
- vite-plugin-vue-layouts(佈局套件)
```TypeScript
// example
// vite.config.ts
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'

plugins: [
  vue(),
  Pages(),
  Layouts({
    layoutsDirs: 'src/layout',
    defaultLayout: 'default'
  })
]
```