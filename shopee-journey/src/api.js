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
  return quests === undefined ? [] : quests;
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
    window.localStorage.setItem("quests", JSON.stringify(updatedQuests));
  }
}
