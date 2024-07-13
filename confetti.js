function startConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');
    const confettiCount = 300;
    const confetti = [];

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    for (let i = 0; i < confettiCount; i++) {
        confetti.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 5 + 1,
            d: Math.random() * confettiCount,
            color: `rgba(${Math.floor(Math.random() * 255)}, 
                        ${Math.floor(Math.random() * 255)}, 
                        ${Math.floor(Math.random() * 255)}, 1)`,
            tilt: Math.floor(Math.random() * 10) - 10,
            tiltAngleIncremental: (Math.random() * 0.07) + .05,
            tiltAngle: 0
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < confettiCount; i++) {
            const confetto = confetti[i];
            ctx.beginPath();
            ctx.lineWidth = confetto.r;
            ctx.strokeStyle = confetto.color;
            ctx.moveTo(confetto.x + confetto.tilt + (confetto.r / 2), confetto.y);
            ctx.lineTo(confetto.x + confetto.tilt, confetto.y + confetto.tilt + (confetto.r / 2));
            ctx.stroke();
        }
        update();
    }

    function update() {
        for (let i = 0; i < confettiCount; i++) {
            const confetto = confetti[i];
            confetto.tiltAngle += confetto.tiltAngleIncremental;
            confetto.y += (Math.cos(confetto.d) + 3 + confetto.r / 2) / 2;
            confetto.tilt = Math.sin(confetto.tiltAngle - (i / 3)) * 15;

            if (confetto.y > canvas.height) {
                confetti[i] = {
                    x: Math.random() * canvas.width,
                    y: -10,
                    r: confetto.r,
                    d: confetto.d,
                    color: confetto.color,
                    tilt: confetto.tilt,
                    tiltAngleIncremental: confetto.tiltAngleIncremental,
                    tiltAngle: confetto.tiltAngle
                };
            }
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        draw();
    }

    animate();
}
