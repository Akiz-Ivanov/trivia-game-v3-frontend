import type { Station } from "@/types/radio.types"

const fallbackStations: Station[] = [
    {
      "name": "Classic Vinyl HD",
      "url_resolved": "https://icecast.walmradio.com:8443/classic",
      "favicon": "https://icecast.walmradio.com:8443/classic.jpg",
      "country": "The United States Of America",
      "tags": ["1930", "1940", "1950", "1960", "beautiful music", "big band", "classic hits", "crooners", "easy", "easy listening", "hd", "jazz", "light orchestral", "lounge", "oldies", "orchestral", "otr", "relaxation", "strings", "swing", "unwind", "walm"],
      "stationuuid": "d1a54d2e-623e-4970-ab11-35f7b56c5ec3"
    },
    {
      "name": "BBC World Service",
      "url_resolved": "http://stream.live.vc.bbcmedia.co.uk/bbc_world_service",
      "favicon": "http://cdn-profiles.tunein.com/s24948/images/logoq.jpg?t=1",
      "country": "The United Kingdom Of Great Britain And Northern Ireland",
      "tags": ["news", "talk"],
      "stationuuid": "98adecf7-2683-4408-9be7-02d3f9098eb8"
    },
    {
      "name": "MANGORADIO",
      "url_resolved": "https://mangoradio.stream.laut.fm/mangoradio",
      "favicon": "https://mangoradio.de/wp-content/uploads/cropped-Logo-192x192.webp",
      "country": "Germany",
      "tags": ["music", "variety"],
      "stationuuid": "78012206-1aa1-11e9-a80b-52543be04c81"
    },
    {
      "name": "Radio Paradise Main Mix (EU) 320k AAC",
      "url_resolved": "http://stream-uk1.radioparadise.com/aac-320",
      "favicon": "https://radioparadise.com/apple-touch-icon.png",
      "country": "The United States Of America",
      "tags": ["california", "eclectic", "free", "internet", "non-commercial", "paradise", "radio"],
      "stationuuid": "9617a958-0601-11e8-ae97-52543be04c81"
    },
    {
      "name": "101 SMOOTH JAZZ",
      "url_resolved": "http://jking.cdnstream1.com/b22139_128mp3",
      "favicon": "http://101smoothjazz.com/favicon.ico",
      "country": "The United States Of America",
      "tags": ["easy listening", "jazz", "smooth jazz"],
      "stationuuid": "d28420a4-eccf-47a2-ace1-088c7e7cb7e0"
    },
    {
      "name": "Deutschlandfunk | DLF | MP3 128k",
      "url_resolved": "https://f121.rndfnk.com/ard/dlf/01/mp3/128/stream.mp3?aggregator=web&cid=01FBPWZ12X2XN8SDSMBZ7X0ZTT&sid=33h4NzWJJ3tHOYmfDkhqdH3EcX3&token=erPDKKWsg0Mpw07T1HPaKHyotmPyMGkgWyGMhHz8udM&tvf=uxKl7Ff8axhmMTIxLnJuZGZuay5jb20",
      "favicon": "https://www.deutschlandfunk.de/static/img/deutschlandfunk/icons/apple-touch-icon-128x128.png",
      "country": "Germany",
      "tags": ["culture", "news", "public service", "information"],
      "stationuuid": "1c3e8be2-5b14-4933-bad3-87cbc227cba4"
    },
    {
      "name": "SWR3",
      "url_resolved": "https://f111.rndfnk.com/ard/swr/swr3/live/mp3/128/stream.mp3?aggregator=web&cid=01FC1X5J7PN2N3YQPZYT8YDM9M&sid=33gaSEfNzFBQXmJvbV2oF6t6ELj&token=OAKXFvgi3rEWB1rS4ZbuGoLdJTGUKtibq1KppQNjxPY&tvf=_KyHi-nuaxhmMTExLnJuZGZuay5jb20",
      "favicon": "https://swr3.de/assets/swr3/icons/apple-touch-icon.png",
      "country": "Germany",
      "tags": ["news", "pop", "rock"],
      "stationuuid": "240d28b9-7858-48d2-a816-9cf8e1875fe8"
    },
    {
      "name": "France Info",
      "url_resolved": "http://icecast.radiofrance.fr/franceinfo-midfi.mp3",
      "favicon": "https://www.francetvinfo.fr/assets/common/images/pwa/ios/120-5487caf3.png",
      "country": "France",
      "tags": [],
      "stationuuid": "1cfb151d-a341-11e9-a787-52543be04c81"
    },
    {
      "name": "iraninternational",
      "url_resolved": "http://n03.radiojar.com/dfnrphnr5f0uv?rj-ttl=5&rj-tok=AAABmbgTILsA8zvBFiUhZiPBpA",
      "favicon": "https://iranintl.com/favicon.ico",
      "country": "Islamic Republic Of Iran",
      "tags": ["iran", "news", "persian"],
      "stationuuid": "5c6c092b-2b8b-4ac1-a8d0-090f87037fd9"
    },
    {
      "name": "Dance Wave!",
      "url_resolved": "http://onair.dancewave.online:8080/dance.mp3",
      "favicon": "https://dancewave.online/dw_logo.png",
      "country": "Hungary",
      "tags": ["club dance electronic house trance"],
      "stationuuid": "962cc6df-0601-11e8-ae97-52543be04c81"
    },
    {
      "name": "WDR 5",
      "url_resolved": "http://f111.rndfnk.com/ard/wdr/wdr5/live/mp3/128/stream.mp3?cid=01FBS0E239W9R7GR1S5Q7RTQRC&sid=33h7Yqp6L2Uu5UO8YuxdMxAJ0GF&token=dMT2uA9X152pCmJkY4307zPLqSRxNCHvAB3Tnxmy9eo&tvf=bhwawMT9axhmMTExLnJuZGZuay5jb20",
      "favicon": "https://www1.wdr.de/resources-v5.134.1/img/favicon/apple-touch-icon.png",
      "country": "Germany",
      "tags": ["information", "news", "news talk", "political talk", "talk"],
      "stationuuid": "9605edb3-0601-11e8-ae97-52543be04c81"
    },
    {
      "name": "Vivid Bharti ",
      "url_resolved": "https://air.pc.cdn.bitgravity.com/air/live/pbaudio001/playlist.m3u8",
      "favicon": "",
      "country": "India",
      "tags": ["classical"],
      "stationuuid": "902ea231-d537-4dc8-8708-6819418086d0"
    },
    {
      "name": "Slow Rock 90'",
      "url_resolved": "https://stream-153.zeno.fm/hiut6cwfoneuv?zt=eyJhbGciOiJIUzI1NiJ9.eyJzdHJlYW0iOiJoaXV0NmN3Zm9uZXV2IiwiaG9zdCI6InN0cmVhbS0xNTMuemVuby5mbSIsInRtIjpmYWxzZSwicnR0bCI6NSwianRpIjoiU2tKaGpmVDVTd21ydTVUWU4yX05iUSIsImlhdCI6MTc1OTczNjU1NSwiZXhwIjoxNzU5NzM2NjE1fQ.XqAAvLMth_sLWIOdNl-uiM43sDn47FlmVgHTD7cfeeQ",
      "favicon": "https://zeno.fm/_next/image/?url=https%3A%2F%2Fimages.zeno.fm%2FrKtC0NpB5ZmSBUWmZtAUn1sM1w_Owj9kNo-Xuc310Ak%2Frs%3Afit%3A240%3A240%2Fg%3Ace%3A0%3A0%2FaHR0cHM6Ly9zdHJlYW0tdG9vbHMuemVub21lZGlhLmNvbS9jb250ZW50L3N0YXRpb25zLzg3MzhjNDA0LTMzODItNDgxMC04YWE3LTEwZjE3MjE2ZGRjZC9pbWFnZS8_dXBkYXRlZD0xNzAyNjMxMzU2MDAw.webp&w=750&q=100",
      "country": "Malaysia",
      "tags": ["90's", "classic rock", "general", "rock", "slow rock"],
      "stationuuid": "7c3927d0-f5c2-4295-82d9-3db0f54fe219"
    },
    {
      "name": "FIP",
      "url_resolved": "http://icecast.radiofrance.fr/fip-hifi.aac",
      "favicon": "https://upload.wikimedia.org/wikipedia/fr/thumb/d/d5/FIP_logo_2005.svg/1024px-FIP_logo_2005.svg.png",
      "country": "France",
      "tags": ["aac", "music", "public radio", "radio france"],
      "stationuuid": "932eb148-e6f6-11e9-a96c-52543be04c81"
    },
    {
      "name": "1LIVE",
      "url_resolved": "http://d121.rndfnk.com/ard/wdr/1live/live/mp3/128/stream.mp3?cid=01FBRZTS1K1TCD4KA2YZ1ND8X3&sid=33g8YL9lV5YB6go1NSjzSmZTbxR&token=bmvtyDyueEQq4Wz03kY7bSufRXgirMzZlT8xZ0KmkEo&tvf=miXtimTiaxhkMTIxLnJuZGZuay5jb20",
      "favicon": "https://www1.wdr.de/radio/1live/resources/img/favicon/apple-touch-icon.png",
      "country": "Germany",
      "tags": ["ard", "public radio", "rock", "top 40", "wdr"],
      "stationuuid": "9606f727-0601-11e8-ae97-52543be04c81"
    },
    {
      "name": "Radio Iran International",
      "url_resolved": "http://n0b.radiojar.com/dfnrphnr5f0uv?rj-ttl=5&rj-tok=AAABmbl3DtUA503KHmhpVL5trQ",
      "favicon": "https://ott.iranintl.com/images/ii-player-poster.webp",
      "country": "Islamic Republic Of Iran",
      "tags": [],
      "stationuuid": "eb68658e-6039-4bef-924b-cfae14098abb"
    },
    {
      "name": "إذاعة القرآن الكريم من القاهرة",
      "url_resolved": "http://n13.radiojar.com/8s5u5tpdtwzuv?listening-from-radio-garden=1620219571863&rj-ttl=5&rj-tok=AAABmbl-iVcAm3ua7HNfqZJZHA",
      "favicon": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLDeG4UfceNKx39_KEr8RQhM3QX5kSdpK6zQ&usqp=CAU",
      "country": "Egypt",
      "tags": ["اسلامي", "دين"],
      "stationuuid": "8e63e8b6-4e70-4bc0-9f5d-07e8477a4480"
    },
    {
      "name": "凤凰卫视资讯台",
      "url_resolved": "http://playtv-live.ifeng.com/live/06OLEEWQKN4_audio.m3u8",
      "favicon": "http://d.ifengimg.com/w250_h160_q90_webp/x0.ifengimg.com/ucms/2021_23/4F53E3FD6DBDAF0374F35223C9F6316706F6A08F_size23_w250_h160.jpg",
      "country": "China",
      "tags": ["news"],
      "stationuuid": "dc722c5e-21a0-49be-8687-474638c95ca7"
    },
    {
      "name": "Sinar FM",
      "url_resolved": "https://n08a-eu.rcs.revma.com/azatk0tbv4uvv/8_1ksmof3jo7vso02/playlist.m3u8",
      "favicon": "https://radio-online.my/storage/radios/8384/45312/conversions/aKWaLIfLRFuSBriZVWgA3q2vOUg8II-metac2luYXIxMTEucG5n--lg.webp",
      "country": "Malaysia",
      "tags": [],
      "stationuuid": "df6a8fa4-23cb-4279-a025-bf3057bd0a4b"
    },
    {
      "name": "Вести ФМ (Vesti FM)",
      "url_resolved": "http://icecast.vgtrk.cdnvideo.ru/vestifm_mp3_192kbps",
      "favicon": "",
      "country": "The Russian Federation",
      "tags": ["news"],
      "stationuuid": "960b9e98-0601-11e8-ae97-52543be04c81"
    },
    {
      "name": "BBC Radio 4 (128k)",
      "url_resolved": "http://as-hls-ww-live.akamaized.net/pool_55057080/live/ww/bbc_radio_fourfm/bbc_radio_fourfm.isml/bbc_radio_fourfm-audio%3d128000.norewind.m3u8",
      "favicon": "https://cdn-radiotime-logos.tunein.com/s25419q.png",
      "country": "The United Kingdom Of Great Britain And Northern Ireland",
      "tags": ["comedy", "drama", "news", "talk"],
      "stationuuid": "98137c2d-ce68-4e33-8cb7-ddf3692ecc9d"
    },
    {
      "name": "Bollywood Gaane Purane",
      "url_resolved": "https://stream-143.zeno.fm/6n6ewddtad0uv?zt=eyJhbGciOiJIUzI1NiJ9.eyJzdHJlYW0iOiI2bjZld2RkdGFkMHV2IiwiaG9zdCI6InN0cmVhbS0xNDMuemVuby5mbSIsInRtIjpmYWxzZSwicnR0bCI6NSwianRpIjoiTjFXSWNrcFFRdk9tWDJEdmRoZU5kUSIsImlhdCI6MTc1OTc1MDc4MywiZXhwIjoxNzU5NzUwODQzfQ.EszMD7He1ta1nJpan_0dmN9jZFfxEcLeSf6ppnR-LcM",
      "favicon": "https://mytuner.global.ssl.fastly.net/media/tvos_radios/ppqbgfej6skx.jpeg",
      "country": "India",
      "tags": [],
      "stationuuid": "e928bf7b-7de2-4447-87ec-369d1be1b9f5"
    },
    {
      "name": "France Inter",
      "url_resolved": "https://stream.radiofrance.fr/franceinter/franceinter_hifi.m3u8?id=radiofrance",
      "favicon": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/France_Inter_logo_2021.svg/1200px-France_Inter_logo_2021.svg.png",
      "country": "France",
      "tags": [],
      "stationuuid": "33960c43-0464-44b4-abfa-73591ebf647f"
    },
    {
      "name": " Relax FM Chillout",
      "url_resolved": "https://pub0201.101.ru/stream/trust/mp3/128/24?",
      "favicon": "https://www.radiobells.com/stations/relaxfmchillout.webp",
      "country": "The Russian Federation",
      "tags": ["chill", "chillout", "chillout+lounge"],
      "stationuuid": "95eff2f9-cb7a-4fe4-bb07-8c700719f8b6"
    },
    {
      "name": "France Culture",
      "url_resolved": "http://icecast.radiofrance.fr/franceculture-hifi.aac",
      "favicon": "https://upload.wikimedia.org/wikipedia/fr/thumb/c/c9/France_Culture_-_2008.svg/1024px-France_Culture_-_2008.svg.png",
      "country": "France",
      "tags": ["aac", "culture", "public radio", "radio france"],
      "stationuuid": "6a1440b2-e6f0-11e9-a96c-52543be04c81"
    },
  {
    "name": "Radio 357",
    "url_resolved": "https://n-11-21.dcs.redcdn.pl/sc/o2/radio357/live/radio357_pr.livx?preroll=0",
    "favicon": "https://radio357.pl/wp-content/uploads/2022/04/c5399c0d-1b8e-43d5-b23b-e5cef1857856.png",
    "country": "Poland",
    "tags": ["adult contemporary"],
    "stationuuid": "d377fdb9-9136-47de-a1f4-6b02a1bc7f72"
  },
  {
    "name": "RMF FM",
    "url_resolved": "http://195.150.20.242:8000/rmf_fm",
    "favicon": "https://www.rmf.fm/assets/images/favicon/apple-icon-120x120.png?3",
    "country": "Poland",
    "tags": ["fm", "rmf", "rmffm"],
    "stationuuid": "399b7c2a-6680-11e8-b15b-52543be04c81"
  },
  {
    "name": "NPO Radio 1",
    "url_resolved": "http://icecast.omroep.nl/radio1-bb-mp3",
    "favicon": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/NPO_Radio_1_logo_2014.svg/640px-NPO_Radio_1_logo_2014.svg.png",
    "country": "The Netherlands",
    "tags": ["news"],
    "stationuuid": "96126f56-0601-11e8-ae97-52543be04c81"
  },
  {
    "name": "Deep House Lounge",
    "url_resolved": "http://198.15.94.34:8006/stream",
    "favicon": "http://www.deephouselounge.com/wp-content/themes/maronpro/images/favicon.ico",
    "country": "The United States Of America",
    "tags": ["deep house", "disco", "electronica", "funky", "house", "jazzy", "lounge", "philadelphia", "techno"],
    "stationuuid": "96156a3e-0601-11e8-ae97-52543be04c81"
  },
  {
    "name": "Radio 24 il sole 24 ore",
    "url_resolved": "http://shoutcast2.radio24.it:8000/;",
    "favicon": "https://www.radio24.ilsole24ore.com/whitelabel/group-2420101401040528/img/apple-touch-icon.png",
    "country": "Italy",
    "tags": ["news talk"],
    "stationuuid": "986c5985-41d7-11ea-a95e-52543be04c81"
  }
]

export default fallbackStations