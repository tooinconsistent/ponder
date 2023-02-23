export const getFormattedRealtiveTime = (secondsDiff: number): string => {
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  const ago = secondsDiff < 0 ? -1 : 1;
  const absoluteSecondsDiff = Math.abs(secondsDiff);

  let interval = Math.floor(absoluteSecondsDiff / 31536000);
  if (interval > 1) {
    return rtf.format(ago * interval, "year");
  }

  interval = Math.floor(absoluteSecondsDiff / 2592000);
  if (interval > 1) {
    return rtf.format(ago * interval, "month");
  }

  interval = Math.floor(absoluteSecondsDiff / 86400);
  if (interval >= 1) {
    return rtf.format(ago * interval, "day");
  }

  interval = Math.floor(absoluteSecondsDiff / 3600);
  if (interval >= 1) {
    return rtf.format(ago * interval, "hour");
  }

  interval = Math.floor(absoluteSecondsDiff / 60);
  if (interval >= 1) {
    return rtf.format(ago * interval, "minute");
  }

  return rtf.format(ago * Math.floor(absoluteSecondsDiff), "second");
};
