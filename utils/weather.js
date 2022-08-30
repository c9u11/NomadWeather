export default function getDayTitle(hourlyData) {
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
