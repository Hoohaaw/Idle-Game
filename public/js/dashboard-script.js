document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("button").forEach((element) => {
      element.addEventListener("click", () => {
        fireMissionEvent(element.id);
      });
    });
  });

document.addEventListener("DOMContentLoaded", () => {
    const paginationButtons = document.getElementById("world-pagination").querySelectorAll("button");
    paginationButtons.forEach((button) => {
        button.addEventListener("click", () => {
            console.log(`Button ${button.id} clicked!`);
            togglePagination(button.id);
        });
    }
    );
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


function addMissionToContainer (missionID) {
  const missionContainer = document.getElementById("missions");
  const missionElement = document.createElement("div");
  missionElement.classList.add("mission-item");
  missionElement.innerHTML = `<h2>${missionID}</h2><p>Reward:  ${missionID} reward.</p><p>Timer:  "Timer here"</p>`;
  missionContainer.appendChild(missionElement);
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
    }


}