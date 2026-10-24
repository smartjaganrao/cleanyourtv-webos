/**
 * CleanHub TV - LG webOS Curated Apps Catalog & Simulator Data
 * Maps standard LG webOS application package IDs and fallback brand icons.
 */

const MockApps = {
    getApps: function() {
        return [
            {
                id: "youtube.leanback.v4",
                name: "YouTube",
                icon: "assets/icons/youtube.png",
                color: "#ff0000",
                desc: "Ad-free 4K HDR playback & subscriptions"
            },
            {
                id: "netflix",
                name: "Netflix",
                icon: "assets/icons/netflix.png",
                color: "#e50914",
                desc: "Movies, TV series & award-winning originals"
            },
            {
                id: "amazon",
                name: "Prime Video",
                icon: "assets/icons/prime.png",
                color: "#00a8e1",
                desc: "Amazon Originals, blockbuster movies & TV"
            },
            {
                id: "hotstar",
                name: "JioHotstar",
                icon: "assets/icons/hotstar.png",
                color: "#0c80df",
                desc: "Live cricket, Disney, HBO & blockbuster movies"
            },
            {
                id: "com.cctv.viewer",
                name: "CCTV Viewer",
                icon: "assets/icons/cctv.png",
                color: "#0ea5e9",
                desc: "4-camera 1080p surveillance quad grid monitor"
            },
            {
                id: "com.zee5.app",
                name: "ZEE5",
                icon: "assets/icons/zee5.png",
                color: "#8230c6",
                desc: "Indian regional movies, originals & live TV"
            },
            {
                id: "com.apple.appletv",
                name: "Apple TV",
                icon: "assets/icons/appletv.png",
                color: "#1c1c1e",
                desc: "Apple Original series and movies in 4K Dolby Vision"
            },
            {
                id: "cdp-30",
                name: "Plex",
                icon: "assets/icons/plex.png",
                color: "#e5a00d",
                desc: "Stream your personal media collection & free TV"
            },
            {
                id: "com.domain.xstreamplay",
                name: "Xstream Play",
                icon: "assets/icons/xstream.png",
                color: "#d91e18",
                desc: "Live channels, movies & multi-OTT streaming"
            },
            {
                id: "com.webos.app.lgchannels",
                name: "LG Channels",
                icon: "assets/icons/lgchannels.png",
                color: "#a50034",
                desc: "Free live IP streaming channels powered by LG"
            },
            {
                id: "com.webos.app.browser",
                name: "Web Browser",
                icon: "assets/icons/browser.png",
                color: "#2563eb",
                desc: "Full web browsing with Magic Remote cursor"
            },
            {
                id: "com.webos.app.homeconnect",
                name: "Home Dashboard",
                icon: "assets/icons/homeconnect.png",
                color: "#059669",
                desc: "LG ThinQ IoT smart devices & input manager"
            },
            {
                id: "org.webosbrew.hbchannel",
                name: "Homebrew Channel",
                icon: "assets/icons/homebrew.png",
                color: "#4f46e5",
                desc: "Open-source webOS community app store"
            },
            {
                id: "com.palmdts.devmode",
                name: "Developer Mode",
                icon: "assets/icons/devmode.png",
                color: "#d97706",
                desc: "LG Developer Mode session & sideload manager"
            }
        ];
    }
};

window.MockApps = MockApps;
window.DEFAULT_CATALOG = MockApps.getApps();
window.APP_ICONS = {
    browser: "assets/icons/browser.png",
    default: "assets/icon.png"
};
