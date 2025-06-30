/**
 * 🔧 WebCrypto 3D Powerball Generator - Service Worker
 * PWA functionality for offline support and caching
 */

const CACHE_NAME = 'webcrypto-powerball-v1.0.1';
const STATIC_CACHE_NAME = 'webcrypto-static-v1.0.1';
const DYNAMIC_CACHE_NAME = 'webcrypto-dynamic-v1.0.1';

// Files to cache for offline functionality
const STATIC_ASSETS = [
    './',
    './index.html',
    './manifest.json',
    './js/three-engine.js',
    './icons/icon-72.png',
    './icons/icon-96.png',
    './icons/icon-144.png',
    './icons/icon-192.png',
    './icons/icon-512.png',
    './icons/favicon.ico'
];


// Network-first resources (always try network first)
const NETWORK_FIRST_PATTERNS = [
    /\/api\//,
    /\.json$/,
    /\/data\//
];

// Cache-first resources (serve from cache if available)
const CACHE_FIRST_PATTERNS = [
    /\.css$/,
    /\.js$/,
    /\.png$/,
    /\.jpg$/,
    /\.svg$/,
    /\.woff2?$/
];

/**
 * Service Worker Installation
 */
self.addEventListener('install', (event) => {
    console.log('🔧 Service Worker installing...');
    
    event.waitUntil(
        caches.open(STATIC_CACHE_NAME)
            .then((cache) => {
                console.log('📦 Caching static assets...');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => {
                console.log('✅ Static assets cached successfully');
                // Force the waiting service worker to become the active service worker
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('❌ Failed to cache static assets:', error);
            })
    );
});

/**
 * Service Worker Activation
 */
self.addEventListener('activate', (event) => {
    console.log('🔧 Service Worker activating...');
    
    event.waitUntil(
        Promise.all([
            // Clean up old caches
            caches.keys().then((cacheNames) => {
                return Promise.all(
                    cacheNames
                        .filter((cacheName) => {
                            return cacheName !== STATIC_CACHE_NAME && 
                                   cacheName !== DYNAMIC_CACHE_NAME;
                        })
                        .map((cacheName) => {
                            console.log('🗑️ Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        })
                );
            }),
            
            // Take control of all clients
            self.clients.claim()
        ])
        .then(() => {
            console.log('✅ Service Worker activated successfully');
        })
    );
});

/**
 * Fetch Event Handler
 */
self.addEventListener('fetch', (event) => {
    const request = event.request;
    const url = new URL(request.url);
    
    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }
    
    // Skip Chrome extension requests
    if (url.protocol === 'chrome-extension:') {
        return;
    }
    
    // Handle different types of requests
    if (shouldUseNetworkFirst(url.pathname)) {
        event.respondWith(networkFirstStrategy(request));
    } else if (shouldUseCacheFirst(url.pathname)) {
        event.respondWith(cacheFirstStrategy(request));
    } else {
        event.respondWith(staleWhileRevalidateStrategy(request));
    }
});

/**
 * Network First Strategy
 * Try network first, fallback to cache
 */
async function networkFirstStrategy(request) {
    try {
        // Try network first
        const networkResponse = await fetch(request);
        
        // If successful, update cache and return response
        if (networkResponse.ok) {
            const cache = await caches.open(DYNAMIC_CACHE_NAME);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.log('🌐 Network failed, trying cache for:', request.url);
        
        // Fallback to cache
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        // If no cache, return offline page or error
        return createOfflineResponse(request);
    }
}

/**
 * Cache First Strategy
 * Serve from cache if available, otherwise fetch from network
 */
async function cacheFirstStrategy(request) {
    // Try cache first
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
        return cachedResponse;
    }
    
    try {
        // Fallback to network
        const networkResponse = await fetch(request);
        
        // Cache the response for future use
        if (networkResponse.ok) {
            const cache = await caches.open(STATIC_CACHE_NAME);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        return createOfflineResponse(request);
    }
}

/**
 * Stale While Revalidate Strategy
 * Serve from cache immediately, update cache in background
 */
async function staleWhileRevalidateStrategy(request) {
    const cache = await caches.open(DYNAMIC_CACHE_NAME);
    const cachedResponse = await cache.match(request);
    
    // Fetch fresh version in background
    const fetchPromise = fetch(request).then((networkResponse) => {
        if (networkResponse.ok) {
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    });
    
    // Return cached version immediately, or wait for network if no cache
    return cachedResponse || fetchPromise;
}

/**
 * Check if URL should use network-first strategy
 */
function shouldUseNetworkFirst(pathname) {
    return NETWORK_FIRST_PATTERNS.some(pattern => pattern.test(pathname));
}

/**
 * Check if URL should use cache-first strategy
 */
function shouldUseCacheFirst(pathname) {
    return CACHE_FIRST_PATTERNS.some(pattern => pattern.test(pathname));
}

/**
 * Create offline response for failed requests
 */
function createOfflineResponse(request) {
    const url = new URL(request.url);
    
    // For HTML requests, return offline page
    if (request.headers.get('accept')?.includes('text/html')) {
        return new Response(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>🔐 WebCrypto Offline Mode</title>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                    body {
                        font-family: 'Segoe UI', system-ui, sans-serif;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                        text-align: center;
                        padding: 2rem;
                        min-height: 100vh;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        margin: 0;
                    }
                    .offline-icon {
                        font-size: 4rem;
                        margin-bottom: 1rem;
                        animation: spin 8s linear infinite;
                    }
                    @keyframes spin {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                    }
                    .offline-title {
                        font-size: 2rem;
                        margin-bottom: 1rem;
                        background: linear-gradient(45deg, #00d4ff, #ffd700);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                    }
                    .offline-message {
                        font-size: 1.1rem;
                        opacity: 0.9;
                        margin-bottom: 2rem;
                        max-width: 600px;
                        line-height: 1.5;
                    }
                    .retry-btn {
                        background: linear-gradient(45deg, #00d4ff, #ffd700);
                        border: none;
                        color: #1a1a1a;
                        padding: 1rem 2rem;
                        border-radius: 25px;
                        font-size: 1rem;
                        font-weight: bold;
                        cursor: pointer;
                        transition: transform 0.3s;
                    }
                    .retry-btn:hover {
                        transform: translateY(-2px);
                    }
                </style>
            </head>
            <body>
                <div class="offline-icon">🔐</div>
                <h1 class="offline-title">WebCrypto Offline Mode</h1>
                <p class="offline-message">
                    Your WebCrypto 3D Powerball generator has temporarily lost connection to the network. 
                    Don't worry - your hardware entropy is still secure! 
                    <br><br>
                    Please check your internet connection and try again.
                </p>
                <button class="retry-btn" onclick="location.reload()">
                    🔄 Reconnect Network
                </button>
                
                <script>
                    // Auto-retry when connection is restored
                    window.addEventListener('online', () => {
                        location.reload();
                    });
                </script>
            </body>
            </html>
        `, {
            status: 200,
            headers: {
                'Content-Type': 'text/html'
            }
        });
    }
    
    // For API requests, return JSON error
    if (request.headers.get('accept')?.includes('application/json')) {
        return new Response(JSON.stringify({
            error: 'Offline',
            message: 'WebCrypto 3D Powerball generator temporarily offline',
            crypto_status: 'disconnected',
            retry_after: '∞ seconds'
        }), {
            status: 503,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    
    // Generic offline response
    return new Response('🔐 WebCrypto Offline Mode', {
        status: 503,
        headers: {
            'Content-Type': 'text/plain'
        }
    });
}

/**
 * Background Sync for future feature
 */
self.addEventListener('sync', (event) => {
    if (event.tag === 'background-sync') {
        console.log('🔄 Background sync triggered');
        event.waitUntil(doBackgroundSync());
    }
});

/**
 * Background sync implementation
 */
async function doBackgroundSync() {
    try {
        // Here you could sync saved numbers, analytics, etc.
        console.log('📊 Performing background sync...');
        
        // Example: Send cached analytics data
        // await syncAnalyticsData();
        
        console.log('✅ Background sync completed');
    } catch (error) {
        console.error('❌ Background sync failed:', error);
    }
}

/**
 * Push notification handler (for future feature)
 */
self.addEventListener('push', (event) => {
    console.log('📬 Push notification received');
    
    let notificationData = {
        title: '🔐 WebCrypto Powerball',
        body: 'Your secure lottery numbers are ready!',
        icon: '/icons/icon-144.png',
        badge: '/icons/icon-144.png',
        tag: 'webcrypto-notification',
        data: {
            url: '/'
        }
    };
    
    if (event.data) {
        try {
            notificationData = { ...notificationData, ...event.data.json() };
        } catch (error) {
            console.error('❌ Failed to parse push data:', error);
        }
    }
    
    event.waitUntil(
        self.registration.showNotification(notificationData.title, notificationData)
    );
});

/**
 * Notification click handler
 */
self.addEventListener('notificationclick', (event) => {
    console.log('🔔 Notification clicked');
    
    event.notification.close();
    
    const urlToOpen = event.notification.data?.url || '/';
    
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true })
            .then((clientList) => {
                // Try to focus existing window
                for (const client of clientList) {
                    if (client.url === urlToOpen && 'focus' in client) {
                        return client.focus();
                    }
                }
                
                // Open new window if no existing window found
                if (clients.openWindow) {
                    return clients.openWindow(urlToOpen);
                }
            })
    );
});

/**
 * Message handler for communication with main app
 */
self.addEventListener('message', (event) => {
    console.log('💬 Message received from main app:', event.data);
    
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'GET_VERSION') {
        event.ports[0].postMessage({
            version: CACHE_NAME,
            timestamp: new Date().toISOString()
        });
    }
    
    if (event.data && event.data.type === 'CLEAR_CACHE') {
        event.waitUntil(
            caches.keys().then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => caches.delete(cacheName))
                );
            }).then(() => {
                event.ports[0].postMessage({ success: true });
            })
        );
    }
});

/**
 * Error handler
 */
self.addEventListener('error', (event) => {
    console.error('❌ Service Worker error:', event.error);
});

/**
 * Unhandled rejection handler
 */
self.addEventListener('unhandledrejection', (event) => {
    console.error('❌ Service Worker unhandled rejection:', event.reason);
});

console.log('🔧 Service Worker loaded successfully');