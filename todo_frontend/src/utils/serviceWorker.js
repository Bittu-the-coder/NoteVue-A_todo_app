// This optional code is used to register a service worker.
// register() is not called by default.

// This will work together with the vite-plugin-pwa you already have configured
// to ensure your app can be installed as a PWA and works offline

/**
 * Register the service worker that includes caching and offline support
 */
export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch(error => {
          console.error('Service Worker registration failed:', error);
        });
    });
  }
}

/**
 * Add this to notify users that the app has new content available
 * and needs to be refreshed
 */
export function setupServiceWorkerUpdateNotification() {
  if ('serviceWorker' in navigator) {
    let refreshing = false;
    // When the SW detects a new version and updates
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (refreshing) return;
      refreshing = true;
      window.location.reload(); // Reload the page when a new version is available
    });
  }
}
