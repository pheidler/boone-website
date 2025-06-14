// Track configuration
const tracks = [
  { id: "track10", name: "Track 10", file: "tracks/10aa.mp3" },
  { id: "track11", name: "Track 10", file: "tracks/10aa.mp3" },
];

// Store Howl instances
const sounds = {};
let isPlaying = false;
let isLoading = true;
let loadedTracks = 0;

// Initialize the player
function initPlayer() {
  const container = document.getElementById("tracks-container");

  // Create play/pause button
  const playPauseButton = document.createElement("button");
  playPauseButton.id = "play-pause-button";
  playPauseButton.className = "play-pause-button";
  playPauseButton.textContent = "Loading...";
  playPauseButton.disabled = true;
  container.appendChild(playPauseButton);

  // Create controls for each track
  tracks.forEach((track) => {
    // Create track control element
    const trackControl = document.createElement("div");
    trackControl.className = "track-control";
    trackControl.innerHTML = `
            <span class="track-name">${track.name}</span>
            <button class="mute-button" data-track-id="${track.id}">Mute</button>
        `;
    container.appendChild(trackControl);

    // Initialize Howl instance
    sounds[track.id] = new Howl({
      src: [track.file],
      loop: true,
      autoplay: false,
      volume: 1,
      onload: () => {
        loadedTracks++;
        if (loadedTracks === tracks.length) {
          isLoading = false;
          playPauseButton.textContent = "Play";
          playPauseButton.disabled = false;
        }
      },
    });

    // Add click event listener to mute button
    const muteButton = trackControl.querySelector(".mute-button");
    muteButton.addEventListener("click", () => {
      const sound = sounds[track.id];
      if (sound.mute()) {
        sound.mute(false);
        muteButton.textContent = "Mute";
        muteButton.classList.remove("muted");
      } else {
        sound.mute(true);
        muteButton.textContent = "Unmute";
        muteButton.classList.add("muted");
      }
    });
  });

  // Add click event listener to play/pause button
  playPauseButton.addEventListener("click", () => {
    if (isPlaying) {
      // Pause all tracks
      tracks.forEach((track) => {
        sounds[track.id].pause();
      });
      playPauseButton.textContent = "Play";
      isPlaying = false;
    } else {
      // Play all tracks
      tracks.forEach((track) => {
        sounds[track.id].play();
      });
      playPauseButton.textContent = "Pause";
      isPlaying = true;
    }
  });
}

// Initialize when the page loads
window.addEventListener("load", () => {
  initPlayer();
});
