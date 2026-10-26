/**
 * CleanYourTV - High-Performance DTH IPTV Catalog & EPG Engine
 * Blazing fast in-memory indexing with 0ms network latency.
 * Built for webOS 6+ Smart TVs.
 */

const IPTV_REGIONS = [
    {
        "code": "TAMIL",
        "name": "Tamil DTH",
        "flag": "\ud83c\uddee\ud83c\uddf3"
    },
    {
        "code": "INDIA",
        "name": "All India",
        "flag": "\ud83c\uddee\ud83c\uddf3"
    },
    {
        "code": "GLOBAL",
        "name": "World News",
        "flag": "\ud83c\udf0d"
    },
    {
        "code": "US",
        "name": "United States",
        "flag": "\ud83c\uddfa\ud83c\uddf8"
    },
    {
        "code": "GB",
        "name": "United Kingdom",
        "flag": "\ud83c\uddec\ud83c\udde7"
    },
    {
        "code": "FAVORITES",
        "name": "Favorites",
        "flag": "\u2b50"
    },
    {
        "code": "ALL",
        "name": "All Channels",
        "flag": "\ud83d\udcfa"
    }
];

const IPTV_CATEGORIES = [
    {
        "id": "ALL",
        "name": "All Genres",
        "icon": "\ud83d\udcfa"
    },
    {
        "id": "Entertainment",
        "name": "Entertainment",
        "icon": "\ud83c\udfad"
    },
    {
        "id": "News",
        "name": "News",
        "icon": "\ud83d\udcf0"
    },
    {
        "id": "Movies",
        "name": "Movies",
        "icon": "\ud83c\udfac"
    },
    {
        "id": "Music",
        "name": "Music",
        "icon": "\ud83c\udfb5"
    },
    {
        "id": "Kids",
        "name": "Kids",
        "icon": "\ud83e\uddf8"
    },
    {
        "id": "Sports",
        "name": "Sports",
        "icon": "\u26bd"
    },
    {
        "id": "Devotional",
        "name": "Devotional",
        "icon": "\ud83d\ude4f"
    },
    {
        "id": "Infotainment",
        "name": "Infotainment",
        "icon": "\ud83d\udd2c"
    }
];

const EPG_DATABASE = {
    Entertainment: [
        { start: 6, end: 9, title: "Kaalai Vanakkam & Daily Horoscope", next: "Siragadikka Aasai (Morning Special)" },
        { start: 9, end: 12, title: "Siragadikka Aasai & Baakiyalakshmi", next: "Mahanadhi Super Matinee" },
        { start: 12, end: 14, title: "Mahanadhi & Pandian Stores 2", next: "Blockbuster Tamil Cinema" },
        { start: 14, end: 17, title: "Afternoon Matinee Cinema Special", next: "Chellamma & Kanne Kalaimaane" },
        { start: 17, end: 19, title: "Chellamma & Singapennae", next: "Siragadikka Aasai (Prime Premiere)" },
        { start: 19, end: 21, title: "Siragadikka Aasai & Baakiyalakshmi", next: "Cooku with Comali / Bigg Boss Tamil" },
        { start: 21, end: 23, title: "Cooku with Comali / Bigg Boss Tamil", next: "Night Special Cinema & Headlines" },
        { start: 23, end: 30, title: "Midnight Super Hits & Comedy Express", next: "Kaalai Vanakkam" }
    ],
    News: [
        { start: 6, end: 9, title: "Kaalai Seithigal & Morning Headlines", next: "Tamizha Tamizha Debate" },
        { start: 9, end: 12, title: "Special Ground Report & Politics 360", next: "Mani 12 Seithigal" },
        { start: 12, end: 15, title: "Uchchi Veyil Seithigal & State Briefing", next: "News Analysis Special" },
        { start: 15, end: 18, title: "Maalai Neram News & Live Debates", next: "Prime Time Seithigal 7 PM" },
        { start: 18, end: 20, title: "7 Mani Seithigal & Speed News 100", next: "Nerpada Pesu / Kelvi Neram" },
        { start: 20, end: 22, title: "Prime Time Debate: Nerpada Pesu", next: "Night 10 Mani Seithigal" },
        { start: 22, end: 30, title: "Night Special Bulletin & World News", next: "Kaalai Seithigal" }
    ],
    Movies: [
        { start: 6, end: 9, title: "Evergreen Classic Hits Cinema", next: "Superstar Matinee Film" },
        { start: 9, end: 13, title: "Blockbuster Action Cinema Special", next: "Family Drama Super Hit" },
        { start: 13, end: 17, title: "Mega Blockbuster Matinee Premiere", next: "Romantic Comedy Movie" },
        { start: 17, end: 21, title: "Evening Star Cinema Premiere", next: "Night Thriller / Action Blockbuster" },
        { start: 21, end: 25, title: "Night Super Hit Movie Marathon", next: "Late Night Classics" },
        { start: 25, end: 30, title: "Late Night Classic Cinema", next: "Evergreen Hits" }
    ],
    Music: [
        { start: 6, end: 9, title: "Kaalai Thendral & Melodies", next: "Top 20 Chartbusters" },
        { start: 9, end: 14, title: "Kuthu Songs & Trending Beats", next: "Anirudh & Rahman Non-Stop" },
        { start: 14, end: 18, title: "90s Golden Melodies & Ilaiyaraaja Hits", next: "Trending Mashups 2026" },
        { start: 18, end: 22, title: "Prime Hits & Star Choice Songs", next: "Night Chill Melodies" },
        { start: 22, end: 30, title: "Midnight Melodies & Relaxing Beats", next: "Kaalai Thendral" }
    ],
    Kids: [
        { start: 6, end: 10, title: "Motu Patlu & Chhota Bheem", next: "Ben 10 & Doraemon" },
        { start: 10, end: 14, title: "Doraemon & Shin-chan Tamil", next: "Tom & Jerry Spectacular" },
        { start: 14, end: 18, title: "Cartoon Movie Carnival Special", next: "Oggy and the Cockroaches" },
        { start: 18, end: 22, title: "Oggy & Roll No 21 Tamil", next: "Bedtime Toon Tales" },
        { start: 22, end: 30, title: "Night Animation Theater", next: "Motu Patlu" }
    ],
    Devotional: [
        { start: 4, end: 8, title: "Suprabhatam & Temple Live Darshan", next: "Bhakthi Paadalgal & Upanyasam" },
        { start: 8, end: 12, title: "Special Pooja & Spiritual Discourse", next: "Kanda Sashti & Mahatmyam" },
        { start: 12, end: 17, title: "Devotional Songs & Sacred Chants", next: "Evening Sayaratchai Pooja" },
        { start: 17, end: 21, title: "Deeparadhana & Temple Festivals", next: "Spiritual Guidance & Satsang" },
        { start: 21, end: 28, title: "Night Divine Chants & Peaceful Sleep", next: "Suprabhatam" }
    ],
    Sports: [
        { start: 6, end: 10, title: "Cricket Highlights & Analysis", next: "Live Sports Arena" },
        { start: 10, end: 15, title: "Classic Encounters & Premier League", next: "Live Match Preview" },
        { start: 15, end: 19, title: "IPL Classics & Super Over Thrillers", next: "Prime Time Live Action" },
        { start: 19, end: 23, title: "Live Match Broadcast & Studio Debate", next: "Post Match Review" },
        { start: 23, end: 30, title: "Sports Center & Daily Roundup", next: "Cricket Highlights" }
    ],
    Infotainment: [
        { start: 6, end: 10, title: "Wild Wonders & Planet Earth", next: "Science Frontiers & Tech 360" },
        { start: 10, end: 14, title: "Ancient Mysteries & Lost Worlds", next: "Mega Engineering Marvels" },
        { start: 14, end: 18, title: "Ocean Giants & Deep Sea Exploration", next: "How Things Are Made" },
        { start: 18, end: 22, title: "Space Odyssey: James Webb Frontiers", next: "Secrets of the Universe" },
        { start: 22, end: 30, title: "Survival Stories & Wilderness Journey", next: "Wild Wonders" }
    ]
};

