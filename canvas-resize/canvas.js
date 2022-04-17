const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext("2d");

// c.strokeRect(100, 100, 100, 100);
// c.fillStyle = "rgba(0, 255, 0, 0.5)";
// c.fillRect(300, 100, 100, 100);
// c.fillRect(200, 400, 100, 100);

// c.beginPath();
// c.moveTo(300, 300);
// c.strokeStyle = "lime";
// c.lineTo(500, 100);
// c.strokeStyle = "steelblue";
// c.lineTo(700, 500);
// c.stroke();

// // Arc
// c.beginPath();
// c.arc(300, 300, 40, 0, Math.PI * 2);
// c.fillStyle = "rgba(220, 0, 0, .4)";
// c.fill();
// c.arc()

// STATIC CIRCLE
// let x = Math.random() * window.innerWidth;
// let y = Math.random() * window.innerHeight;
// let dx = 5 * (Math.random() - 0.5);
// let dy = 5 * (Math.random() - 0.5);
// let r = 40;

let mouse = {
  x: null,
  y: null,
};

window.addEventListener("mousemove", function (e) {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  console.log(mouse.x);
});

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  init();
});

class Circle {
  constructor(x, y, radius, dx, dy, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;
    this.color = color;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    c.fillStyle = this.color;
    //c.lineWidth = 5;
    c.fill();
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;

    //Interactivity

    if (
      mouse.x - this.x < 50 &&
      mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 &&
      mouse.y - this.y > -50
    ) {
      this.radius += 1;
    } else if (this.radius > 5) {
      this.radius -= 1;
    }

    if (
      this.x + this.radius >= window.innerWidth ||
      this.x - this.radius <= 0
    ) {
      this.dx = -this.dx;
    }

    if (
      this.y + this.radius >= window.innerHeight ||
      this.y - this.radius <= 0
    ) {
      this.dy = -this.dy;
    }

    this.draw();
  }
}

//const circle = new Circle(200, 200, 30, 5, 5);

let circleArray = [];

function init() {
  circleArray = [];
  for (let i = 0; i < 500; i++) {
    const color = `#${Math.random().toString(16).slice(2, 8)}`;
    const radius = 40;
    const x = Math.random() * (window.innerWidth - 2 * radius) + radius;
    const y = Math.random() * (window.innerHeight - 2 * radius) + radius;
    const dx = 5 * (Math.random() - 0.5);
    const dy = 5 * (Math.random() - 0.5);

    circleArray.push(new Circle(x, y, radius, dx, dy, color));
  }
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);
  circleArray.forEach((circle) => circle.update());
}

init();
animate();
