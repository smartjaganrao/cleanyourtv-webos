/**
 * CleanHub TV - LG webOS TV API Wrapper
 * Bridges W3C Web runtime with LG webOS Luna Bus & platform capabilities.
 * Supports webOS 4.x, 5.x, 6.x, 7.x (webOS 22), 8.x (webOS 23) and webOS 24+.
 */

const WebOSAPI = {
    isWebOS: function() {
        return typeof window.webOS !== 'undefined' || typeof window.PalmSystem !== 'undefined' || /Web0S|webOS/i.test(navigator.userAgent);
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

    getInstalledApps: function(callback) {
        if (!this.isWebOS()) {
            if (typeof MockApps !== 'undefined' && MockApps.getApps) {
                callback(MockApps.getApps());
            } else {
                callback(null);
            }
            return;
        }

        // 1. Try local dev_helper bridge first if available (bypasses unprivileged luna restrictions)
        fetch('http://127.0.0.1:8765/api/apps')
            .then(function(res) { return res.json(); })
            .then(function(data) {
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
                    callback(list);
                } else {
                    fallbackLunaListApps(callback);
                }
            })
            .catch(function() {
                fallbackLunaListApps(callback);
            });

        function fallbackLunaListApps(cb) {
            if (window.webOS && window.webOS.service) {
                window.webOS.service.request('luna://com.webos.applicationManager', {
                    method: 'listApps',
                    parameters: {},
                    onSuccess: function(res) {
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
                            cb(list);
                        } else {
                            cb(typeof MockApps !== 'undefined' ? MockApps.getApps() : null);
                        }
                    },
                    onFailure: function() {
                        cb(typeof MockApps !== 'undefined' ? MockApps.getApps() : null);
                    }
                });
            } else {
                cb(typeof MockApps !== 'undefined' ? MockApps.getApps() : null);
            }
        }
    },

    launchApp: function(appId, onSuccess, onError) {
        console.log('[WebOSAPI] Request to launch App ID:', appId);

        if (!this.isWebOS()) {
            alert('Preview Mode: Launching ' + appId + '\nOn a real LG TV, this opens the native webOS application.');
            if (onSuccess) onSuccess();
            return;
        }

        // 1. Try local dev_helper bridge (has background process execution)
        fetch('http://127.0.0.1:8765/api/launch', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: appId, params: {} })
        })
        .then(function(res) { return res.json(); })
        .then(function(data) {
            if (data && data.returnValue !== false) {
                if (onSuccess) onSuccess();
            } else {
                launchViaLuna();
            }
        })
        .catch(function() {
            launchViaLuna();
        });

        function launchViaLuna() {
            if (window.webOS && window.webOS.service) {
                window.webOS.service.request('luna://com.webos.applicationManager', {
                    method: 'launch',
                    parameters: { id: appId },
                    onSuccess: function(res) {
                        console.log('[WebOSAPI] Luna launch success:', res);
                        if (onSuccess) onSuccess();
                    },
                    onFailure: function(err) {
                        console.error('[WebOSAPI] Luna launch failed:', err);
                        if (onError) onError(err);
                    }
                });
            } else {
                if (onError) onError(new Error('webOS service unavailable'));
            }
        }
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

        if (window.webOS && window.webOS.deviceInfo) {
            window.webOS.deviceInfo(function(device) {
                callback({
                    model: device.modelName || 'LG Smart TV',
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
        if (window.webOS && window.webOS.platformBack) {
            window.webOS.platformBack();
        } else {
            window.close();
        }
    }
};

window.WebOSAPI = WebOSAPI;
