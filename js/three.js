let id = window.crypto.getRandomValues(new Uint32Array(1))[0].toString(16);
var client = new Paho.Client('test.mosquitto.org', 8081, 'web-' + id);

let topic = "amro/events";
let last_value = null;

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

window.addEventListener("load", function() {
  document.getElementById("slider").addEventListener('input', function(event) {
    if (last_value != event.target.value) {
      let payload = { cmd: 'playerThree', value: event.target.value };
      send(payload);
      last_angle = event.target.value;
    }
  });
});

document.addEventListener("scroll", function(e){
  if (e.target.id == "slider") return;
  e.preventDefault()
}, {passive: false});

document.addEventListener("touchmove", function(e){
  if (e.target.id == "slider") return;
  e.preventDefault()
}, {passive: false});
