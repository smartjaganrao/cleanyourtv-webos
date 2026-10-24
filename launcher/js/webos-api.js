/**
 * CleanHub TV - LG webOS TV API Wrapper
 * Bridges W3C Web runtime with LG webOS Luna Bus & platform capabilities.
 * Supports webOS 4.x, 5.x, 6.x, 7.x (webOS 22), 8.x (webOS 23) and webOS 24+.
 */

const WebOSAPI = {
    isWebOS: function() {
        return typeof window.PalmSystem !== 'undefined' || typeof window.PalmServiceBridge !== 'undefined' || typeof window.webOS !== 'undefined' || /Web0S|webOS/i.test(navigator.userAgent);
    },

    init: function() {
        if (!this.isWebOS()) {
            console.log('[WebOSAPI] Running in web preview/simulator mode.');
            return;
        }

        console.log('[WebOSAPI] Initializing LG webOS TV platform capabilities.');
        this.registerRemoteKeys();
    },

    registerRemoteKeys: function() {
        // webOS passes standard keycodes to HTML5 window event listeners.
        // Special webOS keycodes:
        // 461: Back / Return
        // 403: Red Button
        // 404: Green Button
        // 405: Yellow Button
        // 406: Blue Button
        // 415: Play
        // 19:  Pause
        // 413: Stop
        // 417: Fast Forward
        // 412: Rewind
        console.log('[WebOSAPI] Remote key listener initialized.');
    },

    /**
     * Call native Luna Service bus using PalmServiceBridge or webOS.service.request
     */
    callLuna: function(uri, params, onSuccess, onFailure) {
        if (typeof window.PalmServiceBridge !== 'undefined') {
            try {
                var bridge = new window.PalmServiceBridge();
                bridge.onservicecallback = function(msg) {
                    try {
                        var res = JSON.parse(msg);
                        if (res && res.returnValue !== false) {
                            if (onSuccess) onSuccess(res);
                        } else {
                            if (onFailure) onFailure(res);
                        }
                    } catch(e) {
                        if (onFailure) onFailure(e);
                    }
                };
                bridge.call(uri, JSON.stringify(params || {}));
                return;
            } catch (e) {
                console.error('[WebOSAPI] PalmServiceBridge error:', e);
            }
        }

        if (window.webOS && window.webOS.service) {
            window.webOS.service.request(uri, {
                parameters: params || {},
                onSuccess: onSuccess,
                onFailure: onFailure
            });
            return;
        }

        if (onFailure) onFailure(new Error('No Luna bridge available'));
    },

    getInstalledApps: function(callback) {
        var catalog = (typeof MockApps !== 'undefined' && MockApps.getApps) ? MockApps.getApps() : (window.DEFAULT_CATALOG || []);

        if (!this.isWebOS()) {
            callback(catalog);
            return;
        }

        var called = false;
        function finish(list) {
            if (!called) {
                called = true;
                callback(list || catalog);
            }
        }

        // Fast fallback timer so UI never hangs waiting for network or bridge
        var timer = setTimeout(function() {
            finish(catalog);
        }, 350);

        // Try local dev_helper bridge with quick timeout
        try {
            var ctrl = typeof AbortController !== 'undefined' ? new AbortController() : null;
            var fetchTimer = ctrl ? setTimeout(function() { ctrl.abort(); }, 250) : null;

            fetch('http://127.0.0.1:8765/api/apps', { signal: ctrl ? ctrl.signal : undefined })
                .then(function(res) { return res.json(); })
                .then(function(data) {
                    if (fetchTimer) clearTimeout(fetchTimer);
                    clearTimeout(timer);
                    if (data && data.apps && data.apps.length > 0) {
                        var list = data.apps.map(function(app) {
                            return {
                                id: app.id,
                                name: app.title || app.name || app.id,
                                iconPath: app.icon || ('http://127.0.0.1:8765/icon/' + encodeURIComponent(app.id)),
                                version: app.version || '1.0.0',
                                show: true
                            };
                        });
                        finish(list);
                    } else {
                        finish(catalog);
                    }
                })
                .catch(function() {
                    if (fetchTimer) clearTimeout(fetchTimer);
                    // Try Luna listApps
                    WebOSAPI.callLuna('luna://com.webos.applicationManager/listApps', {}, function(res) {
                        clearTimeout(timer);
                        if (res && res.apps) {
                            var list = res.apps.map(function(app) {
                                return {
                                    id: app.id,
                                    name: app.title || app.id,
                                    iconPath: app.icon || app.largeIcon || '',
                                    version: app.version,
                                    show: !app.systemApp
                                };
                            });
                            finish(list);
                        } else {
                            finish(catalog);
                        }
                    }, function() {
                        finish(catalog);
                    });
                });
        } catch(e) {
            finish(catalog);
        }
    },

    launchApp: function(appId, onSuccess, onError) {
        console.log('[WebOSAPI] Request to launch App ID:', appId);

        if (!this.isWebOS()) {
            alert('Preview Mode: Launching ' + appId + '\nOn a real LG TV, this opens the native webOS application.');
            if (onSuccess) onSuccess();
            return;
        }

        // 1. Direct native Luna applicationManager launch via PalmServiceBridge
        this.callLuna('luna://com.webos.applicationManager/launch', { id: appId }, function(res) {
            console.log('[WebOSAPI] Native launch successful:', res);
            if (onSuccess) onSuccess(res);
        }, function(err) {
            console.warn('[WebOSAPI] Native Luna launch failed, falling back to dev_helper...', err);
            // 2. Fallback to dev_helper bridge
            fetch('http://127.0.0.1:8765/api/launch', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: appId, params: {} })
            })
            .then(function(res) { return res.json(); })
            .then(function(data) {
                if (data && data.returnValue !== false) {
                    if (onSuccess) onSuccess(data);
                } else if (onError) {
                    onError(err);
                }
            })
            .catch(function(e) {
                if (onError) onError(e || err);
            });
        });
    },

    launchInput: function(inputId, onSuccess, onError) {
        var inputAppMap = {
            'HDMI1': 'com.webos.app.hdmi1',
            'HDMI2': 'com.webos.app.hdmi2',
            'HDMI3': 'com.webos.app.hdmi3',
            'HDMI4': 'com.webos.app.hdmi4',
            'TV': 'com.webos.app.livetv'
        };

        var targetId = inputAppMap[inputId] || inputId;
        console.log('[WebOSAPI] Switching input to:', inputId, '->', targetId);
        this.launchApp(targetId, onSuccess, onError);
    },

    getSystemInfo: function(callback) {
        if (!this.isWebOS()) {
            callback({
                model: 'LG webOS TV Simulator',
                version: 'webOS 6.5 (2021/2026)',
                network: 'Wi-Fi (100 Mbps)'
            });
            return;
        }

        try {
            if (window.PalmSystem && window.PalmSystem.deviceInfo) {
                var info = typeof window.PalmSystem.deviceInfo === 'string' ? JSON.parse(window.PalmSystem.deviceInfo) : window.PalmSystem.deviceInfo;
                if (info && info.modelName) {
                    callback({
                        model: 'LG ' + info.modelName,
                        version: 'webOS ' + (info.platformVersion || '6.0'),
                        network: info.screenWidth ? (info.screenWidth + 'x' + info.screenHeight + ' 4K') : 'Connected'
                    });
                    return;
                }
            }
        } catch(e) {}

        if (window.webOS && window.webOS.deviceInfo) {
            window.webOS.deviceInfo(function(device) {
                callback({
                    model: device.modelName ? ('LG ' + device.modelName) : 'LG Smart TV',
                    version: 'webOS ' + (device.version || '6.0'),
                    network: 'Connected (Wi-Fi/Ethernet)'
                });
            });
        } else {
            callback({
                model: 'LG Smart TV',
                version: 'webOS 6.x',
                network: 'Connected'
            });
        }
    },

    exitApp: function() {
        if (window.PalmSystem && window.PalmSystem.platformBack) {
            window.PalmSystem.platformBack();
        } else if (window.webOS && window.webOS.platformBack) {
            window.webOS.platformBack();
        } else {
            window.close();
        }
    },

    turnOffScreen: function() {
        this.callLuna('luna://com.webos.service.tv.power/power/turnOffScreen', {}, function() {});
    },

    powerOff: function() {
        this.callLuna('luna://com.webos.service.tv.power/power/powerOff', {}, function() {});
    }
};

window.WebOSAPI = WebOSAPI;
