export function startSession({
  access_token,
  customer_id,
  customer_name,
  api_key,
}: {
  access_token: string;
  customer_id: string;
  customer_name: string;
  api_key: string;
}) {
  localStorage.setItem("access_token", access_token);
  localStorage.setItem("customer_id", customer_id);
  localStorage.setItem("customer_name", customer_name);
  localStorage.setItem("google_maps_api_key", api_key);
}

export function endSession() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("customer_id");
  localStorage.removeItem("customer_name");
  localStorage.removeItem("google_maps_api_key");
}

export function isLoggedIn(): boolean {
  return !!localStorage.getItem("access_token");
}
