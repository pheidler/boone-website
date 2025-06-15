// Track configuration
const tracks = [
  { id: "track10", name: "Track 10", file: "tracks/10aa.mp3" },
  { id: "track11", name: "Track 11", file: "tracks/10aa.mp3" },
];

let isPlaying = false;
let isLoading = true;
let players = {};

// Initialize the player
async function initPlayer() {
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
    // Create players
    players[track.id] = new Tone.Player(track.file).toDestination();
    players[track.id].sync().start(0);

    // Create track control element
    const trackControl = document.createElement("div");
    trackControl.className = "track-control";
    trackControl.innerHTML = `
            <span class="track-name">${track.name}</span>
            <button class="mute-button" data-track-id="${track.id}">Mute</button>
        `;
    container.appendChild(trackControl);
  });

  await Tone.loaded();

  playPauseButton.textContent = "Play";
  playPauseButton.disabled = false;

  // Play/pause logic
  playPauseButton.addEventListener("click", async () => {
    if (isPlaying) {
      Tone.Transport.pause();
      playPauseButton.textContent = "Play";
      isPlaying = false;
    } else {
      await Tone.start();
      Tone.Transport.start();
      // set it to loop once a second
      Tone.Transport.loop = true;
      Tone.Transport.loopEnd = 60;
      playPauseButton.textContent = "Pause";
      isPlaying = true;
    }
  });

  // Mute/unmute logic
  document.querySelectorAll(".mute-button").forEach((button) => {
    button.addEventListener("click", () => {
      const trackId = button.dataset.trackId;
      const player = players[trackId];
      if (player.mute) {
        player.mute = false;
        button.textContent = "Mute";
        button.classList.remove("muted");
      } else {
        player.mute = true;
        button.textContent = "Unmute";
        button.classList.add("muted");
      }
    });
  });
}

// Initialize when the page loads
window.addEventListener("load", () => {
  initPlayer();
});
