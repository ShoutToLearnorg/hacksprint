// Elements
const portalContainer = document.querySelector(".portal-container");
const controlPanel = document.getElementById("controlPanel");
const controls = document.querySelector(".controls");
const exitPortalCross = document.getElementById("exitPortalCross"); // Updated ID
const backgroundVideo = document.getElementById("backgroundVideo");
const videoContainer = document.getElementById("videoContainer");
const textOverlay = document.getElementById("textOverlay");
const videoButtons = document.getElementById("videoButtons");
const goBackControlsButton = document.getElementById("goBackControls");
const exitPortalVideoButton = document.getElementById("exitPortalVideo");

// Create "Stopping the Machine..." overlay
const stoppingMachineOverlay = document.createElement("div");
stoppingMachineOverlay.className = "stopping-machine-overlay";
stoppingMachineOverlay.textContent = "powering down the contraption...";
document.body.appendChild(stoppingMachineOverlay);

// Era-specific details
const eraDetails = {
    prehistoric: {
      video: "https://cdn.pixabay.com/video/2023/01/24/147736-792421629_large.mp4",
      text: [
        "dinosaurs ruled the land",
        "the earth was wild and untamed",
        "welcome to the prehistoric era!"
      ],
      buttonText: "Explore Prehistoric Era", // Added property
      buttonLink: "/prehistoricEra"
    },
    medieval: {
      video: "https://cdn.pixabay.com/video/2020/02/07/32084-390497849_large.mp4",
      text: [
        "knights and castles await",
        "this is the time of epic battles",
        "welcome to medieval times!"
      ],
      buttonText: "Explore Medieval Times", // Added property
      buttonLink: "/medievalTimes"
    },
    future: {
      video: "https://cdn.pixabay.com/video/2024/09/10/230707_large.mp4",
      text: [
        "a world shaped by technology",
        "the future holds endless possibilities",
        "welcome to the future!"
      ],
      buttonText: "Explore Future World", // Added property
      buttonLink: "/thefuture"
    }
  };
  
  // Add videoExploreButton to Elements
  const videoExploreButton = document.getElementById('videoExploreButton'); // New element reference

/**
 * Display text overlays dynamically during video playback
 * @param {string[]} texts - array of strings to display sequentially
 */
function displayTextOverlay(texts) {
  textOverlay.innerHTML = "";          // Clear previous text
  textOverlay.style.opacity = "1";     // Ensure visibility
  textOverlay.style.display = "block";
  let index = 0;

  const interval = setInterval(() => {
    if (index < texts.length) {
      const textSpan = document.createElement("span");
      textSpan.textContent = texts[index];
      textOverlay.appendChild(textSpan);

      // Remove each text after 4s
      setTimeout(() => {
        if (textOverlay.contains(textSpan)) {
          textOverlay.removeChild(textSpan);
        }
      }, 4000);

      index++;
    } else {
      clearInterval(interval);         // Stop after all texts are shown
      textOverlay.style.opacity = "0"; // Hide overlay
      textOverlay.style.display = "none";
    }
  }, 4000);
}

/**
 * Starts the "time machine" animation (progress ring), then
 * transitions to the video era with the relevant text.
 * @param {string} era - e.g. "prehistoric", "medieval", "future"
 */
function startTimeMachineAnimation(era) {
  const animationElement = document.createElement("div");
  animationElement.className = "time-machine-animation";

  // Add progress percentage text
  const progressText = document.createElement("div");
  progressText.className = "progress-percentage";
  progressText.textContent = "0%";
  animationElement.appendChild(progressText);

  document.body.appendChild(animationElement);

  // Hide controls & cross & video buttons
  controls.classList.add("hidden");
  exitPortalCross.classList.add("hidden"); // Hide cross while animating
  videoButtons.classList.add("hidden");

  // Simulate progress
  let progress = 0;
  const progressInterval = setInterval(() => {
    progress += 5;
    progressText.textContent = `${progress}%`;

    if (progress >= 100) {
      clearInterval(progressInterval);

      setTimeout(() => {
        animationElement.remove();
        controlPanel.classList.add("hidden");
        videoContainer.classList.remove("hidden");
        videoButtons.classList.remove("hidden");
    
        // Get era details including buttonText and buttonLink
        const { video, text, buttonText, buttonLink } = eraDetails[era];
        backgroundVideo.src = video;
        backgroundVideo.play();
    
        // Update button text and link
        videoExploreButton.textContent = buttonText;
        videoExploreButton.onclick = () => {
          window.location.href = buttonLink;
        };
    
        displayTextOverlay(text);
      }, 500);
    }
  }, 100);
}

