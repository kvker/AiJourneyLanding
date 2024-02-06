<script lang="ts" setup>
import { defineAsyncComponent, ref, computed } from 'vue'
import lc from '@/libs/lc'
// console.log(import.meta.env.BASE_URL)
async function initPrepare() {

}

initPrepare()
</script>

<template>
  <div>Landing</div>
</template>

<style>
/* 表格的底部横线处理掉 */
.el-table__inner-wrapper::before {
  display: none;
}
</style>