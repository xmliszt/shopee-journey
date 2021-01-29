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
      error: 'Sample error',
    };
  }
}

// Quests API
export function getTodayQuests() {
  let quests = JSON.parse(window.localStorage.getItem('quests'));
  return quests === null ? [] : quests;
}

export function startQuest(questID) {
  let quests = JSON.parse(window.localStorage.getItem('quests'));
  if (quests) {
    let updatedQuests = [];
    for (let quest of quests) {
      if (quest.questID === questID) {
        quest.startedOn = new Date().toISOString();
      }
      updatedQuests.push(quest);
    }
    window.localStorage.setItem('quests', JSON.stringify(updatedQuests));
  }
}

export function endQuest(questID) {
  let quests = JSON.parse(window.localStorage.getItem('quests'));
  if (quests) {
    let updatedQuests = [];
    for (let quest of quests) {
      if (quest.questID === questID) {
        quest.isDone = true;
      }
      updatedQuests.push(quest);
    }
    window.localStorage.setItem('quests', JSON.stringify(updatedQuests));
  }
}

// Levels API

export function getLevelInfo() {
  return JSON.parse(window.localStorage.getItem('levels'));
}

// Profile API

export function getProfileInfo() {
  return JSON.parse(window.localStorage.getItem('profile'));
}

export function addScore(toAdd) {
  let profile = JSON.parse(window.localStorage.getItem('profile'));
  profile['score'] += toAdd;
  if (profile) {
    let levels_data = JSON.parse(window.localStorage.getItem('levels'));
    let newScore = profile['score'];
    let currentLevel = profile['level'];
    let nextScore = levels_data[currentLevel]['score'];
    let levels_key = Object.keys(levels_data);
    let maxScore = levels_data[levels_key[levels_key.length - 1]]['score'];
    if (newScore >= maxScore) {
      profile['score'] = maxScore;
    } else {
      while (newScore > nextScore) {
        if (currentLevel < Object.keys(levels_data).length) {
          currentLevel += 1;
        }
        nextScore = levels_data[currentLevel]['score'];
      }
    }
    profile['level'] = currentLevel;
    window.localStorage.setItem('profile', JSON.stringify(profile));
  }
}
