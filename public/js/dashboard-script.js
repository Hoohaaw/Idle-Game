document.addEventListener("DOMContentLoaded", () => {
    console.log("Script loaded!");
  
    document.querySelectorAll("button").forEach((element) => {
      element.addEventListener("click", () => {
        console.log(`Clicked ${element.id || "no-id"}`);
      });
    });
  });
  