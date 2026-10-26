/**
 * CleanHub TV - Picture-in-Picture (PiP) Floating Corner Live Player
 * Streams live Tamil TV (Star Vijay, Sun TV) or CCTV cameras in a 360x202 floating
 * window while the user browses the launcher apps. Supports one-click fullscreen expansion.
 */

const PipPlayer = {
    isOpen: false,
    containerEl: null,
    videoEl: null,
    titleEl: null,
    badgeEl: null,
    btnExpandEl: null,
    btnNextEl: null,
    btnCloseEl: null,
    currentIndex: 0,
    sourceType: 'iptv',
    hls: null,

    init: function() {
        this.containerEl = document.getElementById('pip-container');
        this.videoEl = document.getElementById('pip-video');
        this.titleEl = document.getElementById('pip-title');
        this.badgeEl = document.getElementById('pip-badge');
        this.btnExpandEl = document.getElementById('btn-pip-expand');
        this.btnNextEl = document.getElementById('btn-pip-next');
        this.btnCloseEl = document.getElementById('btn-pip-close');

        if (this.btnExpandEl) {
            this.btnExpandEl.addEventListener('click', (e) => {
                e.stopPropagation();
                this.expandFullscreen();
            });
        }

        if (this.btnNextEl) {
            this.btnNextEl.addEventListener('click', (e) => {
                e.stopPropagation();
                this.cycleNext();
            });
        }

        if (this.btnCloseEl) {
            this.btnCloseEl.addEventListener('click', (e) => {
                e.stopPropagation();
                this.close();
            });
        }

        if (this.containerEl) {
            this.containerEl.addEventListener('click', () => {
                this.expandFullscreen();
            });
        }
    },

    open: function(sourceType = 'iptv', index = 0) {
        this.isOpen = true;
        this.sourceType = sourceType;
        this.currentIndex = index;

        if (!this.containerEl) this.containerEl = document.getElementById('pip-container');
        if (this.containerEl) {
            this.containerEl.style.display = 'block';
            this.containerEl.classList.add('active');
        }

        this.tuneCurrent();
    },

    close: function() {
        this.isOpen = false;
        this.stopStream();
        if (!this.containerEl) this.containerEl = document.getElementById('pip-container');
        if (this.containerEl) {
            this.containerEl.style.display = 'none';
            this.containerEl.classList.remove('active');
        }
    },

    toggle: function() {
        if (this.isOpen) this.close();
        else this.open('iptv', 0);
    },

    tuneCurrent: function() {
        if (!this.isOpen) return;
        if (!this.titleEl) this.titleEl = document.getElementById('pip-title');
        if (!this.badgeEl) this.badgeEl = document.getElementById('pip-badge');
        if (!this.videoEl) this.videoEl = document.getElementById('pip-video');

        if (this.sourceType === 'iptv') {
            const channels = (window.IPTVCatalog && IPTVCatalog.allChannels) ? IPTVCatalog.getChannels('TAMIL', 'ALL') : [];
            const ch = channels[this.currentIndex] || channels[0] || {
                name: 'Star Vijay TV HD',
                url: 'https://da86m1sqpm3o0.cloudfront.net/28072023/smil:starvijayuk.smil/playlist.m3u8'
            };

            if (this.titleEl) this.titleEl.innerText = ch.name;
            if (this.badgeEl) {
                this.badgeEl.innerText = '● LIVE TV';
                this.badgeEl.style.background = '#ef4444';
            }

            this.playStream(ch.url);
        } else {
            // CCTV mode
            if (this.titleEl) this.titleEl.innerText = `CCTV Cam #${this.currentIndex + 1} (Gate)`;
            if (this.badgeEl) {
                this.badgeEl.innerText = 'REC ● SECURITY';
                this.badgeEl.style.background = '#10b981';
            }
            const cctvUrl = 'https://cph-p2p-msl.akamaized.net/hls/live/200034/test/master.m3u8';
            this.playStream(cctvUrl);
        }
    },

    cycleNext: function() {
        if (this.sourceType === 'iptv') {
            const channels = (window.IPTVCatalog && IPTVCatalog.allChannels) ? IPTVCatalog.getChannels('TAMIL', 'ALL') : [];
            this.currentIndex = (this.currentIndex + 1) % Math.max(1, channels.length);
        } else {
            this.currentIndex = (this.currentIndex + 1) % 4;
        }
        this.tuneCurrent();
    },

    expandFullscreen: function() {
        const idx = this.currentIndex;
        const type = this.sourceType;
        this.close();

        if (type === 'iptv') {
            if (window.IPTVPlayer) IPTVPlayer.open(idx, 'TAMIL');
        } else {
            if (window.CCTVViewer) CCTVViewer.open();
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

    playStream: function(url) {
        this.stopStream();
        const video = this.videoEl;
        if (!video) return;

        const isWebOS = /Web0S|webOS/i.test(navigator.userAgent) || !!window.webOS;
        if (isWebOS && video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = url;
            video.play().catch(e => {
                console.warn('[PipPlayer] Native play failed, falling back to Hls.js:', e);
                this.playWithHls(url, video);
            });
        } else if (window.Hls && window.Hls.isSupported()) {
            this.playWithHls(url, video);
        } else {
            video.src = url;
            video.play().catch(e => console.warn(e));
        }
    },

    playWithHls: function(url, video) {
        if (!window.Hls || !window.Hls.isSupported()) return;
        this.hls = new Hls({
            enableWorker: true,
            lowLatencyMode: true,
            backBufferLength: 10,
            maxBufferLength: 4
        });
        this.hls.loadSource(url);
        this.hls.attachMedia(video);
        this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
            video.play().catch(e => console.warn(e));
        });
    }
};

window.PipPlayer = PipPlayer;
