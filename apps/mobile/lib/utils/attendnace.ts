export const generateSlots = () => {
  const slots = [];
  let currentHour = 9;
  let currentMinute = 0;

  for (let i = 0; i < 8; i++) {
    const startStr = `${currentHour}:${
      currentMinute === 0 ? "00" : currentMinute
    }`;

    let endMin = currentMinute + 15;
    let endHour = currentHour;
    if (endMin === 60) {
      endMin = 0;
      endHour += 1;
    }
    const endStr = `${endHour}:${endMin === 0 ? "00" : endMin}`;

    currentMinute += 15;
    if (currentMinute === 60) {
      currentMinute = 0;
      currentHour += 1;
    }

    slots.push({
      id: i,
      start: startStr,
      end: endStr,
      status: i < 4 ? "PRESENT" : "EMPTY",
    });
  }
  return slots;
};