/**
 * "Stopping the Machine" overlay effect,
 * then run callback after delay
 */
function stoppingMachineAction(callback) {
  stoppingMachineOverlay.classList.add("active");
  setTimeout(() => {
    stoppingMachineOverlay.classList.remove("active");
    callback();
  }, 2000);
}

/* --------------------------
   EVENT LISTENERS
--------------------------- */

// Step Inside the Portal (clicking the portal)
portalContainer.addEventListener("click", () => {
  // Animate the portal collapsing
  portalContainer.classList.add("animate-collapse");
  setTimeout(() => {
    // Hide entry screen, show control panel
    document.querySelector(".entry-screen").classList.add("hidden");
    controlPanel.classList.remove("hidden");
    controlPanel.classList.add("animate-fade-in");
  }, 800);
});

// Handle Era Selection (prehistoric, medieval, future)
document.querySelectorAll(".controls button").forEach(button => {
  button.addEventListener("click", () => {
    const era = button.getAttribute("data-era");
    startTimeMachineAnimation(era);
  });
});

// EXIT CROSS in Controls: Return to Portal
exitPortalCross.addEventListener("click", () => {
  // Return to the main portal
  controlPanel.classList.add("hidden");
  document.querySelector(".entry-screen").classList.remove("hidden");
  // Reset the portal so it can animate again if the user clicks
  portalContainer.classList.remove("animate-collapse");

  // Unhide controls and cross for next interaction
  controls.classList.remove("hidden");
  exitPortalCross.classList.remove("hidden");
});

// Go Back to Controls from the Video
goBackControlsButton.addEventListener("click", () => {
  stoppingMachineAction(() => {
    // Hide video container, show controls again
    videoContainer.classList.add("hidden");
    videoButtons.classList.add("hidden");
    textOverlay.innerHTML = "";
    textOverlay.style.opacity = "0";
    textOverlay.style.display = "none";
    controlPanel.classList.remove("hidden");

    // Stop and reset the video
    backgroundVideo.pause();
    backgroundVideo.src = "";

    // Unhide the cross and controls
    exitPortalCross.classList.remove("hidden");
    controls.classList.remove("hidden");
  });
});

// Exit from the Video: Back to the main Portal
exitPortalVideoButton.addEventListener("click", () => {
  stoppingMachineAction(() => {
    // Hide video
    videoContainer.classList.add("hidden");
    videoButtons.classList.add("hidden");
    textOverlay.innerHTML = "";
    textOverlay.style.opacity = "0";
    textOverlay.style.display = "none";
    backgroundVideo.pause();
    backgroundVideo.src = "";

    // Show entry screen
    const entryScreen = document.querySelector(".entry-screen");
    entryScreen.classList.remove("hidden");

    // Reset the portal animation
    portalContainer.classList.remove("animate-collapse");

    // UNHIDE the controls so the user can start again if they want
    controls.classList.remove("hidden");
    exitPortalCross.classList.remove("hidden");
  });
});

// Ensure portal video plays on mobile
const portalVideo = document.getElementById("portalVideo");

// Attempt to play video explicitly on load
window.addEventListener("DOMContentLoaded", () => {
  if (portalVideo.paused) {
    portalVideo.muted = true; // Ensure muted
    portalVideo.play().catch((error) => {
      console.warn("Autoplay failed. User interaction may be required.", error);
    });
  }
});

// Fallback for user interaction (optional)
portalVideo.addEventListener("click", () => {
  if (portalVideo.paused) {
    portalVideo.play().catch((error) => {
      console.error("Playback failed on user interaction.", error);
    });
  }
});

// theFuture

const slider = document.querySelector('.slider');

function activate(e) {
  const items = document.querySelectorAll('.item');
  e.target.matches('.next') && slider.append(items[0])
  e.target.matches('.prev') && slider.prepend(items[items.length-1]);
}

document.addEventListener('click',activate,false);
