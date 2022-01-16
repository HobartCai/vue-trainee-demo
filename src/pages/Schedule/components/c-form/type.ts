import { Ref } from "vue";

export type CFormItemType =
  | "input"
  | "input-number"
  | "select"
  | "select-multiple"
  | "radio-group"
  | "date-picker"
  | "date-time-range";

export interface CFormBaseConfig {
  disabled?: boolean | Ref<boolean>;
  /**
   * 标签位置
   */
  labelPlacement?: "left" | "top" | Ref<"left" | "top">;
  /**
   * 标签宽度
   */
  labelWidth?: number | Ref<number>;
}

export interface CFormItem extends CFormBaseConfig {
  label: string;
  path: string;
  type: CFormItemType;
  size?: "small" | "medium" | "large";
  placeholder?: string;
  /**
   * 基于 24 的栅格数量
   */
  span?: number;
  /**
   * 基于 24 的栅格数量
   */
  offset?: number;
  option?: { label: string; value: any }[] | Ref<{ label: string; value: any }[]>;
}
