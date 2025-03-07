export default function calculateWarrantyProgress(start, end) {
  const currentDate = new Date();
  const warrantyStartDate = new Date(start);
  const warrantyEndDate = new Date(end);

  if (warrantyStartDate >= warrantyEndDate) {
    throw new Error("تاريخ بدء الضمان يجب أن يكون قبل تاريخ الانتهاء.");
  }

  const getYearsDifference = (date1, date2) =>
    (date1 - date2) / (1000 * 60 * 60 * 24 * 365);

  const warrantyDuration = getYearsDifference(
    warrantyEndDate,
    warrantyStartDate
  );
  const warrantyUsed = getYearsDifference(currentDate, warrantyStartDate);

  const warrantyProgress = Math.min(
    (warrantyUsed / warrantyDuration) * 100,
    100
  );

  return {
    warrantyProgress: warrantyProgress.toFixed(2) 
  };
}
