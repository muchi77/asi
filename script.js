let particles = [];
let particleCount = 100;
let bgColor = '#000000';
let particleColor = '#ffffff';
const slider = document.getElementById("particleSlider");
const bgColorPicker = document.getElementById("bgColor");
const particleColorPicker = document.getElementById("particleColor");

function setup() {
    createCanvas(windowWidth, windowHeight);
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    slider.addEventListener("input", updateParticleCount);
    bgColorPicker.addEventListener("input", () => bgColor = bgColorPicker.value);
    particleColorPicker.addEventListener("input", () => particleColor = particleColorPicker.value);
}

function draw() {
    background(bgColor);
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].show();
        particles[i].connect(particles);
    }
}

function updateParticleCount() {
    let newCount = int(slider.value);
    if (newCount > particles.length) {
        for (let i = particles.length; i < newCount; i++) {
            particles.push(new Particle());
        }
    } else {
        particles.splice(newCount, particles.length - newCount);
    }
}

class Particle {
    constructor() {
        this.pos = createVector(random(width), random(height));
        this.vel = p5.Vector.random2D();
        this.size = random(2, 5);
    }

    update() {
        let mouse = createVector(mouseX, mouseY);
        let force = p5.Vector.sub(this.pos, mouse);
        let distance = force.mag();
        
        if (distance < 150) {  
            force.setMag(8 / distance);  
            this.vel.add(force);
        }

        this.pos.add(this.vel);
        this.vel.limit(2);

        if (this.pos.x > width || this.pos.x < 0) this.vel.x *= -1;
        if (this.pos.y > height || this.pos.y < 0) this.vel.y *= -1;
    }

    show() {
        noStroke();
        fill(particleColor);
        ellipse(this.pos.x, this.pos.y, this.size);
    }

    connect(particles) {
        for (let i = 0; i < particles.length; i++) {
            let d = dist(this.pos.x, this.pos.y, particles[i].pos.x, particles[i].pos.y);
            if (d < 100) {
                stroke(particleColor + '80'); 
                line(this.pos.x, this.pos.y, particles[i].pos.x, particles[i].pos.y);
            }
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
