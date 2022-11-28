const btn = document.querySelector("button")

btn.addEventListener("click", () => {
  const width = window.innerWidth
  const height = window.innerHeight
  alert(`Размер окна: ${width}x${height}`)
})