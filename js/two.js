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

function register_motionevent() {
  window.addEventListener('deviceorientation', function(event) {
    if (last_angle != event.gamma) {
      let payload = { cmd: 'playerTwo', angle: event.gamma };
      send(payload);
      last_angle = event.gamma;
    }
  });
}

window.addEventListener('pointerdown', function(event) {
  DeviceOrientationEvent.requestPermission().then(register_motionevent);
});
register_motionevent();
