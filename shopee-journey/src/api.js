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