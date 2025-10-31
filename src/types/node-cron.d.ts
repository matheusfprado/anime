declare module "node-cron" {
  type CronExpression = string;

  interface ScheduleOptions {
    scheduled?: boolean;
    timezone?: string;
    recoverMissedExecutions?: boolean;
  }

  interface ScheduledTask {
    start: (immediate?: boolean) => ScheduledTask;
    stop: () => ScheduledTask;
    destroy: () => void;
  }

  export function schedule(
    expression: CronExpression,
    callback: () => void,
    options?: ScheduleOptions
  ): ScheduledTask;

  export function validate(expression: CronExpression): boolean;

  const cron: {
    schedule: typeof schedule;
    validate: typeof validate;
  };

  export default cron;
}
