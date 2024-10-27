import moment from "moment";

export const getLast7Days = () => {
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date();

    date.setDate(date.getDate() - i);

    // return date.toISOString().slice(0, 10);
    return moment(date).format("DD-MM-YY");
  });
};
console.log();
