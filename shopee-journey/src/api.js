// Methods to connect with public APIs

// An example API function
export async function getFoo() {
  let response = fetch();
  if (response.ok) {
    let json = await response.json();
    return {
      success: true,
      data: json,
    };
  } else {
    return {
      success: false,
      error: "Sample error",
    };
  }
}


// Quests API
export function getTodayQuests() {
  let quests = JSON.parse(window.localStorage.getItem("quests"));
  return quests === null ? [] : quests;
}

export function startQuest(questID) {
  let quests = JSON.parse(window.localStorage.getItem("quests"));
  if (quests) {
    let updatedQuests = [];
    for (let quest of quests) {
      if (quest.questID === questID) {
        quest.startedOn = new Date().toISOString();
      }
      updatedQuests.push(quest);
    }
    window.localStorage.Item("quests", JSON.stringify(updatedQuests));
  }
}

// Levels API

export function getLevelInfo() {
  return JSON.parse(window.localStorage.getItem("levels"));
}

// Profile API

export function getProfileInfo() {
  return JSON.parse(window.localStorage.getItem("profile"));
}

export function addScore(toAdd) {
  let profile = JSON.parse(window.localStorage.getItem("profile"));
  let newScore = profile['score'] + toAdd;
  let currentLevel = profile['level'];
  let nextScore = JSON.parse(window.localStorage.getItem("levels"))[currentLevel]['score'];
  if (newScore > nextScore){
    newScore -= nextScore;
    profile['score'] = newScore;
    profile['level'] += 1 ;
    window.localStorage.setItem("profile", JSON.stringify(profile));
  } else {
    profile['score'] = newScore;
    window.localStorage.setItem("profile", JSON.stringify(profile));
  }
}
