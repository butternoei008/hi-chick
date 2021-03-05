export const pad = (number) => {
   return number < 10 ? "0" + number : number
}

export const timeToMinute = (time) => {
   const minute = parseInt(time / 60)
   return `${pad(minute)}:${pad(time % 60)}`
}