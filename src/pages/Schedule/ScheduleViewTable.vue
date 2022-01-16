<template>
  <n-data-table :columns="tableProps.columns" :data="tableProps.data" />
</template>

<script setup lang="ts">
import { FORM_MODE, Job } from "./type";
import { computed, h } from "vue";
import { NDataTable, NSpace, NIcon, NPopconfirm } from "naive-ui";
import { Edit, Delete } from "@vicons/carbon";
import { model } from "./model";
import dayjs from "dayjs";
import { mapFrequency } from "./util";

/**
 * table view model
 */
const tableProps = computed(() => tableController(model.state.jobs));
function tableController(jobs: Job[]) {
  const columns = [
    { title: "课程", key: "title" },
    { title: "日期", key: "date" },
    { title: "时间段", key: "range" },
    { title: "学生", key: "students" },
    { title: "频次", key: "frequency" },
    { title: "结束日期", key: "done" },
    { title: "操作", key: "handle" },
  ];
  const data = jobs.map((job, index) => {
    const {
      title,
      start,
      end,
      associates,
      repeat: { times, gap, unit },
    } = job;
    return {
      title,
      date: dayjs.unix(start).format("YYYY-MM-DD"),
      range: `${dayjs.unix(start).format("HH:mm")} ~ ${dayjs.unix(end).format("HH:mm")}`,
      students: associates.join(", "),
      frequency: mapFrequency(gap, unit),
      done: dayjs
        .unix(start)
        .add((times - 1) * gap, unit)
        .format("YYYY-MM-DD"),
      handle: h(NSpace, { style: "padding-top:8px" }, () => {
        return [
          h(
            NIcon,
            {
              size: 15,
              onClick: () => {
                model.setFormModalMode(FORM_MODE.UPDATE, index);
              },
            },
            () => [h(Edit)]
          ),
          h(
            NPopconfirm,
            {
              onPositiveClick: () => {
                model.removeJob(index);
              },
            },
            {
              trigger: () =>
                h(
                  NIcon,
                  {
                    size: 15,
                  },
                  () => [h(Delete)]
                ),
              default: () => "删除后不可恢复，确认是否删除?",
            }
          ),
          // h(
          //   NIcon,
          //   {
          //     size: 15,
          //     onClick: () => {
          //       model.removeJob(index);
          //     },
          //   },
          //   () => [h(Delete)]
          // ),
        ];
      }),
    };
  });
  return {
    columns,
    data,
  };
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
