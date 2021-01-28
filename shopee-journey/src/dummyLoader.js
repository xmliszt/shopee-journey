import * as dummyData from "./data";

export default function loadDummyData() {
  console.log("dummy data loaded")
  let levels = dummyData.levels;
  let profile = dummyData.profile;
  let quests = dummyData.quests;

  if (window.localStorage.getItem("levels") === null) {
    window.localStorage.setItem("levels", JSON.stringify(levels));
  }
  if (window.localStorage.getItem("profile") === null) {
    window.localStorage.setItem("profile", JSON.stringify(profile));
  }
  if (window.localStorage.getItem("quests") === null) {
    window.localStorage.setItem("quests", JSON.stringify(quests));
  }
}
