// import MissionController from "../../src/controllers/MissionController.js"
// import express from "express";

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".mission-button").forEach((element) => {
    element.addEventListener("click", () => {
      showMissionModal(element.id);
    });
  });

  const paginationButtons = document.getElementById("world-pagination").querySelectorAll("button");
  paginationButtons.forEach((button) => {
    button.addEventListener("click", () => {
      console.log(`Button ${button.id} clicked!`);
      togglePagination(button.id);
    });
  });
});

const mapOne = document.getElementById("map-one")
const mapTwo = document.getElementById("map-two")
const mapThree = document.getElementById("map-three")
const mapFour = document.getElementById("map-four")

const paginationOne = document.getElementById("pagination-1");
const paginationTwo = document.getElementById("pagination-2");
const paginationThree = document.getElementById("pagination-3");
const paginationFour = document.getElementById("pagination-4");

mapTwo.style.display = "none";
mapThree.style.display = "none";
mapFour.style.display = "none";



function fireMissionEvent(missionID) {
    const missionNames = {
        "mission-one": "Mission 1",
        "mission-two": "Mission 2",
        "mission-three": "Mission 3",
        "mission-four": "Mission 4",
        "mission-five": "Mission 5",
        "mission-six": "Mission 6",
        "Map-one-boss": "Final Boss",
        
        "mission-seven": "Mission 7",
        "mission-eight": "Mission 8",
        "mission-nine": "Mission 9",
        "mission-ten": "Mission 10",
        "mission-eleven": "Mission 11",
        "mission-twelve": "Mission 12",
        "Map-two-boss": "Map Two Boss",

        "mission-thirteen": "Mission 13",
        "mission-fourteen": "Mission 14",
        "mission-fifteen": "Mission 15",
        "mission-sixteen": "Mission 16",
        "mission-seventeen": "Mission 17",
        "mission-eighteen": "Mission 18",
        "Map-three-boss": "Map Three Boss",

        "mission-nineteen": "Mission 19",
        "mission-twenty": "Mission 20",
        "mission-twenty-one": "Mission 21",
        "mission-twenty-two": "Mission 22",
        "mission-twenty-three": "Mission 23",
        "mission-twenty-four": "Mission 24",
        "Map-four-boss": "Map Four Boss",
    };

    if (missionNames[missionID]) {
        console.log(`${missionNames[missionID]} fired!`);
        addMissionToContainer(missionID);
    } else {
        console.log("No valid mission ID provided!");
    }
}


// Define mission durations in seconds
const missionDurations = {
  "mission-one": 1,
  "mission-two": 50,
  "mission-three": 120,
  "mission-four": 180,
  "mission-five": 260,
  "mission-six": 360,

  "mission-seven": 300,
  "mission-eight": 600,
  "mission-nine": 900,
  "mission-ten": 1200,
  "mission-eleven": 1500,
  "mission-twelve": 1800,

  "mission-thirteen": 600,
  "mission-fourteen": 1200,
  "mission-fifteen": 1800,
  "mission-sixteen": 2400,
  "mission-seventeen": 3000,
  "mission-eighteen": 3600,

  "mission-nineteen": 900,
  "mission-twenty": 1800,
  "mission-twenty-one": 2700,
  "mission-twenty-two": 3600,
  "mission-twenty-three": 4500,
  "mission-twenty-four": 5400,

  "Map-one-boss": 600,
  "Map-two-boss": 3600,
  "Map-three-boss": 7200,
  "Map-four-boss": 18000
};

function addMissionToContainer(missionID) {
  const missionContainer = document.getElementById("missions");

  // Check if mission already exists
  const existingMission = Array.from(missionContainer.children).find(
    (element) => element.querySelector("h2").textContent === missionID
  );
  
  if (existingMission) { // Don't add duplicate mission
    console.log(`Mission ${missionID} already exists. Skipping add.`);
    return; 
  }

  const duration = missionDurations[missionID];
  if (duration === undefined) {
    console.error(`No duration set for missionID: ${missionID}`);
    return;
  }

  const missionElement = document.createElement("div");
  missionElement.classList.add("mission-item");

  missionElement.innerHTML = `
    <h2>${missionID}</h2>
    <p>Reward: ${missionID} reward.</p>
    <p>Timer: <span class="timer">${formatTime(duration)}</span></p>
  `;

  missionContainer.appendChild(missionElement);

  const timerElement = missionElement.querySelector(".timer");
  let timeLeft = duration;

  const interval = setInterval(() => {
    timeLeft--;
    timerElement.textContent = formatTime(timeLeft);

    if (timeLeft <= 0) {
      clearInterval(interval);
      timerElement.textContent = "Complete!";
      missionElement.classList.add("clickable");
      missionElement.addEventListener("click", () => {
        showRewardModal(missionID);
      }), {once: true};
    }
  }, 1000);
}


