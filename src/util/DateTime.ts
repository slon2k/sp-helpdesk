import { formatDistance } from "date-fns";

export const distance = (time: Date): string =>
  formatDistance(time, new Date());