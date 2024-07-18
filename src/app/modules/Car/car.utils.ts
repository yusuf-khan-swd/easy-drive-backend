export const calculateTotalCoast = (
  startTime: string,
  endTime: string,
  pricePerHour: number,
) => {
  const startTimeSplit = startTime.split(':');
  const endTimeSplit = endTime.split(':');

  const startHours = parseInt(startTimeSplit[0]);
  const startMinutes = parseInt(startTimeSplit[1]);
  const endHours = parseInt(endTimeSplit[0]);
  const endMinutes = parseInt(endTimeSplit[1]);

  const startTotalMinutes = startHours * 60 + startMinutes;
  const endTotalMinutes = endHours * 60 + endMinutes;

  const totalMinutes = endTotalMinutes - startTotalMinutes;
  const totalHours = totalMinutes / 60;

  const totalCost = totalHours * pricePerHour;
  return totalCost;
};
