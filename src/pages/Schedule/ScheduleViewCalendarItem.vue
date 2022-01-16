<template>
  <n-popover trigger="hover">
    <template #trigger>
      <div class="calendar-item">
        <div class="calendar-item-point" :style="props.style"></div>
        <div>
          <span class="calendar-item-text">{{ props.title }}</span>
        </div>
      </div>
    </template>
    <span v-for="text in props.popText" :key="text" class="calendar-item-pop-text">
      {{ text }}
    </span>
  </n-popover>
</template>

<script setup lang="ts">
import { CSSProperties } from "vue";
import { NPopover } from "naive-ui";
import { Dayjs } from "dayjs";

interface ScheduleCalendarItemProps {
  start: Dayjs;
  end: Dayjs;
  title: string;
  style: CSSProperties;
  popText: string[];
}
const props = defineProps<ScheduleCalendarItemProps>();
</script>

<style scoped>
.calendar-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: nowrap;
}
.calendar-item-point {
  width: 10px;
  height: 10px;
  border-radius: 15px;
  margin-right: 2px;
}
.calendar-item-text {
  font-size: 10px;
  width: 120px;
  margin-top: 2px;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.calendar-item-pop-text {
  display: block;
  font-size: 14px;
  line-height: 2rem;
  padding: 0 10px;
}
</style>
