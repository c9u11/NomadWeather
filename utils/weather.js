export function getDayTitle(hourlyData) {
  let description = hourlyData[0].weather[0].description;
  let title;
  for (let i = 0; i < 24; i++) {
    if (!i) continue;
    if (description !== hourlyData[i].weather[0].description) {
      const hour = new Date(hourlyData[i].dt * 1000).getHours();
      const description = hourlyData[i].weather[0].description;
      title = `⏰ ${hour}:00쯤 ${description} 상태가 예상됩니다.`;
      break;
    }
  }
  if (!title) title = `⏰ 남은 하루 동안 ${description} 상태가 이어지겠습니다.`;
  return title;
}

export function getWeekTempRange(dailyData) {
  let min = Infinity;
  let max = -Infinity;
  for (let day of dailyData) {
    min = Math.min(min, Math.floor(day.temp.min));
    max = Math.max(max, Math.floor(day.temp.max));
  }
  return {
    min,
    max,
  };
}

export function getCenterRange(min, max, start, end) {
  return {
    start: (+start - +min) / (+max - +min),
    end: (+end - +min) / (+max - +min),
  };
}
