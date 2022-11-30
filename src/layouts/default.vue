<template>
  <div>
    <router-view v-slot="{ Component, route }">
      <transition name="fade" mode="out-in">
        <component :is="Component" :key="route" />
      </transition>
    </router-view>
  </div>
</template>