function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hours.toString().padStart(2, '0')}:` +
         `${mins.toString().padStart(2, '0')}:` +
         `${secs.toString().padStart(2, '0')}`;
}


function togglePagination(buttonPressed) {
    if (buttonPressed === "pagination-1") {
        console.log("Pagination 1 clicked! from togglePagination");

        paginationOne.classList.remove("selected");
        paginationTwo.classList.remove("selected");
        paginationThree.classList.remove("selected");
        paginationFour.classList.remove("selected");

        paginationOne.classList.add("selected");

        mapOne.style.display = "block";
        mapTwo.style.display = "none";
        mapThree.style.display = "none";
        mapFour.style.display = "none";
    }
    if (buttonPressed === "pagination-2") {
        console.log("Pagination 2 clicked! from togglePagination");

        paginationOne.classList.remove("selected");
        paginationTwo.classList.remove("selected");
        paginationThree.classList.remove("selected");
        paginationFour.classList.remove("selected");

        paginationTwo.classList.add("selected");

        mapOne.style.display= "none";
        mapTwo.style.display = "block";
        mapThree.style.display = "none";
        mapFour.style.display = "none";
    }
    if (buttonPressed === "pagination-3") {
        console.log("Pagination 3 clicked! from togglePagination");

        paginationOne.classList.remove("selected");
        paginationTwo.classList.remove("selected");
        paginationThree.classList.remove("selected");
        paginationFour.classList.remove("selected");

        paginationThree.classList.add("selected");

        mapOne.style.display= "none";
        mapTwo.style.display = "none";
        mapThree.style.display = "block";
        mapFour.style.display = "none";
    }
    if (buttonPressed === "pagination-4") {
        console.log("Pagination 4 clicked! from togglePagination");
        
        paginationOne.classList.remove("selected");
        paginationTwo.classList.remove("selected");
        paginationThree.classList.remove("selected");
        paginationFour.classList.remove("selected");

        paginationFour.classList.add("selected");

        mapOne.style.display= "none";
        mapTwo.style.display = "none";
        mapThree.style.display = "none";
        mapFour.style.display = "block";
    }}
    document.getElementById("close-reward").addEventListener("click", () => {
  document.getElementById("reward-modal").classList.add("hidden");
});

function removeMission(missionID) {
  const missionContainer = document.getElementById("missions");
  const missionElement = Array.from(missionContainer.children).find(
    (element) => element.querySelector("h2").textContent === missionID
  );

  if (missionElement) {
    missionContainer.removeChild(missionElement);
  } else {
    console.error(`Mission ${missionID} not found in the container.`);
  }
}


function showRewardModal(missionID) {
  const modal = document.getElementById("reward-modal");
  const title = document.getElementById("reward-title");
  const message = document.getElementById("reward-message");
    const closeButton = document.getElementById("close-reward");

  title.textContent = `${missionID} Complete!`;
  message.textContent = `You earned rewards from ${missionID}!`;

  modal.classList.remove("hidden");

  closeButton.addEventListener("click", () => {
    removeMission(missionID);
    modal.classList.add("hidden");
  });
}


function showMissionModal(missionID) {
  const modal = document.getElementById("mission-modal");
  const title = document.getElementById("mission-title");
  const reward = document.getElementById("mission-reward");
  const message = document.getElementById("mission-description");
  const closeButton = document.getElementById("close-mission");
  const startButton = document.getElementById("start-mission");

  title.textContent = `${missionID}`;
  message.textContent = `A coin earning mission for you! Complete the mission to earn rewards.`;
  reward.innerHTML = `Rewards: <br>Copper coins: 13<br>Silver coins: 7<br>Gold coins: 3<br>Platinum coins: 1`;

  modal.classList.remove("hidden");

  closeButton.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

const newStartButton = startButton.cloneNode(true);
startButton.parentNode.replaceChild(newStartButton, startButton);

newStartButton.addEventListener("click", () => {
  fireMissionEvent(missionID);
  modal.classList.add("hidden");
  console.log(`Mission ${missionID} fired!`);
});
}

// async function startMissionDatabase(req, res, next, missionID) {
//   req.params = {
//     missionId: missionID
//   };
//   req.body = {
//     missionData: {
//       description: `Details about Mission ${missionID}.`,
//       reward: `${missionID} reward.`,
//       duration: missionDurations[missionID]
//     }
//   };
// }

document.getElementById("mission-database").addEventListener("click", () => {
  const missionID = document.getElementById("mission-database").dataset.missionId;

  const missionData = {
    description: "Rescue the princess", // example
    reward: 1000,
    duration: 60
  };

  fetch(`/missions/start/${missionID}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    credentials: "include",
    body: JSON.stringify({ missionData })
  })
    .then(res => res.json())
    .then(data => {
      console.log(data.message);
    })
    .catch(err => {
      console.error("Mission start failed:", err);
    });
});

