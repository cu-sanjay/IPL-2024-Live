const videoElement = document.getElementById("stream-video");
const playButton = document.getElementById("play-button");
const fullscreenButton = document.getElementById("fullscreen-button");
const languageSelect = document.getElementById("language-select");

let isPlaying = false;
let currentStreamUrl;

currentStreamUrl = languageSelect.value;
loadAndPlayStream(currentStreamUrl);

document.addEventListener("DOMContentLoaded", function() {
  const images = [
    "https://img1.hscicdn.com/image/upload/f_auto,t_ds_w_960,q_50/lsci/db/PICTURES/CMS/378500/378596.jpg",
    "https://img1.hscicdn.com/image/upload/f_auto,t_ds_w_960,q_50/lsci/db/PICTURES/CMS/378500/378598.jpg",
    "https://img1.hscicdn.com/image/upload/f_auto,t_ds_w_960,q_50/lsci/db/PICTURES/CMS/378600/378602.jpg",
    "https://assets.bcci.tv/bcci/photos/909/df51b381-9a32-428c-90a4-af6f9920e02f.jpg",
    "https://assets.bcci.tv/bcci/photos/909/c7d85cdd-7536-4f45-8186-bdd35bf42e31.jpg",
    "https://assets.bcci.tv/bcci/photos/909/16e329a7-2fa0-47da-99a8-0a6de47197b5.jpg",
    "https://assets.bcci.tv/bcci/photos/1354/7766815d-c657-4aba-aa14-9249bb348332.jpg",
    "https://assets.bcci.tv/bcci/photos/1354/43ebe630-e7bb-432c-b41c-b784c0575773.jpg",
    "https://assets.bcci.tv/bcci/photos/1354/33a51442-9f55-4aff-b79e-12c7142e07ba.jpg"
  ];
  const randomIndex = Math.floor(Math.random() * images.length);
  const randomImage = images[randomIndex];
  const background = document.querySelector(".background-image");
  background.style.backgroundImage = `url(${randomImage})`;
});

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