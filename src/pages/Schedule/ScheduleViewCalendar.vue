<template>
  <n-calendar #="{ year, month, date }" :style="{ height: CALENDAR_HEIGHT }">
    <schedule-view-calendar-item
      v-for="(active, index) in calendarSlot(year, month, date)"
      :key="index"
      :title="active.title"
      :start="active.start"
      :end="active.end"
      :style="active.style"
      :pop-text="active.popText"
    >
    </schedule-view-calendar-item>
  </n-calendar>
</template>

<script setup lang="ts">
import { DATE_UNIT_TYPE } from "./type";
import { CSSProperties } from "vue";
import { NCalendar } from "naive-ui";
import dayjs, { Dayjs } from "dayjs";
import { COLORS, isDayIncluded } from "./util";
import ScheduleViewCalendarItem from "./ScheduleViewCalendarItem.vue";
import { model } from "./model";
const CALENDAR_HEIGHT = "680px";
function calendarSlot(year: number, month: number, date: number) {
  const current = dayjs(`${year}-${month}-${date}`);
  const actives: {
    title: string;
    style: CSSProperties;
    popText: string[];
    start: Dayjs;
    end: Dayjs;
  }[] = [];
  model.state.jobs.forEach((job, index) => {
    const currentTime = isDayIncluded(current, job, DATE_UNIT_TYPE.DAY);
    if (currentTime) {
      actives.push({
        title: job.title,
        start: currentTime.start,
        end: currentTime.end,
        style: {
          backgroundColor: COLORS[index],
        },
        popText: [
          job.title,
          `${currentTime.start.format("HH:mm")} ~ ${currentTime.end.format("HH:mm")}`,
          job.associates.join(", "),
        ],
      });
    }
  });
  return actives;
}
</script>

<style scoped>
.calendar-slot {
  width: 10px;
  height: 10px;
  display: block;
  margin-bottom: 3px;
  border-radius: 15px;
  font-size: 10px;
}
</style>
