// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger?.classList.remove('active');
    navMenu?.classList.remove('active');
}));

// Review Filters
const filterButtons = document.querySelectorAll('.filter-btn');
const reviewCards = document.querySelectorAll('.review-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-genre');
        
        reviewCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-genre') === filterValue) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Embedded Music Player
let currentAudio = null;
let isPlaying = false;

const musicPlayer = document.getElementById('music-player');
const currentTrackEl = document.getElementById('current-track');
const playPauseBtn = document.getElementById('play-pause-btn');
const progressBar = document.querySelector('.progress');
const currentTimeEl = document.getElementById('current-time');
const totalTimeEl = document.getElementById('total-time');
const playButtons = document.querySelectorAll('.play-btn');

// Audio file mapping
const audioFiles = {
    'qq09UkPRdFY': 'https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3',
    'ErsatzYuga': 'https://commondatastorage.googleapis.com/codeskulptor-assets/Epoq-Lepidoptera.ogg',
    'TV46AJVbSSY': 'https://commondatastorage.googleapis.com/codeskulptor-demos/GalaxyInvaders/theme_01.mp3'
};

function formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function resetPlayer() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio = null;
    }
    playButtons.forEach(btn => btn.classList.remove('playing'));
    if (progressBar) progressBar.style.width = '0%';
    if (currentTimeEl) currentTimeEl.textContent = '0:00';
    if (totalTimeEl) totalTimeEl.textContent = '0:00';
    isPlaying = false;
    if (playPauseBtn) playPauseBtn.textContent = '▶';
}

playButtons.forEach(button => {
    button.addEventListener('click', () => {
        const videoId = button.getAttribute('data-video');
        const title = button.getAttribute('data-title');
        const audioUrl = audioFiles[videoId];
        
        if (!audioUrl) {
            console.error('Audio file not found for:', videoId);
            return;
        }
        
        resetPlayer();
        
        if (musicPlayer) musicPlayer.style.display = 'block';
        if (currentTrackEl) currentTrackEl.textContent = title;
        button.classList.add('playing');
        
        currentAudio = new Audio(audioUrl);
        currentAudio.crossOrigin = 'anonymous';
        
        currentAudio.addEventListener('loadedmetadata', () => {
            if (totalTimeEl) totalTimeEl.textContent = formatTime(currentAudio.duration);
        });
        
        currentAudio.addEventListener('timeupdate', () => {
            if (currentAudio.duration && progressBar) {
                const progress = (currentAudio.currentTime / currentAudio.duration) * 100;
                progressBar.style.width = progress + '%';
                if (currentTimeEl) currentTimeEl.textContent = formatTime(currentAudio.currentTime);
            }
        });
        
        currentAudio.addEventListener('ended', () => {
            resetPlayer();
        });
        
        currentAudio.addEventListener('error', (e) => {
            console.error('Audio error:', e);
            resetPlayer();
        });
        
        currentAudio.play().then(() => {
            isPlaying = true;
            if (playPauseBtn) playPauseBtn.textContent = '⏸';
        }).catch(e => {
            console.error('Audio play failed:', e);
            resetPlayer();
        });
    });
});

if (playPauseBtn) {
    playPauseBtn.addEventListener('click', () => {
        if (currentAudio) {
            if (isPlaying) {
                currentAudio.pause();
                playPauseBtn.textContent = '▶';
                isPlaying = false;
            } else {
                currentAudio.play().then(() => {
                    playPauseBtn.textContent = '⏸';
                    isPlaying = true;
                }).catch(e => {
                    console.error('Audio play failed:', e);
                    resetPlayer();
                });
            }
        }
    });
}

document.querySelector('.progress-bar')?.addEventListener('click', (e) => {
    if (currentAudio && currentAudio.duration) {
        const rect = e.target.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        currentAudio.currentTime = percent * currentAudio.duration;
    }
});

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading animation for movie posters
document.addEventListener('DOMContentLoaded', () => {
    const moviePosters = document.querySelectorAll('.movie-poster, .album-cover');
    
    moviePosters.forEach((poster, index) => {
        poster.style.opacity = '0';
        poster.style.transform = 'scale(0.9)';
        poster.style.transition = 'all 0.5s ease';
        
        // Animate in
        setTimeout(() => {
            poster.style.opacity = '1';
            poster.style.transform = 'scale(1)';
        }, index * 200);
    });
    
    // Add body padding for fixed player
    document.body.style.paddingBottom = '0px';
});

// Modal Functions
function openModal() {
    document.getElementById('articleModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('articleModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function openHamiltonModal() {
    document.getElementById('hamiltonModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeHamiltonModal() {
    document.getElementById('hamiltonModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const articleModal = document.getElementById('articleModal');
    const hamiltonModal = document.getElementById('hamiltonModal');
    if (event.target === articleModal) {
        closeModal();
    }
    if (event.target === hamiltonModal) {
        closeHamiltonModal();
    }
}