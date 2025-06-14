# Multi-Track Audio Player

A simple web-based audio player that can play multiple MP3 tracks simultaneously using Howler.js.

## Setup

1. Place your MP3 files in the `tracks` folder
2. Update the `tracks` array in `script.js` to match your MP3 filenames
3. Open `index.html` in a web browser

## Features

- Play multiple MP3 tracks simultaneously
- Individual mute/unmute controls for each track
- Automatic looping of tracks
- Clean and responsive interface

## Requirements

- Modern web browser with JavaScript enabled
- MP3 files of the same length for best results

## Usage

1. Add your MP3 files to the `tracks` folder
2. Modify the `tracks` array in `script.js` to include your files:

```javascript
const tracks = [
  { id: "track1", name: "Track 1", file: "tracks/your-file-1.mp3" },
  { id: "track2", name: "Track 2", file: "tracks/your-file-2.mp3" },
  // Add more tracks as needed
];
```

3. Open `index.html` in your browser
4. Use the mute buttons to control individual tracks

## Note

Make sure all your MP3 files are of the same length for the best experience. The player will automatically loop all tracks.
