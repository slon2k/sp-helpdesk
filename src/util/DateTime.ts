import { formatDistance, parseISO } from "date-fns";

export const distance = (time: Date): string =>
  formatDistance(time, new Date());