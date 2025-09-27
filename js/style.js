// When the user scrolls the page, execute myFunction
window.onscroll = function () {
  myFunction();
};

function myFunction() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("myBar").style.width = scrolled + "%";
}
// Banner Animation Css Start 
// Function to check for device orientation support and request permission if needed
function initDeviceOrientation() {
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        const button = document.getElementById('permission-button');
        button.style.display = 'block';

        button.addEventListener('click', () => {
            DeviceOrientationEvent.requestPermission()
                .then(permissionState => {
                    if (permissionState === 'granted') {
                        window.addEventListener('deviceorientation', handleOrientation);
                        window.addEventListener('devicemotion', handleMotion);
                        button.style.display = 'none';
                    }
                })
                .catch(console.error);
        });
    } else {
        window.addEventListener('deviceorientation', handleOrientation);
        window.addEventListener('devicemotion', handleMotion);
    }
}

let beta = 0;
let gamma = 0;
let isShaking = false;

function handleOrientation(event) {
    beta = event.beta;
    gamma = event.gamma;
}

function handleMotion(event) {
    const acceleration = event.accelerationIncludingGravity;
    const shakeThreshold = 15;
    const accelerationX = acceleration.x;
    const accelerationY = acceleration.y;
    const accelerationZ = acceleration.z;
    
    if (accelerationX > shakeThreshold || accelerationY > shakeThreshold || accelerationZ > shakeThreshold) {
        if (!isShaking) {
            isShaking = true;
            triggerQuantumGlitch();
            setTimeout(() => {
                isShaking = false;
            }, 1000); // Glitch duration
        }
    }
}

// Three.js setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('quantum-canvas'), antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 5;

const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xff5722, 1, 100);
scene.add(pointLight);

// Main object
const geometry = new THREE.OctahedronGeometry(1.5, 0);
const material = new THREE.MeshPhongMaterial({ color: 0xff5722, emissive: 0xff5722, emissiveIntensity: 0.5 });
const mainObject = new THREE.Mesh(geometry, material);
scene.add(mainObject);

// Particles
const particleGeometry = new THREE.BufferGeometry();
const particleCount = 5000;
const posArray = new Float32Array(particleCount * 3);
for (let i = 0; i < particleCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 20;
}
particleGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const particleMaterial = new THREE.PointsMaterial({ color: 0xff5722, size: 0.05 });
const particles = new THREE.Points(particleGeometry, particleMaterial);
scene.add(particles);

// Glitch effect function
function triggerQuantumGlitch() {
    gsap.to(mainObject.scale, { x: 1.2, y: 1.2, z: 1.2, duration: 0.1, yoyo: true, repeat: 1 });
    gsap.to(particles.material, { size: 0.1, duration: 0.1, yoyo: true, repeat: 1 });
    gsap.to(mainObject.material.color, { r: 1, g: 0.5, b: 0, duration: 0.1, yoyo: true, repeat: 1 });
    
    // Animate camera and particles for the "scatter" effect
    gsap.to(particles.rotation, { x: Math.random() * 2, y: Math.random() * 2, z: Math.random() * 2, duration: 0.5 });
    gsap.to(mainObject.position, { x: Math.random() * 0.2 - 0.1, y: Math.random() * 0.2 - 0.1, z: Math.random() * 0.2 - 0.1, duration: 0.1, yoyo: true, repeat: 1 });
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Apply device orientation to camera
    const rotationX = (beta - 90) / 90 * (Math.PI / 2);
    const rotationY = gamma / 90 * (Math.PI / 2);
    camera.position.x = Math.sin(rotationY) * 5;
    camera.position.y = Math.sin(rotationX) * 5;
    camera.lookAt(scene.position);

    mainObject.rotation.x += 0.005;
    mainObject.rotation.y += 0.005;
    particles.rotation.y += 0.001;

    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

initDeviceOrientation();
animate();

// Title Text
const titleText = document.getElementById('holographic-text');
titleText.innerText = "QUANTUM ENTANGLEMENT";
gsap.fromTo(titleText, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, delay: 1.5 });
// Banner Animation Css End
