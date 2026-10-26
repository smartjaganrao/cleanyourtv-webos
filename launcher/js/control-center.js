/**
 * CleanHub TV - Glassmorphism Slide-Over Control Center
 * Fast access to Sleep Timer, Picture Presets, Audio Output, Theme Studio, and Memory Boost.
 */

const ControlCenter = {
    isOpen: false,
    panelEl: null,
    overlayEl: null,
    currentSectionIndex: 0,
    currentTileIndex: 0,
    sections: [],
    prevZone: null,

    init: function() {
        this.panelEl = document.getElementById('control-center-panel');
        this.overlayEl = document.getElementById('cc-backdrop');

        if (this.overlayEl) {
            this.overlayEl.addEventListener('click', () => this.close());
        }

        const closeBtn = document.getElementById('btn-cc-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.close());
        }

        // Setup Sleep Timer Quick Buttons
        document.querySelectorAll('.cc-sleep-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const mins = parseInt(btn.dataset.mins, 10);
                if (mins > 0) {
                    if (window.SleepTimer) SleepTimer.start(mins);
                } else {
                    if (window.SleepTimer) SleepTimer.cancel();
                }
                this.updateSleepUI(mins);
            });
        });

        // Setup Picture Mode Buttons
        document.querySelectorAll('.cc-pic-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.setPictureMode(btn.dataset.mode);
            });
        });

        // Setup Sound Mode Buttons
        document.querySelectorAll('.cc-sound-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.setSoundMode(btn.dataset.sound);
            });
        });

        // Setup Theme Studio Quick Buttons
        document.querySelectorAll('.cc-theme-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const themeId = btn.dataset.theme;
                if (window.ThemeStudio) {
                    ThemeStudio.applyTheme(themeId);
                } else if (window.LauncherConfig) {
                    LauncherConfig.applyTheme(themeId);
                }
                this.updateThemeUI(themeId);
            });
        });

        // Setup Memory Purge Button
        const purgeBtn = document.getElementById('btn-purge-ram');
        if (purgeBtn) {
            purgeBtn.addEventListener('click', () => {
                this.purgeMemory();
            });
        }
    },

    open: function() {
        this.isOpen = true;
        if (!this.panelEl) this.panelEl = document.getElementById('control-center-panel');
        if (!this.overlayEl) this.overlayEl = document.getElementById('cc-backdrop');
        if (this.panelEl) this.panelEl.classList.add('active');
        if (this.overlayEl) this.overlayEl.classList.add('active');

        this.updateSleepUI(window.SleepTimer ? Math.round(SleepTimer.remainingSeconds / 60) : 0);
        this.updateThemeUI(window.LauncherConfig ? LauncherConfig.settings.theme : 'avengers');
        this.updateStats();

        // Focus first actionable button in Control Center
        setTimeout(() => {
            const firstBtn = this.panelEl ? this.panelEl.querySelector('.cc-btn') : null;
            if (firstBtn) firstBtn.focus();
        }, 100);
    },

    close: function() {
        this.isOpen = false;
        if (!this.panelEl) this.panelEl = document.getElementById('control-center-panel');
        if (!this.overlayEl) this.overlayEl = document.getElementById('cc-backdrop');
        if (this.panelEl) this.panelEl.classList.remove('active');
        if (this.overlayEl) this.overlayEl.classList.remove('active');
    },

    toggle: function() {
        if (this.isOpen) this.close();
        else this.open();
    },

    updateSleepUI: function(mins) {
        document.querySelectorAll('.cc-sleep-btn').forEach(btn => {
            const bMins = parseInt(btn.dataset.mins, 10);
            btn.classList.toggle('active', (mins > 0 && bMins === mins) || (mins === 0 && bMins === 0));
        });
    },

    updateThemeUI: function(themeId) {
        document.querySelectorAll('.cc-theme-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.theme === themeId);
        });
    },

    setPictureMode: function(mode) {
        document.querySelectorAll('.cc-pic-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.mode === mode);
        });

        const root = document.documentElement;
        if (mode === 'cinema') {
            root.style.filter = 'contrast(1.08) saturate(1.15)';
        } else if (mode === 'night') {
            root.style.filter = 'sepia(0.18) contrast(1.05) brightness(0.95)';
        } else if (mode === 'trueblack') {
            root.style.filter = 'contrast(1.12) brightness(0.92)';
        } else {
            root.style.filter = 'none'; // Gaming 120Hz
        }
    },

    setSoundMode: function(mode) {
        document.querySelectorAll('.cc-sound-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.sound === mode);
        });
    },

    purgeMemory: function() {
        const fill = document.getElementById('cc-ram-fill');
        const text = document.getElementById('cc-ram-text');
        if (text) text.innerText = 'PURGING MEMORY...';

        // Simulated garbage collection flush
        setTimeout(() => {
            if (fill) fill.style.width = '24%';
            if (text) text.innerText = '1.8 GB / 2.0 GB FREE (89% AVAILABLE)';
            const btn = document.getElementById('btn-purge-ram');
            if (btn) {
                btn.innerText = '✓ MEMORY OPTIMIZED';
                btn.style.borderColor = '#10b981';
                setTimeout(() => {
                    btn.innerText = '⚡ PURGE & BOOST MEMORY';
                    btn.style.borderColor = '';
                }, 3000);
            }
        }, 800);
    },

    updateStats: function() {
        const fill = document.getElementById('cc-ram-fill');
        const text = document.getElementById('cc-ram-text');
        if (fill) fill.style.width = '32%';
        if (text) text.innerText = '1.4 GB / 2.0 GB FREE (72% AVAILABLE)';
    },

    handleKeyDown: function(e) {
        if (!this.isOpen) return false;
        const code = e.keyCode;

        // Back / Escape closes Control Center
        if (code === 461 || code === 27 || code === 8 || code === 10009) {
            e.preventDefault();
            this.close();
            return true;
        }

        // Arrow navigation inside Control Center
        const focusable = Array.from(this.panelEl.querySelectorAll('button:not([disabled])'));
        const current = document.activeElement;
        const idx = focusable.indexOf(current);

        if (code === 38) { // Up
            e.preventDefault();
            if (idx > 0) focusable[idx - 1].focus();
            else focusable[focusable.length - 1].focus();
            return true;
        }

        if (code === 40) { // Down
            e.preventDefault();
            if (idx < focusable.length - 1) focusable[idx + 1].focus();
            else focusable[0].focus();
            return true;
        }

        if (code === 37) { // Left
            e.preventDefault();
            if (idx > 0) focusable[idx - 1].focus();
            return true;
        }

        if (code === 39) { // Right
            e.preventDefault();
            if (idx < focusable.length - 1) focusable[idx + 1].focus();
            return true;
        }

        return false;
    }
};

window.ControlCenter = ControlCenter;
