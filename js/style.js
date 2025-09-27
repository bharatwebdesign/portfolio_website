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
const canvas = document.getElementById("confetti");
        const ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let confetti = [];

        for (let i = 0; i < 300; i++) {
            confetti.push({
                x: Math.random() * canvas.width,
                y: Math.random() * -canvas.height,
                r: Math.random() * 6 + 2,
                d: Math.random() * 10 + 5,
                color: `hsl(${Math.random() * 360}, 100%, 60%)`,
                tilt: Math.random() * 10 - 5,
                speed: Math.random() * 2 + 1
            });
        }

        function drawConfetti() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            confetti.forEach((c) => {
                ctx.beginPath();
                ctx.fillStyle = c.color;
                ctx.moveTo(c.x + c.tilt, c.y);
                ctx.lineTo(c.x + c.tilt + c.r / 2, c.y + c.r);
                ctx.lineTo(c.x + c.tilt - c.r / 2, c.y + c.r);
                ctx.fill();

                c.y += c.speed;
                c.tilt += Math.sin(c.y * 0.01);
                if (c.y > canvas.height) {
                    c.y = -20;
                    c.x = Math.random() * canvas.width;
                }
            });
            requestAnimationFrame(drawConfetti);
        }

        drawConfetti();

        // PARTICLE BACKGROUND
        const bgCanvas = document.getElementById("particles-bg");
        const bgCtx = bgCanvas.getContext("2d");
        bgCanvas.width = window.innerWidth;
        bgCanvas.height = window.innerHeight;

        let particles = [];

        for (let i = 0; i < 100; i++) {
            particles.push({
                x: Math.random() * bgCanvas.width,
                y: Math.random() * bgCanvas.height,
                r: Math.random() * 2 + 1,
                dx: (Math.random() - 0.5) * 0.5,
                dy: (Math.random() - 0.5) * 0.5
            });
        }

        function drawParticles() {
            bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
            bgCtx.fillStyle = "#ffffff33";
            particles.forEach(p => {
                bgCtx.beginPath();
                bgCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                bgCtx.fill();
                p.x += p.dx;
                p.y += p.dy;

                // Bounce off walls
                if (p.x < 0 || p.x > bgCanvas.width) p.dx *= -1;
                if (p.y < 0 || p.y > bgCanvas.height) p.dy *= -1;
            });
            requestAnimationFrame(drawParticles);
        }

        drawParticles();
