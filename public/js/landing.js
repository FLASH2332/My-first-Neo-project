function createStars() {
    const starsContainer = document.getElementById('stars');
    const numStars = 200;

    for (let i = 0; i < numStars; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    
    // Random size
    const sizes = ['small', 'medium', 'large'];
    const weights = [0.7, 0.25, 0.05];
    let randomSize = sizes[0];
    const rand = Math.random();
    if (rand < weights[2]) randomSize = sizes[2];
    else if (rand < weights[1] + weights[2]) randomSize = sizes[1];
    
    star.classList.add(randomSize);
    
    // Random position
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    
    // Random animation delay
    star.style.animationDelay = Math.random() * 3 + 's';
    
    starsContainer.appendChild(star);
    }
}

function createShootingStars() {
    const shootingContainer = document.getElementById('shooting-stars');
    
    function addShootingStar() {
    const shootingStar = document.createElement('div');
    shootingStar.className = 'shooting-star';
    
    shootingStar.style.left = Math.random() * 100 + 'px';
    shootingStar.style.top = Math.random() * 100 + 'px';
    shootingStar.style.animationDelay = Math.random() * 8 + 's';
    
    shootingContainer.appendChild(shootingStar);
    
    setTimeout(() => {
        if (shootingStar.parentNode) {
        shootingStar.parentNode.removeChild(shootingStar);
        }
    }, 8000);
    }

    setInterval(addShootingStar, 3000);
    addShootingStar();
}

// Initialize effects
createStars();
createShootingStars();

// Auto redirect after 6 seconds
setTimeout(() => {
    window.location.href = "index.html"; 
}, 5000);