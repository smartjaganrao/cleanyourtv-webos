/**
 * CleanYourTV - High-Performance DTH IPTV Player Controller
 * Seamless HLS streaming with TV Remote Channel Surfing & Electronic Program Guide.
 * Full DTH UI with Left/Right channel preview, 3-digit dial HUD, Region & Category filters.
 */

const IPTVPlayer = {
    isOpen: false,
    channels: [],
    currentIndex: 0,
    browseIndex: 0,
    currentRegion: 'TAMIL',
    currentCategory: 'ALL',
    hls: null,
    isZoomFill: false,
    isGuideOpen: false,

    // Timers
    barTimer: null,
    dialBuffer: "",
    dialTimer: null,
    watchdogTimer: null,
    fallbackTimer: null,
    clockInterval: null,

    // DOM Elements Cache
    playerModalEl: null,
    videoEl: null,
    videoSpinnerEl: null,
    aspectIndicatorEl: null,
    overlayContainerEl: null,
    dialHudEl: null,
    dialDigitsEl: null,
    dialNameEl: null,
    streamAlertEl: null,
    alertDescEl: null,
    dthBarEl: null,
    barNumEl: null,
    barLogoEl: null,
    barFallbackEl: null,
    barNameEl: null,
    barFavEl: null,
    barStatusEl: null,
    barCatEl: null,
    barRegionEl: null,
    barShowTitleEl: null,
    barShowSlotEl: null,
    barProgressFillEl: null,
    barNextTitleEl: null,
    barClockEl: null,
    btnTuneSelectedEl: null,
    tuneBtnTextEl: null,
    guideModalEl: null,
    guideTitleEl: null,
    guideCountEl: null,
    guideRegionsEl: null,
    guideCatsEl: null,
    guideGridEl: null,
    btnGuideExitEl: null,

    init: function() {
        this.playerModalEl = document.getElementById('iptv-player-modal');
        this.videoEl = document.getElementById('iptv-video');
        this.videoSpinnerEl = document.getElementById('iptv-spinner');
        this.aspectIndicatorEl = document.getElementById('iptv-aspect-indicator');
        this.overlayContainerEl = document.getElementById('dth-overlay-container');
        this.dialHudEl = document.getElementById('dial-hud');
        this.dialDigitsEl = document.getElementById('dial-digits');
        this.dialNameEl = document.getElementById('dial-name');
        this.streamAlertEl = document.getElementById('stream-alert');
        this.alertDescEl = document.getElementById('alert-desc');
        this.dthBarEl = document.getElementById('dth-bar');

        this.barNumEl = document.getElementById('bar-num');
        this.barLogoEl = document.getElementById('bar-logo');
        this.barFallbackEl = document.getElementById('bar-fallback');
        this.barNameEl = document.getElementById('bar-name');
        this.barFavEl = document.getElementById('bar-fav');
        this.barStatusEl = document.getElementById('bar-status');
        this.barCatEl = document.getElementById('bar-cat');
        this.barRegionEl = document.getElementById('bar-region');
        this.barShowTitleEl = document.getElementById('bar-show-title');
        this.barShowSlotEl = document.getElementById('bar-show-slot');
        this.barProgressFillEl = document.getElementById('bar-progress-fill');
        this.barNextTitleEl = document.getElementById('bar-next-title');
        this.barClockEl = document.getElementById('bar-clock');
        this.btnTuneSelectedEl = document.getElementById('btn-tune-selected');
        this.tuneBtnTextEl = document.getElementById('tune-btn-text');

        this.guideModalEl = document.getElementById('iptv-guide-modal');
        this.guideTitleEl = document.getElementById('guide-header-title');
        this.guideCountEl = document.getElementById('guide-count');
        this.guideRegionsEl = document.getElementById('guide-regions');
        this.guideCatsEl = document.getElementById('guide-cats');
        this.guideGridEl = document.getElementById('guide-grid');
        this.btnGuideExitEl = document.getElementById('btn-guide-exit');

        if (this.videoEl) {
            // Guard against native fullscreen promotion on webOS
            this.videoEl.requestFullscreen = function() { return Promise.resolve(); };
            this.videoEl.webkitRequestFullscreen = function() { return Promise.resolve(); };

            this.videoEl.addEventListener("playing", () => {
                this.showSpinner(false);
                clearTimeout(this.watchdogTimer);
                clearTimeout(this.fallbackTimer);
                if (this.streamAlertEl) this.streamAlertEl.classList.remove("show");
                this.syncOverlay();
            });

            this.videoEl.addEventListener("waiting", () => {
                this.showSpinner(true);
            });

            this.videoEl.addEventListener("error", () => {
                this.showSpinner(false);
                this.handleStreamError();
            });
        }

        if (this.btnTuneSelectedEl) {
            this.btnTuneSelectedEl.addEventListener("click", (e) => {
                e.stopPropagation();
                this.tuneChannel(this.browseIndex);
            });
        }

        if (this.barFavEl) {
            this.barFavEl.addEventListener("click", (e) => {
                e.stopPropagation();
                this.toggleFavorite(this.browseIndex);
            });
        }

        if (this.btnGuideExitEl) {
            this.btnGuideExitEl.addEventListener("click", (e) => {
                e.stopPropagation();
                this.toggleGuide(false);
            });
        }

        // Click video container toggles bar
        const container = document.getElementById("iptv-video-container");
        if (container) {
            container.addEventListener("click", () => {
                if (!this.isOpen || this.isGuideOpen) return;
                if (!this.isBarActive()) {
                    this.showDTHBar(5500);
                } else {
                    this.dismissBar();
                }
            });
        }

        // Digital Clock
        this.clockInterval = setInterval(() => {
            if (this.isOpen) this.updateClock();
        }, 1000);
    },

    pad: function(n) {
        return String(n).padStart(3, '0');
    },

    isBarActive: function() {
        return this.dthBarEl && this.dthBarEl.classList.contains("active");
    },

    syncOverlay: function() {
        const isBar = this.isBarActive();
        const isDial = this.dialHudEl && this.dialHudEl.classList.contains("active");
        const isAlert = this.streamAlertEl && this.streamAlertEl.classList.contains("show");

        if (this.overlayContainerEl) {
            if (isBar || isDial || isAlert) {
                this.overlayContainerEl.classList.add("active");
            } else {
                this.overlayContainerEl.classList.remove("active");
            }
            if (isBar) {
                this.overlayContainerEl.classList.add("bar-active");
            } else {
                this.overlayContainerEl.classList.remove("bar-active");
            }
        }
    },

    open: function(channelIndex = 0, regionCode = 'TAMIL') {
        console.log(`[IPTVPlayer] Opening DTH Live TV (Region: ${regionCode})...`);
        this.isOpen = true;
        this.currentRegion = regionCode || 'TAMIL';
        this.currentCategory = 'ALL';
        this.isGuideOpen = false;

        if (this.playerModalEl) {
            this.playerModalEl.style.display = 'block';
            this.playerModalEl.focus();
        }

        this.channels = window.IPTVCatalog ? IPTVCatalog.getChannels(this.currentRegion, this.currentCategory) : (window.DEFAULT_IPTV_CHANNELS || []);
        if (this.channels.length === 0) {
            this.channels = window.DEFAULT_IPTV_CHANNELS || [];
        }

        this.currentIndex = Math.min(channelIndex, Math.max(0, this.channels.length - 1));
        this.browseIndex = this.currentIndex;

        this.tuneChannel(this.currentIndex);
        this.showDTHBar(5500);
    },

    close: function() {
        console.log('[IPTVPlayer] Closing Live TV...');
        this.stopStream();
        this.isOpen = false;
        this.isGuideOpen = false;
        clearTimeout(this.barTimer);
        clearTimeout(this.dialTimer);
        clearTimeout(this.watchdogTimer);
        clearTimeout(this.fallbackTimer);

        if (this.dthBarEl) this.dthBarEl.classList.remove("active");
        if (this.dialHudEl) this.dialHudEl.classList.remove("active");
        if (this.streamAlertEl) this.streamAlertEl.classList.remove("show");
        if (this.guideModalEl) this.guideModalEl.classList.remove("active");
        this.syncOverlay();

        if (this.playerModalEl) {
            this.playerModalEl.style.display = 'none';
        }
    },

    stopStream: function() {
        if (this.hls) {
            try { this.hls.destroy(); } catch (e) {}
            this.hls = null;
        }
        if (this.videoEl) {
            try {
                this.videoEl.pause();
                this.videoEl.removeAttribute('src');
                this.videoEl.load();
            } catch (e) {}
        }
    },

    tuneChannel: function(idx) {
        if (!this.channels || this.channels.length === 0) return;
        if (idx < 0) idx = this.channels.length - 1;
        if (idx >= this.channels.length) idx = 0;

        this.currentIndex = idx;
        this.browseIndex = idx;

        // Clear dial buffer and timers
        this.dialBuffer = "";
        clearTimeout(this.dialTimer);
        clearTimeout(this.watchdogTimer);
        clearTimeout(this.fallbackTimer);
        if (this.streamAlertEl) this.streamAlertEl.classList.remove("show");

        const channel = this.channels[this.currentIndex];
        console.log(`[IPTVPlayer] Tuning to [${this.pad(this.currentIndex + 1)}] ${channel.name} (${channel.url})`);

        this.updateBarUI(this.currentIndex);
        if (this.dthBarEl) this.dthBarEl.classList.add("active");

        // Show Dial HUD top-right
        if (this.dialDigitsEl) this.dialDigitsEl.innerText = this.pad(this.currentIndex + 1);
        if (this.dialNameEl) this.dialNameEl.innerText = channel.name;
        if (this.dialHudEl) this.dialHudEl.classList.add("active");
        this.syncOverlay();

        this.dialTimer = setTimeout(() => {
            if (this.dialHudEl) this.dialHudEl.classList.remove("active");
            this.syncOverlay();
        }, 4000);

        clearTimeout(this.barTimer);
        this.barTimer = setTimeout(() => {
            this.dismissBar();
        }, 5500);

        // Play video
        this.showSpinner(true);
        this.playStream(channel.url);

        // Non-intrusive buffer watchdog: NEVER auto-switch channel!
        this.watchdogTimer = setTimeout(() => {
            if (this.videoEl && (this.videoEl.currentTime === 0 || this.videoEl.readyState < 2)) {
                console.warn("[IPTVPlayer] Stream buffering:", channel.name);
                this.showSpinner(false);
                if (this.alertDescEl) {
                    this.alertDescEl.innerText = `Connecting to [${this.pad(this.currentIndex + 1)}] ${channel.name}... Press ▲/▼ for other channels.`;
                }
                if (this.streamAlertEl) this.streamAlertEl.classList.add("show");
                this.syncOverlay();
                clearTimeout(this.fallbackTimer);
                this.fallbackTimer = setTimeout(() => {
                    if (this.streamAlertEl) this.streamAlertEl.classList.remove("show");
                    this.syncOverlay();
                }, 4000);
            }
        }, 12000);
    },

    playStream: function(url) {
        this.stopStream();
        const video = this.videoEl;
        if (!video) return;

        const isWebOS = /Web0S|webOS/i.test(navigator.userAgent) || !!window.webOS;

        if (isWebOS && video.canPlayType('application/vnd.apple.mpegurl')) {
            // WebOS native hardware video pipeline (highest performance on LG Smart TVs)
            video.src = url;
            video.play().catch(e => {
                console.warn('[IPTVPlayer] Native play failed, falling back to Hls.js:', e);
                this.attachHls(url, video);
            });
        } else if (window.Hls && window.Hls.isSupported()) {
            this.attachHls(url, video);
        } else {
            video.src = url;
            video.play().catch(e => console.warn('[IPTVPlayer] Direct play note:', e));
        }
    },

    attachHls: function(url, video) {
        if (!window.Hls || !window.Hls.isSupported()) {
            video.src = url;
            video.play().catch(e => console.warn(e));
            return;
        }
        this.hls = new Hls({
            enableWorker: true,
            lowLatencyMode: true,
            backBufferLength: 30,
            maxBufferLength: 8,
            maxMaxBufferLength: 15
        });
        this.hls.loadSource(url);
        this.hls.attachMedia(video);

        this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
            video.play().catch(e => console.warn('[IPTVPlayer] HLS play error:', e));
            this.showSpinner(false);
        });

        this.hls.on(Hls.Events.ERROR, (event, data) => {
            if (data.fatal) {
                console.warn('[IPTVPlayer] HLS error:', data.type);
                if (data.type === Hls.ErrorTypes.NETWORK_ERROR) {
                    this.hls.startLoad();
                } else if (data.type === Hls.ErrorTypes.MEDIA_ERROR) {
                    this.hls.recoverMediaError();
                } else {
                    this.handleStreamError();
                }
            }
        });
    },

    handleStreamError: function() {
        this.showSpinner(false);
        const channel = this.channels[this.currentIndex];
        const name = channel ? channel.name : 'Channel';
        if (this.alertDescEl) {
            this.alertDescEl.innerText = `Stream unavailable on [${this.pad(this.currentIndex + 1)}] ${name}. Press ▲/▼ to change channel.`;
        }
        if (this.streamAlertEl) this.streamAlertEl.classList.add("show");
        this.syncOverlay();
        clearTimeout(this.fallbackTimer);
        // Firm stability: DO NOT AUTO-TUNE TO ANOTHER CHANNEL! Stay on user's choice.
        this.fallbackTimer = setTimeout(() => {
            if (this.streamAlertEl) this.streamAlertEl.classList.remove("show");
            this.syncOverlay();
        }, 5000);
    },

    showSpinner: function(show) {
        if (this.videoSpinnerEl) {
            this.videoSpinnerEl.style.display = show ? 'flex' : 'none';
        }
    },

    updateBarUI: function(targetIndex) {
        if (!this.channels || this.channels.length === 0) return;
        if (targetIndex < 0) targetIndex = this.channels.length - 1;
        if (targetIndex >= this.channels.length) targetIndex = 0;
        this.browseIndex = targetIndex;

        const ch = this.channels[this.browseIndex];
        if (this.barNumEl) this.barNumEl.innerText = this.pad(this.browseIndex + 1);
        if (this.barNameEl) this.barNameEl.innerText = ch.name;
        if (this.barCatEl) this.barCatEl.innerText = (ch.category || "General").toUpperCase();
        if (this.barRegionEl) this.barRegionEl.innerText = `${ch.flag || '📺'} ${(ch.region || ch.country || 'TV').toUpperCase()}`;

        const isFav = window.IPTVCatalog ? IPTVCatalog.isFavorite(ch.name) : false;
        if (this.barFavEl) this.barFavEl.classList.toggle("active", isFav);

        if (ch.logo && ch.logo.startsWith("http")) {
            if (this.barLogoEl) {
                this.barLogoEl.style.display = "block";
                this.barLogoEl.src = ch.logo;
            }
            if (this.barFallbackEl) this.barFallbackEl.style.display = "none";
        } else {
            if (this.barLogoEl) this.barLogoEl.style.display = "none";
            if (this.barFallbackEl) {
                this.barFallbackEl.style.display = "block";
                this.barFallbackEl.innerText = "📺 " + ch.name.substring(0, 8);
            }
        }

        // Live EPG Update
        const epg = window.IPTVCatalog ? IPTVCatalog.getEPG(ch.category || 'Entertainment', ch.name) : {
            nowTitle: "Live Broadcast",
            timeRange: "12:00 PM - 03:00 PM",
            progress: 50,
            nextTitle: "03:00 PM • Prime News & Highlights"
        };

        if (this.barShowTitleEl) this.barShowTitleEl.innerText = epg.nowTitle;
        if (this.barShowSlotEl) this.barShowSlotEl.innerText = epg.timeRange;
        if (this.barProgressFillEl) this.barProgressFillEl.style.width = `${epg.progress}%`;
        if (this.barNextTitleEl) this.barNextTitleEl.innerText = epg.nextTitle;

        // Tune Button Status
        const isCurrent = (this.browseIndex === this.currentIndex);
        if (isCurrent) {
            if (this.barStatusEl) {
                this.barStatusEl.innerText = "NOW PLAYING";
                this.barStatusEl.className = "bar-status-pill watching";
            }
            if (this.tuneBtnTextEl) this.tuneBtnTextEl.innerText = "NOW PLAYING";
            if (this.btnTuneSelectedEl) this.btnTuneSelectedEl.className = "bar-tune-action watching";
        } else {
            if (this.barStatusEl) {
                this.barStatusEl.innerText = "BROWSE PREVIEW";
                this.barStatusEl.className = "bar-status-pill";
            }
            if (this.tuneBtnTextEl) this.tuneBtnTextEl.innerText = "PRESS OK TO WATCH";
            if (this.btnTuneSelectedEl) this.btnTuneSelectedEl.className = "bar-tune-action";
        }
    },

    stepBrowseChannel: function(direction) {
        if (!this.channels || this.channels.length === 0) return;
        let nextIndex = this.browseIndex + direction;
        if (nextIndex < 0) nextIndex = this.channels.length - 1;
        if (nextIndex >= this.channels.length) nextIndex = 0;

        this.updateBarUI(nextIndex);
        if (this.dthBarEl) this.dthBarEl.classList.add("active");
        this.syncOverlay();

        clearTimeout(this.barTimer);
        this.barTimer = setTimeout(() => {
            this.dismissBar();
        }, 6500);
    },

    dismissBar: function() {
        clearTimeout(this.barTimer);
        if (this.dthBarEl) this.dthBarEl.classList.remove("active");
        this.syncOverlay();
        this.browseIndex = this.currentIndex;
    },

    showDTHBar: function(durationMs = 6000) {
        if (this.isGuideOpen) return;
        this.updateBarUI(this.browseIndex);
        if (this.dthBarEl) this.dthBarEl.classList.add("active");
        this.syncOverlay();

        clearTimeout(this.barTimer);
        if (durationMs > 0) {
            this.barTimer = setTimeout(() => {
                this.dismissBar();
            }, durationMs);
        }
    },

    nextChannel: function() {
        this.tuneChannel(this.currentIndex + 1);
    },

    prevChannel: function() {
        this.tuneChannel(this.currentIndex - 1);
    },

    toggleFavorite: function(idx) {
        if (idx === undefined) idx = this.browseIndex;
        if (!this.channels[idx]) return;
        const ch = this.channels[idx];
        const isFav = window.IPTVCatalog ? IPTVCatalog.toggleFavorite(ch.name) : false;

        if (this.barFavEl) this.barFavEl.classList.toggle("active", isFav);
        if (this.isGuideOpen) {
            this.renderGuideGrid();
        }
    },

    toggleAspectRatio: function() {
        this.isZoomFill = !this.isZoomFill;
        if (this.videoEl) {
            this.videoEl.classList.toggle("original-fit", !this.isZoomFill);
        }
        if (this.aspectIndicatorEl) {
            this.aspectIndicatorEl.innerText = this.isZoomFill ? "SCREEN: FULL SCREEN (EDGE-TO-EDGE)" : "SCREEN: ORIGINAL ASPECT (16:9 BOX)";
            this.aspectIndicatorEl.classList.add("show");
            setTimeout(() => this.aspectIndicatorEl.classList.remove("show"), 2500);
        }
    },

    handleDialDigit: function(digit) {
        if (this.dialBuffer.length >= 3) this.dialBuffer = "";
        this.dialBuffer += digit;

        if (this.dialDigitsEl) this.dialDigitsEl.innerText = this.dialBuffer.padStart(3, '0');

        const target = parseInt(this.dialBuffer, 10);
        if (target === 0) {
            if (this.dialNameEl) this.dialNameEl.innerText = "Entering Channel...";
        } else if (target >= 1 && target <= this.channels.length) {
            if (this.dialNameEl) this.dialNameEl.innerText = this.channels[target - 1].name;
        } else {
            if (this.dialNameEl) this.dialNameEl.innerText = `Invalid Channel (1-${this.channels.length})`;
        }

        if (this.dialHudEl) this.dialHudEl.classList.add("active");
        this.syncOverlay();

        clearTimeout(this.dialTimer);
        this.dialTimer = setTimeout(() => {
            const finalTarget = parseInt(this.dialBuffer, 10);
            this.dialBuffer = "";
            if (this.dialHudEl) this.dialHudEl.classList.remove("active");
            this.syncOverlay();
            if (finalTarget >= 1 && finalTarget <= this.channels.length) {
                this.tuneChannel(finalTarget - 1);
            }
        }, 1500);
    },

    // ============================================================
    // REGIONS & CATEGORIES SWITCHER
    // ============================================================
    setRegion: function(regionCode) {
        this.currentRegion = regionCode;
        this.channels = window.IPTVCatalog ? IPTVCatalog.getChannels(this.currentRegion, this.currentCategory) : (window.DEFAULT_IPTV_CHANNELS || []);
        if (this.channels.length === 0) {
            this.channels = window.DEFAULT_IPTV_CHANNELS || [];
        }

        this.renderGuideRegions();
        this.renderGuideGrid();

        if (this.guideCountEl) {
            this.guideCountEl.innerText = `${this.channels.length} Channels`;
        }

        if (!this.isGuideOpen) {
            this.tuneChannel(0);
        }
    },

    cycleRegion: function() {
        const regions = window.IPTV_REGIONS || [];
        if (regions.length === 0) return;
        let currIdx = regions.findIndex(r => r.code === this.currentRegion);
        let nextIdx = (currIdx + 1) % regions.length;
        this.setRegion(regions[nextIdx].code);
        this.showDTHBar(5000);
    },

    setCategory: function(catId) {
        this.currentCategory = catId;
        this.channels = window.IPTVCatalog ? IPTVCatalog.getChannels(this.currentRegion, this.currentCategory) : (window.DEFAULT_IPTV_CHANNELS || []);
        this.renderGuideCategories();
        this.renderGuideGrid();
        if (this.guideCountEl) {
            this.guideCountEl.innerText = `${this.channels.length} Channels`;
        }
        if (!this.isGuideOpen) {
            this.tuneChannel(0);
        }
    },

    // ============================================================
    // FULL DTH CHANNEL GUIDE MODAL
    // ============================================================
    toggleGuide: function(force) {
        if (force === undefined) this.isGuideOpen = !this.isGuideOpen;
        else this.isGuideOpen = force;

        if (this.guideModalEl) {
            this.guideModalEl.classList.toggle("active", this.isGuideOpen);
        }

        if (this.isGuideOpen) {
            this.dismissBar();
            this.renderGuideRegions();
            this.renderGuideCategories();
            this.renderGuideGrid();

            setTimeout(() => {
                const playingCard = document.getElementById(`guide-card-${this.currentIndex}`);
                if (playingCard) {
                    document.querySelectorAll(".ch-card").forEach(c => c.classList.remove("focused"));
                    playingCard.classList.add("focused");
                    playingCard.scrollIntoView({ block: "center", behavior: "smooth" });
                }
            }, 50);
        } else {
            this.showDTHBar(5000);
        }
    },

    renderGuideRegions: function() {
        if (!this.guideRegionsEl) return;
        this.guideRegionsEl.innerHTML = "";
        const regions = window.IPTV_REGIONS || [];
        regions.forEach((r) => {
            const btn = document.createElement("button");
            btn.className = "region-btn" + (r.code === this.currentRegion ? " active" : "");
            btn.innerText = `${r.flag} ${r.name}`;
            btn.onclick = () => {
                this.setRegion(r.code);
            };
            this.guideRegionsEl.appendChild(btn);
        });
    },

    renderGuideCategories: function() {
        if (!this.guideCatsEl) return;
        this.guideCatsEl.innerHTML = "";
        const cats = window.IPTV_CATEGORIES || [];
        cats.forEach((cat) => {
            const btn = document.createElement("button");
            btn.className = "cat-btn" + (cat.id === this.currentCategory ? " active" : "");
            btn.innerText = `${cat.icon} ${cat.name}`;
            btn.onclick = () => {
                this.setCategory(cat.id);
            };
            this.guideCatsEl.appendChild(btn);
        });
    },

    renderGuideGrid: function() {
        if (!this.guideGridEl) return;
        this.guideGridEl.innerHTML = "";

        if (this.guideCountEl) {
            this.guideCountEl.innerText = `${this.channels.length} Channels`;
        }

        if (this.channels.length === 0) {
            const empty = document.createElement("div");
            empty.style.gridColumn = "1 / -1";
            empty.style.padding = "60px";
            empty.style.textAlign = "center";
            empty.style.fontSize = "22px";
            empty.style.color = "#94a3b8";
            empty.innerText = this.currentRegion === 'FAVORITES'
                ? "No favorites added yet. Press RED on your remote to star any channel!"
                : "No channels found in this category.";
            this.guideGridEl.appendChild(empty);
            return;
        }

        this.channels.forEach((ch, idx) => {
            const isPlaying = (idx === this.currentIndex);
            const isFav = window.IPTVCatalog ? IPTVCatalog.isFavorite(ch.name) : false;

            const card = document.createElement("div");
            card.className = "ch-card" + (isPlaying ? " playing" : "");
            card.dataset.index = idx;
            card.id = `guide-card-${idx}`;

            const logoHtml = ch.logo && ch.logo.startsWith("http")
                ? `<img src="${ch.logo}" onerror="this.src=''; this.style.display='none';">`
                : `<span style="font-size:24px;color:#0f172a;">📺</span>`;

            card.innerHTML = `
                <div class="card-num">${this.pad(idx + 1)}</div>
                <div class="card-logo-box">${logoHtml}</div>
                <div class="card-info">
                    <div class="card-title">${ch.name}</div>
                    <div class="card-tags">
                        <span class="card-cat-tag">${ch.category || "General"}</span>
                        ${isPlaying ? '<span class="card-live-now">● WATCHING</span>' : ''}
                    </div>
                </div>
                <div class="card-fav-star ${isFav ? 'active' : ''}">★</div>
            `;

            card.onclick = () => {
                this.tuneChannel(idx);
                this.toggleGuide(false);
            };

            this.guideGridEl.appendChild(card);
        });
    },

    updateClock: function() {
        if (this.barClockEl) {
            const now = new Date();
            this.barClockEl.innerText = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }
        if (this.isBarActive() && this.channels[this.browseIndex]) {
            const ch = this.channels[this.browseIndex];
            const epg = window.IPTVCatalog ? IPTVCatalog.getEPG(ch.category || 'Entertainment', ch.name) : null;
            if (epg && this.barProgressFillEl) {
                this.barProgressFillEl.style.width = `${epg.progress}%`;
            }
        }
    },

    // ============================================================
    // REMOTE CONTROL & KEYBOARD EVENTS
    // LEFT & RIGHT BROWSE CHANNELS LIST - DO NOT SWITCH STREAM!
    // ============================================================
    handleKeyDown: function(e) {
        if (!this.isOpen) return false;
        const code = e.keyCode;

        // RED Key (403 = webOS Red, 82 = 'R') -> Favorite
        if (code === 403 || code === 82) {
            e.preventDefault();
            this.toggleFavorite(this.browseIndex);
            return true;
        }

        // GREEN Key (404 = webOS Green, 71 = 'G') -> Toggle Aspect Ratio
        if (code === 404 || code === 71) {
            e.preventDefault();
            this.toggleAspectRatio();
            return true;
        }

        // YELLOW Key (405 = webOS Yellow, 89 = 'Y') -> Cycle Region
        if (code === 405 || code === 89) {
            e.preventDefault();
            this.cycleRegion();
            return true;
        }

        // BLUE Key (406 = webOS Blue, 66 = 'B') or GUIDE Key (458) -> Toggle Guide
        if (code === 406 || code === 66 || code === 458) {
            e.preventDefault();
            this.toggleGuide();
            return true;
        }

        // INFO Key (457 = webOS Info, 73 = 'I') -> Toggle / Show DTH Bar
        if (code === 457 || code === 73) {
            e.preventDefault();
            if (!this.isBarActive()) {
                this.browseIndex = this.currentIndex;
                this.showDTHBar(6500);
            } else {
                this.dismissBar();
            }
            return true;
        }

        // Number Keys 0-9 (Top-row 48-57 or Numpad 96-105)
        if ((code >= 48 && code <= 57) || (code >= 96 && code <= 105)) {
            e.preventDefault();
            if (this.isGuideOpen) this.toggleGuide(false);
            const digit = (code >= 96 && code <= 105) ? (code - 96) : (code - 48);
            this.handleDialDigit(digit);
            return true;
        }

        // RIGHT Arrow (39)
        if (code === 39) {
            e.preventDefault();
            if (this.isGuideOpen) {
                const cards = Array.from(document.querySelectorAll(".ch-card"));
                if (cards.length > 0) {
                    const focused = cards.find(c => c.classList.contains("focused")) || cards[0];
                    let idx = cards.indexOf(focused);
                    idx = Math.min(cards.length - 1, idx + 1);
                    cards.forEach(c => c.classList.remove("focused"));
                    cards[idx].classList.add("focused");
                    cards[idx].scrollIntoView({ block: "nearest", behavior: "smooth" });
                }
                return true;
            }
            this.stepBrowseChannel(1);
            return true;
        }

        // LEFT Arrow (37)
        if (code === 37) {
            e.preventDefault();
            if (this.isGuideOpen) {
                const cards = Array.from(document.querySelectorAll(".ch-card"));
                if (cards.length > 0) {
                    const focused = cards.find(c => c.classList.contains("focused")) || cards[0];
                    let idx = cards.indexOf(focused);
                    idx = Math.max(0, idx - 1);
                    cards.forEach(c => c.classList.remove("focused"));
                    cards[idx].classList.add("focused");
                    cards[idx].scrollIntoView({ block: "nearest", behavior: "smooth" });
                }
                return true;
            }
            this.stepBrowseChannel(-1);
            return true;
        }

        // Channel Up: webOS VK_CHANNEL_UP (427), PageUp (33), or Arrow Up (38 outside guide)
        if (code === 427 || code === 33 || (!this.isGuideOpen && code === 38)) {
            e.preventDefault();
            this.tuneChannel(this.currentIndex + 1);
            return true;
        }

        // Channel Down: webOS VK_CHANNEL_DOWN (428), PageDown (34), or Arrow Down (40 outside guide)
        if (code === 428 || code === 34 || (!this.isGuideOpen && code === 40)) {
            e.preventDefault();
            this.tuneChannel(this.currentIndex - 1);
            return true;
        }

        // Guide Navigation (Up/Down in 2-column grid: +/- 2)
        if (this.isGuideOpen && (code === 38 || code === 40)) {
            e.preventDefault();
            const cards = Array.from(document.querySelectorAll(".ch-card"));
            if (cards.length > 0) {
                const focused = cards.find(c => c.classList.contains("focused")) || cards[0];
                let idx = cards.indexOf(focused);
                idx = (code === 38) ? Math.max(0, idx - 2) : Math.min(cards.length - 1, idx + 2);
                cards.forEach(c => c.classList.remove("focused"));
                cards[idx].classList.add("focused");
                cards[idx].scrollIntoView({ block: "nearest", behavior: "smooth" });
            }
            return true;
        }

        // OK / Enter (13) -> TUNE TO BROWSED CHANNEL OR CONFIRM SELECTION
        if (code === 13) {
            e.preventDefault();

            // 1. If dialing HUD is active, tune immediately to entered channel
            if (this.dialBuffer.length > 0) {
                const target = parseInt(this.dialBuffer, 10);
                this.dialBuffer = "";
                clearTimeout(this.dialTimer);
                if (this.dialHudEl) this.dialHudEl.classList.remove("active");
                this.syncOverlay();
                if (target >= 1 && target <= this.channels.length) {
                    this.tuneChannel(target - 1);
                    return true;
                }
            }

            // 2. If Channel Guide is open, tune to focused card
            if (this.isGuideOpen) {
                const focused = document.querySelector(".ch-card.focused");
                if (focused) {
                    this.tuneChannel(parseInt(focused.dataset.index, 10));
                    this.toggleGuide(false);
                } else {
                    this.toggleGuide(false);
                }
                return true;
            }

            // 3. Main Screen OK Handling
            if (!this.isBarActive()) {
                this.browseIndex = this.currentIndex;
                this.showDTHBar(5500);
            } else {
                this.tuneChannel(this.browseIndex);
            }
            return true;
        }

        // BACK Key (461 = webOS Back, 27 = Esc, 8 = Backspace, 10009 = Return)
        if (code === 461 || code === 27 || code === 8 || code === 10009) {
            e.preventDefault();
            if (this.dialBuffer.length > 0) {
                this.dialBuffer = "";
                clearTimeout(this.dialTimer);
                if (this.dialHudEl) this.dialHudEl.classList.remove("active");
                this.syncOverlay();
                return true;
            }
            if (this.isGuideOpen) {
                this.toggleGuide(false);
                return true;
            }
            if (this.isBarActive()) {
                this.dismissBar();
                return true;
            }
            // Exit back to launcher
            this.close();
            return true;
        }

        return false;
    }
};

window.IPTVPlayer = IPTVPlayer;
