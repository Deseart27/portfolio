// Video player controls - Version simplifiée
window.addEventListener('DOMContentLoaded', function() {
    console.log('Video player script loaded');
    
    var video = document.getElementById('about-video');
    var playButton = document.getElementById('play-video-btn');
    var videoOverlay = document.querySelector('.video-overlay');
    var videoWrapper = document.querySelector('.video-wrapper');

    console.log('Elements found:', {
        video: !!video,
        playButton: !!playButton,
        videoOverlay: !!videoOverlay,
        videoWrapper: !!videoWrapper
    });

    if (!video || !playButton || !videoOverlay) {
        console.error('Video elements not found!');
        return;
    }

    // Function to play video
    function playVideo() {
        console.log('playVideo called');
        
        // Hide overlay immediately
        videoOverlay.style.display = 'none';
        videoOverlay.classList.add('hidden');
        
        // Add controls
        video.setAttribute('controls', 'controls');
        
        // Add playing class to wrapper
        if (videoWrapper) {
            videoWrapper.classList.add('playing');
        }
        
        // Try to play
        var playPromise = video.play();
        
        if (playPromise !== undefined) {
            playPromise.then(function() {
                console.log('Video playing successfully');
            }).catch(function(error) {
                console.error('Error playing video:', error);
                // Even if play fails, keep controls visible
            });
        }
    }

    // Click on play button
    playButton.addEventListener('click', function(e) {
        console.log('Play button clicked');
        e.preventDefault();
        e.stopPropagation();
        playVideo();
        return false;
    });

    // Click on overlay
    videoOverlay.addEventListener('click', function(e) {
        console.log('Overlay clicked');
        e.preventDefault();
        e.stopPropagation();
        playVideo();
        return false;
    });

    // Show overlay when paused
    video.addEventListener('pause', function() {
        if (!video.ended && video.currentTime > 0) {
            console.log('Video paused, showing overlay');
            videoOverlay.style.display = 'flex';
            videoOverlay.classList.remove('hidden');
            if (videoWrapper) {
                videoWrapper.classList.remove('playing');
            }
        }
    });

    // Show overlay when video ends
    video.addEventListener('ended', function() {
        console.log('Video ended, showing overlay');
        videoOverlay.style.display = 'flex';
        videoOverlay.classList.remove('hidden');
        video.removeAttribute('controls');
        if (videoWrapper) {
            videoWrapper.classList.remove('playing');
        }
    });

    // Log video errors
    video.addEventListener('error', function(e) {
        console.error('Video error:', e);
        console.error('Video error code:', video.error ? video.error.code : 'unknown');
    });

    // Log when video can play
    video.addEventListener('canplay', function() {
        console.log('Video can play');
    });

    console.log('Video player initialized');
});

