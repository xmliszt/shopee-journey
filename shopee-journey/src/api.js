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

export function getTodayQuests() {
  return JSON.parse(window.localStorage.getItem('quests'));
}

export function getLevelInfo() {
  return JSON.parse(window.localStorage.getItem('levels'));
}

export function getProfileInfo() {
  return JSON.parse(window.localStorage.getItem('profile'));
}



