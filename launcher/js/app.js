/**
 * CleanHub TV Launcher Controller for LG webOS TV
 */

function initLauncher() {
    WebOSAPI.init();
    if (window.IPTVPlayer) IPTVPlayer.init();
    if (window.CCTVViewer) CCTVViewer.init();
    LauncherConfig.load();

    const state = {
        currentZone: 'DOCK', // 'TOP', 'DOCK', 'GRID', 'MODAL'
        dockIndex: 0,
        gridIndex: 0,
        topIndex: 0,
        modalIndex: 0,
        currentModal: null, // null, 'inputs', 'settings'
        activeGlow: 'rgba(229, 9, 20, 0.4)',
        idleTimer: null,
        isScreensaverActive: false,
        apps: []
    };

    // DOM Elements
    const ambientGlowEl = document.getElementById('ambient-glow');
    const focusedAppNameEl = document.getElementById('focused-app-name');
    const focusedAppDescEl = document.getElementById('focused-app-desc');
    const dockContainerEl = document.getElementById('dock-container');
    const appGridEl = document.getElementById('app-grid');
    const contentViewportEl = document.getElementById('content-viewport');
    const floatingFocusEl = document.getElementById('floating-focus');
    const inputsModalEl = document.getElementById('inputs-modal');
    const settingsModalEl = document.getElementById('settings-modal');
    const screensaverEl = document.getElementById('screensaver');

    const topActionBtns = Array.from(document.querySelectorAll('.glass-pill-btn'));

    // 1. Initialize Applications List
    function initApps() {
        // Immediate render of default catalog for zero-latency startup
        state.apps = (window.DEFAULT_CATALOG || (typeof MockApps !== 'undefined' ? MockApps.getApps() : [])).slice();
        renderDock();
        renderGrid();
        updateFocus();

        // Query platform in background to merge any newly discovered installed apps
        WebOSAPI.getInstalledApps(function(installedApps) {
            if (!installedApps || installedApps.length === 0) return;
            let catalog = (window.DEFAULT_CATALOG || []).slice();
            
            installedApps.forEach(function(inst) {
                const match = catalog.find(c => c.id === inst.id || c.aliasId === inst.id);
                if (match) {
                    match.name = inst.name || match.name;
                    if (inst.iconPath) match.icon = inst.iconPath;
                } else if (inst.show !== false) {
                    catalog.push({
                        id: inst.id,
                        name: inst.name || inst.id,
                        desc: 'Installed Application',
                        icon: inst.iconPath || window.APP_ICONS.browser,
                        color: 'rgba(100, 150, 255, 0.3)',
                        isDock: false
                    });
                }
            });

            state.apps = catalog;
            renderDock();
            renderGrid();
            updateFocus();
        });
    }

    function getFallbackIconSvg(app) {
        const letter = (app.name || 'A').charAt(0).toUpperCase();
        const color = app.color || '#3b82f6';
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160"><rect width="160" height="160" rx="36" fill="${color}"/><text x="80" y="105" font-family="-apple-system,system-ui,sans-serif" font-size="72" font-weight="700" fill="#ffffff" text-anchor="middle">${letter}</text></svg>`;
        return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    }

    // 2. Render Dock (Default 4-6 pinned apps)
    function renderDock() {
        dockContainerEl.innerHTML = '';
        const dockApps = state.apps.slice(0, LauncherConfig.settings.dockSize);
        dockApps.forEach(function(app, idx) {
            const card = document.createElement('div');
            card.className = 'app-card dock-card';
            card.setAttribute('data-app-id', app.id);
            card.setAttribute('data-index', idx);

            card.innerHTML = `
                <div class="app-icon-wrap">
                    <img class="app-icon" src="${app.icon}" alt="${app.name}">
                </div>
            `;

            const imgEl = card.querySelector('img.app-icon');
            imgEl.onerror = function() {
                this.onerror = null;
                this.src = getFallbackIconSvg(app);
            };

            card.addEventListener('click', function() {
                state.currentZone = 'DOCK';
                state.dockIndex = idx;
                updateFocus();
                launchFocusedApp();
            });

            dockContainerEl.appendChild(card);
        });
    }

    // 3. Render All Apps Grid
    function renderGrid() {
        appGridEl.innerHTML = '';
        state.apps.forEach(function(app, idx) {
            const card = document.createElement('div');
            card.className = 'app-card grid-card';
            card.setAttribute('data-app-id', app.id);
            card.setAttribute('data-index', idx);

            card.innerHTML = `
                <div class="app-icon-wrap">
                    <img class="app-icon" src="${app.icon}" alt="${app.name}">
                </div>
                <div class="card-caption">${app.name}</div>
            `;

            const imgEl = card.querySelector('img.app-icon');
            imgEl.onerror = function() {
                this.onerror = null;
                this.src = getFallbackIconSvg(app);
            };

            card.addEventListener('click', function() {
                state.currentZone = 'GRID';
                state.gridIndex = idx;
                updateFocus();
                launchFocusedApp();
            });

            appGridEl.appendChild(card);
        });
    }

    // 4. Update Focus and Visual Highlights
    function updateFocus() {
        // Clear all previous focus classes
        document.querySelectorAll('.focused').forEach(el => el.classList.remove('focused'));

        let focusedEl = null;
        let focusedApp = null;

        if (state.currentZone === 'TOP') {
            contentViewportEl.classList.remove('show-grid');
            if (topActionBtns[state.topIndex]) {
                focusedEl = topActionBtns[state.topIndex];
                focusedEl.classList.add('focused');
                const btnAction = focusedEl.getAttribute('data-action');
                focusedAppNameEl.textContent = focusedEl.querySelector('span').textContent;
                if (btnAction === 'arcade') {
                    focusedAppDescEl.textContent = '60fps Retro Classics & Custom ROM Player · Press OK';
                    setAmbientGlow('rgba(236, 72, 153, 0.45)');
                } else if (btnAction === 'livetv') {
                    focusedAppDescEl.textContent = 'Free Public Broadcasts from All Countries · Press OK to watch';
                    setAmbientGlow('rgba(56, 189, 248, 0.45)');
                } else if (btnAction === 'artmode') {
                    focusedAppDescEl.textContent = 'The Frame Mode · 4K Museum Masterpieces & Ambient Clock · Press OK';
                    setAmbientGlow('rgba(245, 158, 11, 0.45)');
                } else if (btnAction === 'music') {
                    focusedAppDescEl.textContent = '24/7 Commercial-Free Lo-Fi, Piano & Ambient Beats · Press OK';
                    setAmbientGlow('rgba(217, 119, 6, 0.45)');
                } else if (btnAction === 'sleep') {
                    focusedAppDescEl.textContent = '1-Click Bedtime Sleep Timer · Powers off TV automatically';
                    setAmbientGlow('rgba(147, 51, 234, 0.45)');
                } else if (btnAction === 'remote') {
                    focusedAppDescEl.textContent = 'Scan QR to control TV from your phone browser · No app needed';
                    setAmbientGlow('rgba(52, 211, 153, 0.45)');
                } else {
                    focusedAppDescEl.textContent = 'System Quick Action';
                    setAmbientGlow('rgba(255, 255, 255, 0.25)');
                }
            }
        } else if (state.currentZone === 'DOCK') {
            contentViewportEl.classList.remove('show-grid');
            const dockCards = dockContainerEl.querySelectorAll('.dock-card');
            if (dockCards[state.dockIndex]) {
                focusedEl = dockCards[state.dockIndex];
                focusedEl.classList.add('focused');
                focusedApp = state.apps[state.dockIndex];
            }
        } else if (state.currentZone === 'GRID') {
            if (state.gridIndex >= 10) {
                contentViewportEl.classList.add('show-grid');
            } else {
                contentViewportEl.classList.remove('show-grid');
            }
            const gridCards = appGridEl.querySelectorAll('.grid-card');
            if (gridCards[state.gridIndex]) {
                focusedEl = gridCards[state.gridIndex];
                focusedEl.classList.add('focused');
                focusedApp = state.apps[state.gridIndex];
            }
        } else if (state.currentZone === 'MODAL') {
            let activeModalEl = null;
            if (state.currentModal === 'inputs') activeModalEl = inputsModalEl;
            else if (state.currentModal === 'settings') activeModalEl = settingsModalEl;
            else if (state.currentModal === 'adfree-yt') activeModalEl = document.getElementById('adfree-yt-modal');
            else if (state.currentModal === 'remote') activeModalEl = document.getElementById('remote-modal');
            else if (state.currentModal === 'cinema') activeModalEl = document.getElementById('cinema-modal');
            else if (state.currentModal === 'diag') activeModalEl = document.getElementById('diag-modal');
            else if (state.currentModal === 'arcade') activeModalEl = document.getElementById('arcade-modal');
            else if (state.currentModal === 'gamepad') activeModalEl = document.getElementById('gamepad-modal');

            if (activeModalEl) {
                const modalItems = activeModalEl.querySelectorAll('.modal-nav-item');
                if (modalItems[state.modalIndex]) {
                    focusedEl = modalItems[state.modalIndex];
                    focusedEl.classList.add('focused');
                }
            }
        }

        if (focusedApp) {
            focusedAppNameEl.textContent = focusedApp.name;
            focusedAppDescEl.textContent = focusedApp.desc || 'Press OK to launch';
            setAmbientGlow(focusedApp.color || 'rgba(100, 150, 255, 0.35)');
        }

        // Align floating focus highlight
        if (focusedEl && state.currentZone !== 'MODAL') {
            const rect = focusedEl.getBoundingClientRect();
            floatingFocusEl.style.width = (rect.width + 12) + 'px';
            floatingFocusEl.style.height = (rect.height + 12) + 'px';
            floatingFocusEl.style.transform = `translate3d(${rect.left - 6}px, ${rect.top - 6}px, 0)`;
            floatingFocusEl.style.opacity = '1';
        } else {
            floatingFocusEl.style.opacity = '0';
        }
    }

    function setAmbientGlow(color) {
        if (!LauncherConfig.settings.ambientGlow) {
            ambientGlowEl.style.opacity = '0';
            return;
        }
        ambientGlowEl.style.opacity = '0.75';
        ambientGlowEl.style.background = `radial-gradient(ellipse at center, ${color} 0%, rgba(7, 8, 11, 0) 70%)`;
    }

    // 5. App Launching and Actions
    function launchFocusedApp() {
        let app = null;
        if (state.currentZone === 'DOCK') {
            app = state.apps[state.dockIndex];
        } else if (state.currentZone === 'GRID') {
            app = state.apps[state.gridIndex];
        }

        if (app) {
            if (app.id === "cleanyourtv.retroarcade" || app.aliasId === "retroarcade") {
                if (window.RetroArcade) RetroArcade.open();
                return;
            }
            if (app.id === "cleanyourtv.gamepadtester" || app.aliasId === "gamepadtester") {
                if (window.GamepadManager) GamepadManager.open();
                return;
            }
            if (app.id === "com.cctv.viewer" || app.id === "cctv") {
                if (window.CCTVViewer) CCTVViewer.open();
                return;
            }
            if (app.id === "cleanyourtv.livetv" || app.id === "livetv") {
                if (window.IPTVPlayer) IPTVPlayer.open(0, 'ALL');
                return;
            }
            if (app.id === "cleanyourtv.freecinema" || app.aliasId === "freecinema") {
                openModal('cinema');
                return;
            }
            if (app.id === "cleanyourtv.lofiradio" || app.aliasId === "lofiradio") {
                if (window.AmbientMusic) AmbientMusic.open();
                return;
            }
            if (app.id === "cleanyourtv.adfreeyt" || app.aliasId === "youtube") {
                openModal('adfree-yt');
                return;
            }
            WebOSAPI.launchApp(app.id);
        }
    }

    function executeTopAction() {
        const btn = topActionBtns[state.topIndex];
        const action = btn.getAttribute('data-action');
        if (action === 'arcade') {
            if (window.RetroArcade) RetroArcade.open();
        } else if (action === 'livetv') {
            if (window.IPTVPlayer) IPTVPlayer.open(0, 'ALL');
        } else if (action === 'cctv') {
            if (window.CCTVViewer) CCTVViewer.open();
        } else if (action === 'artmode') {
            if (window.ArtMode) ArtMode.open(0);
        } else if (action === 'music') {
            if (window.AmbientMusic) AmbientMusic.open();
        } else if (action === 'sleep') {
            if (window.SleepTimer) SleepTimer.cycle();
        } else if (action === 'remote') {
            openModal('remote');
        } else if (action === 'inputs') {
            openModal('inputs');
        } else if (action === 'settings') {
            openModal('settings');
        }
    }

    // 6. Modals
    function openModal(type) {
        state.currentModal = type;
        state.currentZone = 'MODAL';
        state.modalIndex = 0;

        if (type === 'inputs') {
            inputsModalEl.style.display = 'flex';
        } else if (type === 'settings') {
            settingsModalEl.style.display = 'flex';
            updateSettingsUI();
        } else if (type === 'remote') {
            const remoteEl = document.getElementById('remote-modal');
            if (remoteEl) remoteEl.style.display = 'flex';
        } else if (type === 'adfree-yt') {
            const ytModal = document.getElementById('adfree-yt-modal');
            if (ytModal) ytModal.style.display = 'flex';
        } else if (type === 'cinema') {
            const cinemaEl = document.getElementById('cinema-modal');
            if (cinemaEl) cinemaEl.style.display = 'flex';
        } else if (type === 'diag') {
            if (window.NetworkDiagnostic) NetworkDiagnostic.open();
        } else if (type === 'arcade') {
            if (window.RetroArcade) RetroArcade.open();
        } else if (type === 'gamepad') {
            if (window.GamepadManager) GamepadManager.open();
        }
        updateFocus();
    }

    function closeModal() {
        inputsModalEl.style.display = 'none';
        settingsModalEl.style.display = 'none';
        const remoteEl = document.getElementById('remote-modal');
        if (remoteEl) remoteEl.style.display = 'none';
        const ytModal = document.getElementById('adfree-yt-modal');
        if (ytModal) ytModal.style.display = 'none';
        const cinemaEl = document.getElementById('cinema-modal');
        if (cinemaEl) cinemaEl.style.display = 'none';
        if (window.NetworkDiagnostic) NetworkDiagnostic.close();
        if (window.RetroArcade) RetroArcade.close();
        if (window.GamepadManager) GamepadManager.close();
        state.currentModal = null;
        state.currentZone = 'TOP';
        updateFocus();
    }

    function handleModalSelect() {
        if (state.currentModal === 'inputs') {
            const items = inputsModalEl.querySelectorAll('.modal-nav-item');
            const target = items[state.modalIndex];
            const inputId = target.getAttribute('data-input-id');
            closeModal();
            if (inputId === 'TV') {
                if (window.IPTVPlayer) IPTVPlayer.open(0, 'ALL');
                return;
            }
            // Switch HDMI input via webOS API
            WebOSAPI.launchInput(inputId);
        } else if (state.currentModal === 'settings') {
            const items = settingsModalEl.querySelectorAll('.modal-nav-item');
            const target = items[state.modalIndex];
            const settingKey = target.getAttribute('data-setting');
            if (settingKey === 'diag') {
                closeModal();
                openModal('diag');
            } else if (settingKey === 'gamepad') {
                closeModal();
                openModal('gamepad');
            } else if (settingKey === 'remote') {
                closeModal();
                openModal('remote');
            } else {
                cycleSetting(settingKey);
            }
        } else if (state.currentModal === 'cinema') {
            const cinemaModal = document.getElementById('cinema-modal');
            const items = cinemaModal.querySelectorAll('.modal-nav-item');
            const target = items[state.modalIndex];
            const cinemaType = target ? target.getAttribute('data-cinema') : null;
            closeModal();
            if (cinemaType === 'pluto') {
                WebOSAPI.launchApp('com.webos.app.browser', { target: 'https://pluto.tv/on-demand' });
            } else if (cinemaType === 'tubi') {
                WebOSAPI.launchApp('com.webos.app.browser', { target: 'https://tubitv.com' });
            } else if (cinemaType === 'filmrise') {
                WebOSAPI.launchApp('com.webos.app.browser', { target: 'https://filmrise.com' });
            } else if (cinemaType === 'samsung' || cinemaType === 'lgchannels') {
                WebOSAPI.launchApp('com.webos.app.lgchannels');
            }
        } else if (state.currentModal === 'adfree-yt') {
            const ytModal = document.getElementById('adfree-yt-modal');
            const items = ytModal.querySelectorAll('.modal-nav-item');
            const target = items[state.modalIndex];
            const ytAction = target ? target.getAttribute('data-yt-action') : null;
            closeModal();
            if (ytAction === 'web') {
                // Open browser to ad-free Piped streaming UI
                WebOSAPI.launchApp('com.webos.app.browser', { target: 'https://piped.video' });
            } else if (ytAction === 'stock') {
                // Launch standard YouTube
                WebOSAPI.launchApp('youtube.leanback.v4');
            }
        }
    }

    function cycleSetting(key) {
        if (key === 'theme') {
            const themes = LauncherConfig.getThemes();
            const currIdx = themes.findIndex(t => t.id === LauncherConfig.settings.theme);
            const nextTheme = themes[(currIdx + 1) % themes.length];
            LauncherConfig.applyTheme(nextTheme.id);
        } else if (key === 'glow') {
            LauncherConfig.settings.ambientGlow = !LauncherConfig.settings.ambientGlow;
            LauncherConfig.save();
        } else if (key === 'dock') {
            LauncherConfig.settings.dockSize = LauncherConfig.settings.dockSize === 4 ? 6 : 4;
            LauncherConfig.save();
            renderDock();
        } else if (key === 'screensaver') {
            const times = [2, 5, 10, 0];
            const currIdx = times.indexOf(LauncherConfig.settings.screensaverMinutes);
            LauncherConfig.settings.screensaverMinutes = times[(currIdx + 1) % times.length];
            LauncherConfig.save();
        } else if (key === 'autoboot') {
            alert('To auto-boot into CleanHub TV on LG webOS TV:\n\n1. Settings → General → System → Additional Settings → Home Settings.\n2. Turn "Home Auto Launch" OFF.\n3. Turn "Power On Screen" to Recent Input or Last Used App.\n4. (With Homebrew Channel) Autostart via /var/lib/webosbrew/startup.sh.\nNow whenever your TV turns on, it launches CleanHub TV directly!');
        }
        updateSettingsUI();
        updateFocus();
    }

    function updateSettingsUI() {
        document.getElementById('setting-theme-btn').textContent = LauncherConfig.settings.theme.toUpperCase();
        document.getElementById('setting-glow-btn').textContent = LauncherConfig.settings.ambientGlow ? 'Enabled' : 'Disabled';
        document.getElementById('setting-dock-btn').textContent = LauncherConfig.settings.dockSize + ' Apps';
        document.getElementById('setting-screensaver-btn').textContent = LauncherConfig.settings.screensaverMinutes === 0 ? 'Off' : LauncherConfig.settings.screensaverMinutes + ' Min';
    }

    // 7. Navigation Controller (Spatial D-pad)
    function onKeyDown(e) {
        resetIdleTimer();

        if (window.IPTVPlayer && IPTVPlayer.isOpen) {
            if (IPTVPlayer.handleKeyDown(e)) {
                return;
            }
        }

        if (window.ArtMode && ArtMode.isOpen) {
            if (ArtMode.handleKeyDown(e)) {
                return;
            }
        }

        if (window.AmbientMusic && AmbientMusic.isOpen) {
            if (AmbientMusic.handleKeyDown(e)) {
                return;
            }
        }

        if (window.RetroArcade && RetroArcade.isOpen) {
            if (RetroArcade.handleKeyDown(e)) {
                return;
            }
        }

        if (window.CCTVViewer && CCTVViewer.isOpen) {
            if (CCTVViewer.handleKey(e)) {
                return;
            }
        }

        if (state.isScreensaverActive) {
            wakeFromScreensaver();
            e.preventDefault();
            return;
        }

        const key = e.keyCode;
        const GRID_COLUMNS = 10;
        const dockCount = LauncherConfig.settings.dockSize;
        const gridCount = state.apps.length;

        // Remote Key codes:
        // 37 = Left, 38 = Up, 39 = Right, 40 = Down, 13 = Enter
        // 461 = webOS Back / Return, 10009 = Return, 27 = Escape, 8 = Backspace
        // 403 = Red, 404 = Green, 405 = Yellow, 406 = Blue
        switch (key) {
            case 37: // Left
                if (state.currentZone === 'TOP') {
                    state.topIndex = Math.max(0, state.topIndex - 1);
                } else if (state.currentZone === 'DOCK') {
                    state.dockIndex = Math.max(0, state.dockIndex - 1);
                } else if (state.currentZone === 'GRID') {
                    state.gridIndex = Math.max(0, state.gridIndex - 1);
                }
                updateFocus();
                e.preventDefault();
                break;

            case 39: // Right
                if (state.currentZone === 'TOP') {
                    state.topIndex = Math.min(topActionBtns.length - 1, state.topIndex + 1);
                } else if (state.currentZone === 'DOCK') {
                    state.dockIndex = Math.min(dockCount - 1, state.dockIndex + 1);
                } else if (state.currentZone === 'GRID') {
                    state.gridIndex = Math.min(gridCount - 1, state.gridIndex + 1);
                }
                updateFocus();
                e.preventDefault();
                break;

            case 38: // Up
                if (state.currentZone === 'GRID') {
                    if (state.gridIndex < GRID_COLUMNS) {
                        state.currentZone = 'DOCK';
                        state.dockIndex = Math.min(dockCount - 1, Math.floor(state.gridIndex / 2.5));
                    } else {
                        state.gridIndex -= GRID_COLUMNS;
                    }
                } else if (state.currentZone === 'DOCK') {
                    state.currentZone = 'TOP';
                    state.topIndex = Math.min(topActionBtns.length - 1, state.dockIndex);
                } else if (state.currentZone === 'MODAL') {
                    let activeModalEl = null;
                    if (state.currentModal === 'inputs') activeModalEl = inputsModalEl;
                    else if (state.currentModal === 'settings') activeModalEl = settingsModalEl;
                    else if (state.currentModal === 'adfree-yt') activeModalEl = document.getElementById('adfree-yt-modal');
                    else if (state.currentModal === 'remote') activeModalEl = document.getElementById('remote-modal');

                    if (activeModalEl) {
                        const items = activeModalEl.querySelectorAll('.modal-nav-item');
                        state.modalIndex = Math.max(0, state.modalIndex - 1);
                    }
                }
                updateFocus();
                e.preventDefault();
                break;

            case 40: // Down
                if (state.currentZone === 'TOP') {
                    state.currentZone = 'DOCK';
                    state.dockIndex = Math.min(dockCount - 1, state.topIndex);
                } else if (state.currentZone === 'DOCK') {
                    state.currentZone = 'GRID';
                    state.gridIndex = Math.min(gridCount - 1, state.dockIndex * 2);
                } else if (state.currentZone === 'GRID') {
                    if (state.gridIndex + GRID_COLUMNS < gridCount) {
                        state.gridIndex += GRID_COLUMNS;
                    }
                } else if (state.currentZone === 'MODAL') {
                    let activeModalEl = null;
                    if (state.currentModal === 'inputs') activeModalEl = inputsModalEl;
                    else if (state.currentModal === 'settings') activeModalEl = settingsModalEl;
                    else if (state.currentModal === 'adfree-yt') activeModalEl = document.getElementById('adfree-yt-modal');
                    else if (state.currentModal === 'remote') activeModalEl = document.getElementById('remote-modal');

                    if (activeModalEl) {
                        const items = activeModalEl.querySelectorAll('.modal-nav-item');
                        state.modalIndex = Math.min(items.length - 1, state.modalIndex + 1);
                    }
                }
                updateFocus();
                e.preventDefault();
                break;

            case 13: // Enter / OK
                if (state.currentZone === 'TOP') {
                    executeTopAction();
                } else if (state.currentZone === 'DOCK' || state.currentZone === 'GRID') {
                    launchFocusedApp();
                } else if (state.currentZone === 'MODAL') {
                    handleModalSelect();
                }
                e.preventDefault();
                break;

            case 461:   // webOS Return / Back
            case 10009: // Return / Back
            case 27:    // Escape
            case 8:     // Backspace
                if (state.currentZone === 'MODAL') {
                    closeModal();
                } else if (state.currentZone === 'GRID') {
                    state.currentZone = 'DOCK';
                    updateFocus();
                }
                e.preventDefault();
                break;

            case 403: // Red Button
                if (window.IPTVPlayer) IPTVPlayer.open(0, 'ALL');
                e.preventDefault();
                break;

            case 404: // Green Button
                if (window.ArtMode) ArtMode.open(0);
                e.preventDefault();
                break;

            case 405: // Yellow Button
                if (window.NetworkDiagnostic) NetworkDiagnostic.open();
                e.preventDefault();
                break;

            case 406: // Blue Button
                if (window.CCTVViewer) CCTVViewer.open();
                e.preventDefault();
                break;
        }
    }

    window.addEventListener('keydown', onKeyDown);

    // 8. Clock & Date Tick
    function updateClock() {
        const now = new Date();
        let hours = now.getHours();
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        const timeStr = `${hours}:${minutes} ${ampm}`;

        const dateOptions = { weekday: 'long', day: 'numeric', month: 'long' };
        const dateStr = now.toLocaleDateString('en-GB', dateOptions);

        const clockEl = document.getElementById('digital-clock');
        if (clockEl) clockEl.textContent = timeStr;
        const dateEl = document.getElementById('current-date');
        if (dateEl) dateEl.textContent = dateStr;

        if (state.isScreensaverActive) {
            const ssClock = document.getElementById('ss-clock');
            if (ssClock) ssClock.textContent = timeStr;
            const ssDate = document.getElementById('ss-date');
            if (ssDate) ssDate.textContent = dateStr;
        }
    }
    setInterval(updateClock, 1000);
    updateClock();

    // 9. OLED Screensaver (Drift prevention)
    function resetIdleTimer() {
        clearTimeout(state.idleTimer);
        const mins = LauncherConfig.settings.screensaverMinutes;
        if (mins > 0) {
            state.idleTimer = setTimeout(startScreensaver, mins * 60 * 1000);
        }
    }

    function startScreensaver() {
        state.isScreensaverActive = true;
        screensaverEl.style.display = 'flex';
        driftScreensaver();
    }

    function driftScreensaver() {
        if (!state.isScreensaverActive) return;
        const x = (Math.random() - 0.5) * 160;
        const y = (Math.random() - 0.5) * 120;
        screensaverEl.style.transform = `translate(${x}px, ${y}px)`;
        setTimeout(driftScreensaver, 60000);
    }

    function wakeFromScreensaver() {
        state.isScreensaverActive = false;
        screensaverEl.style.display = 'none';
        screensaverEl.style.transform = 'translate(0, 0)';
        resetIdleTimer();
    }

    // 10. System Info update
    WebOSAPI.getSystemInfo(function(info) {
        if (info && info.model) {
            const netEl = document.getElementById('network-name');
            if (netEl) netEl.textContent = info.network.includes('Wi-Fi') ? 'Wi-Fi' : 'Ethernet';
            const statsEl = document.getElementById('sys-stats');
            if (statsEl) {
                statsEl.textContent = `${info.model} · ${info.version}`;
            }
        }
    });

    LauncherConfig.applyTheme(LauncherConfig.settings.theme);
    initApps();
    if (window.ArtMode) ArtMode.init();
    if (window.SleepTimer) SleepTimer.init();
    if (window.AmbientMusic) AmbientMusic.init();
    if (window.NetworkDiagnostic) NetworkDiagnostic.init();
    resetIdleTimer();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLauncher);
} else {
    initLauncher();
}
