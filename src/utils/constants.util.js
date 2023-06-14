export const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const d = new Date();
export let day = weekday[d.getDay()];
export let date = d.getDate();
export let monthh = d.getMonth();
export let monname = d.toLocaleString("en-US", { month: "long" });
export let year = d.getFullYear();
