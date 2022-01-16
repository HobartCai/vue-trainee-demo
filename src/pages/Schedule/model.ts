import { reactive } from "vue";
import { DATE_UNIT_TYPE, FORM_MODE, PRESET_REPEAT_MODE, FormValues, Job } from "./type";
import dayjs from "dayjs";

const LOCAL_STORAGE_KEY = "SCHEDULE_JOBS";

export const model = {
  state: reactive({
    jobs: <Job[]>[],
    formModal: {
      visible: false,
      mode: FORM_MODE.CREATE,
      initIndex: NaN,
      values: {
        title: "",
        range: [dayjs().unix() * 1000, dayjs().unix() * 1000],
        associates: [],
        repeatMode: PRESET_REPEAT_MODE.NON_REPEAT,
        repeatTimes: 0,
        repeatGap: 0,
        repeatUnit: DATE_UNIT_TYPE.DAY,
      } as FormValues,
    },
  }),

  /**
   *  jobs 处理逻辑
   */

  setJobs(jobs: Job[]) {
    this.state.jobs = jobs;
    this.sort();
  },

  sort() {
    this.state.jobs.sort(function (job1, job2) {
      const unix1 = dayjs.unix(job1.start).unix();
      const unix2 = dayjs.unix(job2.start).unix();
      return unix1 - unix2;
    });
  },

  addJob(job: Job) {
    this.state.jobs = this.state.jobs.concat(job);
    this.sort();
    this.saveToLocalStorage();
  },

  removeJob(index: number) {
    this.state.jobs.splice(index, 1);
    this.saveToLocalStorage();
  },

  getAssociates() {
    const associates = new Set<string>();
    this.state.jobs.forEach((job) => {
      job.associates.forEach((associate) => {
        associates.add(associate);
      });
    });
    return associates;
  },

  /**
   * formValues 处理逻辑
   */

  setFormModalMode(mode: FORM_MODE, initIndex?: number) {
    this.state.formModal.mode = mode;
    switch (mode) {
      case FORM_MODE.UPDATE:
        if (initIndex !== undefined) {
          this.setFormModalInitIndex(initIndex);
          this.initFormValues();
        }
        break;
      case FORM_MODE.CREATE:
        this.resetFormValues();
        break;
      default:
        break;
    }
    this.setFormModalVisible(true);
  },

  setFormModalVisible(visible: boolean) {
    this.state.formModal.visible = visible;
  },

  setFormModalInitIndex(index: number) {
    this.state.formModal.initIndex = index;
  },

  updateFormValuesByKey(key: keyof FormValues, value: any) {
    // @ts-ignore
    this.state.formModal.values[key] = value;
  },

  initFormValues() {
    const values = this.state.jobs[this.state.formModal.initIndex];
    this.state.formModal.values.title = values.title;
    this.state.formModal.values.range = [values.start * 1000, values.end * 1000];
    this.state.formModal.values.associates = values.associates;
    this.state.formModal.values.repeatGap = values.repeat.gap;
    this.state.formModal.values.repeatTimes = values.repeat.times;
    this.state.formModal.values.repeatUnit = values.repeat.unit;
    if (values.isPreset && values.preset) {
      this.state.formModal.values.repeatMode = values.preset;
    }
  },

  resetFormValues() {
    this.state.formModal.values.title = "";
    this.state.formModal.values.range = [dayjs().unix() * 1000, dayjs().unix() * 1000];
    this.state.formModal.values.associates = [];
    this.state.formModal.values.repeatMode = PRESET_REPEAT_MODE.NON_REPEAT;
    this.state.formModal.values.repeatGap = 0;
    this.state.formModal.values.repeatTimes = 0;
    this.state.formModal.values.repeatUnit = DATE_UNIT_TYPE.DAY;
  },

  submitFormValues() {
    if (this.state.formModal.mode === FORM_MODE.UPDATE) {
      this.removeJob(this.state.formModal.initIndex);
    }
    const values = this.state.formModal.values;
    const isPreset = values.repeatMode !== PRESET_REPEAT_MODE.CUSTOM;
    const job: Job = {
      title: values.title,
      associates: values.associates,
      start: values.range[0] / 1000,
      end: values.range[1] / 1000,
      repeat: {
        times: values.repeatTimes,
        gap: values.repeatGap,
        unit: values.repeatUnit,
      },
      isPreset: isPreset,
    };
    if (isPreset) {
      job.preset = values.repeatMode;
    }
    this.addJob(job);
  },

  /**
   * 数据持久化
   */
  saveToLocalStorage() {
    try {
      window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.state.jobs));
    } catch (error) {
      alert(error);
    }
  },

  loadFromLocalStorage() {
    try {
      const jobs = window.localStorage.getItem(LOCAL_STORAGE_KEY);
      if (jobs) {
        this.state.jobs = JSON.parse(jobs);
      }
    } catch (error) {
      alert(error);
    }
  },
};
