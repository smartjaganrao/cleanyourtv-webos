/**
 * CleanHub TV - Apple TV-Style Dynamic Top Shelf Preview
 * Provides interactive showcase cards with live program progress,
 * CCTV status, Lo-Fi beats, and game previews when hovering apps.
 */

const TopShelf = {
    containerEl: null,
    titleEl: null,
    subtitleEl: null,
    badgeEl: null,
    progressTrackEl: null,
    progressFillEl: null,
    slotEl: null,
    actionBtnEl: null,
    lastAppId: null,

    init: function() {
        this.containerEl = document.getElementById('top-shelf-showcase');
        this.titleEl = document.getElementById('shelf-title');
        this.subtitleEl = document.getElementById('shelf-subtitle');
        this.badgeEl = document.getElementById('shelf-badge');
        this.progressTrackEl = document.getElementById('shelf-progress-track');
        this.progressFillEl = document.getElementById('shelf-progress-fill');
        this.slotEl = document.getElementById('shelf-slot');
        this.actionBtnEl = document.getElementById('shelf-action-hint');
    },

    update: function(app) {
        if (!app) return;
        const id = (app.id || '').toLowerCase();
        const alias = (app.aliasId || '').toLowerCase();
        this.lastAppId = id;

        // 1. Live TV preview
        if (id.includes('livetv') || alias === 'livetv') {
            const ch = (window.IPTVCatalog && IPTVCatalog.allChannels) ? IPTVCatalog.allChannels[0] : null;
            const epg = window.IPTVCatalog ? IPTVCatalog.getEPG('Entertainment', ch ? ch.name : 'Star Vijay') : null;
            this.setShelfData({
                badge: '● LIVE BROADCAST',
                badgeColor: '#ef4444',
                title: ch ? `NOW AIRING: ${ch.name}` : 'TAMIL DTH LIVE TV',
                subtitle: epg ? `${epg.nowTitle} • Mega Serial Broadcast` : '110+ Live Tamil & Indian Channels Lineup',
                slot: epg ? epg.timeRange : 'Live 24/7',
                progress: epg ? epg.progress : 65,
                action: 'PRESS OK TO WATCH FULLSCREEN'
            });
            return;
        }

        // 2. CCTV Security preview
        if (id.includes('cctv') || alias === 'cctv') {
            this.setShelfData({
                badge: 'REC ● ACTIVE SECURITY',
                badgeColor: '#10b981',
                title: 'CCTV 4-CAMERA SURVEILLANCE MATRIX',
                subtitle: 'Front Gate, Driveway, Backyard & Main Entrance • Auto-Patrol Ready',
                slot: '4/4 CAMERAS ONLINE',
                progress: 100,
                action: 'PRESS OK TO MONITOR QUAD GRID'
            });
            return;
        }

        // 3. Lo-Fi Radio
        if (id.includes('lofiradio') || alias === 'lofiradio') {
            this.setShelfData({
                badge: '♫ 24/7 AUDIO STREAM',
                badgeColor: '#a855f7',
                title: 'LO-FI CHILL RADIO & BEATS',
                subtitle: 'Commercial-Free Ambient Lo-Fi Beats • OLED 100% Screen-Off Mode Available',
                slot: 'HQ 320 KBPS AUDIO',
                progress: 50,
                action: 'PRESS OK TO START RADIO'
            });
            return;
        }

        // 4. Retro Arcade
        if (id.includes('arcade') || alias === 'arcade') {
            this.setShelfData({
                badge: '🎮 60 FPS ARCADE',
                badgeColor: '#f59e0b',
                title: 'RETRO ARCADE CLASSICS LOBBY',
                subtitle: 'Cyber Snake, Space Invaders, Neon Pong, Brick Breaker, Tetris Blocks',
                slot: '5 BUILT-IN GAMES',
                progress: null,
                action: 'PRESS OK TO PLAY'
            });
            return;
        }

        // 5. Art Mode
        if (id.includes('artmode') || alias === 'artmode') {
            this.setShelfData({
                badge: '🖼️ 4K MUSEUM GALLERY',
                badgeColor: '#38bdf8',
                title: 'THE FRAME AMBIENT ART MODE',
                subtitle: 'Curated 4K Masterpieces by Van Gogh, Monet, Hokusai with Smooth Ken Burns Pan',
                slot: '8 MASTERPIECES',
                progress: null,
                action: 'PRESS OK TO VIEW ART'
            });
            return;
        }

        // 6. YouTube Leanback
        if (id.includes('youtube') || alias === 'youtube') {
            this.setShelfData({
                badge: '▶ 4K HDR LEANBACK',
                badgeColor: '#ff0000',
                title: 'YOUTUBE AD-FREE LEANBACK',
                subtitle: 'Explore Trending 4K Documentaries, Music, Tech & Global News',
                slot: 'DOLBY AUDIO',
                progress: null,
                action: 'PRESS OK TO OPEN YOUTUBE'
            });
            return;
        }

        // 7. General Apps (Netflix, Prime, Hotstar, etc.)
        this.setShelfData({
            badge: 'SMART TV APP',
            badgeColor: '#00f0ff',
            title: app.name.toUpperCase(),
            subtitle: app.desc || 'Optimized for webOS 6+ 4K Smart TVs with Magic Remote Support',
            slot: 'READY',
            progress: null,
            action: 'PRESS OK TO LAUNCH'
        });
    },

    setShelfData: function(data) {
        if (!this.titleEl) this.titleEl = document.getElementById('shelf-title');
        if (this.titleEl) this.titleEl.textContent = data.title;
        if (!this.subtitleEl) this.subtitleEl = document.getElementById('shelf-subtitle');
        if (this.subtitleEl) this.subtitleEl.textContent = data.subtitle;
        if (!this.badgeEl) this.badgeEl = document.getElementById('shelf-badge');
        if (this.badgeEl) {
            this.badgeEl.textContent = data.badge;
            this.badgeEl.style.borderColor = data.badgeColor;
            this.badgeEl.style.color = data.badgeColor;
            this.badgeEl.style.background = data.badgeColor + '18';
        }
        if (!this.slotEl) this.slotEl = document.getElementById('shelf-slot');
        if (this.slotEl) {
            this.slotEl.textContent = data.slot || '';
            this.slotEl.style.display = data.slot ? 'inline-block' : 'none';
        }
        if (!this.progressTrackEl) this.progressTrackEl = document.getElementById('shelf-progress-track');
        if (!this.progressFillEl) this.progressFillEl = document.getElementById('shelf-progress-fill');
        if (this.progressTrackEl) {
            if (data.progress !== null && data.progress !== undefined) {
                this.progressTrackEl.style.display = 'block';
                if (this.progressFillEl) this.progressFillEl.style.width = data.progress + '%';
            } else {
                this.progressTrackEl.style.display = 'none';
            }
        }
        if (!this.actionBtnEl) this.actionBtnEl = document.getElementById('shelf-action-hint');
        if (this.actionBtnEl) {
            this.actionBtnEl.textContent = data.action;
        }
        const legacyEl = document.getElementById('focused-app-name');
        if (legacyEl) legacyEl.textContent = data.title;
    }
};

window.TopShelf = TopShelf;
