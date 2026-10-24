/**
 * CleanHub TV - CCTV Security Monitor Module for LG webOS
 * 4-Channel Live Surveillance Quad Grid with 1080p Fullscreen Zoom & Patrol Tour.
 */

const CCTVViewer = {
    DEFAULT_CAMERAS: [
        {
            id: 1,
            name: "Main Gate Entrance",
            url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
            type: "hls",
            res: "1080p 25fps"
        },
        {
            id: 2,
            name: "Lobby & Living Room",
            url: "https://d2px1d6ssc60fw.cloudfront.net/SunTV/SunTV-HDR10-IN-index.m3u8",
            type: "hls",
            res: "1080p 30fps"
        },
        {
            id: 3,
            name: "Parking & Driveway",
            url: "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
            type: "hls",
            res: "1080p 24fps"
        },
        {
            id: 4,
            name: "Garden & Perimeter",
            url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
            type: "hls",
            res: "1080p 25fps"
        }
    ],

    cameras: [],
    currentMode: 'quad',
    selectedIndex: 0,
    patrolTimer: null,
    isOpen: false,

    init: function() {
        this.loadConfig();
    },

    loadConfig: function() {
        try {
            const saved = localStorage.getItem('cctv_config');
            if (saved) {
                this.cameras = JSON.parse(saved);
            } else {
                this.cameras = JSON.parse(JSON.stringify(this.DEFAULT_CAMERAS));
            }
        } catch (e) {
            this.cameras = JSON.parse(JSON.stringify(this.DEFAULT_CAMERAS));
        }
    },

    open: function() {
        this.isOpen = true;
        this.loadConfig();
        const modal = document.getElementById('cctv-modal');
        if (modal) {
            modal.style.display = 'block';
            modal.focus();
            this.render();
        }
    },

    close: function() {
        this.isOpen = false;
        if (this.patrolTimer) this.stopPatrol();
        const modal = document.getElementById('cctv-modal');
        if (modal) modal.style.display = 'none';

        const vid = document.getElementById('cctv-master-video');
        if (vid) {
            vid.pause();
            vid.removeAttribute('src');
            vid.load();
        }
    },

    render: function() {
        const grid = document.getElementById('cctv-grid');
        if (!grid) return;
        grid.innerHTML = '';

        const self = this;
        this.cameras.forEach(function(cam, idx) {
            const tile = document.createElement('div');
            tile.className = 'cctv-tile' + (idx === self.selectedIndex ? ' focus' : '');
            tile.id = 'cctv-tile-' + idx;
            tile.onclick = function() {
                self.selectCamera(idx);
                if (self.currentMode === 'quad') {
                    self.setMode('single', idx);
                } else {
                    self.setMode('quad');
                }
            };

            tile.innerHTML = `
                <div class="cctv-radar-bg">
                    <div class="cctv-radar-ring"></div>
                    <div style="font-size:13px;color:#64748b;font-weight:600;">ACTIVE FEED</div>
                </div>
                <div class="cctv-osd">
                    <div class="cctv-osd-top">
                        <span class="cctv-badge">CAM 0${cam.id} • ${cam.name}</span>
                        <span class="cctv-rec-pill"><span class="cctv-rec-dot"></span> LIVE</span>
                    </div>
                    <div class="cctv-osd-bottom">
                        <span class="cctv-time" id="cctv-clock-${idx}">--:--:--</span>
                        <span class="cctv-meta">${cam.type.toUpperCase()} • ${cam.res || '1080p'}</span>
                    </div>
                </div>
            `;
            grid.appendChild(tile);
        });

        this.attachVideo();
        this.startClocks();
    },

    attachVideo: function() {
        const vid = document.getElementById('cctv-master-video');
        const activeTile = document.getElementById('cctv-tile-' + this.selectedIndex);
        const cam = this.cameras[this.selectedIndex];
        if (!vid || !activeTile || !cam) return;

        activeTile.insertBefore(vid, activeTile.firstChild);
        if (vid.src !== cam.url) {
            vid.src = cam.url;
            vid.load();
            vid.play().catch(function(e) {});
        }
    },

    selectCamera: function(idx) {
        if (idx < 0) idx = 0;
        if (idx >= this.cameras.length) idx = this.cameras.length - 1;
        this.selectedIndex = idx;

        for (let i = 0; i < this.cameras.length; i++) {
            const t = document.getElementById('cctv-tile-' + i);
            if (t) {
                if (i === idx) t.classList.add('focus');
                else t.classList.remove('focus');
            }
        }

        this.attachVideo();
    },

    setMode: function(mode, targetIdx) {
        const grid = document.getElementById('cctv-grid');
        if (targetIdx !== undefined) this.selectCamera(targetIdx);

        if (mode === 'single') {
            this.currentMode = 'single';
            this.cameras.forEach((c, i) => {
                const t = document.getElementById('cctv-tile-' + i);
                if (t) {
                    if (i === this.selectedIndex) {
                        t.style.display = 'block';
                        t.classList.add('cctv-fullscreen');
                    } else {
                        t.style.display = 'none';
                        t.classList.remove('cctv-fullscreen');
                    }
                }
            });
            if (grid) grid.className = 'cctv-single-view';
        } else {
            this.currentMode = 'quad';
            if (this.patrolTimer) this.stopPatrol();
            this.cameras.forEach((c, i) => {
                const t = document.getElementById('cctv-tile-' + i);
                if (t) {
                    t.style.display = 'block';
                    t.classList.remove('cctv-fullscreen');
                }
            });
            if (grid) grid.className = 'cctv-quad-grid';
            this.selectCamera(this.selectedIndex);
        }
    },

    togglePatrol: function() {
        if (this.patrolTimer) this.stopPatrol();
        else this.startPatrol();
    },

    startPatrol: function() {
        this.setMode('single', this.selectedIndex);
        this.patrolTimer = setInterval(() => {
            const next = (this.selectedIndex + 1) % this.cameras.length;
            this.setMode('single', next);
        }, 10000);
    },

    stopPatrol: function() {
        if (this.patrolTimer) {
            clearInterval(this.patrolTimer);
            this.patrolTimer = null;
        }
    },

    startClocks: function() {
        const update = () => {
            if (!this.isOpen) return;
            const now = new Date();
            const timeStr = now.toLocaleTimeString('en-US', { hour12: false });
            for (let i = 0; i < this.cameras.length; i++) {
                const el = document.getElementById('cctv-clock-' + i);
                if (el) el.textContent = timeStr;
            }
        };
        setInterval(update, 1000);
        update();
    },

    handleKey: function(e) {
        if (!this.isOpen) return false;
        const code = e.keyCode;

        switch (code) {
            case 37: // Left
                if (this.currentMode === 'quad') {
                    if (this.selectedIndex % 2 === 1) this.selectCamera(this.selectedIndex - 1);
                } else {
                    const prev = (this.selectedIndex - 1 + this.cameras.length) % this.cameras.length;
                    this.setMode('single', prev);
                }
                return true;
            case 38: // Up
                if (this.currentMode === 'quad') {
                    if (this.selectedIndex >= 2) this.selectCamera(this.selectedIndex - 2);
                }
                return true;
            case 39: // Right
                if (this.currentMode === 'quad') {
                    if (this.selectedIndex % 2 === 0) this.selectCamera(this.selectedIndex + 1);
                } else {
                    const next = (this.selectedIndex + 1) % this.cameras.length;
                    this.setMode('single', next);
                }
                return true;
            case 40: // Down
                if (this.currentMode === 'quad') {
                    if (this.selectedIndex < 2) this.selectCamera(this.selectedIndex + 2);
                }
                return true;
            case 13: // OK / Enter
                if (this.currentMode === 'quad') this.setMode('single', this.selectedIndex);
                else this.setMode('quad');
                return true;
            case 461: // webOS Back
            case 27: // ESC
            case 8:  // Backspace
                if (this.currentMode === 'single') {
                    this.setMode('quad');
                } else {
                    this.close();
                }
                return true;
            case 49: // 1
                this.setMode('single', 0);
                return true;
            case 50: // 2
                this.setMode('single', 1);
                return true;
            case 51: // 3
                this.setMode('single', 2);
                return true;
            case 52: // 4
                this.setMode('single', 3);
                return true;
            case 48: // 0
                this.setMode('quad');
                return true;
            case 404: // Green button
                this.togglePatrol();
                return true;
        }
        return false;
    }
};

window.CCTVViewer = CCTVViewer;
