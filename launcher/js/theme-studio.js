/**
 * CleanHub TV - Multi-Hero Theme Studio & Dynamic Time-of-Day Engine
 * Supports Avengers, Spider-Verse, Interstellar, Gotham Noir, Apple TV Aerial, and Auto Adaptive mode.
 */

const ThemeStudio = {
    currentTheme: 'avengers',
    dynamicTimer: null,

    themes: {
        'avengers': {
            id: 'avengers',
            name: 'Avengers Cinematic',
            wallpaper: "linear-gradient(135deg, rgba(6,9,19,0.3) 0%, rgba(6,9,19,0.85) 100%), url('assets/avengers_wallpaper.jpg') center right / cover no-repeat",
            bg: '#060913',
            focusRing: '#00f0ff',
            glowColor: 'rgba(0, 240, 255, 0.45)'
        },
        'spiderverse': {
            id: 'spiderverse',
            name: 'Spider-Verse Neon',
            wallpaper: "linear-gradient(135deg, rgba(8,12,28,0.25) 0%, rgba(8,12,28,0.85) 100%), url('assets/spiderverse_wallpaper.jpg') center / cover no-repeat",
            bg: '#080c1c',
            focusRing: '#ec4899',
            glowColor: 'rgba(236, 72, 153, 0.50)'
        },
        'interstellar': {
            id: 'interstellar',
            name: 'Interstellar Cosmic',
            wallpaper: "linear-gradient(135deg, rgba(5,6,12,0.2) 0%, rgba(5,6,12,0.85) 100%), url('assets/interstellar_wallpaper.jpg') center / cover no-repeat",
            bg: '#05060c',
            focusRing: '#f59e0b',
            glowColor: 'rgba(245, 158, 11, 0.45)'
        },
        'gotham': {
            id: 'gotham',
            name: 'Gotham Noir',
            wallpaper: "linear-gradient(135deg, rgba(10,12,18,0.2) 0%, rgba(10,12,18,0.88) 100%), url('assets/gotham_wallpaper.jpg') center / cover no-repeat",
            bg: '#070a0f',
            focusRing: '#ef4444',
            glowColor: 'rgba(239, 68, 68, 0.45)'
        },
        'appletv': {
            id: 'appletv',
            name: 'Apple TV Aerial',
            wallpaper: "linear-gradient(135deg, rgba(4,8,16,0.2) 0%, rgba(4,8,16,0.82) 100%), url('assets/appletv_wallpaper.jpg') center / cover no-repeat",
            bg: '#040810',
            focusRing: '#10b981',
            glowColor: 'rgba(16, 185, 129, 0.40)'
        },
        'dynamic': {
            id: 'dynamic',
            name: 'Adaptive Time-of-Day',
            isDynamic: true
        }
    },

    init: function() {
        const saved = localStorage.getItem('cleanyourtv_theme') || 'avengers';
        this.applyTheme(saved);

        // Check dynamic time shifts every minute
        this.dynamicTimer = setInterval(() => {
            if (this.currentTheme === 'dynamic') {
                this.updateDynamicTheme();
            }
        }, 60000);
    },

    applyTheme: function(themeId) {
        this.currentTheme = themeId;
        localStorage.setItem('cleanyourtv_theme', themeId);
        if (window.LauncherConfig) {
            LauncherConfig.settings.theme = themeId;
            LauncherConfig.save();
        }

        if (themeId === 'dynamic') {
            this.updateDynamicTheme();
            return;
        }

        const t = this.themes[themeId] || this.themes['avengers'];
        document.body.className = 'theme-' + t.id;
        document.documentElement.style.setProperty('--bg-color', t.bg);
        document.documentElement.style.setProperty('--focus-ring', t.focusRing);
        document.documentElement.style.setProperty('--glow-color', t.glowColor);

        const wp = document.getElementById('wallpaper');
        if (wp) {
            wp.style.background = t.wallpaper;
            wp.style.opacity = '1';
        }

        if (window.ControlCenter && ControlCenter.isOpen) {
            ControlCenter.updateThemeUI(themeId);
        }
    },

    updateDynamicTheme: function() {
        const hour = new Date().getHours();
        let targetId = 'avengers';
        if (hour >= 6 && hour < 12) {
            targetId = 'appletv'; // Morning fresh aurora
        } else if (hour >= 12 && hour < 18) {
            targetId = 'avengers'; // Daylight Stark HUD
        } else if (hour >= 18 && hour < 21) {
            targetId = 'spiderverse'; // Dusk neon sunset
        } else {
            targetId = 'interstellar'; // Night OLED cosmic black
        }

        const t = this.themes[targetId];
        document.body.className = 'theme-' + targetId + ' theme-dynamic';
        document.documentElement.style.setProperty('--bg-color', t.bg);
        document.documentElement.style.setProperty('--focus-ring', t.focusRing);
        document.documentElement.style.setProperty('--glow-color', t.glowColor);

        const wp = document.getElementById('wallpaper');
        if (wp) {
            wp.style.background = t.wallpaper;
            wp.style.opacity = '1';
        }
    }
};

window.ThemeStudio = ThemeStudio;
