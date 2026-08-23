export const calculateTotalCoast = (
  startTime: string,
  endTime: string,
  pricePerHour: number,
) => {
  const startTimeString = startTime.split(':');
  const endTimeString = endTime.split(':');

  const startHours = parseInt(startTimeString[0]);
  const startMinutes = parseInt(startTimeString[1]);
  const endHours = parseInt(endTimeString[0]);
  const endMinutes = parseInt(endTimeString[1]);

  const startTotalMinutes = startHours * 60 + startMinutes;
  const endTotalMinutes = endHours * 60 + endMinutes;

  const totalMinutes = endTotalMinutes - startTotalMinutes;
  const totalHours = totalMinutes / 60;

  const totalCost = totalHours * pricePerHour;
  return totalCost;
};
