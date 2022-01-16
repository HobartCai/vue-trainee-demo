<template>
  <n-card>
    <template #header>课程表</template>
    <template #header-extra>
      <n-button type="info" @click="toCreateJob">新增</n-button>
    </template>
    <n-tabs type="line">
      <n-tab-pane name="表">
        <schedule-view-table />
      </n-tab-pane>
      <n-tab-pane name="日历">
        <schedule-calendar-view />
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>

<script setup lang="ts">
import { NCard, NTabs, NTabPane, NButton } from "naive-ui";
import ScheduleCalendarView from "./ScheduleViewCalendar.vue";
import ScheduleViewTable from "./ScheduleViewTable.vue";
import { model } from "./model";
import { FORM_MODE } from "./type";

function toCreateJob() {
  model.setFormModalMode(FORM_MODE.CREATE);
}
</script>

<style scoped>
.view-card {
  padding: 20px;
}
.table-icon {
  height: 1.3em;
  padding-top: 0.5em;
}
</style>
