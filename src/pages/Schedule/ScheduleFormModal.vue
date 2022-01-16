<template>
  <n-modal
    preset="card"
    v-model:show="model.state.formModal.visible"
    :style="{ width: '700px' }"
    :title="title"
    :mask-closable="false"
  >
    <c-form
      :items="formItems"
      :label-placement="'left'"
      :action-justify="'end'"
      v-model:form-value="formValues"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    />
  </n-modal>
</template>

<script setup lang="ts">
import CForm, { CFormItem } from "./components/c-form";
import { computed, toRef, watch } from "vue";
import { PRESET_REPEAT_MODE, DATE_UNIT_TYPE, FORM_MODE } from "./type";
import { NModal } from "naive-ui";
import { model } from "./model";
import { mapFrequency } from "./util";

const formValues = toRef(model.state.formModal, "values");
const emit = defineEmits(["confirm"]);

const title = computed(() => {
  return {
    [FORM_MODE.CREATE]: "新增",
    [FORM_MODE.UPDATE]: "编辑",
  }[model.state.formModal.mode];
});

/**
 * 表单事件响应
 */
const handleConfirm = () => {
  model.submitFormValues();
  model.setFormModalVisible(false);
};
const handleCancel = () => {
  model.setFormModalVisible(false);
};

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
    option: computed(() =>
      Array.from(model.getAssociates()).map((associate) => {
        return { label: associate, value: associate };
      })
    ),
  },
  {
    label: "重复",
    path: "repeatMode",
    type: "radio-group",
    option: [
      { label: "无", value: PRESET_REPEAT_MODE.NON_REPEAT },
      { label: "每天", value: PRESET_REPEAT_MODE.PER_DAY },
      { label: "每周", value: PRESET_REPEAT_MODE.PER_WEEK },
      { label: "自定义", value: PRESET_REPEAT_MODE.CUSTOM },
    ],
    span: 24,
  },
  {
    label: "重复次数",
    path: "repeatTimes",
    type: "input-number",
    span: 8,
    disabled: computed(
      () => formValues.value.repeatMode === PRESET_REPEAT_MODE.NON_REPEAT
    ),
  },
  {
    label: "重复间隔",
    path: "repeatGap",
    type: "input-number",
    span: 8,
    disabled: computed(() => formValues.value.repeatMode !== PRESET_REPEAT_MODE.CUSTOM),
  },
  {
    label: "间隔单位",
    path: "repeatUnit",
    type: "select",
    option: [
      { label: "天", value: DATE_UNIT_TYPE.DAY },
      { label: "周", value: DATE_UNIT_TYPE.WEEK },
    ],
    span: 8,
    disabled: computed(() => formValues.value.repeatMode !== PRESET_REPEAT_MODE.CUSTOM),
  },
];

/**
 * 额外监听处理事件
 */
watch(
  () => formValues.value.repeatMode,
  (mode) => {
    switch (mode) {
      case PRESET_REPEAT_MODE.NON_REPEAT:
        model.updateFormValuesByKey("repeatTimes", 0);
        model.updateFormValuesByKey("repeatGap", 0);
        model.updateFormValuesByKey("repeatUnit", DATE_UNIT_TYPE.DAY);
        break;
      case PRESET_REPEAT_MODE.PER_DAY:
        model.updateFormValuesByKey("repeatGap", 1);
        model.updateFormValuesByKey("repeatUnit", DATE_UNIT_TYPE.DAY);
        break;
      case PRESET_REPEAT_MODE.PER_WEEK:
        model.updateFormValuesByKey("repeatGap", 1);
        model.updateFormValuesByKey("repeatUnit", DATE_UNIT_TYPE.WEEK);
        break;
      default:
        break;
    }
  }
);
</script>

<style scoped></style>
