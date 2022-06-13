let clientid = window.crypto.getRandomValues(new Uint32Array(1))[0].toString(16);
var client = new Paho.Client('test.mosquitto.org', 8081, 'web-' + client);

client.onMessageArrived = onMessageArrived;
client.connect({ onSuccess, reconnect: true, useSSL: true });

function onSuccess() {
  client.subscribe('amro/#');
}
let pos3;

function onMessageArrived(message) {
  let obj = JSON.parse(message.payloadString);
  console.log(obj);
  switch(obj.cmd) {
    case "playerOne":
      spawn(50);
      break
    case "playerTwo":
      playerTwo.SetTransform(playerTwo.GetPosition(), obj.angle * -1 * (Math.PI/180));
      break
    case "playerThree":
      pos3 = playerThree.GetPosition();
      pos3.set_x(Number(obj.value) * 30);
      playerThree.SetTransform(pos, 0);
      break
  }
}

let PTM = 20;
let sprites = [];
let world, renderer, particleSystem;

let playerOne, playerTwo, playerThree;

let gravity = new Box2D.b2Vec2(0, -10);
let force = new Box2D.b2Vec2(0, -20);

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

function createBox(x, y, w, h, fixed) {
  let bd = new Box2D.b2BodyDef();
  if (!fixed) {
    bd.set_type(2);
  }
  bd.set_position(new Box2D.b2Vec2(x, y));

  let body = world.CreateBody(bd);

  let shape = new Box2D.b2PolygonShape;
  shape.SetAsBox(w, h);
  body.CreateFixture(shape, 1.0);

  let sprite = PIXI.Sprite.from(PIXI.Texture.WHITE);
  sprite.width = w * PTM * 2;
  sprite.height = h * PTM * 2;
  sprite.anchor.set(0.5);
  sprite.body = body;
  renderer.stage.addChild(sprite);
  sprites.push(sprite);
  return body;
}

function createPolygonShape(vertices) {
  var shape = new Box2D.b2PolygonShape();
  var buffer = Box2D._malloc(vertices.length * 8);
  var offset = 0;
  for (var i=0;i<vertices.length;i++) {
    Box2D.HEAPF32[buffer + offset >> 2] = vertices[i].get_x();
    Box2D.HEAPF32[buffer + (offset + 4) >> 2] = vertices[i].get_y();
    offset += 8;
  }
  var ptr_wrapped = Box2D.wrapPointer(buffer, Box2D.b2Vec2);
  shape.Set(ptr_wrapped, vertices.length);
  return shape;
}

function createParticleSystem() {
  let psd = new Box2D.b2ParticleSystemDef();
  psd.set_radius(0.1);
  particleSystem = world.CreateParticleSystem(psd);
  particleSystem.SetMaxParticleCount(5000);

  let dummy = PIXI.Sprite.from(PIXI.Texture.EMPTY);
  renderer.stage.addChild(dummy);

  particleSystemSprite = new LiquidfunSprite(particleSystem);
  renderer.stage.addChild(particleSystemSprite);
}

function spawnParticles(radius, x, y) {
  let color = new Box2D.b2ParticleColor(0, 0, 255, 255);
  // flags
  let flags = (0<<0);

  let pgd = new Box2D.b2ParticleGroupDef();
  let shape = new Box2D.b2CircleShape();
  shape.set_m_radius(radius);
  pgd.set_shape(shape);
  pgd.set_color(color);
  pgd.set_flags(flags);
  shape.set_m_p(new Box2D.b2Vec2(x, y));
  group = particleSystem.CreateParticleGroup(pgd);
  return group;
}

function spawnRain() {
  let x = getRandom(-25, 25);
  let group = spawnParticles(0.09, x, 25);
  //group.ApplyLinearImpulse(wind);
}

function createFunnel(x, y) {
  let w = 1;
  let h = 1;

  let bd = new Box2D.b2BodyDef();
  // dynamic bd.set_type(2);
  bd.set_position(new Box2D.b2Vec2(x, y));

  let body = world.CreateBody(bd);

  let verts = [
    new Box2D.b2Vec2(0.25, 0.25),
    new Box2D.b2Vec2(0.22, 0.25),
    new Box2D.b2Vec2(0.03, -0.12),
    new Box2D.b2Vec2(0.04, -0.12),
  ];
  let shape = createPolygonShape(verts);
  body.CreateFixture(shape, 1.0);

  let sprite = PIXI.Sprite.from(PIXI.Texture.WHITE);
  sprite.width = w * PTM * 2;
  sprite.height = h * PTM * 2;
  sprite.anchor.set(0.5);
  sprite.body = body;
  renderer.stage.addChild(sprite);
  sprites.push(sprite);
  return body;
}

function init() {
  // stats
  //let stats = new Stats();
  //document.body.appendChild(stats.domElement);

  // renderer
  let w = window.innerWidth;
  let h = window.innerHeight;
  renderer = new PIXI.Application(w, h, {backgroundColor : 0x484864});
  document.body.appendChild(renderer.view);

  //let killerShape = new Box2D.b2PolygonShape;
  //killerShape.SetAsBox(w, h);
  //let killerTransform = new Box2D.b2Transform;
  //killerTransform.Set(new Box2D.b2Vec2(0, 0), 0);

  // shift 0/0 to the center
  renderer.stage.position.x = w/2;
  renderer.stage.position.y = h/2;

  // world
  world = new Box2D.b2World(gravity);

  spawner = createBox(0, 25, 1, 1, true);
  playerTwo = createBox(0, -5, 3, 0.5, true);
  playerThree = createBox(0, -12, 3, 0.5, true);

  createParticleSystem();

  let tick = 0;
  renderer.ticker.add(function() {
    tick++;

    let pos = spawner.GetPosition();
    pos.set_x(Math.sin(tick / 100) * 42);
    pos.set_y(25);

    spawner.SetTransform(pos, 0);

    for (let i=0,s=sprites[i];i<sprites.length;s=sprites[++i]) {
      let pos = s.body.GetPosition();
      s.position.set(pos.get_x()*PTM, -pos.get_y()*PTM)
      s.rotation = -s.body.GetAngle();
    }
  });

  // update loop
  function update() {
    //particleSystem.DestroyParticlesInShape(killerShape, killerTransform);
    world.Step(1/60, 8, 3);
  }
  window.setInterval(update, 1000 / 60);

  /*
  renderer.view.addEventListener("pointerdown", function(e) {
    let x = ((e.clientX - renderer.view.offsetLeft) - w/2) / PTM;
    let y = (-(e.clientY - renderer.view.offsetTop) + h/2) / PTM;
    if (e.shiftKey) {
      createBox(x, y, 1, 1, e.ctrlKey);
    } else {
      spawnParticles(1, x, y);
    }
  });
  */
};

function spawn(bandwidth) {
  let pos = spawner.GetPosition();
  let s = spawnParticles(bandwidth / 100, pos.get_x(), pos.get_y() - 2);
  s.ApplyLinearImpulse(force);
}
window.addEventListener("load", init);
//window.addEventListener("pointerdown", spawn);
