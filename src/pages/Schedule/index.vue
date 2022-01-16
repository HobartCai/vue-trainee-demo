<template>
  <div class="root">
    <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
      <n-grid :y-gap="24" :cols="1">
        <n-grid-item>
          <schedule-view />
        </n-grid-item>
      </n-grid>
      <schedule-form-modal />
    </n-config-provider>
  </div>
</template>

<script setup lang="ts">
import ScheduleView from "./ScheduleView.vue";
import ScheduleFormModal from "./ScheduleFormModal.vue";
import { NGrid, NGridItem, NConfigProvider, zhCN, dateZhCN } from "naive-ui";
import { onMounted } from "vue";
import { model } from "./model";
onMounted(() => {
  model.loadFromLocalStorage();
});
</script>
<style scoped>
.root {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding: 20px;
}
</style>
