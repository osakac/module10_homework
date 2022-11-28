const sendBtn = document.getElementById('send-message')
let contentField = document.getElementById('content-field').value
const geolocationBtn = document.getElementById('geolocation-btn')
const contentBlock = document.querySelector('.content-block')
const wsUrl = 'wss://echo-ws-service.herokuapp.com'
const websocket = new WebSocket(wsUrl)

function sendMessage(message = document.getElementById('content-field').value) {
  const newMessage = document.createElement('div')
  newMessage.innerHTML = message
  newMessage.setAttribute('class', 'message-mine')
  contentBlock.appendChild(newMessage)
}

websocket.onmessage = function (evt) {
  const newMessage = document.createElement('div')
  newMessage.innerHTML = evt.data
  newMessage.setAttribute('class', 'message-companion')
  contentBlock.appendChild(newMessage)
}

function geolocationSuccess(position) {
  const latitude = position.coords.latitude
  const longitude = position.coords.longitude
  const geolocation = document.createElement('a')
  geolocation.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`
  geolocation.style.textDecoration = 'none'
  geolocation.textContent = 'Ссылка на гео-локацию'
  sendMessage(geolocation.outerHTML)
}

function geolocationError() {
  alert('Невозможно получить гео-локацию')
}

sendBtn.addEventListener('click', () => {
  sendMessage()
  websocket.send(document.getElementById('content-field').value)
  document.getElementById('content-field').value = ''
})

geolocationBtn.addEventListener('click', () => {
  navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError)
})