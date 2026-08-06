import axios from "axios";

// Initialize axios with build-time VITE_API_URL if present.
// If not present (e.g. static deploy without rebuild), we attempt to load a
// runtime config from `/config.json` and update the baseURL. This allows
// changing the backend URL without rebuilding the frontend.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || undefined,
});

// If no build-time baseURL, try to fetch runtime config and set baseURL.
(async function ensureBaseUrl() {
  if (api.defaults.baseURL) return;

  try {
    const res = await fetch("/config.json", { cache: "no-store" });
    if (!res.ok) return;
    const cfg = await res.json();
    if (cfg && cfg.VITE_API_URL) {
      api.defaults.baseURL = cfg.VITE_API_URL;
      console.info("api baseURL set from /config.json:", cfg.VITE_API_URL);
    }
  } catch (err) {
    console.warn("No runtime config found at /config.json", err);
  }
})();

export default api;