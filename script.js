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
let currentPlayer = null;
let isPlaying = false;

const musicPlayer = document.getElementById('music-player');
const currentTrackEl = document.getElementById('current-track');
const playPauseBtn = document.getElementById('play-pause-btn');
const youtubeIframe = document.getElementById('youtube-iframe');
const playButtons = document.querySelectorAll('.play-btn');

playButtons.forEach(button => {
    button.addEventListener('click', () => {
        const videoId = button.getAttribute('data-video');
        const title = button.getAttribute('data-title');
        
        // Reset all buttons
        playButtons.forEach(btn => btn.classList.remove('playing'));
        
        // Show player and update info
        musicPlayer.style.display = 'block';
        currentTrackEl.textContent = title;
        button.classList.add('playing');
        
        // Load video in iframe
        youtubeIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&showinfo=0&rel=0&modestbranding=1`;
        
        isPlaying = true;
        playPauseBtn.textContent = '⏸';
    });
});

// Player controls
if (playPauseBtn) {
    playPauseBtn.addEventListener('click', () => {
        if (isPlaying) {
            youtubeIframe.src = youtubeIframe.src.replace('autoplay=1', 'autoplay=0');
            playPauseBtn.textContent = '▶';
            isPlaying = false;
        } else {
            youtubeIframe.src = youtubeIframe.src.replace('autoplay=0', 'autoplay=1');
            playPauseBtn.textContent = '⏸';
            isPlaying = true;
        }
    });
}

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