const DEFAULT_IPTV_CHANNELS = [
  {
    "name": "Star Vijay TV HD",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Star_Vijay_logo_2023.png/500px-Star_Vijay_logo_2023.png",
    "url": "https://da86m1sqpm3o0.cloudfront.net/28072023/smil:starvijayuk.smil/playlist.m3u8",
    "category": "Entertainment",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Sun TV HD (1080p)",
    "logo": "https://dtil.tmsimg.com/assets/GNLZZGG002Z0M0Y.png?lock=720x540",
    "url": "https://d2px1d6ssc60fw.cloudfront.net/SunTV/SunTV-HDR10-IN-index.m3u8",
    "category": "Entertainment",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Kalaignar Murasu (396p)",
    "logo": "https://dtil.tmsimg.com/assets/s143561_ld_h15_aa.png?lock=720x540",
    "url": "https://yuppmedtaorire.akamaized.net/v1/master/a0d007312bfd99c47f76b77ae26b1ccdaae76cb1/murasu_nim_https/050522/murasu/playlist.m3u8",
    "category": "Movies",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Kalaignar Seithigal (576p)",
    "logo": "https://dtil.tmsimg.com/assets/s143769_ld_h15_aa.png?lock=720x540",
    "url": "https://raw.githubusercontent.com/amazeyourself/adaptive-streams/refs/heads/main/streams/in/YuppTV/KalaignarSeithigal.m3u8",
    "category": "News",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Kalaignar TV (396p)",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/transparentImages/Kalaignar%20TV.png",
    "url": "https://segment.yuppcdn.net/240122/kalaignartv/playlist.m3u8",
    "category": "Entertainment",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Puthiya Thalaimurai (576p)",
    "logo": "https://dtil.tmsimg.com/assets/s143692_ld_h15_aa.png?lock=720x540",
    "url": "https://mumt07.tangotv.in/zHjX9OFlPUTHIYAEXPRESS/index.m3u8",
    "category": "News",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Polimer News (576p)",
    "logo": "https://dtil.tmsimg.com/assets/s143664_ld_h9_aa.png?lock=720x540",
    "url": "https://segment.yuppcdn.net/110322/polimernews/playlist.m3u8",
    "category": "News",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Polimer TV (720p)",
    "logo": "https://dtil.tmsimg.com/assets/s143665_ld_h15_aa.png?lock=720x540",
    "url": "https://cdn.pishow.tv/ott/live/1241/master.m3u8",
    "category": "Entertainment",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Thanthi One (576p)",
    "logo": "https://dtil.tmsimg.com/assets/s158791_ld_h15_aa.png?lock=720x540",
    "url": "https://mumt07.tangotv.in/zHjX9OFlTHANTHIONE/index.m3u8",
    "category": "Movies",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Thanthi TV (576p)",
    "logo": "https://dtil.tmsimg.com/assets/s144000_ld_h15_aa.png?lock=720x540",
    "url": "https://streams.tangotv.in/THANTHITV/ORIGIN/index.m3u8",
    "category": "News",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "News18 Tamil Nadu (1080p)",
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_NEWS18_TAMIL_NADU/images/LOGO_HD/image.png",
    "url": "https://n18syndication.akamaized.net/bpk-tv/News18_Tamil_Nadu_NW18_MOB/output01/master.m3u8",
    "category": "News",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Raj Digital Plus (1080p)",
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_RAJ_DIGITAL_PLUS/images/LOGO_HD/image.png",
    "url": "https://livestream.rajtv.tv/hlslive/Admin/px08241087/live/RajTV_Digital_plus/master_1.m3u8",
    "category": "Movies",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Raj Musix Tamil (1080p)",
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_RAJ_MUSIX_TAMIL/images/LOGO_HD/image.png",
    "url": "https://livestream.rajtv.tv/hlslive/Admin/px08241087/live/Raj_Musix/master_1.m3u8",
    "category": "Music",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Raj TV (1080p)",
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_RAJ_TV/images/LOGO_HD/image.png",
    "url": "https://livestream.rajtv.tv/hlslive/Admin/px08241087/live/RAJTV/master_1.m3u8",
    "category": "Entertainment",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Vasanth TV (576p)",
    "logo": "https://dtil.tmsimg.com/assets/s144068_ld_h15_aa.png?lock=720x540",
    "url": "https://mumt04.tangotv.in/m18aqlK4VASANTHTV/index.m3u8",
    "category": "Entertainment",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Makkal TV (576i)",
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_MAKKAL_TV/images/LOGO_HD/image.png",
    "url": "https://5k8q87azdy4v-hls-live.wmncdn.net/MAKKAL/271ddf829afeece44d8732757fba1a66.sdp/playlist.m3u8",
    "category": "Entertainment",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Velicham TV (576p)",
    "logo": "https://upload.wikimedia.org/wikipedia/en/e/e4/Logo_of_Velicham_TV.png",
    "url": "https://mumt05.tangotv.in/87NeALx2VALICHAMPLUS/index.m3u8",
    "category": "Entertainment",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Sathiyam TV (576p)",
    "logo": "https://dtil.tmsimg.com/assets/s143765_ld_h15_aa.png?lock=720x540",
    "url": "https://mumt07.tangotv.in/zHjX9OFlSATHIYAMTV/index.m3u8",
    "category": "News",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "7S Music (576p)",
    "logo": "https://i.imgur.com/zDiIhdN.png",
    "url": "https://cdn.pishow.tv/ott/live/1257/master.m3u8",
    "category": "Music",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Aaryaa TV (1080p)",
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/aryatvtamil.png",
    "url": "https://stream.ottlive.co.in/aryatvtamil/index.m3u8",
    "category": "Entertainment",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Aaseervatham TV (576p)",
    "logo": "https://i.imgur.com/GlfrYs7.png",
    "url": "https://mumt04.tangotv.in/m18aqlK4AASEERVATHAMTV/index.m3u8",
    "category": "Devotional",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Aastha Tamil (480p)",
    "logo": "https://i.imgur.com/YQK9ewf.png",
    "url": "https://aasthaott.akamaized.net/110923/smil:aasthatamil.smil/playlist.m3u8",
    "category": "Devotional",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Angel TV (720p)",
    "logo": "https://i.imgur.com/qKLEGU7.png",
    "url": "https://janya-digimix.akamaized.net/vglive-sk-394914/india/ngrp:angelindia_all/playlist.m3u8",
    "category": "Devotional",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Angel TV America (720p)",
    "logo": "https://i.imgur.com/qKLEGU7.png",
    "url": "https://janya-digimix.akamaized.net/vglive-sk-374850/america/ngrp:angelamerica_all/playlist.m3u8",
    "category": "Devotional",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Angel TV Indo-China (720p)",
    "logo": "https://i.imgur.com/qKLEGU7.png",
    "url": "https://janya-digimix.akamaized.net/vglive-sk-703035/indochina/ngrp:angelindochina_all/playlist.m3u8",
    "category": "Devotional",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Angel TV Indonesia (720p)",
    "logo": "https://i.imgur.com/qKLEGU7.png",
    "url": "https://janya-digimix.akamaized.net/vglive-sk-234616/indonesia/ngrp:angelindonesia_all/playlist.m3u8",
    "category": "Devotional",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Animal Planet (India) (720p)",
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_ANIMAL_PLANET/images/LOGO_HD/image.png",
    "url": "https://drk6xq0vhn.gpcdn.net/live/animal_planet_sd_abr/index.m3u8",
    "category": "Infotainment",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Animal Planet (India) HD (720p)",
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_ANIMAL_PLANET/images/LOGO_HD/image.png",
    "url": "https://drk6xq0vhn.gpcdn.net/live/animal_planet_hd_abr/index.m3u8",
    "category": "Infotainment",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Arputhar Yesu TV (576p)",
    "logo": "https://arputharyesutv.net/wp-content/uploads/2022/07/AR-LOGO-PNG.png",
    "url": "https://account33.livebox.co.in/jesushelpshls/live.m3u8",
    "category": "Devotional",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Berita RTM [Geo-blocked]",
    "logo": "https://i.imgur.com/1Xzxsgl.png",
    "url": "https://d25tgymtnqzu8s.cloudfront.net/smil:berita/playlist.m3u8?id=5",
    "category": "News",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Bhagyam TV (1080p)",
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/aanadhamtvtamil.png",
    "url": "https://ott.bhagyam.net/hls/bhagyamweb/index-1409148900-now.m3u8",
    "category": "Devotional",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Cartoon Network (India) (720p)",
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_CARTOON_NETWORK/images/LOGO_HD/image.png",
    "url": "https://drk6xq0vhn.gpcdn.net/live/cn_sd_abr/index.m3u8",
    "category": "Kids",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Chithiram (576p)",
    "logo": "https://i.imgur.com/xv9cWSh.png",
    "url": "https://cdn.pishow.tv/ott/live/1243/master.m3u8",
    "category": "Kids",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Colors Tamil HD (720p)",
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_COLORS_TAMIL/images/LOGO_HD/image.png",
    "url": "https://da86m1sqpm3o0.cloudfront.net/28072023/smil:colorstamilhd11.smil/playlist.m3u8",
    "category": "Entertainment",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "DD Sports HD (1080p)",
    "logo": "https://dtil.tmsimg.com/assets/s158255_ld_h15_aa.png?lock=720x540",
    "url": "https://cdn.pishow.tv/ott/live/1161/master.m3u8",
    "category": "Sports",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "DD Tamil HD (1080p)",
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_DD_TAMIL/images/LOGO_HD/image.png",
    "url": "https://cdn.pishow.tv/ott/live/1737/master.m3u8",
    "category": "Entertainment",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Dharsan TV (720p)",
    "logo": "https://play-lh.googleusercontent.com/brn76ZzRlqS8ylZVVcc5ZFWcqUp36iJ82WyzwiQ8-Nqi_8pIZZ_gsMCXNn6YiLhOEQ",
    "url": "https://cable91tataplay.akamaized.net/live/dharshantv/index.m3u8",
    "category": "Devotional",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Dhool TV (576p)",
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/DhoolTV.png",
    "url": "https://d1msejlow1t3l4.cloudfront.net/fta/subhartitv/playlist.m3u8",
    "category": "Music",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Discovery Channel (India) (720p)",
    "logo": "https://dtil.tmsimg.com/assets/GNLZZGG002E9L1W.png?lock=720x540",
    "url": "https://drk6xq0vhn.gpcdn.net/live/discovery_sd_abr/index.m3u8",
    "category": "Infotainment",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Discovery Channel (India) HD (720p)",
    "logo": "https://dtil.tmsimg.com/assets/s159106_ld_h15_aa.png?lock=720x540",
    "url": "https://drk6xq0vhn.gpcdn.net/live/discovery_hd_abr/index.m3u8",
    "category": "Infotainment",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Discovery Kids (720p)",
    "logo": "https://i.imgur.com/0iNQvoL.png",
    "url": "https://drk6xq0vhn.gpcdn.net/live/discovery_kids_abr/index.m3u8",
    "category": "Kids",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Disney Junior (India) (576p)",
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_DISNEY_JUNIOR/images/LOGO_HD/image.png",
    "url": "http://103.151.60.162:2122/play/a016/index.m3u8?hls",
    "category": "Kids",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "EET TV (1080p) [Not 24/7]",
    "logo": "https://i.imgur.com/rntSEDZ.png",
    "url": "https://eu.streamjo.com/eetlive/eettv.m3u8",
    "category": "Entertainment",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "ETV Bal Bharat (576p)",
    "logo": "https://i.imgur.com/zsTxPV9.png",
    "url": "http://103.185.24.134:3001/ETV-BAL-BHARAT/index.m3u8",
    "category": "Kids",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Hebron TV (1080p)",
    "logo": "https://i0.wp.com/hebrontv.in/wp-content/uploads/2023/11/hebron-.png?w=512",
    "url": "https://account20.livebox.co.in/charleshls/live.m3u8",
    "category": "Devotional",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "History TV18 (576p)",
    "logo": "https://dtil.tmsimg.com/assets/s143132_ld_h15_aa.png?lock=720x540",
    "url": "http://103.151.60.162:2122/play/a00y/index.m3u8?hls",
    "category": "Infotainment",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Hosanna TV",
    "logo": "https://i.imgur.com/VYorU1L.png",
    "url": "https://asia.mslivestream.net/mslive/bfba54c5c96a6359e2da0ca35f4998af.sdp/playlist.m3u8",
    "category": "Devotional",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Hungama TV (576p)",
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_HUNGAMA/images/LOGO_HD/image.png",
    "url": "http://103.185.24.134:3001/HUNGAMA/index.m3u8",
    "category": "Kids",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Imai TV (1080p)",
    "logo": "https://i.imgur.com/9tODclu.png",
    "url": "https://live20.bozztv.com/akamaissh101/ssh101/imaitv/playlist.m3u8",
    "category": "Entertainment",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Isai Aruvi (396p)",
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_ISAI_ARUVI/images/LOGO_HD/image.png",
    "url": "https://segment.yuppcdn.net/140622/isaiaruvi/playlist.m3u8",
    "category": "Music",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Joy TV (1080p)",
    "logo": "https://joytvchennai.org/wp-content/uploads/2026/04/cropped-512.png",
    "url": "https://ktismaservers.in:3412/live/joytvlive.m3u8",
    "category": "Entertainment",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Life TV (India) (720p)",
    "logo": "https://i.ibb.co/v1C0bdR/logo-1.png",
    "url": "https://lifetv.livebox.co.in/lifetvhls/lifetv.m3u8",
    "category": "Entertainment",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "M Nadu TV (576p)",
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/M_Nadu.png",
    "url": "https://cloudcdnplayer.mslivestream.net/mslivecdn/mnadu/index.m3u8",
    "category": "Entertainment",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Madha TV (576p)",
    "logo": "https://dtil.tmsimg.com/assets/s143287_ld_h15_aa.png?lock=720x540",
    "url": "https://mumt07.tangotv.in/zHjX9OFlMADHATV/index.m3u8",
    "category": "Devotional",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Madhimugam TV (576p)",
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/Madhimugam_TV.png",
    "url": "https://mumt01.tangotv.in/O5aw8Zn3MATHIMUGAMTV/index.m3u8",
    "category": "Entertainment",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Malai Murasu TV (576p)",
    "logo": "https://i.imgur.com/OC5TQxp.png",
    "url": "https://streams.tangotv.in/MALAIMURASUSEITHIGAL/ORIGIN/index.m3u8",
    "category": "News",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Marutam TV (1080p)",
    "logo": "https://i.imgur.com/cFNw4Af.png",
    "url": "https://mntv.livebox.co.in/mntvhls/live.m3u8",
    "category": "Entertainment",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Mei Alai TV (576p)",
    "logo": "https://www.meialai.in/assets/meialai-DBaBUZTH.png",
    "url": "https://meialai.iptelevishion.com/meialai/2/index.m3u8",
    "category": "Entertainment",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "MK Six (576p)",
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/MK_Six.png",
    "url": "https://mumt06.tangotv.in/qYyB8fXVMKSIX/index.m3u8",
    "category": "Entertainment",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Moon TV (576p)",
    "logo": "https://i.imgur.com/3l25EZI.png",
    "url": "https://d1msejlow1t3l4.cloudfront.net/fta/moontv/playlist.m3u8",
    "category": "Entertainment",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Movies Now HD (1080p)",
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_MOVIES_NOW/images/LOGO_HD/image.png",
    "url": "http://103.151.60.162:2122/play/a02w/index.m3u8?hls",
    "category": "Movies",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "MTA6 Asia (1080p)",
    "logo": "https://i.imgur.com/nhCNPJI.png",
    "url": "https://livemtaasia.akamaized.net/hls/live/2039224/mta6asia/playlist.m3u8",
    "category": "Devotional",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "MTA7 Asia (1080p)",
    "logo": "https://i.imgur.com/3Nl8Tpu.png",
    "url": "https://livemtaasia.akamaized.net/hls/live/2039224/mtaasia2/playlist.m3u8",
    "category": "Devotional",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Nambikkai TV",
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_NAMBIKKAI_TV/images/LOGO_HD/image.png",
    "url": "https://cdn.pishow.tv/ott/live/1389/master.m3u8",
    "category": "Devotional",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "National Geographic (India) HD (1080p)",
    "logo": "https://dtil.tmsimg.com/assets/s143574_ld_h15_aa.png?lock=720x540",
    "url": "http://103.185.24.134:3001/NATGEO-HD/index.m3u8",
    "category": "Infotainment",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "National Geographic Wild (India) HD (1080p)",
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_NAT_GEO_WILD/images/LOGO_HD/image.png",
    "url": "http://103.185.24.134:3001/NATGEO-WILD-HD/index.m3u8",
    "category": "Infotainment",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "NDTV Good Times (1080p)",
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_GOOD_TIMES/images/LOGO_HD/image.png",
    "url": "https://amg01448-samsungin-ndtvgoodtimes-samsungin-ad-gp.amagi.tv/playlist/amg01448-samsungin-ndtvgoodtimes-samsungin/playlist.m3u8",
    "category": "Infotainment",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "News 7 Tamil (576p)",
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/News7_Tamil.png",
    "url": "https://segment.yuppcdn.net/240122/news7/playlist.m3u8",
    "category": "News",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "News J (720p) [Not 24/7]",
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/News_J.png",
    "url": "https://cdn.pishow.tv/ott/live/1279/master.m3u8",
    "category": "News",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "News Tamil 24x7 (576p)",
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_NEWS_TAMIL_24X7/images/LOGO_HD/image.png",
    "url": "https://cdn.pishow.tv/ott/live/1433/master.m3u8",
    "category": "News",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "NH Tamil Gold (1080p)",
    "logo": "https://tvpnlogopus.samsungcloud.tv/platform/image/sourcelogo/vc/00/02/34/IN400061DB_20260623T015348SQUARE.png",
    "url": "https://d3arbp6l7f096k.cloudfront.net/v1/master/3722c60a815c199d9c0ef36c5b73da68a62b09d1/pb-gv6wgpbb4mgwk/playlist.m3u8?ads.ads_cdn=cf&ads.app_domain=APP_DOMAIN&ads.cdn=cf",
    "category": "Entertainment",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Nickelodeon (India) (576p)",
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_NICK/images/LOGO_HD/image.png",
    "url": "http://103.185.24.134:3001/NICK/index.m3u8",
    "category": "Kids",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "NTC TV (720p)",
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/ntvtamil.png",
    "url": "https://galaxyott.live/hls/ntv.m3u8",
    "category": "Entertainment",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Okey [Geo-blocked]",
    "logo": "https://i.imgur.com/V2jREQ5.png",
    "url": "https://d25tgymtnqzu8s.cloudfront.net/smil:okey/playlist.m3u8?id=3",
    "category": "Entertainment",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Oli TV (India) (1080p)",
    "logo": "https://i.ibb.co/XfvTQyJn/main-removebg-preview.png",
    "url": "https://live.olidigital.in/olitv/olitv/index.m3u8",
    "category": "Entertainment",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "OM TV (576p)",
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/OM_TV.png",
    "url": "https://mumt01.tangotv.in/O5aw8Zn3OMTV/index.m3u8",
    "category": "Devotional",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Peppers TV (751p)",
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/Peppers_TV.png",
    "url": "https://cdn.pishow.tv/ott/live/1383/master.m3u8",
    "category": "Entertainment",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Puthuyugam TV (576p)",
    "logo": "https://dtil.tmsimg.com/assets/s143693_ld_h15_aa.png?lock=720x540",
    "url": "https://mumt04.tangotv.in/m18aqlK4PUTHUYUGAMTV/index.m3u8",
    "category": "Entertainment",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Sai TV (576p)",
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_SAI_TV/images/LOGO_HD/image.png",
    "url": "https://mumbai-edge.smartplaytv.in/SaiTV/index.m3u8",
    "category": "Devotional",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Sairam TV (576p)",
    "logo": "",
    "url": "https://mumt04.tangotv.in/m18aqlK4SAIRAMTV/index.m3u8",
    "category": "Devotional",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Sana Plus (1080p)",
    "logo": "https://i.imgur.com/N6tKUZv.png",
    "url": "https://mumbai-edge.smartplaytv.in/SanaPlusHD/index.m3u8",
    "category": "Devotional",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Sana TV (1080p)",
    "logo": "https://i.imgur.com/CR7DGBv.png",
    "url": "https://vglivessai.akamaized.net/us/v1/master/611d79b11b77e2f571934fd80ca1413453772ac7/b6d9e864-ec16-410a-804d-ccf8f720bfaa/index.m3u8",
    "category": "Devotional",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Sankara TV (576p)",
    "logo": "https://i.imgur.com/2z0bDRD.png",
    "url": "https://mumt05.tangotv.in/87NeALx2SRISANKARA/index.m3u8",
    "category": "Devotional",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Shakthi TV (576p)",
    "logo": "https://i.imgur.com/RX6IwK8.png",
    "url": "https://mumbai-edge.smartplaytv.in/ShakthiTV/index.m3u8",
    "category": "Entertainment",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Sirippoli TV (576p)",
    "logo": "https://dtil.tmsimg.com/assets/s143791_ld_h9_aa.png?lock=720x540",
    "url": "https://segment.yuppcdn.net/240122/siripoli/playlist.m3u8",
    "category": "Entertainment",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Sivan TV (1080p)",
    "logo": "https://i.ibb.co/b3HG9wm/Logo-site.png",
    "url": "http://sivantv.livebox.co.in/sivantvhls/sivan.m3u8",
    "category": "Devotional",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Sony BBC Earth HD (1080p)",
    "logo": "https://dtil.tmsimg.com/assets/s143800_ld_h15_aa.png?lock=720x540",
    "url": "http://103.185.24.134:3001/SONY-BBC/index.m3u8",
    "category": "Infotainment",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Sony Pix HD (1080p)",
    "logo": "https://i.postimg.cc/Z5G8j67L/PIX-HD-WHITE.png",
    "url": "http://103.151.60.162:2122/play/a01d/index.m3u8?hls",
    "category": "Movies",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Sooriyan TV (1080p)",
    "logo": "https://i.ibb.co/LSyydKj/Sooriyan-TV-Tamil.jpg",
    "url": "https://live20.bozztv.com/giatv/giatv-Infinittyott/Infinittyott/playlist.m3u8",
    "category": "Entertainment",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Star Movies (India) HD (1080p)",
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_STAR_MOVIES/images/LOGO_HD/image.png",
    "url": "http://103.185.24.134:3001/Star-Movies/index.m3u8",
    "category": "Movies",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Star Sports 2 (576p)",
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_STAR_SPORTS_2/images/LOGO_HD/image.png",
    "url": "http://103.151.60.162:2122/play/a00v/index.m3u8?hls",
    "category": "Sports",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Subin TV (1080p)",
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/subintvtamil.png",
    "url": "https://stream.galaxyott.live/live/subintv/index.m3u8",
    "category": "Entertainment",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Super Hungama (576p)",
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_SUPER_HUNGAMA/images/LOGO_HD/image.png",
    "url": "http://103.185.24.134:3001/SUPER-HUNGAMA/index.m3u8",
    "category": "Kids",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Suriya TV (1080p)",
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/suryatvtamil.png",
    "url": "https://stream.ottlive.co.in/suryatvtamil/index.m3u8",
    "category": "Entertainment",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "SVBC 2 (1080p)",
    "logo": "https://dtil.tmsimg.com/assets/s143890_ld_h9_aa.png?lock=720x540",
    "url": "https://player.mslivestream.net/tamil/ac206e74d75b285755ee4924df87d951.sdp/playlist.m3u8",
    "category": "Devotional",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Tamilan TV (576p)",
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/Tamilan_Television.png",
    "url": "https://mumt04.tangotv.in/m18aqlK4TAMILANTELEVISION/index.m3u8",
    "category": "Entertainment",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "TamilVision-TV (1080p)",
    "logo": "https://i.imgur.com/DodsLuW.png",
    "url": "https://live.cmr24.fm/TVI/HD/chunks.m3u8",
    "category": "Entertainment",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Thalaa TV (1080p)",
    "logo": "https://d229kpbsb5jevy.cloudfront.net/yuppfast/content/common/channel/logos/thalaa-tv.png",
    "url": "https://streams2.sofast.tv/v1/master/611d79b11b77e2f571934fd80ca1413453772ac7/2069c593-3c07-4d62-9d44-746be5c3a5d6/manifest.m3u8",
    "category": "Entertainment",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Thendral TV (576p)",
    "logo": "https://i.imgur.com/kQK80gB.png",
    "url": "https://hls.thendraltv.in/thendraltv_1210b43d/index.m3u8",
    "category": "Entertainment",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Travelxp 4K HDR (2160p) [Geo-blocked]",
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_TRAVELXP/images/LOGO_HD/image.png",
    "url": "https://deltatesttatasky.akamaized.net/out/i/968284.m3u8",
    "category": "Infotainment",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Travelxp HD (1080p)",
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_TRAVELXP/images/LOGO_HD/image.png",
    "url": "http://103.151.60.162:2122/play/a01s/index.m3u8?hls",
    "category": "Infotainment",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Tunes 6 (720p)",
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/Tunes_6.png",
    "url": "https://stream.d6-pro.com/Tunes6music/live/video.m3u8",
    "category": "Music",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Ultimate TV (1080p)",
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/utvtamil.png",
    "url": "https://stream.ottlive.co.in/utvtamil/index.m3u8",
    "category": "Entertainment",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Vaanavil TV (720p)",
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/Vaanavil_TV.png",
    "url": "https://6n3yope4d9ok-hls-live.5centscdn.com/vaanavil/TV.stream/playlist.m3u8",
    "category": "Entertainment",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Vendhar TV (576p)",
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/Vendhar_TV.png",
    "url": "https://mumt04.tangotv.in/m18aqlK4VENDHARTV/index.m3u8",
    "category": "Entertainment",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Verbum TV (1080p)",
    "logo": "https://i.imgur.com/YEKEaB4.png",
    "url": "https://video-eu1.streamerr.co/hls/scb80244b91/live.m3u8",
    "category": "Devotional",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Village TV (1080p)",
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/VillageTV.png",
    "url": "https://live.villagetv.net/villagetv/hd/index.m3u8",
    "category": "Entertainment",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "WOW Kidz Tamil (720p)",
    "logo": "https://d229kpbsb5jevy.cloudfront.net/yupptvnew/content/common/channel/logos/mjvezt.png",
    "url": "https://yuppparoriglin.akamaized.net/181224/smil:wowkidztam.smil/playlist.m3u8?hdnts=st=1735898689~exp=1835898688~acl=*~hmac=f5fe24724fe05481e3841f9eb5ab8efdee0a3dd83645ae9dcf45703f525bab7b",
    "category": "Kids",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Zee Tamil HD (1080p)",
    "logo": "https://dtil.tmsimg.com/assets/GNLZZGG00233WCL.png?lock=720x540",
    "url": "https://d2o8pibksxtln6.cloudfront.net/live/media/Zee_Tamil_HD/hls/Zee_Tamil_HD.m3u8",
    "category": "Entertainment",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "Zee Tamil News (720p)",
    "logo": "https://english.cdn.zeenews.com/images/logo/zee-tamil-logo-20.svg",
    "url": "https://raw.githubusercontent.com/amazeyourself/adaptive-streams/refs/heads/main/streams/in/ZMCL/ZeeTamilNews.m3u8",
    "category": "News",
    "region": "TAMIL",
    "country": "IN",
    "flag": "\ud83c\uddee\ud83c\uddf3"
  },
  {
    "name": "9X Jalwa (1080p)",
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_9X_JALWA/images/LOGO_HD/image.png",
    "category": "Music",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://wiselp.wiseplayout.com/9X_Jalwa/master.m3u8"
  },
  {
    "name": "9X Jhakaas (1080p)",
    "logo": "https://dtil.tmsimg.com/assets/s90012_ld_h15_aa.png?lock=720x540",
    "category": "Music",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://amg01281-9xmediapvtltd-9xjhakaas-samsungin-ci2cs.amagi.tv/playlist/amg01281-9xmediapvtltd-9xjhakaas-samsungin/playlist.m3u8"
  },
  {
    "name": "9X Tashan (1080p)",
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_9X_TASHAN/images/LOGO_HD/image.png",
    "category": "Music",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://amg01281-9xmediapvtltd-9xtashan-samsungin-xz1sd.amagi.tv/playlist/amg01281-9xmediapvtltd-9xtashan-samsungin/playlist.m3u8"
  },
  {
    "name": "9XM (1080p)",
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_9XM/images/LOGO_HD/image.png",
    "category": "Music",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://9xjio.wiseplayout.com/9XM/master.m3u8"
  },
  {
    "name": "Aaj Tak (1080p)",
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_AAJ_TAK/images/LOGO_HD/image.png",
    "category": "News",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "http://103.213.31.109:90/AajtakHD/playlist.m3u8"
  },
  {
    "name": "Aaj Tak HD (1080p)",
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_AAJ_TAK/images/LOGO_HD/image.png",
    "category": "News",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://feeds.intoday.in/aajtak/api/aajtakhd/master.m3u8"
  },
  {
    "name": "ABP Ananda (1080p)",
    "logo": "https://dtil.tmsimg.com/assets/s142518_ld_h15_aa.png?lock=720x540",
    "category": "News",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://d2l4ar6y3mrs4k.cloudfront.net/live-streaming/ananda-livetv/master.m3u8"
  },
  {
    "name": "ABP Asmita (1080p)",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/ABP_Asmita_logo.svg/500px-ABP_Asmita_logo.svg.png",
    "category": "News",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://d2l4ar6y3mrs4k.cloudfront.net/live-streaming/asmita-livetv/master.m3u8"
  },
  {
    "name": "ABP Ganga (1080p)",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/ABP_Ganga.svg/500px-ABP_Ganga.svg.png",
    "category": "News",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://d2l4ar6y3mrs4k.cloudfront.net/live-streaming/ganga-livetv/master.m3u8"
  },
  {
    "name": "ABP Majha (576p)",
    "logo": "https://dtil.tmsimg.com/assets/s142521_ld_h15_aa.png?lock=720x540",
    "category": "News",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://mumbai-edge.smartplaytv.in/ABPMajha/index.m3u8"
  },
  {
    "name": "ABP News (1080p)",
    "logo": "https://dtil.tmsimg.com/assets/s158138_ld_h15_aa.png?lock=720x540",
    "category": "News",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://d1rc86nwwc9fag.cloudfront.net/vglive-sk-472500/abpnews/master.m3u8"
  },
  {
    "name": "B4U Bhojpuri (1080p)",
    "logo": "https://i.imgur.com/NwOQUDp.png",
    "category": "Movies",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://cdnb4u.wiseplayout.com/B4U_Bhojpuri/master.m3u8"
  },
  {
    "name": "B4U Bhojpuri Plus (1080p)",
    "logo": "https://i.imgur.com/NwOQUDp.png",
    "category": "Movies",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://cc-t2mudtkmuz4wb.akamaized.net/v1/master/3722c60a815c199d9c0ef36c5b73da68a62b09d1/cc-t2mudtkmuz4wb/B4U_Bhojpuri/master.m3u8"
  },
  {
    "name": "B4U Kadak (576p)",
    "logo": "https://dtil.tmsimg.com/assets/s142695_ld_h15_aa.png?lock=720x540",
    "category": "Movies",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://streams.tangotv.in/B4UKADAK/ORIGIN/index.m3u8"
  },
  {
    "name": "B4U Movies (576p)",
    "logo": "https://i.imgur.com/M9kMFJl.png",
    "category": "Movies",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://streams.tangotv.in/B4UMOVIES/ORIGIN/index.m3u8"
  },
  {
    "name": "B4U Music (1080p)",
    "logo": "https://dtil.tmsimg.com/assets/s158141_ld_h15_aa.png?lock=720x540",
    "category": "Music",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://amg01408-amg01408c5-amgplt0747.playout.now3.amagi.tv/b4um001/playlist.m3u8"
  },
  {
    "name": "CNBC Awaaz (1080p)",
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/CNBCAwaaz.png",
    "category": "Entertainment",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://n18syndication.akamaized.net/bpk-tv/CNBC_Awaaz_NW18_MOB/output01/master.m3u8"
  },
  {
    "name": "CNBC Bajar (1080p)",
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/CNBCBajar.png",
    "category": "Entertainment",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://n18syndication.akamaized.net/bpk-tv/CNBC_Bazaar_NW18_MOB/output01/master.m3u8"
  },
  {
    "name": "CNBC TV18 (1080p)",
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/CNBCTV18.png",
    "category": "Entertainment",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://n18syndication.akamaized.net/bpk-tv/CNBC_TV18_NW18_MOB/output01/index.m3u8"
  },
  {
    "name": "CNBC TV18 Prime HD (1080p)",
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/CNBCTV18Prime.png",
    "category": "Entertainment",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://n18syndication.akamaized.net/bpk-tv/CNBC_Tv18_Prime_HD_NW18_MOB/output01/index.m3u8"
  },
  {
    "name": "Colors (576p)",
    "logo": "https://i.imgur.com/M8uCJ0D.png",
    "category": "Entertainment",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://raw.githubusercontent.com/amazeyourself/adaptive-streams/refs/heads/main/streams/sg/YuppTV/ColorsAPAC.m3u8"
  },
  {
    "name": "Colors HD (1080p)",
    "logo": "https://i.imgur.com/M8uCJ0D.png",
    "category": "Entertainment",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "http://103.151.60.162:2122/play/a02q/index.m3u8?hls"
  },
  {
    "name": "Colors Bangla HD (1080p)",
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_COLORS_BANGLA/images/LOGO_HD/image.png",
    "category": "Entertainment",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "http://103.165.93.31:8095/colorsBangla/index.m3u8"
  },
  {
    "name": "Colors Bangla Cinema (576p)",
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_COLORS_BANGLA_CINEMA/images/LOGO_HD/image.png",
    "category": "Movies",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "http://103.151.60.162:2122/play/a02m/index.m3u8?hls"
  },
  {
    "name": "Colors Cineplex (576p)",
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_COLORS_CINEPLEX/images/LOGO_HD/image.png",
    "category": "Movies",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://raw.githubusercontent.com/amazeyourself/adaptive-streams/refs/heads/main/streams/gb/YuppTV/ColorsCineplexUK.m3u8"
  },
  {
    "name": "Colors Cineplex HD (1080p)",
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_COLORS_CINEPLEX_HD/images/LOGO_HD/image.png",
    "category": "Movies",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "http://103.151.60.162:2122/play/a02s/index.m3u8?hls"
  },
  {
    "name": "Colors Gujarati (396p)",
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_COLORS_GUJARATI/images/LOGO_HD/image.png",
    "category": "Entertainment",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://raw.githubusercontent.com/amazeyourself/adaptive-streams/refs/heads/main/streams/in/YuppTV/ColorsGujarati.m3u8"
  },
  {
    "name": "Colors Infinity HD (1080p)",
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_COLORS_INFINITY/images/LOGO_HD/image.png",
    "category": "Entertainment",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "http://103.151.60.162:2122/play/a02r/index.m3u8?hls"
  },
  {
    "name": "Colors Kannada HD (1080i)",
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_COLORS_KANNADA_HD/images/LOGO_HD/image.png",
    "category": "Entertainment",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://da86m1sqpm3o0.cloudfront.net/28072023/smil:colorskannadahd1.smil/playlist.m3u8"
  },
  {
    "name": "Colors Marathi HD (720p)",
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_COLORS_MARATHI/images/LOGO_HD/image.png",
    "category": "Entertainment",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://da86m1sqpm3o0.cloudfront.net/28072023/smil:colorsmarathihd.smil/playlist.m3u8"
  },
  {
    "name": "Colors Rishtey Americas (396p)",
    "logo": "https://i.imgur.com/xkOunuW.png",
    "category": "Entertainment",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://manatv.akamaized.net/090823/smil:ristheyamerica.smil/playlist.m3u8"
  },
  {
    "name": "Colors Super (396p)",
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_COLORS_SUPER/images/LOGO_HD/image.png",
    "category": "Entertainment",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://d1rc86nwwc9fag.cloudfront.net/260723/smil:colorssuper1.smil/playlist.m3u8?hdnts=st=1735898689~exp=1835898688~acl=*~hmac=f5fe24724fe05481e3841f9eb5ab8efdee0a3dd83645ae9dcf45703f525bab7b"
  },
  {
    "name": "DD Arun Prabha (360p)",
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_DD_ARUNPRABHA/images/LOGO_HD/image.png",
    "category": "Entertainment",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://d2lk5u59tns74c.cloudfront.net/out/v1/308556d9fd1246adb479ef012a39bbfe/index.m3u8"
  },
  {
    "name": "DD Assam (504p)",
    "logo": "https://dtil.tmsimg.com/assets/s142777_ld_h15_aa.png?lock=720x540",
    "category": "Entertainment",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://d2lk5u59tns74c.cloudfront.net/out/v1/d380bf5c167b4319a46cdd8204bc26b2/index.m3u8"
  },
  {
    "name": "DD Bangla (504p)",
    "logo": "https://dtil.tmsimg.com/assets/s142778_ld_h15_aa.png?lock=720x540",
    "category": "Entertainment",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://d3qs3d2rkhfqrt.cloudfront.net/out/v1/7ff57cc9046b4c188b51a0d506f36e7f/index.m3u8"
  },
  {
    "name": "DD Bharati (720p)",
    "logo": "https://i.imgur.com/4tfUIEo.png",
    "category": "Entertainment",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://cdn.pishow.tv/ott/live/10/master.m3u8"
  },
  {
    "name": "DD Bihar (720p)",
    "logo": "https://i.imgur.com/C7KQiZI.png",
    "category": "Entertainment",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://cdn.pishow.tv/ott/live/35/master.m3u8"
  },
  {
    "name": "DD Chandana (504p)",
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_DD_CHANDANA/images/LOGO_HD/image.png",
    "category": "Entertainment",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://d2lk5u59tns74c.cloudfront.net/out/v1/0c980455d2fb4b69bcc6235745ee6039/index.m3u8"
  },
  {
    "name": "DD Chhattisgarh (720p)",
    "logo": "https://i.imgur.com/zBg6Iuv.png",
    "category": "Entertainment",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://cdn.pishow.tv/ott/live/15/master.m3u8"
  },
  {
    "name": "DD Girnar (504p)",
    "logo": "https://dtil.tmsimg.com/assets/s142782_ld_h15_aa.png?lock=720x540",
    "category": "Entertainment",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://d2lk5u59tns74c.cloudfront.net/out/v1/558fdb9aebb54bb5bbbf0ced03686148/index.m3u8"
  },
  {
    "name": "DD Goa (504p)",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/transparentImages/DD-Goa-Logo_2000_X_1125_Transpharent.png",
    "category": "Entertainment",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://d3qs3d2rkhfqrt.cloudfront.net/out/v1/e5b9db1cc184406bb97159da2f120f91/index.m3u8"
  },
  {
    "name": "DD Haryana (504p)",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/transparentImages/DD-Haryana-Logo_2000_X_1125_Transpharent.png",
    "category": "Entertainment",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://d2lk5u59tns74c.cloudfront.net/out/v1/950fc69666474351bde0a32b9600c804/index.m3u8"
  },
  {
    "name": "DD Himachal Pradesh (504p)",
    "logo": "https://dtil.tmsimg.com/assets/s142785_ld_h9_aa.png?lock=720x540",
    "category": "Entertainment",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://d3qs3d2rkhfqrt.cloudfront.net/out/v1/afd2e335b0ba40eb9bdf1096118c6ede/index.m3u8"
  },
  {
    "name": "DD India (1080p)",
    "logo": "https://dtil.tmsimg.com/assets/s158251_ld_h15_aa.png?lock=720x540",
    "category": "Entertainment",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://mumbai-edge.smartplaytv.in/DDIndia/index.m3u8"
  },
  {
    "name": "DD Jharkhand (504p)",
    "logo": "https://dtil.tmsimg.com/assets/s142787_ld_h15_aa.png?lock=720x540",
    "category": "Entertainment",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://d3qs3d2rkhfqrt.cloudfront.net/out/v1/e8c3741f8c154d3185831f4e31777fb2/index.m3u8"
  },
  {
    "name": "DD Kashir (504p)",
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_DD_KASHIR/images/LOGO_HD/image.png",
    "category": "Entertainment",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://d3qs3d2rkhfqrt.cloudfront.net/out/v1/8a59a828e80c49d0958925950cec0204/index.m3u8"
  },
  {
    "name": "DD Kisan (1080p)",
    "logo": "https://i.imgur.com/x56WJEa.png",
    "category": "Entertainment",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://mumbai-edge.smartplaytv.in/DDKisan/index.m3u8"
  },
  {
    "name": "DD Madhya Pradesh (720p)",
    "logo": "https://dtil.tmsimg.com/assets/s142790_ld_h15_aa.png?lock=720x540",
    "category": "Entertainment",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://mumbai-edge.smartplaytv.in/ddmadhyapradesh/index.m3u8"
  },
  {
    "name": "DD Malayalam (504p)",
    "logo": "https://i.postimg.cc/BZjmjJJs/DD-Malayalam.png",
    "category": "Entertainment",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://d2lk5u59tns74c.cloudfront.net/out/v1/c313674ffced4c9a90f1bba436df2b9b/index.m3u8"
  },
  {
    "name": "DD Manipur (504p)",
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_DD_IMPHAL/images/LOGO_HD/image.png",
    "category": "Entertainment",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://d2lk5u59tns74c.cloudfront.net/out/v1/8b75afc6576f450e8f554b6c877681d2/index.m3u8"
  },
  {
    "name": "DD Meghalaya (504p)",
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_DD_SHILLONG/images/LOGO_HD/image.png",
    "category": "Entertainment",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://d3qs3d2rkhfqrt.cloudfront.net/out/v1/4f81bc8d13dd49b484da35988abb8729/index.m3u8"
  },
  {
    "name": "DD Mizoram (504p)",
    "logo": "https://i.imgur.com/I5zT1DG.png",
    "category": "News",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://d2lk5u59tns74c.cloudfront.net/out/v1/eea48c6b61074052a2fa8532ff795ff1/index.m3u8"
  },
  {
    "name": "DD Nagaland (504p)",
    "logo": "https://i.imgur.com/HUL4aF6.png",
    "category": "Entertainment",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://d2lk5u59tns74c.cloudfront.net/out/v1/29c92e0bef954a6d9b0908d1be29c1f0/index.m3u8"
  },
  {
    "name": "DD National (576p)",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/transparentImages/DD%20National.png",
    "category": "Entertainment",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://cdn.pishow.tv/ott/live/11/master.m3u8"
  },
  {
    "name": "DD National HD (1080p)",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/transparentImages/DD%20National.png",
    "category": "Entertainment",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://mumbai-edge.smartplaytv.in/DDNational/index.m3u8"
  },
  {
    "name": "DD News (1080p)",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/transparentImages/DD%20News%20HD.png",
    "category": "News",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://mumbai-edge.smartplaytv.in/DDNews/index.m3u8"
  },
  {
    "name": "DD News HD (1080p)",
    "logo": "https://ltsk-cdn.s3.eu-west-1.amazonaws.com/jumpstart/Temp_Live/cdn/HLS/Channel/transparentImages/DD%20News%20HD.png",
    "category": "News",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://d3qs3d2rkhfqrt.cloudfront.net/out/v1/0811cd8c37ca4c409d5385a6cd2fa18b/index.m3u8"
  },
  {
    "name": "DD Odia (576p)",
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_DD_ORIYA/images/LOGO_HD/image.png",
    "category": "Entertainment",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://mumbai-edge.smartplaytv.in/ddodiya/index.m3u8"
  },
  {
    "name": "DD Punjabi (504p)",
    "logo": "https://dtil.tmsimg.com/assets/s142800_ld_h15_aa.png?lock=720x540",
    "category": "Entertainment",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://d3qs3d2rkhfqrt.cloudfront.net/out/v1/da821c24a59d4e57960497aeaca8fb33/index.m3u8"
  },
  {
    "name": "DD Rajasthan (720p)",
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_DD_RAJASTHAN/images/LOGO_HD/image.png",
    "category": "Entertainment",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://cdn.pishow.tv/ott/live/34/master.m3u8"
  },
  {
    "name": "DD Sahyadri (504p)",
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_DD_SAHYADRI/images/LOGO_HD/image.png",
    "category": "Entertainment",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://d3qs3d2rkhfqrt.cloudfront.net/out/v1/66dcc3ebe182447ba42837e746cf0c7c/index.m3u8"
  },
  {
    "name": "DD Saptagiri (504p)",
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_DD_SAPTAGIRI/images/LOGO_HD/image.png",
    "category": "Entertainment",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://d2lk5u59tns74c.cloudfront.net/out/v1/26e915d6d12b4a06822c5e33c088ed56/index.m3u8"
  },
  {
    "name": "DD Sports (1080p)",
    "logo": "https://dtil.tmsimg.com/assets/s158255_ld_h15_aa.png?lock=720x540",
    "category": "Sports",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://d3qs3d2rkhfqrt.cloudfront.net/out/v1/b17adfe543354fdd8d189b110617cddd/index.m3u8"
  },
  {
    "name": "DD Tripura (504p)",
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_DD_TRIPURA/images/LOGO_HD/image.png",
    "category": "Entertainment",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://d3qs3d2rkhfqrt.cloudfront.net/out/v1/52b998e9510d41c29ad2ceca8ea3d849/index.m3u8"
  },
  {
    "name": "DD Urdu (720p)",
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_DD_URDU/images/LOGO_HD/image.png",
    "category": "Entertainment",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://cdn.pishow.tv/ott/live/8/master.m3u8"
  },
  {
    "name": "DD Uttar Pradesh (720p)",
    "logo": "https://dtil.tmsimg.com/assets/s142807_ld_h9_ab.png?lock=720x540",
    "category": "Entertainment",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://cdn.pishow.tv/ott/live/36/master.m3u8"
  },
  {
    "name": "DD Uttarakhand (720p)",
    "logo": "https://dtil.tmsimg.com/assets/s142809_ld_h15_aa.png?lock=720x540",
    "category": "Entertainment",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://cdn.pishow.tv/ott/live/17/master.m3u8"
  },
  {
    "name": "DD Yadagiri (576p)",
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_DD_YADAGIRI/images/LOGO_HD/image.png",
    "category": "Entertainment",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://cdn.pishow.tv/ott/live/21/master.m3u8"
  },
  {
    "name": "India Today (720p)",
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_INDIA_TODAY/images/LOGO_HD/image.png",
    "category": "News",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://d1rc86nwwc9fag.cloudfront.net/vglive-sk-293160/master.m3u8"
  },
  {
    "name": "NDTV 24x7 (720p)",
    "logo": "https://dtil.tmsimg.com/assets/s154895_ld_h15_aa.png?lock=720x540",
    "category": "News",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://raw.githubusercontent.com/amazeyourself/adaptive-streams/refs/heads/main/streams/in/YuppTV/NDTV24x7.m3u8"
  },
  {
    "name": "NDTV India (720p)",
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_NDTV_INDIA/images/LOGO_HD/image.png",
    "category": "News",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://raw.githubusercontent.com/amazeyourself/adaptive-streams/refs/heads/main/streams/in/YuppTV/NDTVIndia.m3u8"
  },
  {
    "name": "NDTV Madhya Pradesh Chhattisgarh (1080p)",
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_NDTV_MPCG/images/LOGO_HD/image.png",
    "category": "News",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://ndtvregional.akamaized.net/hls/live/2102726-b/ndtvmpcg/master_1.m3u8"
  },
  {
    "name": "NDTV Profit (1080p)",
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_NDTV_PROFIT_PRIME/images/LOGO_HD/image.png",
    "category": "Entertainment",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://ndtvprofit.akamaized.net/hls/live/2107404/ndtvprofit/chunklist_5.m3u8"
  },
  {
    "name": "NDTV Rajasthan (1080p)",
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_NDTV_RAJASTHAN/images/LOGO_HD/image.png",
    "category": "News",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://ndtvregional.akamaized.net/hls/live/2102726-b/ndtvraj/master_1.m3u8"
  },
  {
    "name": "Republic Bangla (576p)",
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_RSYMDOT_BANGLA/images/LOGO_HD/image.png",
    "category": "News",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://streams.tangotv.in/RBANGLA/ORIGIN/index.m3u8"
  },
  {
    "name": "Republic Bharat (1080p)",
    "logo": "https://dtil.tmsimg.com/assets/s143724_ld_h15_aa.png?lock=720x540",
    "category": "News",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://raw.githubusercontent.com/amazeyourself/adaptive-streams/refs/heads/main/streams/in/YuppTV/RepublicBharat.m3u8"
  },
  {
    "name": "Republic Kannada (720p)",
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_RSYMDOTKANNADA/images/LOGO_HD/image.png",
    "category": "News",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://mumbai-edge.smartplaytv.in/republickannada/index.m3u8"
  },
  {
    "name": "Republic TV (1080p)",
    "logo": "https://dtil.tmsimg.com/assets/s143723_ld_h15_aa.png?lock=720x540",
    "category": "News",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://raw.githubusercontent.com/amazeyourself/adaptive-streams/refs/heads/main/streams/in/YuppTV/RepublicTV.m3u8"
  },
  {
    "name": "Sony Aath (576p)",
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_SONY_8/images/LOGO_HD/image.png",
    "category": "Entertainment",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "http://103.165.93.31:8095/sonyAath/index.m3u8"
  },
  {
    "name": "Sony Entertainment Television (576p)",
    "logo": "https://dtil.tmsimg.com/assets/s157589_ld_h15_aa.png?lock=720x540",
    "category": "Entertainment",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "http://103.151.60.162:2122/play/a015/index.m3u8?hls"
  },
  {
    "name": "Sony Entertainment Television HD (1080p)",
    "logo": "https://dtil.tmsimg.com/assets/s159096_ld_h15_aa.png?lock=720x540",
    "category": "Entertainment",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "http://38.96.178.205/SONYHD/index.m3u8"
  },
  {
    "name": "Sony Max HD (1080p)",
    "logo": "https://dtil.tmsimg.com/assets/s157590_ld_h15_aa.png?lock=720x540",
    "category": "Movies",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "http://103.151.60.162:2122/play/a014/index.m3u8?hls"
  },
  {
    "name": "Sony Pal (576p)",
    "logo": "https://dtil.tmsimg.com/assets/s157973_ld_h15_aa.png?lock=720x540",
    "category": "Entertainment",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "http://59.103.38.46:8000/play/a0ac/index.m3u8"
  },
  {
    "name": "Sony SAB (720p)",
    "logo": "https://dtil.tmsimg.com/assets/s159099_ld_h15_ab.png?lock=720x540",
    "category": "Entertainment",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://drk6xq0vhn.gpcdn.net/live/sub_hd_abr/index.m3u8"
  },
  {
    "name": "Sony Sports Ten 1 (576p)",
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_SONY_SPORTS_TEN_1/images/LOGO_HD/image.png",
    "category": "Sports",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "http://103.151.60.162:2122/play/a01c/index.m3u8?hls"
  },
  {
    "name": "Sony Sports Ten 1 HD (1080p)",
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_SONY_SPORTS_TEN_1/images/LOGO_HD/image.png",
    "category": "Sports",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "http://103.185.24.134:3001/SonyTenSports1/index.m3u8"
  },
  {
    "name": "Sony Sports Ten 2 (576p)",
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_SONY_SPORTS_TEN_2/images/LOGO_HD/image.png",
    "category": "Sports",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "http://103.151.60.162:2122/play/a01b/index.m3u8?hls"
  },
  {
    "name": "Sony Sports Ten 3 Hindi (576p)",
    "logo": "https://dtil.tmsimg.com/assets/GNLZZGG0025TCMR.png?lock=720x540",
    "category": "Sports",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "http://103.151.60.162:2122/play/a01t/index.m3u8?hls"
  },
  {
    "name": "Sony Sports Ten 4 Kannada (576p)",
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/SonyTen4Kan.png",
    "category": "Sports",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "http://103.151.60.162:2122/play/a021/index.m3u8?hls"
  },
  {
    "name": "Sony Sports Ten 5 (576p)",
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_SONY_SPORTS_TEN_5/images/LOGO_HD/image.png",
    "category": "Sports",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "http://103.151.60.162:2122/play/a028/index.m3u8?hls"
  },
  {
    "name": "Sony Wah (1080p) [Geo-blocked]",
    "logo": "https://dtil.tmsimg.com/assets/s157974_ld_h15_aa.png?lock=720x540",
    "category": "Movies",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://sl.vodep39240327.workers.dev/channel/SONY+WAH.m3u8"
  },
  {
    "name": "Sony Yay! (576p)",
    "logo": "https://dtil.tmsimg.com/assets/s159100_ld_h15_aa.png?lock=720x540",
    "category": "Kids",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "http://103.165.93.31:8095/sonyYay/index.m3u8"
  },
  {
    "name": "Star Gold 2 HD (1080p)",
    "logo": "https://i.imgur.com/G0ZfzZr.png",
    "category": "Movies",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "http://103.151.60.162:2122/play/a01v/index.m3u8?hls"
  },
  {
    "name": "Star Gold HD (1080p)",
    "logo": "https://i.imgur.com/xC460sj.png",
    "category": "Movies",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "http://103.185.24.134:3001/Star-Gold/index.m3u8"
  },
  {
    "name": "Star Jalsha (576p)",
    "logo": "https://i.imgur.com/IlufzR5.png",
    "category": "Entertainment",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "http://103.151.60.162:2122/play/a00w/index.m3u8?hls"
  },
  {
    "name": "Star Jalsha HD (720p)",
    "logo": "https://i.imgur.com/IlufzR5.png",
    "category": "Entertainment",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://da86m1sqpm3o0.cloudfront.net/28072023/smil:starjalsha.smil/chunklist_b1928000.m3u8"
  },
  {
    "name": "Star Kiran (576p)",
    "logo": "https://dtil.tmsimg.com/assets/s143820_ld_h15_aa.png?lock=720x540",
    "category": "Entertainment",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "http://103.151.60.162:2122/play/a032/index.m3u8?hls"
  },
  {
    "name": "Star Maa HD (720p)",
    "logo": "https://i.imgur.com/5c9PVS0.png",
    "category": "Entertainment",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://da86m1sqpm3o0.cloudfront.net/28072023/smil:starmaa1.smil/chunklist_b2628000.m3u8"
  },
  {
    "name": "Star Maa Movies HD (720p)",
    "logo": "https://dtil.tmsimg.com/assets/s143826_ld_h15_aa.png?lock=720x540",
    "category": "Movies",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://da86m1sqpm3o0.cloudfront.net/28072023/smil:maamovies.smil/chunklist_b2628000.m3u8"
  },
  {
    "name": "Star Pravah HD (720p)",
    "logo": "https://i.imgur.com/ZT0u7AK.png",
    "category": "Entertainment",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://da86m1sqpm3o0.cloudfront.net/28072023/smil:starpravah.smil/chunklist_b1928000.m3u8"
  },
  {
    "name": "Star Sports 2 HD (720p)",
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_STAR_SPORTS_2/images/LOGO_HD/image.png",
    "category": "Sports",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "http://tvsen5.aynascope.net/cXPB2LKkErN9/index.m3u8"
  },
  {
    "name": "Star Sports 2 Hindi (720p)",
    "logo": "https://i.imgur.com/kHerF19.png",
    "category": "Sports",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://tvsen5.aynaott.com/cXPB2LKkErN9/index.m3u8"
  },
  {
    "name": "Star Sports 2 Telugu HD (576p)",
    "logo": "https://i.imgur.com/m7DvvqF.png",
    "category": "Sports",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://real-vk.proxy.nellaiiptv.com/SDMEDIA/index.m3u8"
  },
  {
    "name": "Star Sports 3 (576p)",
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_STAR_SPORTS_3/images/LOGO_HD/image.png",
    "category": "Sports",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "http://103.151.60.162:2122/play/a029/index.m3u8?hls"
  },
  {
    "name": "Star Sports Select 1 HD (1080p)",
    "logo": "https://i.imgur.com/Mh9tKPx.png",
    "category": "Sports",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "http://103.151.60.162:2122/play/a026/index.m3u8?hls"
  },
  {
    "name": "Star Sports Select 2 HD (1080p)",
    "logo": "https://i.imgur.com/FtRT73R.png",
    "category": "Sports",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "http://103.151.60.162:2122/play/a027/index.m3u8?hls"
  },
  {
    "name": "Starnet (480p)",
    "logo": "https://i.imgur.com/J3jB7Kr.png",
    "category": "Entertainment",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://5a1178b42cc03.streamlock.net/8220/8220/playlist.m3u8"
  },
  {
    "name": "StarPlus (India) HD (1080p)",
    "logo": "https://i.imgur.com/xWxNy3L.png",
    "category": "Entertainment",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "http://66.102.126.10:8000/play/a008/index.m3u8"
  },
  {
    "name": "Times Now Navbharat (1080p)",
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_TIMES_NOW_NAVBHARAT_HD/images/LOGO_HD/image.png",
    "category": "News",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://raw.githubusercontent.com/amazeyourself/adaptive-streams/refs/heads/main/streams/in/YuppTV/TimesNowNavbharat.m3u8"
  },
  {
    "name": "Times Now Navbharat HD (1080p)",
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_TIMES_NOW_NAVBHARAT_HD/images/LOGO_HD/image.png",
    "category": "News",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://yupprestreamliveus.akamaized.net/v1/vglive-sk-717514/main.m3u8"
  },
  {
    "name": "Zee News (1080p)",
    "logo": "https://dtil.tmsimg.com/assets/GNLZZGG0023VWYC.png?lock=720x540",
    "category": "News",
    "country": "IN",
    "region": "INDIA",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "url": "https://dknttpxmr0dwf.cloudfront.net/index_57.m3u8"
  },
  {
    "name": "ABC News",
    "logo": "https://i.imgur.com/BrW7gk8.png",
    "category": "News",
    "country": "GLOBAL",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "url": "https://abc-news-dmd-streams-1.akamaized.net/out/v1/701126012d044971b3fa89406a440133/index.m3u8",
    "region": "US"
  },
  {
    "name": "ABC News Live 1",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/ABC_News_Live_logo_2021.svg/960px-ABC_News_Live_logo_2021.svg.png",
    "category": "News",
    "country": "GLOBAL",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "url": "https://abcnews-streams.akamaized.net/hls/live/2023560/abcnewshudson1/master.m3u8",
    "region": "US"
  },
  {
    "name": "ABC News Live 2",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/ABC_News_Live_logo_2021.svg/960px-ABC_News_Live_logo_2021.svg.png",
    "category": "News",
    "country": "GLOBAL",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "url": "https://abcnews-streams.akamaized.net/hls/live/2023561/abcnewshudson2/master.m3u8",
    "region": "US"
  },
  {
    "name": "ABC News Live 3",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/ABC_News_Live_logo_2021.svg/960px-ABC_News_Live_logo_2021.svg.png",
    "category": "News",
    "country": "GLOBAL",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "url": "https://abcnews-streams.akamaized.net/hls/live/2023562/abcnewshudson3/master.m3u8",
    "region": "US"
  },
  {
    "name": "ABC News Live 4",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/ABC_News_Live_logo_2021.svg/960px-ABC_News_Live_logo_2021.svg.png",
    "category": "News",
    "country": "GLOBAL",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "url": "https://abcnews-streams.akamaized.net/hls/live/2023563/abcnewshudson4/master.m3u8",
    "region": "US"
  },
  {
    "name": "ABC News Live 5",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/ABC_News_Live_logo_2021.svg/960px-ABC_News_Live_logo_2021.svg.png",
    "category": "News",
    "country": "GLOBAL",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "url": "https://abcnews-streams.akamaized.net/hls/live/2023564/abcnewshudson5/master.m3u8",
    "region": "US"
  },
  {
    "name": "ABC News Live 6",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/ABC_News_Live_logo_2021.svg/960px-ABC_News_Live_logo_2021.svg.png",
    "category": "News",
    "country": "GLOBAL",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "url": "https://abcnews-streams.akamaized.net/hls/live/2023565/abcnewshudson6/master.m3u8",
    "region": "US"
  },
  {
    "name": "ABC News Live 7",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/ABC_News_Live_logo_2021.svg/960px-ABC_News_Live_logo_2021.svg.png",
    "category": "News",
    "country": "GLOBAL",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "url": "https://abcnews-streams.akamaized.net/hls/live/2023566/abcnewshudson7/master.m3u8",
    "region": "US"
  },
  {
    "name": "ABC News Live 8",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/ABC_News_Live_logo_2021.svg/960px-ABC_News_Live_logo_2021.svg.png",
    "category": "News",
    "country": "GLOBAL",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "url": "https://abcnews-streams.akamaized.net/hls/live/2023567/abcnewshudson8/master.m3u8",
    "region": "US"
  },
  {
    "name": "ABC News Live 9",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/ABC_News_Live_logo_2021.svg/960px-ABC_News_Live_logo_2021.svg.png",
    "category": "News",
    "country": "GLOBAL",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "url": "https://abcnews-streams.akamaized.net/hls/live/2023568/abcnewshudson9/master.m3u8",
    "region": "US"
  },
  {
    "name": "ABC News Live 10",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/ABC_News_Live_logo_2021.svg/960px-ABC_News_Live_logo_2021.svg.png",
    "category": "News",
    "country": "GLOBAL",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "url": "https://abcnews-streams.akamaized.net/hls/live/2023569/abcnewshudson10/master.m3u8",
    "region": "US"
  },
  {
    "name": "ABC News Live",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/ABC_News_Live_logo_2021.svg/960px-ABC_News_Live_logo_2021.svg.png",
    "category": "News",
    "country": "GLOBAL",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "url": "https://jmp2.uk/plu-6508be683a0d700008c534e4.m3u8",
    "region": "US"
  },
  {
    "name": "Al Jazeera 2",
    "logo": "https://i.imgur.com/miq8O1Q.png",
    "category": "News",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://live-hls-web-aja2-gcp.thehlive.com/AJA2/index.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Al Jazeera",
    "logo": "https://i.imgur.com/7bRVpnu.png",
    "category": "News",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://live-hls-apps-aja-fa.getaj.net/AJA/01.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Al Jazeera English",
    "logo": "https://i.imgur.com/7bRVpnu.png",
    "category": "News",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://live-hls-apps-aje-fa.getaj.net/AJE/index.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Al Jazeera English HD",
    "logo": "https://i.imgur.com/7bRVpnu.png",
    "category": "News",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "http://stream.mcquack.net/131/index.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Al Jazeera Mubasher 24",
    "logo": "https://i.imgur.com/LMCcIZ2.png",
    "category": "News",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://live-hls-apps-ajm24-fa.getaj.net/AJM24/index.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Al Jazeera Mubasher",
    "logo": "https://i.imgur.com/X80DQvF.png",
    "category": "News",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://live-hls-apps-ajm-fa.getaj.net/AJM/index.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Al Jazeera Mubasher Broadcast 2",
    "logo": "https://i.imgur.com/nJmi6G6.png",
    "category": "News",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://live-hls-apps-ajm2-fa.getaj.net/AJM2/index.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "CBC News Network",
    "logo": "https://i.imgur.com/SjTdhvJ.png",
    "category": "News",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://d2ny9lo79ujali.cloudfront.net/CBC_News_International.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "CBS News 24/7",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/CBS_News_247_logo.svg/960px-CBS_News_247_logo.svg.png",
    "category": "News",
    "country": "GLOBAL",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "url": "https://jmp2.uk/plu-6350fdd266e9ea0007bedec5.m3u8",
    "region": "US"
  },
  {
    "name": "CBS News Baltimore",
    "logo": "https://i.imgur.com/jy3UfCe.png",
    "category": "News",
    "country": "GLOBAL",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "url": "https://lineup.cbsivideo.com/playout/8877a7d5-b094-4ac8-bc72-75a5fed68e5b/index.m3u8",
    "region": "US"
  },
  {
    "name": "CBS News Bay Area",
    "logo": "https://static.wikia.nocookie.net/logopedia/images/1/1a/Logo-cbsn-bayarea-1920x1080.jpg/revision/latest/scale-to-width-down/512",
    "category": "News",
    "country": "GLOBAL",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "url": "https://cbsn-sf.cbsnstream.cbsnews.com/out/v1/dac63c1abb3f4a2dac9f508f44bb072a/master.m3u8",
    "region": "US"
  },
  {
    "name": "CBS News Boston",
    "logo": "https://i.imgur.com/9un7R3N.png",
    "category": "News",
    "country": "GLOBAL",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "url": "https://cbsn-bos.cbsnstream.cbsnews.com/out/v1/589d66ec6eb8434c96c28de0370d1326/master.m3u8",
    "region": "US"
  },
  {
    "name": "CBS News Chicago",
    "logo": "https://i.imgur.com/qGbVQir.png",
    "category": "News",
    "country": "GLOBAL",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "url": "https://cbsn-chi.cbsnstream.cbsnews.com/out/v1/b2fc0d5715d54908adf07f97d2616646/master.m3u8",
    "region": "US"
  },
  {
    "name": "CBS News Colorado",
    "logo": "https://i.imgur.com/2oyYwBw.png",
    "category": "News",
    "country": "GLOBAL",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "url": "https://cbsn-den.cbsnstream.cbsnews.com/out/v1/2e49baf2906244ecb01b07d9885fbe7a/master.m3u8",
    "region": "US"
  },
  {
    "name": "CBS News Detroit",
    "logo": "https://i.imgur.com/cMels2Y.png",
    "category": "News",
    "country": "GLOBAL",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "url": "https://cbsn-det.cbsnstream.cbsnews.com/out/v1/169f5c001bc74fa7a179b19c20fea069/master.m3u8",
    "region": "US"
  },
  {
    "name": "CBS News Los Angeles",
    "logo": "https://i.imgur.com/klULxMV.png",
    "category": "News",
    "country": "GLOBAL",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "url": "https://cbsn-la.cbsnstream.cbsnews.com/out/v1/57b6c4534a164accb6b1872b501e0028/master.m3u8",
    "region": "US"
  },
  {
    "name": "CBS News Miami",
    "logo": "https://i.imgur.com/DExbVa9.png",
    "category": "News",
    "country": "GLOBAL",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "url": "https://cbsn-mia.cbsnstream.cbsnews.com/out/v1/ac174b7938264d24ae27e56f6584bca0/master.m3u8",
    "region": "US"
  },
  {
    "name": "CBS News Minnesota",
    "logo": "https://i.imgur.com/ubxwfMY.png",
    "category": "News",
    "country": "GLOBAL",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "url": "https://cbsn-min.cbsnstream.cbsnews.com/out/v1/76518f06941246ba810c8d175600bf74/master.m3u8",
    "region": "US"
  },
  {
    "name": "CBS News New York",
    "logo": "https://i.imgur.com/bpc4v0u.png",
    "category": "News",
    "country": "GLOBAL",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "url": "https://cbsn-ny.cbsnstream.cbsnews.com/out/v1/ec3897d58a9b45129a77d67aa247d136/master.m3u8",
    "region": "US"
  },
  {
    "name": "CBS News Philly",
    "logo": "https://i.imgur.com/FmtTbNY.png",
    "category": "News",
    "country": "GLOBAL",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "url": "https://cbsn-phi.cbsnstream.cbsnews.com/out/v1/5c9ad3e215984b0e9ad845b335216b72/master.m3u8",
    "region": "US"
  },
  {
    "name": "CBS News Pittsburgh",
    "logo": "https://i.imgur.com/Un9IrUh.png",
    "category": "News",
    "country": "GLOBAL",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "url": "https://cbsn-pit.cbsnstream.cbsnews.com/out/v1/6966dabf8150405ab26f854e3cd6a2b8/master.m3u8",
    "region": "US"
  },
  {
    "name": "CBS News Sacramento",
    "logo": "https://i.imgur.com/0e1kSGX.png",
    "category": "News",
    "country": "GLOBAL",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "url": "https://lineup.cbsivideo.com/playout/c1ed69db-6b71-4581-a937-a70ab4089f8a/index.m3u8",
    "region": "US"
  },
  {
    "name": "Cheddar News",
    "logo": "https://i.imgur.com/tuP9GW8.png",
    "category": "News",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://hls.livecdn.io/cheddar.com/cheddar/playlist.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "DW Arabic",
    "logo": "https://i.imgur.com/8MRNFb9.png",
    "category": "News",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://dwamdstream103.akamaized.net/hls/live/2015526/dwstream103/master.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "DW English",
    "logo": "https://i.imgur.com/8MRNFb9.png",
    "category": "News",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://amg01644-amg01644c1-amgplt0343.playout.now3.amagi.tv/ts-eu-w1-n2/playlist/amg01644-amg01644c1-amgplt0343/playlist.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "DW Espanol",
    "logo": "https://i.imgur.com/8MRNFb9.png",
    "category": "News",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://dwamdstream104.akamaized.net/hls/live/2015530/dwstream104/master.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "DW Russian",
    "logo": "https://i.imgur.com/8MRNFb9.png",
    "category": "News",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://dwamdstream110.akamaized.net/hls/live/2017971/dwstream110/master.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Euronews",
    "logo": "https://images-2.rakuten.tv/storage/global-live-channel/translation/artwork/bc84c3b7-6008-4ee3-8f6a-e4bb4365f082-width200-quality90.jpeg",
    "category": "News",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://cdn-euronews.akamaized.net/live/eds/euronews-pl/26382/index.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Euronews Bulgaria",
    "logo": "https://i.imgur.com/RrQVoOg.png",
    "category": "News",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "http://213.91.179.28:8000/play/a05e",
    "region": "GLOBAL"
  },
  {
    "name": "Euronews English",
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/Euro_News.png",
    "category": "News",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-61de96114757070008d33cae.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Euronews English HD",
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/Euro_News.png",
    "category": "News",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://dash4.antik.sk/live/test_euronews/playlist.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Euronews French",
    "logo": "https://i.imgur.com/8t9mdg9.png",
    "category": "News",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://2f6c5bf4.wurl.com/master/f36d25e7e52f1ba8d7e56eb859c636563214f541/UmxheHhUVi1ldV9FdXJvbmV3c0ZyYW5jYWlzX0hMUw/playlist.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Euronews Georgia",
    "logo": "https://i.imgur.com/VNJ4soR.png",
    "category": "News",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "http://nue01-edge01.itdc.ge/euronewsgeorgia/mpegts",
    "region": "GLOBAL"
  },
  {
    "name": "Euronews German",
    "logo": "https://staticcyl.euronews.com/wp-content/uploads/2023/03/Logo_Euronews_white-on-neon_german_RGB.png",
    "category": "News",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-6639d7d4b18d700008da5316.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Euronews Greek",
    "logo": "https://i.imgur.com/8t9mdg9.png",
    "category": "News",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://cdn-euronews.akamaized.net/live/eds/euronews-el/25068/index.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Euronews Hungarian",
    "logo": "https://i.imgur.com/8t9mdg9.png",
    "category": "News",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://cdn-euronews.akamaized.net/live/eds/euronews-hu/25075/index.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Euronews Italian",
    "logo": "https://i.imgur.com/8t9mdg9.png",
    "category": "News",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://acb6ca89.wurl.com/master/f36d25e7e52f1ba8d7e56eb859c636563214f541/UmxheHhUVi1ldV9FdXJvbmV3c0l0YWxpYW5vX0hMUw/playlist.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Euronews Portuguese",
    "logo": "https://i.imgur.com/8t9mdg9.png",
    "category": "News",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-619e6614c9d9650007a2b171.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Euronews Romania",
    "logo": "https://i.imgur.com/jUOVUXt.png",
    "category": "News",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://hls02ns.antenaplay.ro/hls/euronews-ro-sd/index.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Euronews Russian",
    "logo": "https://i.imgur.com/8t9mdg9.png",
    "category": "News",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://cdn-euronews.akamaized.net/live/eds/euronews-ru/25071/index.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Euronews Spanish",
    "logo": "https://i.imgur.com/8t9mdg9.png",
    "category": "News",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://iptv.bitred.cl/euronews/index.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "France 24",
    "logo": "https://i.imgur.com/u8N6uoj.png",
    "category": "News",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://live.france24.com/hls/live/2037179-b/F24_FR_HI_HLS/master_5000.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "France 24 Arabic",
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_FRANCE_24/images/LOGO_HD/image.png",
    "category": "News",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://live.france24.com/hls/live/2037222-b/F24_AR_HI_HLS/master_5000.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "France 24 English",
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_FRANCE_24/images/LOGO_HD/image.png",
    "category": "News",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://live.france24.com/hls/live/2037218-b/F24_EN_HI_HLS/master_5000.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "France 24 English HD",
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_FRANCE_24/images/LOGO_HD/image.png",
    "category": "News",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "http://nmk.ioapk.com:5050/4gtv-live146/index.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "France 24 Spanish",
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_FRANCE_24/images/LOGO_HD/image.png",
    "category": "News",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://live.france24.com/hls/live/2037220-b/F24_ES_HI_HLS/master_5000.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "NBC News NOW",
    "logo": "https://i.imgur.com/JZt2qh5.png",
    "category": "News",
    "country": "GLOBAL",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "url": "https://d1si3n1st4nkgb.cloudfront.net/10502/88896001/hls/master.m3u8?ads.xumo_channelId=88896001",
    "region": "US"
  },
  {
    "name": "NDTV Marathi",
    "logo": "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_NDTV_MARATHI/images/LOGO_HD/image.png",
    "category": "News",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://web-ndtv-marathi.akamaized.net/hls/live/2110470/ndtvmarathi/master_1.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "NHK World-Japan",
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/NHK_World_Japan.png",
    "category": "News",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://masterpl.hls.nhkworld.jp/hls/w/live/smarttv.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "NHK World-Japan HD",
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/NHK_World_Japan.png",
    "category": "News",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://freem3u.xyz/api/live/play.m3u8?vid=106",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Record News",
    "logo": "https://images.pluto.tv/channels/6102e04e9ab1db0007a980a1/colorLogoPNG.png",
    "category": "News",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-6102e04e9ab1db0007a980a1.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Rai News 24",
    "logo": "https://i.imgur.com/n2u57y3.png",
    "category": "News",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://rainews1-live.akamaized.net/hls/live/598326/rainews1/rainews1/playlist.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Rai News 24 HD",
    "logo": "https://i.imgur.com/n2u57y3.png",
    "category": "News",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://d3k8wzt41aflvx.cloudfront.net/RAINEWS24/Live.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Record News",
    "logo": "https://i.imgur.com/HZDRG0K.png",
    "category": "News",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "http://45.162.64.114/RECORD_NEWS/index.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Sky News Arabia",
    "logo": "https://i.imgur.com/SvjU4h6.png",
    "category": "News",
    "country": "GLOBAL",
    "flag": "\ud83c\uddec\ud83c\udde7",
    "url": "https://live-stream.skynewsarabia.com/c-horizontal-channel/horizontal-stream/index.m3u8",
    "region": "GB"
  },
  {
    "name": "Sky News Arabia SD",
    "logo": "https://i.imgur.com/SvjU4h6.png",
    "category": "News",
    "country": "GLOBAL",
    "flag": "\ud83c\uddec\ud83c\udde7",
    "url": "https://stream.skynewsarabia.com/ott/ott.m3u8",
    "region": "GB"
  },
  {
    "name": "Sky News Arabia Vertical",
    "logo": "https://i.imgur.com/FjtzQQs.png",
    "category": "News",
    "country": "GLOBAL",
    "flag": "\ud83c\uddec\ud83c\udde7",
    "url": "https://live-stream.skynewsarabia.com/c-vertical-channel/vertical-stream/index.m3u8",
    "region": "GB"
  },
  {
    "name": "Sky News Arabia Vertical SD",
    "logo": "https://i.imgur.com/FjtzQQs.png",
    "category": "News",
    "country": "GLOBAL",
    "flag": "\ud83c\uddec\ud83c\udde7",
    "url": "https://stream.skynewsarabia.com/vertical/vertical.m3u8",
    "region": "GB"
  },
  {
    "name": "Sky News Extra 1",
    "logo": "https://i.imgur.com/ZsPb8nL.png",
    "category": "News",
    "country": "GLOBAL",
    "flag": "\ud83c\uddec\ud83c\udde7",
    "url": "https://skynewsau-live.akamaized.net/hls/live/2002689/skynewsau-extra1/master.m3u8",
    "region": "GB"
  },
  {
    "name": "Sky News Extra 2",
    "logo": "https://i.imgur.com/ZsPb8nL.png",
    "category": "News",
    "country": "GLOBAL",
    "flag": "\ud83c\uddec\ud83c\udde7",
    "url": "https://skynewsau-live.akamaized.net/hls/live/2002690/skynewsau-extra2/master.m3u8",
    "region": "GB"
  },
  {
    "name": "Sky News Extra 3",
    "logo": "https://i.imgur.com/ZsPb8nL.png",
    "category": "News",
    "country": "GLOBAL",
    "flag": "\ud83c\uddec\ud83c\udde7",
    "url": "https://skynewsau-live.akamaized.net/hls/live/2002691/skynewsau-extra3/master.m3u8",
    "region": "GB"
  },
  {
    "name": "Sky News Urdu",
    "logo": "https://raw.githubusercontent.com/songwenhui239/Songwenhui239/refs/heads/main/sky-news-urdu-pk.png",
    "category": "News",
    "country": "GLOBAL",
    "flag": "\ud83c\uddec\ud83c\udde7",
    "url": "https://lbgo.bozztv.com/ssh101/ssh101/skynews/playlist.m3u8",
    "region": "GB"
  },
  {
    "name": "WELT",
    "logo": "https://i.imgur.com/s4TZoxx.png",
    "category": "News",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://dash4.antik.sk/live/test_welt_tizen/playlist.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "WION",
    "logo": "https://i.imgur.com/Wc5Z3iS.png",
    "category": "News",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "http://vg-zeefta.akamaized.net/ptnr-yupptv/title-wion/v1/master/611d79b11b77e2f571934fd80ca1413453772ac7/20c3c0d9-0256-43fe-bca6-70fdd490b957/main.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "DAZN Darts x Pluto TV",
    "logo": "https://images.pluto.tv/channels/64b67f0424ade50008a3be17/colorLogoPNG.png",
    "category": "Sports",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-64b67f0424ade50008a3be17.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "DAZN Heldinnen x Pluto TV",
    "logo": "https://images.pluto.tv/channels/64afe50c5dc16600087f3227/colorLogoPNG.png",
    "category": "Sports",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-64afe50c5dc16600087f3227.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Competition",
    "logo": "https://images.pluto.tv/channels/603fde9026ecbf0007752c2c/colorLogoPNG.png",
    "category": "Sports",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-603fde9026ecbf0007752c2c.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Deportes",
    "logo": "https://images.pluto.tv/channels/5dcde07af1c85b0009b18651/colorLogoPNG_1766080575034.png",
    "category": "Sports",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-5dcde07af1c85b0009b18651.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV E-Sports",
    "logo": "https://images.pluto.tv/channels/5ff3934600d4c7000733ff49/colorLogoPNG.png",
    "category": "Sports",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-5ff3934600d4c7000733ff49.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Esportes",
    "logo": "https://images.pluto.tv/channels/5f32d2db0af67400077f29c4/colorLogoSVG_1780355759776.svg",
    "category": "Sports",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-5f32d2db0af67400077f29c4.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Fishing",
    "logo": "https://images.pluto.tv/channels/619e1874e0d3a7000729a036/colorLogoPNG.png",
    "category": "Sports",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-619e1874e0d3a7000729a036.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Handbold Highlights",
    "logo": "https://images.pluto.tv/channels/68dfa431cc3c6cd904053100/colorLogoPNG_1761838112979.png",
    "category": "Sports",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-68dfa431cc3c6cd904053100.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Handbold Live",
    "logo": "https://images.pluto.tv/channels/6618f54baec96800081525ec/colorLogoPNG_1762173655031.png",
    "category": "Sports",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-6618f54baec96800081525ec.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Handboll Highlights",
    "logo": "https://images.pluto.tv/channels/68dfa3e2cc3c6cd904052c41/colorLogoPNG_1761838923264.png",
    "category": "Sports",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-68dfa3e2cc3c6cd904052c41.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Handboll Live",
    "logo": "https://images.pluto.tv/channels/686faf533ffa5e0c912688e7/colorLogoPNG_1762169254016.png",
    "category": "Sports",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-686faf533ffa5e0c912688e7.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Snooker 900 (Sweden)",
    "logo": "https://images.pluto.tv/channels/68ac5543a1ac0c90f2c8943e/colorLogoPNG_1760517341343.png",
    "category": "Sports",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-68ac56363efb41cd979a8005.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Snooker 900 (Sweden) DK",
    "logo": "https://images.pluto.tv/channels/68ac5543a1ac0c90f2c8943e/colorLogoPNG_1760517341343.png",
    "category": "Sports",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-68ac55bb3efb41cd979a65ec.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Snooker 900 (Sweden) NO",
    "logo": "https://images.pluto.tv/channels/68ac5543a1ac0c90f2c8943e/colorLogoPNG_1760517341343.png",
    "category": "Sports",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-68ac55fe3efb41cd979a6877.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Snooker 900 (United States)",
    "logo": "https://images.pluto.tv/channels/639b4f75d3d35c0007d37b30/colorLogoPNG_1759333260607.png",
    "category": "Sports",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-639b4f75d3d35c0007d37b30.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Sport (Germany)",
    "logo": "https://images.pluto.tv/channels/608030eff4b6f70007e1684c/colorLogoPNG_1746816937164.png",
    "category": "Sports",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-608030eff4b6f70007e1684c.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Sport (Sweden)",
    "logo": "https://images.pluto.tv/channels/6357f3de3643ba0007bc0b50/colorLogoPNG_1746816938506.png",
    "category": "Sports",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-62cd74e38f6f0d000798cd93.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Sport (Sweden) DK",
    "logo": "https://images.pluto.tv/channels/6357f3de3643ba0007bc0b50/colorLogoPNG_1746816938506.png",
    "category": "Sports",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-6357f3de3643ba0007bc0b50.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Sport (Sweden) NO",
    "logo": "https://images.pluto.tv/channels/6357f3de3643ba0007bc0b50/colorLogoPNG_1746816938506.png",
    "category": "Sports",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-6357f33cb51d2d00077927c6.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Red Bull TV",
    "logo": "https://images.pluto.tv/channels/5e7cb84a172a0f0007da69e4/colorLogoPNG.png",
    "category": "Sports",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://3ea22335.wurl.com/master/f36d25e7e52f1ba8d7e56eb859c636563214f541/UmFrdXRlblRWLWdiX1JlZEJ1bGxUVl9ITFM/playlist.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Red Bull TV AU",
    "logo": "https://images.pluto.tv/channels/5e7cb84a172a0f0007da69e4/colorLogoPNG.png",
    "category": "Sports",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://db34cc6127ac459db55cab5f97cd66b9.mediatailor.us-west-2.amazonaws.com/v1/master/ba62fe743df0fe93366eba3a257d792884136c7f/LINEAR-680-WORBAUENFAST-WHALETVPLUS/680/whaletvplus/hls/master/playlist.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Red Bull TV BR",
    "logo": "https://images.pluto.tv/channels/5e7cb84a172a0f0007da69e4/colorLogoPNG.png",
    "category": "Sports",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://d03ae6b5c6724c24867e97a3dc04934a.mediatailor.us-west-2.amazonaws.com/v1/master/ba62fe743df0fe93366eba3a257d792884136c7f/LINEAR-1026-WORBBRPTFAST-WHALETVPLUS/1026/hls/master/playlist.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Red Bull TV DE",
    "logo": "https://images.pluto.tv/channels/5e7cb84a172a0f0007da69e4/colorLogoPNG.png",
    "category": "Sports",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://46cfeb23c7f74853bba7a256655a3119.mediatailor.us-west-2.amazonaws.com/v1/master/ba62fe743df0fe93366eba3a257d792884136c7f/LINEAR-582-WORBDACHDEFAST-WHALETVPLUS/582/whaletvplus/hls/master/playlist.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Red Bull TV ES",
    "logo": "https://images.pluto.tv/channels/5e7cb84a172a0f0007da69e4/colorLogoPNG.png",
    "category": "Sports",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://886bd3fbc782459f8de7555d32d7e9ce.mediatailor.us-west-2.amazonaws.com/v1/master/ba62fe743df0fe93366eba3a257d792884136c7f/LINEAR-957-WORBLATAMESFAST-WHALETVPLUS/957/whaletvplus/hls/master/playlist.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Red Bull TV SD",
    "logo": "https://images.pluto.tv/channels/5e7cb84a172a0f0007da69e4/colorLogoPNG.png",
    "category": "Sports",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Red Bull TV UK",
    "logo": "https://images.pluto.tv/channels/5e7cb84a172a0f0007da69e4/colorLogoPNG.png",
    "category": "Sports",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://1a3566cb46914c5499fbc86fbc4ac87e.mediatailor.us-west-2.amazonaws.com/v1/master/ba62fe743df0fe93366eba3a257d792884136c7f/LINEAR-932-WORBUKENFAST-WHALETVPLUS/932/whaletvplus/hls/master/playlist.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Red Bull TV US",
    "logo": "https://images.pluto.tv/channels/5e7cb84a172a0f0007da69e4/colorLogoPNG.png",
    "category": "Sports",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://0b73ace69ebb45eaa249bb87837cb958.mediatailor.us-west-2.amazonaws.com/v1/master/ba62fe743df0fe93366eba3a257d792884136c7f/LINEAR-644-WORBUSENFAST-LG_US/644/lgtv/hls/master/playlist.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "World Poker Tour",
    "logo": "https://i.imgur.com/98kLMjj.png",
    "category": "Sports",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://d2e00kr7m9coe4.cloudfront.net/scheduler/scheduleMaster/406.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "World Poker Tour Germany",
    "logo": "https://i.imgur.com/98kLMjj.png",
    "category": "Sports",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-5ad9b7aae738977e2c312132.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "World Poker Tour Poland",
    "logo": "https://i.imgur.com/98kLMjj.png",
    "category": "Sports",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://d39g1vxj2ef6in.cloudfront.net/v1/master/3fec3e5cac39a52b2132f9c66c83dae043dc17d4/prod-rakuten-stitched/playlist.m3u8?ads.xumo_channelId=88883102",
    "region": "GLOBAL"
  },
  {
    "name": "World Poker Tour UK",
    "logo": "https://i.imgur.com/98kLMjj.png",
    "category": "Sports",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://amg00477-samsungelectron-worldpokertour-samsunguk-81igb.amagi.tv/playlist/amg00477-samsungelectron-worldpokertour-samsunguk/playlist.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Cine 666 by Pluto TV",
    "logo": "https://images.pluto.tv/channels/6823648580b2665220d9e69a/colorLogoPNG-1757404141.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-6823648580b2665220d9e69a.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Cine Action by Pluto TV",
    "logo": "https://images.pluto.tv/channels/5f8ed1ff5c39700007e2204a/colorLogoPNG_1752228138963.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-5f8ed1ff5c39700007e2204a.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Cine by Pluto TV",
    "logo": "https://images.pluto.tv/channels/5f8ed0f17564a300082b676a/colorLogoPNG_1775048900088.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-5f8ed0f17564a300082b676a.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Cine Catastrophe by Pluto TV",
    "logo": "https://images.pluto.tv/channels/65a69ef53af63d000825e0ee/colorLogoPNG_1751272916058.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-65a69ef53af63d000825e0ee.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Cine d'Asie by Pluto TV",
    "logo": "https://images.pluto.tv/channels/62f3e2d000418d00070f7dbc/colorLogoPNG_1751272759694.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-62f3e2d000418d00070f7dbc.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Cine Horreur by Pluto TV",
    "logo": "https://images.pluto.tv/channels/66e1978babec540008ce41ac/colorLogoPNG_1751272165674.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-66e1978babec540008ce41ac.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Cine Retro by Pluto TV",
    "logo": "https://images.pluto.tv/channels/5f8ed168f72fcd0007e56269/colorLogoPNG_1751272859383.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-5f8ed168f72fcd0007e56269.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Cine Romance by Pluto TV",
    "logo": "https://images.pluto.tv/channels/60812fc8539963000707d1e1/colorLogoPNG_1775048649580.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-60812fc8539963000707d1e1.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Cine Sci-Fi by Pluto TV",
    "logo": "https://images.pluto.tv/channels/60c34592c911890007f29a73/colorLogoPNG.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-60c34592c911890007f29a73.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Cine Thrillers by Pluto TV",
    "logo": "https://images.pluto.tv/channels/60c3472a51a2050008dad272/colorLogoPNG_1751272093012.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-60c3472a51a2050008dad272.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Cine Western by Pluto TV",
    "logo": "https://images.pluto.tv/channels/65cca3e2ec452d0008af3a65/colorLogoPNG_1751272826143.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-65cca3e2ec452d0008af3a65.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV 90's Classics",
    "logo": "https://images.pluto.tv/channels/66b4990746762a00084c2f78/colorLogoPNG.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-66b4990746762a00084c2f78.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV A La Mexicana",
    "logo": "https://images.pluto.tv/channels/5dfcde52d28b09000a42d7a2/colorLogoPNG.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-5dfcde52d28b09000a42d7a2.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Action (Sweden)",
    "logo": "https://images.pluto.tv/channels/61c095861782bd000780e0ba/colorLogoPNG.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-61c0b0688a80a4000703fbcb.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Action (Sweden) DK",
    "logo": "https://images.pluto.tv/channels/61c095861782bd000780e0ba/colorLogoPNG.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-61c095861782bd000780e0ba.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Action (Sweden) NO",
    "logo": "https://images.pluto.tv/channels/61c095861782bd000780e0ba/colorLogoPNG.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-61c1e270489a9c000874d209.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Action (United States)",
    "logo": "https://i.imgur.com/tDapGal.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-561d7d484dc7c8770484914a.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Action Movies",
    "logo": "https://images.pluto.tv/channels/62ea3c2e4823db00072788ed/colorLogoPNG.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-62ea3c2e4823db00072788ed.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Alberto Sordi",
    "logo": "https://images.pluto.tv/channels/661f8f01801af800083d9d81/colorLogoPNG.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-661f8f01801af800083d9d81.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Bang Bang",
    "logo": "https://images.pluto.tv/channels/663b9dc7cb3ea10008f1a0ce/colorLogoPNG.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-663b9dc7cb3ea10008f1a0ce.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Bud & Terence (Germany)",
    "logo": "https://images.pluto.tv/channels/64be7398e4391c0008cdedfe/colorLogoPNG_1776936976930.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-64be7398e4391c0008cdedfe.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Bud & Terence (Sweden)",
    "logo": "https://images.pluto.tv/channels/64be7398e4391c0008cdedfe/colorLogoPNG_1776936976930.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-65b917720d9ab4000833f323.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Bud & Terence (Sweden) DK",
    "logo": "https://images.pluto.tv/channels/64be7398e4391c0008cdedfe/colorLogoPNG_1776936976930.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-65b915b1dc10a40008d53797.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Bud & Terence (Sweden) NO",
    "logo": "https://images.pluto.tv/channels/64be7398e4391c0008cdedfe/colorLogoPNG_1776936976930.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-65b916ec3af63d00084c5841.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Catastrofes",
    "logo": "https://images.pluto.tv/channels/645a309c5a0cd5000873f609/colorLogoPNG.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-645a309c5a0cd5000873f609.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Christmas tutto l'anno",
    "logo": "https://images.pluto.tv/channels/612e05b885183d0007958101/colorLogoPNG_1770018716998.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-612e05b885183d0007958101.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Cine Accion",
    "logo": "https://images.pluto.tv/channels/5dcb62e63d4d8f0009f36881/colorLogoPNG_1760378798093.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-5dcb62e63d4d8f0009f36881.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Cine Clasico",
    "logo": "https://images.pluto.tv/channels/609059dc63be6e0007b4eca6/colorLogoPNG.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-609059dc63be6e0007b4eca6.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Cine Classicos",
    "logo": "https://images.pluto.tv/channels/5fa1612a669ba0000702017b/colorLogoPNG_1733440556804.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-5fa1612a669ba0000702017b.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Cine Comedia (Germany)",
    "logo": "https://images.pluto.tv/channels/5f1ac8099c49f600076579b2/colorLogoPNG_1769092378955.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-5f1ac8099c49f600076579b2.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Cine Comedia (United States)",
    "logo": "https://images.pluto.tv/channels/5f12101f0b12f00007844c7c/colorLogoPNG_1732662798298.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-5f513564e4622a0007c578c0.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Cine Comedia (United States) BR",
    "logo": "https://images.pluto.tv/channels/5f12101f0b12f00007844c7c/colorLogoPNG_1732662798298.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-5f12101f0b12f00007844c7c.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Cine Comedia (United States) LatAm",
    "logo": "https://images.pluto.tv/channels/5f12101f0b12f00007844c7c/colorLogoPNG_1732662798298.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-5dcdde78f080d900098550e4.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Cine Comedia Romantica",
    "logo": "https://images.pluto.tv/channels/62545ed3dab4380007582f7c/colorLogoPNG.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-62545ed3dab4380007582f7c.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Cine Crime",
    "logo": "https://images.pluto.tv/channels/6479ff764f5ba5000878dfe2/colorLogoPNG.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-6479ff764f5ba5000878dfe2.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Cine Crimen",
    "logo": "https://images.pluto.tv/channels/624af40c004f8000079b784d/colorLogoPNG.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-624af40c004f8000079b784d.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Cine de autor",
    "logo": "https://images.pluto.tv/channels/60cc807324d60a0007708dc8/colorLogoPNG.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-60cc807324d60a0007708dc8.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Cine Drama",
    "logo": "https://images.pluto.tv/channels/5f1210d14ae1f80007bafb1d/colorLogoPNG.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-5f1210d14ae1f80007bafb1d.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Cine Drama LatAm",
    "logo": "https://images.pluto.tv/channels/5f1210d14ae1f80007bafb1d/colorLogoPNG.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-5dcddfcb229eff00091b6bdf.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Cine Estelar",
    "logo": "https://images.pluto.tv/channels/5dcde437229eff00091b6c30/colorLogoPNG_1769014514491.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-5dcde437229eff00091b6c30.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Cine Familia",
    "logo": "https://images.pluto.tv/channels/5f171f032cd22e0007f17f3d/colorLogoPNG_1732045254120.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-5f171f032cd22e0007f17f3d.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Cine Familia LatAm",
    "logo": "https://images.pluto.tv/channels/5f171f032cd22e0007f17f3d/colorLogoPNG_1732045254120.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-5dd6ddb30a1d8a000908ed4c.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Cine Inspiracao",
    "logo": "https://images.pluto.tv/channels/5fa991b1f09e020007e78626/colorLogoPNG_1748874366972.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-5fa991b1f09e020007e78626.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Cine Inspirador",
    "logo": "https://images.pluto.tv/channels/6806d519fea7414f33f57016/colorLogoPNG_1746817663597.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-6806d519fea7414f33f57016.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Cine Romance",
    "logo": "https://images.pluto.tv/channels/5f171f988ab9780007fa95ea/colorLogoPNG_1771344977802.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-5f171f988ab9780007fa95ea.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Cine Romance LatAm",
    "logo": "https://images.pluto.tv/channels/5f171f988ab9780007fa95ea/colorLogoPNG_1771344977802.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-5dd7ea2aeab5230009986735.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Cine Romantico",
    "logo": "https://images.pluto.tv/channels/5f1ac9a2d3611d0007a844bb/colorLogoPNG_1747044085204.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-5f1ac9a2d3611d0007a844bb.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Cine Sucessos",
    "logo": "https://images.pluto.tv/channels/5f120e94a5714d00074576a1/colorLogoPNG.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-5f120e94a5714d00074576a1.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Cine Suspenso",
    "logo": "https://images.pluto.tv/channels/5ddc4e8bcbb9010009b4e84f/colorLogoPNG.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-5ddc4e8bcbb9010009b4e84f.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Cinema Italiano",
    "logo": "https://images.pluto.tv/channels/608aa7d8359b270007861489/colorLogoPNG.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-608aa7d8359b270007861489.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Cinema Orientale",
    "logo": "https://images.pluto.tv/channels/6786235bd648bf0008c2780a/colorLogoPNG.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-6786235bd648bf0008c2780a.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Comedias Romanticas",
    "logo": "https://images.pluto.tv/channels/655b5d865812e80008843bd1/colorLogoPNG_1747044085522.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-655b5d865812e80008843bd1.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Comedies Cultes",
    "logo": "https://images.pluto.tv/channels/67b4b2d976a934282e92d71c/colorLogoPNG.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-67b4b2d976a934282e92d71c.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Comedy Movies",
    "logo": "https://images.pluto.tv/channels/62ea3d24b8e02600071fa296/colorLogoPNG.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-62ea3d24b8e02600071fa296.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Crime Drama",
    "logo": "https://images.pluto.tv/channels/62e92708a7ce600007b2676a/colorLogoPNG.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-5f31fd1b4c510e00071c3103.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Crime Drama CA",
    "logo": "https://images.pluto.tv/channels/62e92708a7ce600007b2676a/colorLogoPNG.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-62e92708a7ce600007b2676a.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Crime Movies",
    "logo": "https://i.imgur.com/SJcqknt.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-5f4d8594eb979c0007706de7.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Cult Films (Germany)",
    "logo": "https://images.pluto.tv/channels/5c5c31f2f21b553c1f673fb0/colorLogoPNG.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-5c5c31f2f21b553c1f673fb0.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Cult Films (United States)",
    "logo": "https://i.imgur.com/xoaIAus.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-5c665db3e6c01b72c4977bc2.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Danske klassikere",
    "logo": "https://images.pluto.tv/channels/67d2b814fe36d6e7b1d2318a/colorLogoPNG.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-67d2b814fe36d6e7b1d2318a.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Drama",
    "logo": "https://i.imgur.com/PvhbHTZ.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-5b4e92e4694c027be6ecece1.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Drama Movies",
    "logo": "https://images.pluto.tv/channels/62bdb0bcd707b9000739d2e5/colorLogoPNG.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-62bdb0bcd707b9000739d2e5.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Estrellas de Accion",
    "logo": "https://i.imgur.com/GVOYX4L.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-5e972a21ad709d00074195ba.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Family Movie Club",
    "logo": "https://images.pluto.tv/channels/5dc3fc6b9133f500099c7d98/colorLogoPNG.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-5dc3fc6b9133f500099c7d98.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Fantasy & Horror",
    "logo": "https://images.pluto.tv/channels/685041d936c9361b1921c26c/colorLogoPNG_1753696741486.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-685041d936c9361b1921c26c.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Ferne Galaxien",
    "logo": "https://images.pluto.tv/channels/68ada46d5190a45dc9c45af1/colorLogoPNG_1773754781519.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-68ada46d5190a45dc9c45af1.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Ficcao Cientifica",
    "logo": "https://images.pluto.tv/channels/5fa15ad6367e170007cdd098/colorLogoPNG.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-5fa15ad6367e170007cdd098.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Film (Germany)",
    "logo": "https://images.pluto.tv/channels/608aa17fb9f4490007e6419a/colorLogoPNG_1733013735186.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-608aa17fb9f4490007e6419a.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Film (Sweden)",
    "logo": "https://images.pluto.tv/channels/61c09515fbb4b50007d221f5/colorLogoPNG.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-61c0afa0a09bbe00078f8378.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Film (Sweden) DK",
    "logo": "https://images.pluto.tv/channels/61c09515fbb4b50007d221f5/colorLogoPNG.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-61c09515fbb4b50007d221f5.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Film (Sweden) NO",
    "logo": "https://images.pluto.tv/channels/61c09515fbb4b50007d221f5/colorLogoPNG.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-61c1e1e55deef000075aed0c.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Film Ancora Piu Romantici",
    "logo": "https://images.pluto.tv/channels/699d87093d5dba980705cca8/colorLogoPNG_1777274173528.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-699d87093d5dba980705cca8.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Film Azione",
    "logo": "https://images.pluto.tv/channels/608aa20a2e7f270007c4878d/colorLogoPNG.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-608aa20a2e7f270007c4878d.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Film Commedia",
    "logo": "https://images.pluto.tv/channels/608aa512d67fd900072323db/colorLogoPNG.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-608aa512d67fd900072323db.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Film Romantici",
    "logo": "https://images.pluto.tv/channels/608aa4a4cc92820007b663af/colorLogoPNG.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-608aa4a4cc92820007b663af.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Film Storici",
    "logo": "https://images.pluto.tv/channels/68750875759366af05a151ce/colorLogoPNG_1756144116606.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-68750875759366af05a151ce.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Film Thriller",
    "logo": "https://images.pluto.tv/channels/608aa5e995132a00075f7005/colorLogoPNG.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-608aa5e995132a00075f7005.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Filmes Acao",
    "logo": "https://images.pluto.tv/channels/5f120f41b7d403000783a6d6/colorLogoPNG.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-5f120f41b7d403000783a6d6.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Filmes Aventura",
    "logo": "https://images.pluto.tv/channels/66c79a4262e5510008ff68a5/colorLogoPNG.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-66c79a4262e5510008ff68a5.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Filmes de Luta",
    "logo": "https://images.pluto.tv/channels/6806d62369aec5b19cd628c0/colorLogoPNG_1746817781806.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-6806d62369aec5b19cd628c0.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Filmes Nacionais",
    "logo": "https://images.pluto.tv/channels/5f5a545d0dbf7f0007c09408/colorLogoPNG_1732044719987.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-5f5a545d0dbf7f0007c09408.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Franchise Favorites",
    "logo": "https://images.pluto.tv/channels/68fbf8101d26140175db8b58/colorLogoPNG_1762383685562.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-68fbf8101d26140175db8b58.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Haialarm",
    "logo": "https://images.pluto.tv/channels/69b015c5d29cc97de7da4af8/colorLogoPNG_1779802132594.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-69b015c5d29cc97de7da4af8.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Harlequin",
    "logo": "https://images.pluto.tv/channels/68c01afa3efb41cd9759dafb/colorLogoPNG_1770018342774.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-68c01bed508ba507f0d0dd60.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Harlequin DK",
    "logo": "https://images.pluto.tv/channels/68c01afa3efb41cd9759dafb/colorLogoPNG_1770018342774.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-68c01afa3efb41cd9759dafb.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Harlequin NO",
    "logo": "https://images.pluto.tv/channels/68c01afa3efb41cd9759dafb/colorLogoPNG_1770018342774.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-68c01b9a6bdcf3b9a64febcc.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Horror (Sweden)",
    "logo": "https://images.pluto.tv/channels/63a1c9790cc44a0007dc8857/colorLogoPNG.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-63a19e1b9ab2df0007bef7a7.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Horror (Sweden) DK",
    "logo": "https://images.pluto.tv/channels/63a1c9790cc44a0007dc8857/colorLogoPNG.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-63a1c9790cc44a0007dc8857.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Horror (Sweden) NO",
    "logo": "https://images.pluto.tv/channels/63a1c9790cc44a0007dc8857/colorLogoPNG.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-63a19cb7847a090007f230d7.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Horror (United States)",
    "logo": "https://images.pluto.tv/channels/569546031a619b8f07ce6e25/colorLogoPNG.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-569546031a619b8f07ce6e25.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Horror (United States) CA",
    "logo": "https://images.pluto.tv/channels/569546031a619b8f07ce6e25/colorLogoPNG.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-62ea3f8a38acc80007072d26.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Humor (Sweden)",
    "logo": "https://images.pluto.tv/channels/61c0974945b45d0007aaa5ac/colorLogoPNG.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-61c0974945b45d0007aaa5ac.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Icons",
    "logo": "https://images.pluto.tv/channels/64b585f84ea480000838e446/colorLogoPNG.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-64b585f84ea480000838e446.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Invasion Alien",
    "logo": "https://images.pluto.tv/channels/654a35ce346f420008d5c36e/colorLogoPNG.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-654a35ce346f420008d5c36e.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV John Wayne",
    "logo": "https://images.pluto.tv/channels/655ca7aa635c3c000855d655/colorLogoPNG.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-655caaaac0fc8800086f5d99.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV John Wayne DK",
    "logo": "https://images.pluto.tv/channels/655ca7aa635c3c000855d655/colorLogoPNG.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-655ca7aa635c3c000855d655.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV John Wayne NO",
    "logo": "https://images.pluto.tv/channels/655ca7aa635c3c000855d655/colorLogoPNG.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-655ca99dfbc15b00081f209c.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Komedi",
    "logo": "https://images.pluto.tv/channels/61c0b36d18447e000717d686/colorLogoPNG.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-61c0b36d18447e000717d686.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Komedie",
    "logo": "https://images.pluto.tv/channels/61c1e3a679a4390007c78136/colorLogoPNG.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-61c1e3a679a4390007c78136.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Kult Comedies",
    "logo": "https://images.pluto.tv/channels/66337de656fc840008ff7a65/colorLogoPNG.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-66337de656fc840008ff7a65.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Kultfilm",
    "logo": "https://images.pluto.tv/channels/63dbe7ed51f5d000083e9499/colorLogoPNG.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-63dbe7ed51f5d000083e9499.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Kultfilme",
    "logo": "https://images.pluto.tv/channels/5dde47b63585b500099f74ec/colorLogoPNG.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-5dde47b63585b500099f74ec.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Kultfilmer",
    "logo": "https://images.pluto.tv/channels/63dbe80f60bc8f0008aa7c78/colorLogoPNG.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-63dbe8c8a9957100087798a3.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Kultfilmer NO",
    "logo": "https://images.pluto.tv/channels/63dbe80f60bc8f0008aa7c78/colorLogoPNG.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-63dbe80f60bc8f0008aa7c78.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Legami Letali",
    "logo": "https://images.pluto.tv/channels/64808a8c536e0c0008a276d1/colorLogoPNG_1747395859514.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-64808a8c536e0c0008a276d1.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Movies",
    "logo": "https://images.pluto.tv/channels/5c5c3b948002db3c3e0b262e/colorLogoPNG.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-5c5c3b948002db3c3e0b262e.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Movies GB",
    "logo": "https://images.pluto.tv/channels/5c5c3b948002db3c3e0b262e/colorLogoPNG.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-5ad8d3a31b95267e225e4e09.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Netmovies",
    "logo": "https://images.pluto.tv/channels/663b9de4f999220008230fa8/colorLogoPNG.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-663b9de4f999220008230fa8.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Notti di Passione",
    "logo": "https://images.pluto.tv/channels/6911c9704316999535eb21cf/colorLogoPNG_1766041294522.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-6911c9704316999535eb21cf.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Notti di Sangue",
    "logo": "https://images.pluto.tv/channels/6911c92b4316999535eb1e08/colorLogoPNG_1766041125862.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-6911c92b4316999535eb1e08.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Notti di Terrore",
    "logo": "https://images.pluto.tv/channels/6911c8dd8caba6f046c5c5d5/colorLogoPNG_1766041208757.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-6911c8dd8caba6f046c5c5d5.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Nuestro Cine",
    "logo": "https://images.pluto.tv/channels/5defde6d6c07b50009cf0757/colorLogoPNG.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-5defde6d6c07b50009cf0757.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Paranormal (Sweden)",
    "logo": "https://images.pluto.tv/channels/62b30beb81f89900071fc7b9/colorLogoPNG.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-62b1e4189f5db20007ff03be.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Paranormal (Sweden) DK",
    "logo": "https://images.pluto.tv/channels/62b30beb81f89900071fc7b9/colorLogoPNG.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-62b30beb81f89900071fc7b9.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Psycho",
    "logo": "https://images.pluto.tv/channels/65ce480a78df2200131c597b/colorLogoPNG.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-65ce480a78df2200131c597b.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Reaction",
    "logo": "https://i.imgur.com/H9k3OXN.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-617b37b361e0fd0008cfd8c5.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Retro Action Movies",
    "logo": "https://images.pluto.tv/channels/69a9ae4d3bd16a4ed04240d7/colorLogoPNG_1774879695281.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-69a9ae4d3bd16a4ed04240d7.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Romance",
    "logo": "https://i.imgur.com/GJBxfyf.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-5a66795ef91fef2c7031c599.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Romantik",
    "logo": "https://images.pluto.tv/channels/63a1c954d3897300079fcb12/colorLogoPNG_1767773445743.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-63a19da6847a090007f230da.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Romantik DK",
    "logo": "https://images.pluto.tv/channels/63a1c954d3897300079fcb12/colorLogoPNG_1767773445743.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-63a1c954d3897300079fcb12.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Romantikk",
    "logo": "https://images.pluto.tv/channels/63a19bb5e6914b000721b5c0/colorLogoPNG_1767773376618.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-63a19bb5e6914b000721b5c0.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Sci-Fi (Sweden)",
    "logo": "https://images.pluto.tv/channels/60ed498c4248a400077c0b9d/colorLogoPNG.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-61f9597e78607000074f6c2a.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Sci-Fi (Sweden) DK",
    "logo": "https://images.pluto.tv/channels/60ed498c4248a400077c0b9d/colorLogoPNG.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-61f9598588f86000078ee7d6.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Sci-Fi (Sweden) NO",
    "logo": "https://images.pluto.tv/channels/60ed498c4248a400077c0b9d/colorLogoPNG.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-61f957e051cca800076f2358.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Sci-Fi (United States)",
    "logo": "https://images.pluto.tv/channels/66166cb1307fa30008f275e7/colorLogoPNG.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-5b4fc274694c027be6ed3eea.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Sci-Fi (United States) CA",
    "logo": "https://images.pluto.tv/channels/66166cb1307fa30008f275e7/colorLogoPNG.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-66166cb1307fa30008f275e7.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Sci-Fi (United States) LatAm",
    "logo": "https://images.pluto.tv/channels/66166cb1307fa30008f275e7/colorLogoPNG.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-5f2817d3d7573a00080f9175.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Serie Sci-Fi",
    "logo": "https://images.pluto.tv/channels/67ed14aaf7c5d70b9089c3bf/colorLogoPNG_1750259768860.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-67ed14aaf7c5d70b9089c3bf.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Spotlight",
    "logo": "https://i.imgur.com/UmuJkVB.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-5ba3fb9c4b078e0f37ad34e8.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Staff Picks",
    "logo": "https://i.imgur.com/JzwO8IO.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-5f4d863b98b41000076cd061.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Star Trek (Germany)",
    "logo": "https://images.pluto.tv/channels/6152ee71bf99590007893a11/colorLogoPNG.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-6152ee71bf99590007893a11.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Star Trek (Sweden)",
    "logo": "https://images.pluto.tv/channels/61c1979dfa307000070bbe4d/colorLogoPNG.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-61c1979dfa307000070bbe4d.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Terror",
    "logo": "https://i.imgur.com/eWtoHDM.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-5c6dc88fcd232425a6e0f06e.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Terror Trash",
    "logo": "https://images.pluto.tv/channels/66aa67493a4ad2000806d91b/colorLogoPNG.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-66aa67493a4ad2000806d91b.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Thrillers",
    "logo": "https://i.imgur.com/ULKvDN7.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-5b4e69e08291147bd04a9fd7.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Toto",
    "logo": "https://images.pluto.tv/channels/65253f9881f942000833ccd5/colorLogoPNG_1774617972809.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-65253f9881f942000833ccd5.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Trending Now",
    "logo": "https://images.pluto.tv/channels/673247127d5da5000817b4d6/colorLogoPNG_1732662634386.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-673247127d5da5000817b4d6.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Weihnachten im Sommer",
    "logo": "https://images.pluto.tv/channels/642ad072283aa4000806148c/colorLogoPNG.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-642ad072283aa4000806148c.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Western",
    "logo": "https://images.pluto.tv/channels/630dd3b2605f140007e002f5/colorLogoPNG_1732030684562.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-630dd3b2605f140007e002f5.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Western ES",
    "logo": "https://images.pluto.tv/channels/630dd3b2605f140007e002f5/colorLogoPNG_1732030684562.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-6385e82900ab2e000768a058.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Western IT",
    "logo": "https://images.pluto.tv/channels/630dd3b2605f140007e002f5/colorLogoPNG_1732030684562.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-62e7fb67478a5b0007e6c50c.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Westerns (Germany)",
    "logo": "https://images.pluto.tv/channels/5d4bdb635ce813b38639e6a3/colorLogoPNG.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-5d4bdb635ce813b38639e6a3.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Westerns (United States)",
    "logo": "https://images.pluto.tv/channels/62bdacc96a3751000811842d/colorLogoPNG.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-5b4e94282d4ec87bdcbb87cd.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Westerns (United States) CA",
    "logo": "https://images.pluto.tv/channels/62bdacc96a3751000811842d/colorLogoPNG.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-62bdacc96a3751000811842d.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Wild West",
    "logo": "https://images.pluto.tv/channels/68c01732b3900870ec74766f/colorLogoPNG_1761917904777.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-68c017bf337652ee75db201f.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Wild West DK",
    "logo": "https://images.pluto.tv/channels/68c01732b3900870ec74766f/colorLogoPNG_1761917904777.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-68c01732b3900870ec74766f.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Wild West NO",
    "logo": "https://images.pluto.tv/channels/68c01732b3900870ec74766f/colorLogoPNG_1761917904777.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-68c01785b3900870ec7480e4.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Zombies",
    "logo": "https://images.pluto.tv/channels/65786888b228b7000843ad9a/colorLogoPNG.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-65786888b228b7000843ad9a.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Rakuten TV Action Movies",
    "logo": "https://i.imgur.com/Meew6eX.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://a9c57ec7ec5e4b7daeacc6316a0bb404.mediatailor.eu-west-1.amazonaws.com/v1/master/0547f18649bd788bec7b67b746e47670f558b6b2/production-LiveChannel-6069/master.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Rakuten TV Action Movies Austria",
    "logo": "https://i.imgur.com/Meew6eX.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://0f846627524f4dd2995e93581379db82.mediatailor.us-east-1.amazonaws.com/v1/master/44f73ba4d03e9607dcd9bebdcb8494d86964f1d8/Samsung-at_RakutenActionMovies-1/playlist.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Rakuten TV Action Movies Finland",
    "logo": "https://i.imgur.com/Meew6eX.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://bca5a421a70c46ad911efd0a4767c4bf.mediatailor.eu-west-1.amazonaws.com/v1/master/0547f18649bd788bec7b67b746e47670f558b6b2/production-LiveChannel-6075/master.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Rakuten TV Action Movies Germany",
    "logo": "https://i.imgur.com/Meew6eX.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://284824cf70404fdfb6ddf9349009c710.mediatailor.eu-west-1.amazonaws.com/v1/master/0547f18649bd788bec7b67b746e47670f558b6b2/production-LiveChannel-6066/master.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Rakuten TV Action Movies Italy",
    "logo": "https://i.imgur.com/Meew6eX.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://87f2e2e5e7624e3bad85da1ca2ed31a7.mediatailor.eu-west-1.amazonaws.com/v1/master/0547f18649bd788bec7b67b746e47670f558b6b2/production-LiveChannel-6067/master.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Rakuten TV Action Movies UK",
    "logo": "https://i.imgur.com/Meew6eX.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://54045f0c40fd442c8b06df076aaf1e85.mediatailor.eu-west-1.amazonaws.com/v1/master/0547f18649bd788bec7b67b746e47670f558b6b2/production-LiveChannel-6065/master.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Rakuten TV Comedy Movies",
    "logo": "https://i.imgur.com/Meew6eX.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://71db867f03ce4d71a29e92155f07ab87.mediatailor.eu-west-1.amazonaws.com/v1/master/0547f18649bd788bec7b67b746e47670f558b6b2/production-LiveChannel-6180/master.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Rakuten TV Comedy Movies Austria",
    "logo": "https://i.imgur.com/Meew6eX.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://7ed752b220a441b7b22bdf697c6c4df8.mediatailor.us-east-1.amazonaws.com/v1/master/44f73ba4d03e9607dcd9bebdcb8494d86964f1d8/Samsung-at_RakutenComedyMovies-1/playlist.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Rakuten TV Comedy Movies Finland",
    "logo": "https://i.imgur.com/Meew6eX.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://a300af98e00746e2acf2346f43e47bd1.mediatailor.eu-west-1.amazonaws.com/v1/master/0547f18649bd788bec7b67b746e47670f558b6b2/production-LiveChannel-6191/master.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Rakuten TV Comedy Movies Germany",
    "logo": "https://i.imgur.com/Meew6eX.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://ecac08c9e2214375b907d6825aaf9a01.mediatailor.eu-west-1.amazonaws.com/v1/master/0547f18649bd788bec7b67b746e47670f558b6b2/production-LiveChannel-6182/master.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Rakuten TV Comedy Movies Italy",
    "logo": "https://i.imgur.com/Meew6eX.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://b8bc6c4b9be64bd6aeb3b92aa8521ed4.mediatailor.eu-west-1.amazonaws.com/v1/master/0547f18649bd788bec7b67b746e47670f558b6b2/production-LiveChannel-6184/master.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Rakuten TV Comedy Movies UK",
    "logo": "https://i.imgur.com/Meew6eX.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://9be783d652cd4b099cf63e1dc134c4a3.mediatailor.eu-west-1.amazonaws.com/v1/master/0547f18649bd788bec7b67b746e47670f558b6b2/production-LiveChannel-6181/master.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Rakuten TV Drama Movies",
    "logo": "https://i.imgur.com/Meew6eX.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://a7089c89d85f453d850c4a1518b43076.mediatailor.eu-west-1.amazonaws.com/v1/master/0547f18649bd788bec7b67b746e47670f558b6b2/production-LiveChannel-6092/master.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Rakuten TV Drama Movies Austria",
    "logo": "https://i.imgur.com/Meew6eX.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://df1aa472ff5b4780a8d91fe319778b4d.mediatailor.us-east-1.amazonaws.com/v1/master/44f73ba4d03e9607dcd9bebdcb8494d86964f1d8/Samsung-at_RakutenTVShows-1/playlist.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Rakuten TV Drama Movies Finland",
    "logo": "https://i.imgur.com/Meew6eX.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://d7e8ee3c924d4305a0c1840fe94c5d36.mediatailor.eu-west-1.amazonaws.com/v1/master/0547f18649bd788bec7b67b746e47670f558b6b2/production-LiveChannel-6102/master.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Rakuten TV Drama Movies Germany",
    "logo": "https://i.imgur.com/Meew6eX.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://968754c2483045c1a9a7f677caec35b6.mediatailor.eu-west-1.amazonaws.com/v1/master/0547f18649bd788bec7b67b746e47670f558b6b2/production-LiveChannel-6096/master.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Rakuten TV Drama Movies Italy",
    "logo": "https://i.imgur.com/Meew6eX.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://f84e0b1628464fab846160df957f269e.mediatailor.eu-west-1.amazonaws.com/v1/master/0547f18649bd788bec7b67b746e47670f558b6b2/production-LiveChannel-6094/master.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Rakuten TV Drama Movies UK",
    "logo": "https://i.imgur.com/Meew6eX.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://fee09fd665814f51b939b6d106cf5f66.mediatailor.eu-west-1.amazonaws.com/v1/master/0547f18649bd788bec7b67b746e47670f558b6b2/production-LiveChannel-6093/master.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Rakuten TV Family Movies",
    "logo": "https://i.imgur.com/Meew6eX.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://b0d59c8c98974e708e5ccb9a27cdfdfc.mediatailor.eu-west-1.amazonaws.com/v1/master/0547f18649bd788bec7b67b746e47670f558b6b2/production-LiveChannel-6205/master.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Rakuten TV Family Movies Austria",
    "logo": "https://i.imgur.com/Meew6eX.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://9fa8baba055e4a52b0a8d1ae7d78bed8.mediatailor.us-east-1.amazonaws.com/v1/master/44f73ba4d03e9607dcd9bebdcb8494d86964f1d8/Samsung-at_RakutenFamily-1/playlist.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Rakuten TV Family Movies Finland",
    "logo": "https://i.imgur.com/Meew6eX.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://758ee983d61e400381dea6fa8154f4e0.mediatailor.eu-west-1.amazonaws.com/v1/master/0547f18649bd788bec7b67b746e47670f558b6b2/production-LiveChannel-6227/master.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Rakuten TV Family Movies Germany",
    "logo": "https://i.imgur.com/Meew6eX.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://af230031eeac45f3b78d4f8a13265105.mediatailor.eu-west-1.amazonaws.com/v1/master/0547f18649bd788bec7b67b746e47670f558b6b2/production-LiveChannel-6209/master.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Rakuten TV Family Movies Italy",
    "logo": "https://i.imgur.com/Meew6eX.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://3315fc3e7276420f895e19cf807dbee1.mediatailor.eu-west-1.amazonaws.com/v1/master/0547f18649bd788bec7b67b746e47670f558b6b2/production-LiveChannel-6215/master.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Rakuten TV Family Movies Switzerland",
    "logo": "https://i.imgur.com/Meew6eX.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://a24daf1125344b9cab66eed2fcff8821.mediatailor.us-east-1.amazonaws.com/v1/master/44f73ba4d03e9607dcd9bebdcb8494d86964f1d8/Samsung-ch_RakutenFamily-1/playlist.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Rakuten TV Family Movies UK",
    "logo": "https://i.imgur.com/Meew6eX.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://e3207568b726401995c25670faaf32e4.mediatailor.eu-west-1.amazonaws.com/v1/master/0547f18649bd788bec7b67b746e47670f558b6b2/production-LiveChannel-6203/master.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Rakuten TV Nordic Films",
    "logo": "https://images-3.rakuten.tv/storage/global-live-channel/translation/artwork/ff79e878-3eea-45fc-b0cd-55d6acce9b18-width200-quality90.jpeg",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://4aa9ef08b70d4b0c8f3519c5950b1930.mediatailor.eu-west-1.amazonaws.com/v1/master/0547f18649bd788bec7b67b746e47670f558b6b2/production-LiveChannel-6303/master.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Rakuten TV Top Movies",
    "logo": "https://i.imgur.com/Meew6eX.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://ff335120300e4742a2b135ee9a9e7df8.mediatailor.eu-west-1.amazonaws.com/v1/master/0547f18649bd788bec7b67b746e47670f558b6b2/production-LiveChannel-5983/master.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Rakuten TV Top Movies Finland",
    "logo": "https://i.imgur.com/Meew6eX.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://1d1b0d4cb6ae4c31985d13221795695b.mediatailor.eu-west-1.amazonaws.com/v1/master/0547f18649bd788bec7b67b746e47670f558b6b2/production-LiveChannel-6057/master.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Rakuten TV Top Movies Germany",
    "logo": "https://i.imgur.com/Meew6eX.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://cbb622b29f5d43b598991f3fa19de291.mediatailor.eu-west-1.amazonaws.com/v1/master/0547f18649bd788bec7b67b746e47670f558b6b2/production-LiveChannel-5985/master.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Rakuten TV Top Movies Italy",
    "logo": "https://i.imgur.com/Meew6eX.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://d4a4999341764c67a67e9ec9eb3790ab.mediatailor.eu-west-1.amazonaws.com/v1/master/0547f18649bd788bec7b67b746e47670f558b6b2/production-LiveChannel-5984/master.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Rakuten TV Top Movies UK",
    "logo": "https://i.imgur.com/Meew6eX.png",
    "category": "Movies",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://0145451975a64b35866170fd2e8fa486.mediatailor.eu-west-1.amazonaws.com/v1/master/0547f18649bd788bec7b67b746e47670f558b6b2/production-LiveChannel-5987/master.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Bloomberg Originals",
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/Bloomberg_Originals.png",
    "category": "Documentary",
    "country": "GLOBAL",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "url": "https://bloomberg.com/media-manifest/streams/qt.m3u8",
    "region": "US"
  },
  {
    "name": "Bloomberg Originals SD",
    "logo": "https://jiotvimages.cdn.jio.com/dare_images/images/Bloomberg_Originals.png",
    "category": "Documentary",
    "country": "GLOBAL",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "url": "https://86fdc85a.wurl.com/master/f36d25e7e52f1ba8d7e56eb859c636563214f541/TEctZ2JfQmxvb21iZXJnT3JpZ2luYWxzX0hMUw/playlist.m3u8",
    "region": "US"
  },
  {
    "name": "Pluto TV Alien Invasion (Germany)",
    "logo": "https://images.pluto.tv/channels/6462190b7cb4b1000862dd60/colorLogoPNG.png",
    "category": "Documentary",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-6462190b7cb4b1000862dd60.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Alien Invasion (Sweden)",
    "logo": "https://images.pluto.tv/channels/650999b86a841400083bd1ab/colorLogoPNG.png",
    "category": "Documentary",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-650999b86a841400083bd1ab.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Aliens",
    "logo": "https://images.pluto.tv/channels/6806d65e84f24b70109485fa/colorLogoPNG_1746817107468.png",
    "category": "Documentary",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-6806d65e84f24b70109485fa.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV American True Crime",
    "logo": "https://images.pluto.tv/channels/692ebafce72f03e07e7df985/colorLogoPNG_1768902223754.png",
    "category": "Documentary",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-692ebafce72f03e07e7df985.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Animais",
    "logo": "https://images.pluto.tv/channels/6474aa984cfc2c0008883a92/colorLogoPNG.png",
    "category": "Documentary",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-6474aa984cfc2c0008883a92.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Animales",
    "logo": "https://images.pluto.tv/channels/600ae6a78d801e0007117d21/colorLogoPNG.png",
    "category": "Documentary",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-600ae6a78d801e0007117d21.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Animals",
    "logo": "https://images.pluto.tv/channels/5d767ae7b456c8cf265ce922/colorLogoPNG.png",
    "category": "Documentary",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-5d767ae7b456c8cf265ce922.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Animals GB",
    "logo": "https://images.pluto.tv/channels/5d767ae7b456c8cf265ce922/colorLogoPNG.png",
    "category": "Documentary",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-5ddf8ea0d000120009bcad83.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Animaux",
    "logo": "https://images.pluto.tv/channels/60925a44f0350600075a1fdc/colorLogoPNG.png",
    "category": "Documentary",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-60925a44f0350600075a1fdc.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Aventure",
    "logo": "https://images.pluto.tv/channels/611e7811eb9daf000764cbfd/colorLogoPNG.png",
    "category": "Documentary",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-611e7811eb9daf000764cbfd.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Britain at War",
    "logo": "https://images.pluto.tv/channels/625e8cb585ef320007806caf/colorLogoPNG.png",
    "category": "Documentary",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-625e8cb585ef320007806caf.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Conspiracy",
    "logo": "https://images.pluto.tv/channels/5d4ae94ef1a1bbb350ca41bb/colorLogoPNG.png",
    "category": "Documentary",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-5d4ae94ef1a1bbb350ca41bb.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Documentari",
    "logo": "https://images.pluto.tv/channels/608aa8a5709d6b0007b132fe/colorLogoPNG.png",
    "category": "Documentary",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-608aa8a5709d6b0007b132fe.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Dokumentar",
    "logo": "https://images.pluto.tv/channels/62b30b0060a9ca0007d628b4/colorLogoPNG.png",
    "category": "Documentary",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-62b1e2498261390007f25c98.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Dokumentar DK",
    "logo": "https://images.pluto.tv/channels/62b30b0060a9ca0007d628b4/colorLogoPNG.png",
    "category": "Documentary",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-62b30b0060a9ca0007d628b4.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Explore",
    "logo": "https://images.pluto.tv/channels/5ad9b8551b95267e225e59c1/colorLogoPNG.png",
    "category": "Documentary",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-5ad9b8551b95267e225e59c1.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Food",
    "logo": "https://images.pluto.tv/channels/5dc280c9aa218c0009724b4b/colorLogoPNG_1769092247484.png",
    "category": "Documentary",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-5dc280c9aa218c0009724b4b.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Food GB",
    "logo": "https://images.pluto.tv/channels/5dc280c9aa218c0009724b4b/colorLogoPNG_1769092247484.png",
    "category": "Documentary",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-5ddf930548ff9b00090d5686.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Histoire",
    "logo": "https://images.pluto.tv/channels/611e771e2f5f180007002224/colorLogoPNG.png",
    "category": "Documentary",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-611e771e2f5f180007002224.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Historia (Germany)",
    "logo": "https://images.pluto.tv/channels/61cd7b49543066000713b620/colorLogoPNG.png",
    "category": "Documentary",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-61cd7b49543066000713b620.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV History",
    "logo": "https://i.imgur.com/XkQD5kM.png",
    "category": "Documentary",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-5a4d35dfa5c02e717a234f86.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Investigacao",
    "logo": "https://i.imgur.com/JlQq0YJ.png",
    "category": "Documentary",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-5f32cf37c9ff2b00082adbc8.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Mi Obsesion Favorita",
    "logo": "https://images.pluto.tv/channels/6109ab25b84d6a0007504886/colorLogoPNG.png",
    "category": "Documentary",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-6109ab25b84d6a0007504886.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Mystery",
    "logo": "https://images.pluto.tv/channels/617aad99b68ef100072608cd/colorLogoPNG.png",
    "category": "Documentary",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-617aad99b68ef100072608cd.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Natura",
    "logo": "https://images.pluto.tv/channels/60802b37709d6b0007b0c549/colorLogoPNG_1773147389391.png",
    "category": "Documentary",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-60802b37709d6b0007b0c549.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Naturaleza",
    "logo": "https://images.pluto.tv/channels/5dd85eac039bba0009e86d1d/colorLogoPNG.png",
    "category": "Documentary",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-5dd85eac039bba0009e86d1d.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Nature",
    "logo": "https://images.pluto.tv/channels/5be1c3f9851dd5632e2c91b2/colorLogoPNG.png",
    "category": "Documentary",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-5be1c3f9851dd5632e2c91b2.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Negocio Fechado",
    "logo": "https://images.pluto.tv/channels/64ad7394798def00087b2bfe/colorLogoPNG.png",
    "category": "Documentary",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-64ad7394798def00087b2bfe.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Paranormal (United States)",
    "logo": "https://images.pluto.tv/channels/62e92a58f3e4290007290c96/colorLogoPNG.png",
    "category": "Documentary",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-5adf96e3e738977e2c31cb04.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Paranormal (United States) CA",
    "logo": "https://images.pluto.tv/channels/62e92a58f3e4290007290c96/colorLogoPNG.png",
    "category": "Documentary",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-62e92a58f3e4290007290c96.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV PetrolHeads",
    "logo": "https://images.pluto.tv/channels/65a7b0814a10d800085ff2df/colorLogoPNG.png",
    "category": "Documentary",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-65a7b0814a10d800085ff2df.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Policial",
    "logo": "https://images.pluto.tv/channels/678fdf9e3de7c8cf948e8824/colorLogoPNG.png",
    "category": "Documentary",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-678fdf9e3de7c8cf948e8824.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Reportagen",
    "logo": "https://images.pluto.tv/channels/68ada3edf84960586ad31c7d/colorLogoPNG_1760078189640.png",
    "category": "Documentary",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-68ada3edf84960586ad31c7d.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Science",
    "logo": "https://i.imgur.com/uhunRoU.png",
    "category": "Documentary",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-563a970aa1a1f7fe7c9daad7.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Space (Germany)",
    "logo": "https://images.pluto.tv/channels/61409f8d6feb30000766b675/colorLogoPNG.png",
    "category": "Documentary",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-61409f8d6feb30000766b675.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Space (Germany) GB",
    "logo": "https://images.pluto.tv/channels/61409f8d6feb30000766b675/colorLogoPNG.png",
    "category": "Documentary",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-5dbc2f98777f2e0009934ae7.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Space (Sweden)",
    "logo": "https://images.pluto.tv/channels/61b86c6ef30f5d0007e4c6d1/colorLogoPNG.png",
    "category": "Documentary",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-61b86c6ef30f5d0007e4c6d1.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Storia",
    "logo": "https://images.pluto.tv/channels/65253fdf3fd33c00080214a3/colorLogoPNG_1773147329671.png",
    "category": "Documentary",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-65253fdf3fd33c00080214a3.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Tough Jobs",
    "logo": "https://images.pluto.tv/channels/600acaff5f2d6e000745effb/colorLogoPNG.png",
    "category": "Documentary",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-600acaff5f2d6e000745effb.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV True Crime (Sweden)",
    "logo": "https://images.pluto.tv/channels/615333098185f00008715a56/colorLogoPNG.png",
    "category": "Documentary",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-61c0b438244e50000758083b.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV True Crime (Sweden) DK",
    "logo": "https://images.pluto.tv/channels/615333098185f00008715a56/colorLogoPNG.png",
    "category": "Documentary",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-61c097ec8bb1830008e3f962.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV True Crime (Sweden) NO",
    "logo": "https://images.pluto.tv/channels/615333098185f00008715a56/colorLogoPNG.png",
    "category": "Documentary",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-61c1e51354d923000731bf78.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV True Crime (United States)",
    "logo": "https://images.pluto.tv/channels/62e9289f8d467f0007fbc701/colorLogoPNG.png",
    "category": "Documentary",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-5812be1c249444e05d09cc50.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV True Crime (United States) CA",
    "logo": "https://images.pluto.tv/channels/62e9289f8d467f0007fbc701/colorLogoPNG.png",
    "category": "Documentary",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-62e9289f8d467f0007fbc701.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Turbo",
    "logo": "https://images.pluto.tv/channels/6014761dfb91870008ea6463/colorLogoPNG.png",
    "category": "Documentary",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-6014761dfb91870008ea6463.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Varldskrigen",
    "logo": "https://images.pluto.tv/channels/677d3ad04bd63600082f7c54/colorLogoPNG_1759445391825.png",
    "category": "Documentary",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-677d3ad04bd63600082f7c54.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Verdenskrigene",
    "logo": "https://images.pluto.tv/channels/677d397b60fbeb00084b0bff/colorLogoPNG_1759437735629.png",
    "category": "Documentary",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-677d397b60fbeb00084b0bff.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Verdenskrigene NO",
    "logo": "https://images.pluto.tv/channels/677d397b60fbeb00084b0bff/colorLogoPNG_1759437735629.png",
    "category": "Documentary",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-677d3a424bd63600082f7baf.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Smithsonian Channel Pluto TV",
    "logo": "https://images.pluto.tv/channels/6298bd10d88ef000073f16b7/colorLogoPNG.png",
    "category": "Documentary",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-6298bd10d88ef000073f16b7.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Smithsonian Channel Pluto TV LatAm",
    "logo": "https://images.pluto.tv/channels/6298bd10d88ef000073f16b7/colorLogoPNG.png",
    "category": "Documentary",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-63a084934734f30007457b2c.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Spike Pluto TV",
    "logo": "https://i.imgur.com/woY8Ecb.png",
    "category": "Documentary",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-5812bcc8237a6ff45d16c407.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Karaoke por Stingray",
    "logo": "https://images.pluto.tv/channels/5f85cf621d6d2200079f1de0/colorLogoPNG.png",
    "category": "Music",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-604b99d633a72b00078e05ad.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Karaoke por Stingray LatAm",
    "logo": "https://images.pluto.tv/channels/5f85cf621d6d2200079f1de0/colorLogoPNG.png",
    "category": "Music",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-5f85cf621d6d2200079f1de0.m3u8",
    "region": "GLOBAL"
  },
  {
    "name": "Pluto TV Shows por Stingray",
    "logo": "https://images.pluto.tv/channels/604b91e0692f770007d9f33f/colorLogoPNG.png",
    "category": "Music",
    "country": "GLOBAL",
    "flag": "\ud83c\udf0d",
    "url": "https://jmp2.uk/plu-604b91e0692f770007d9f33f.m3u8",
    "region": "GLOBAL"
  }
];

