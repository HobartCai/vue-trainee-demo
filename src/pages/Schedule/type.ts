export enum DATE_UNIT_TYPE {
  SECOND = "second",
  MINUTE = "minute",
  HOUR = "hour",
  DAY = "day",
  WEEK = "week",
  MONTH = "month",
  YEAR = "year",
}

export interface Job {
  title: string;
  associates: string[];
  start: number;
  end: number;
  repeat: {
    times: number;
    gap: number;
    unit: DATE_UNIT_TYPE;
  };
  isPreset: boolean;
  preset?: PRESET_REPEAT_MODE;
}

export interface FormValues {
  title: string;
  range: [number, number];
  associates: string[];
  repeatMode: PRESET_REPEAT_MODE;
  repeatTimes: number;
  repeatGap: number;
  repeatUnit: DATE_UNIT_TYPE;
}

export enum PRESET_REPEAT_MODE {
  NON_REPEAT = "nonRepeat",
  PER_DAY = "perDay",
  PER_WEEK = "perWeek",
  CUSTOM = "CUSTOM",
}

export enum FORM_MODE {
  CREATE = "create",
  UPDATE = "update",
}
