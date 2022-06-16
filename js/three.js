let id = window.crypto.getRandomValues(new Uint32Array(1))[0].toString(16);
var client = new Paho.Client('test.mosquitto.org', 8081, 'web-' + id);

let topic = "amro/events";
let last_angle = null;

client.onMessageArrived = onMessageArrived;

client.connect({ onSuccess, reconnect: true, useSSL: true });

function log(obj) {
  let el = document.createElement('div');
  el.textContent = obj;
  feed.appendChild(el);
}

function onSuccess() {
  //client.subscribe('amro/#');
}

function onMessageArrived(message) {
  /*
  let cmd = message.topic.split('/').pop();
  switch(cmd) {
    case 'stream':
      log(message.payloadString)
      break;
    default:
      break;
  }
  */
}

function send(payload) {
  if (client.isConnected) {
    client.publish(topic, JSON.stringify(payload), 2);
  }
}

window.addEventListener('devicemotion', function(event) {
  let x = event.acceleration.x;
  let y = event.acceleration.y;
  if (x > 5 || y > 5) {
    let payload = { cmd: "playerThree", x, y };
    send(payload);
  }
});
