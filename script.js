const videoElement = document.getElementById("stream-video");
const playButton = document.getElementById("play-button");
const fullscreenButton = document.getElementById("fullscreen-button");
const languageSelect = document.getElementById("language-select");

let isPlaying = false;
let currentStreamUrl;

// Pre-load the default stream (Odia)
currentStreamUrl = languageSelect.value;
loadAndPlayStream(currentStreamUrl);

// Function to load and play the stream
function loadAndPlayStream(streamUrl) {
  if (Hls.isSupported()) {
    const hls = new Hls();
    hls.loadSource(streamUrl);
    hls.attachMedia(videoElement);
    hls.on(Hls.Events.MANIFEST_PARSED, function() {
      videoElement.play();
      isPlaying = true;
      playButton.textContent = "Pause";
    });
  } else {
    alert("HLS is not supported by your browser.");
  }
}

playButton.addEventListener("click", () => {
  if (!isPlaying) {
    loadAndPlayStream(currentStreamUrl);
  } else {
    videoElement.pause();
    isPlaying = false;
    playButton.textContent = "Play";
  }
});

fullscreenButton.addEventListener("click", () => {
  if (videoElement.requestFullscreen) {
    videoElement.requestFullscreen();
  } else if (videoElement.webkitRequestFullscreen) {
    videoElement.webkitRequestFullscreen();
  }
});

languageSelect.addEventListener("change", () => {
  currentStreamUrl = languageSelect.value;
  loadAndPlayStream(currentStreamUrl);
});
