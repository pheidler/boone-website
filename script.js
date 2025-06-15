// Track configuration
const tracks = [
  { id: "track2", name: "Track 2", file: "tracks/02aa.mp3" },
  { id: "track3", name: "Track 3", file: "tracks/03aa.mp3" },
  { id: "track4", name: "Track 4", file: "tracks/04aa.mp3" },
  { id: "track5", name: "Track 5", file: "tracks/05aa.mp3" },
  { id: "track6", name: "Track 6", file: "tracks/06aa.mp3" },
  { id: "track7", name: "Track 7", file: "tracks/07aa.mp3" },
  { id: "track8", name: "Track 8", file: "tracks/08aa.mp3" },
  { id: "track9", name: "Track 9", file: "tracks/09aa.mp3" },
  { id: "track10", name: "Track 10", file: "tracks/10aa.mp3" },
  { id: "track11", name: "Track 11", file: "tracks/11aa.mp3" },
  { id: "track12", name: "Track 12", file: "tracks/12aa.mp3" },
  { id: "track13", name: "Track 13", file: "tracks/13aa.mp3" },
  { id: "track14", name: "Track 14", file: "tracks/14aa.mp3" },
  { id: "track15", name: "Track 15", file: "tracks/15aa.mp3" },
  { id: "track16", name: "Track 16", file: "tracks/16aa.mp3" },
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

  Tone.Transport.loop = true;
  Tone.Transport.loopEnd = 60; // Loop time, in seconds
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
