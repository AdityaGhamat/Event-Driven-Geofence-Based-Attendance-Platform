const toMinutes = (time: string) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

const toTimeStr = (totalMinutes: number) => {
  let normalized = totalMinutes % (24 * 60);
  if (normalized < 0) normalized += 24 * 60;

  const h = Math.floor(normalized / 60);
  const m = normalized % 60;
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
};
export const generateSlots = (startTime: string, endTime: string) => {
  const slots = [];
  const startM = toMinutes(startTime);
  const endM = toMinutes(endTime);

  let duration = endM - startM;
  if (duration < 0) {
    duration += 24 * 60;
  }

  for (let offset = 0; offset < duration; offset += 15) {
    const currentStartM = startM + offset;
    const currentEndM = startM + offset + 15;

    slots.push({
      id: offset.toString(),
      start: toTimeStr(currentStartM),
      end: toTimeStr(currentEndM),

      isNextDay: currentStartM >= 24 * 60,
    });
  }

  return slots;
};
