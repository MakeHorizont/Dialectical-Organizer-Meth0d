import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Registration of the Service Worker for PWA functionality
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    let swUrl = './service-worker.js';
    
    try {
      // CRITICAL FIX: Try to construct an absolute URL based on window.location
      // to bypass any <base> tags that might misdirect the relative path.
      // We wrap this in try/catch because in some sandboxed environments (like specific iframes),
      // window.location.href might not be a valid base for the URL constructor.
      swUrl = new URL('service-worker.js', window.location.href).href;
    } catch (e) {
      console.warn('Could not construct absolute Service Worker URL, falling back to relative path.', e);
    }

    navigator.serviceWorker.register(swUrl)
      .then((registration) => {
        console.log('Comrade ServiceWorker registered with scope:', registration.scope);
      })
      .catch((error) => {
        console.log('ServiceWorker registration failed or skipped:', error);
      });
  });
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);