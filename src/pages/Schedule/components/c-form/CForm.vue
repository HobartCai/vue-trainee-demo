<template>
  <n-form
    ref="formRef"
    :label-placement="
      props.labelPlacement
        ? unref(props.labelPlacement)
        : constant.DEFAULT_LABEL_PLACEMENT
    "
  >
    <n-grid :x-gap="12">
      <n-form-item-gi
        v-for="(item, index) in props.items"
        :key="index"
        :label="item.label"
        :span="item.span ? item.span : constant.DEFAULT_ITEM_SPAN"
        :offset="item.offset ? item.offset : constant.DEFAULT_ITEM_OFFSET"
        :size="item.size ? item.size : constant.DEFAULT_COMPONENT_SIZE"
      >
        <component
          :is="components[item.type](item)"
          :value="props.formValue[item.path]"
          :default-value="props.formValue[item.path]"
          :disabled="unref(item.disabled)"
        />
      </n-form-item-gi>
      <n-grid-item :span="24">
        <n-space
          :justify="
            props.actionJustify ? props.actionJustify : constant.DEFAULT_ACTION_JUSTIFY
          "
        >
          <n-button @click="emit('cancel')">取消</n-button>
          <n-button type="info" @click="emit('confirm')">确认</n-button>
        </n-space>
      </n-grid-item>
    </n-grid>
  </n-form>
</template>

<script setup lang="ts">
import * as constant from "./constant";
import type { CFormItem, CFormBaseConfig } from "./type";
import {
  NInput,
  NForm,
  NSelect,
  NSpace,
  NDatePicker,
  NGrid,
  NFormItemGi,
  NRadioGroup,
  NRadio,
  NInputNumber,
  NGridItem,
  NButton,
} from "naive-ui";
import { ref, h, unref } from "vue";

interface CFormProps extends CFormBaseConfig {
  items: CFormItem[];
  formValue: any;
  confirmText?: string;
  cancelText?: string;
  actionJustify?: "start" | "end" | "center" | "space-around" | "space-between";
}
const props = defineProps<CFormProps>();
const emit = defineEmits(["confirm", "cancel", "valueChange", "update:formValue"]);
const formRef = ref(null);

function bindValueUpdate(path: string, action?: () => void) {
  return (value: any) => {
    props.formValue[path] = value;
    if (action) {
      action();
    }
  };
}

const components = {
  input: (item: CFormItem) => {
    return h(NInput, {
      onUpdateValue: bindValueUpdate(item.path),
    });
  },
  "input-number": (item: CFormItem) => {
    return h(NInputNumber, {
      onUpdateValue: bindValueUpdate(item.path),
    });
  },
  select: (item: CFormItem) => {
    return h(NSelect, {
      options: unref(item.option),
      onUpdateValue: bindValueUpdate(item.path),
    });
  },
  "select-multiple": (item: CFormItem) => {
    return h(NSelect, {
      multiple: true,
      tag: true,
      filterable: true,
      onUpdateValue: bindValueUpdate(item.path),
      options: unref(item.option),
    });
  },
  "radio-group": (item: CFormItem) => {
    return h(
      NRadioGroup,
      {
        onUpdateValue: bindValueUpdate(item.path),
      },
      () => {
        return unref(item.option)?.map(({ label, value }) => {
          return h(NRadio, { key: value, value: value }, () => label);
        });
      }
    );
  },
  "date-picker": (item: CFormItem) => {
    return h(NDatePicker, {
      onUpdateValue: bindValueUpdate(item.path),
    });
  },
  "date-time-range": (item: CFormItem) => {
    return h(NDatePicker, {
      type: "datetimerange",
      onUpdateValue: bindValueUpdate(item.path),
    });
  },
};
</script>

<style scoped></style>