const IPTVCatalog = {
    regions: IPTV_REGIONS,
    categories: IPTV_CATEGORIES,
    allChannels: DEFAULT_IPTV_CHANNELS,
    favorites: [],

    init: function() {
        this.loadFavorites();
    },

    loadFavorites: function() {
        try {
            const saved = localStorage.getItem('cleanyourtv_iptv_favs');
            if (saved) {
                this.favorites = JSON.parse(saved);
            } else {
                this.favorites = ['Star Vijay TV HD', 'Sun TV HD (1080p)'];
                this.saveFavorites();
            }
        } catch (e) {
            this.favorites = ['Star Vijay TV HD'];
        }
    },

    saveFavorites: function() {
        try {
            localStorage.setItem('cleanyourtv_iptv_favs', JSON.stringify(this.favorites));
        } catch (e) {}
    },

    isFavorite: function(identifier) {
        if (!identifier) return false;
        const name = typeof identifier === 'string' ? identifier : (identifier.name || identifier.id || identifier.url);
        return this.favorites.includes(name);
    },

    toggleFavorite: function(channel) {
        if (!channel) return false;
        const name = typeof channel === 'string' ? channel : (channel.name || channel.url);
        const idx = this.favorites.indexOf(name);
        let nowFav = false;
        if (idx >= 0) {
            this.favorites.splice(idx, 1);
            nowFav = false;
        } else {
            this.favorites.push(name);
            nowFav = true;
        }
        this.saveFavorites();
        return nowFav;
    },

    getRegions: function() {
        return this.regions;
    },

    getCountries: function() {
        return this.regions;
    },

    getCategories: function() {
        return this.categories;
    },

    getChannels: function(region = 'ALL', category = 'ALL') {
        let list = this.allChannels;
        if (region === 'FAVORITES') {
            list = list.filter(c => this.favorites.includes(c.name));
        } else if (region && region !== 'ALL') {
            const rUpper = region.toUpperCase();
            list = list.filter(c => {
                return (c.region && c.region.toUpperCase() === rUpper) ||
                       (c.country && c.country.toUpperCase() === rUpper);
            });
        }

        if (category && category !== 'ALL') {
            const cLower = category.toLowerCase();
            list = list.filter(c => (c.category || '').toLowerCase() === cLower);
        }

        return list;
    },

    loadCountryChannels: function(regionCode, onSuccess) {
        const channels = this.getChannels(regionCode, 'ALL');
        if (onSuccess) onSuccess(channels.length > 0 ? channels : this.allChannels);
    },

    loadCategoryChannels: function(category, onSuccess) {
        const channels = this.getChannels('ALL', category);
        if (onSuccess) onSuccess(channels.length > 0 ? channels : this.allChannels);
    },

    getEPG: function(category, channelName) {
        const now = new Date();
        const hour = now.getHours();
        const minute = now.getMinutes();
        const timeFloat = hour + (minute / 60);

        const catList = EPG_DATABASE[category] || EPG_DATABASE['Entertainment'];
        let slot = catList.find(s => timeFloat >= s.start && timeFloat < s.end);
        if (!slot) slot = catList[0];

        const formatH = (h) => {
            const normH = h >= 24 ? h - 24 : h;
            const ampm = normH >= 12 ? 'PM' : 'AM';
            const disH = normH % 12 === 0 ? 12 : normH % 12;
            return `${disH}:00 ${ampm}`;
        };

        const timeRangeStr = `${formatH(slot.start)} - ${formatH(slot.end)}`;
        const elapsedMins = (timeFloat - slot.start) * 60;
        const totalMins = (slot.end - slot.start) * 60;
        const percent = Math.min(100, Math.max(10, Math.round((elapsedMins / totalMins) * 100)));

        let nowTitle = slot.title;
        if (channelName) {
            const chUpper = channelName.toUpperCase();
            if (chUpper.includes('STAR VIJAY')) {
                if (hour >= 20 && hour < 22) nowTitle = 'Cooku with Comali - S5';
                else if (hour >= 19 && hour < 20) nowTitle = 'Siragadikka Aasai (Mega Serial)';
                else if (hour >= 14 && hour < 17) nowTitle = 'Vijay Super Matinee Cinema';
            } else if (chUpper.includes('SUN TV')) {
                if (hour >= 19 && hour < 21) nowTitle = 'Kayal & Singapennae';
            } else if (chUpper.includes('AAJ TAK') || chUpper.includes('NDTV') || chUpper.includes('NEWS18')) {
                if (hour >= 20 && hour < 22) nowTitle = 'Prime Time Live Debate';
                else if (hour >= 19 && hour < 20) nowTitle = 'Top Headlines 100';
            } else if (chUpper.includes('BBC') || chUpper.includes('SKY')) {
                if (hour >= 18 && hour < 22) nowTitle = 'Global News Hour & Analysis';
            }
        }

        return {
            nowTitle: nowTitle,
            timeRange: timeRangeStr,
            progress: percent,
            nextTitle: `${formatH(slot.end)} • ${slot.next}`
        };
    }
};

const IPTVService = IPTVCatalog;

window.IPTVCatalog = IPTVCatalog;
window.IPTVService = IPTVService;
window.IPTV_REGIONS = IPTV_REGIONS;
window.IPTV_COUNTRIES = IPTV_REGIONS;
window.IPTV_CATEGORIES = IPTV_CATEGORIES;
window.DEFAULT_IPTV_CHANNELS = DEFAULT_IPTV_CHANNELS;

IPTVCatalog.init();
