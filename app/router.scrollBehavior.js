export default function (to, from, savedPosition) {
  // return { x: 0, y: 0 };
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ x: 0, y: 0, behavior: 'instant' })
    }, 500)
  })
}