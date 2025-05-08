document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("button").forEach((element) => {
      element.addEventListener("click", () => {
        fireMissionEvent(element.id);
      });
    });
  });

function fireMissionEvent(missionID) {
    if (missionID === "mission-one") {
        console.log("Mission 1 fired!");
        addMissionToContainer(missionID);
    } else if (missionID === "mission-two") {
        console.log("Mission 2 fired!");
        addMissionToContainer(missionID);
    } else if (missionID === "mission-three") {
        console.log("Mission 3 fired!");
        addMissionToContainer(missionID);
    } else if (missionID === "mission-four") {
        console.log("Mission 4 fired!");
        addMissionToContainer(missionID);
    } else if (missionID === "mission-five") {
        console.log("Mission 5 fired!");
        addMissionToContainer(missionID);
    } else if (missionID === "mission-six") {
        console.log("Mission 6 fired!");
        addMissionToContainer(missionID);
    } else if (missionID === "Map-one-boss") {
        console.log("Final Boss fired!");
        addMissionToContainer(missionID);
    } else {
        console.log("No mission ID provided!");
    }
}

function addMissionToContainer (missionID) {
  const missionContainer = document.getElementById("missions");
  const missionElement = document.createElement("div");
  missionElement.classList.add("mission-item");
  missionElement.innerHTML = `<h2>${missionID}</h2><p>Reward:  ${missionID} reward.</p><p>Timer:  "Timer here"</p>`;
  missionContainer.appendChild(missionElement);

}