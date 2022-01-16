<template>
  <c-form
    :items="formItems"
    :label-placement="'left'"
    :action-justify="'end'"
    v-model:form-value="formValues"
    @confirm="handleConfirm"
    @cancel="handleCancel"
  />
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import CForm, { CFormItem } from ".";
import { computed, reactive, watch, ref } from "vue";

/**
 * 表单索引数据
 */
const formValues = reactive({
  title: "",
  range: [dayjs().unix() * 1000, dayjs().unix() * 1000],
  associates: [],
  repeatMode: "NON_REPEAT",
  repeatTimes: 0,
  repeatGap: 0,
  repeatUnit: "DAY",
}) as { [path: string]: any };

/**
 * 表单事件响应
 */
const handleConfirm = () => {};
const handleCancel = () => {};

/**
 * 表单渲染数据
 */
const formItems: CFormItem[] = [
  {
    label: "课程",
    path: "title",
    type: "input",
    span: 8,
  },
  {
    label: "时间",
    path: "range",
    type: "date-time-range",
    span: 16,
  },
  {
    label: "学生",
    path: "associates",
    type: "select-multiple",
    span: 24,
  },
  {
    label: "重复",
    path: "repeatMode",
    type: "radio-group",
    option: [
      { label: "无", value: "NON_REPEAT" },
      { label: "每天", value: "PER_DAY" },
      { label: "每周", value: "PER_WEEK" },
      { label: "自定义", value: "CUSTOM" },
    ],
    span: 24,
  },
  {
    label: "重复次数",
    path: "repeatTimes",
    type: "input-number",
    span: 8,
    disabled: computed(() => formValues.repeatMode !== "NON_REPEAT"),
  },
  {
    label: "重复间隔",
    path: "repeatGap",
    type: "input-number",
    span: 8,
    disabled: computed(() => formValues.repeatMode !== "CUSTOM"),
  },
  {
    label: "间隔单位",
    path: "repeatUnit",
    type: "select",
    option: [
      { label: "天", value: "DAY" },
      { label: "周", value: "WEEK" },
    ],
    span: 8,
    disabled: computed(() => formValues.repeatMode !== "CUSTOM"),
  },
];

/**
 * 额外监听事件
 */
watch(
  () => formValues.repeatMode,
  (mode) => {
    switch (mode) {
      case "PER_DAY":
        formValues.repeatGap = 1;
        formValues.repeatUnit = "DAY";
        break;
      case "PER_WEEK":
        formValues.repeatGap = 1;
        formValues.repeatUnit = "WEEK";
        break;
      default:
        break;
    }
  }
);
</script>

<style scoped></style>
