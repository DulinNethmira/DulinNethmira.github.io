export const productInfo = {
  name: "VLC RPC",
  description: "Intelligent media presence for VLC.",
  longDescription: "VLC RPC brings Discord Rich Presence, media recognition, AniList synchronization, and rewatch-aware tracking to VLC Media Player.",
  github: {
    repo: "DulinNethmira/VLC-RPC",
    url: "https://github.com/DulinNethmira/VLC-RPC",
    issues: "https://github.com/DulinNethmira/VLC-RPC/issues",
    releases: "https://github.com/DulinNethmira/VLC-RPC/releases"
  },
  capabilities: [
    "Open Source",
    "Windows",
    "VLC Integration",
    "Discord",
    "AniList"
  ],
  fallback: {
    latestVersion: "v5.6.4",
    releaseDate: "2024-03-10",
    stars: 120,
    forks: 15
  }
};

export const changelogData = [
  {
    version: "v5.6.4",
    date: "2024-03-10",
    changes: [
      { type: "NEW", text: "Added Anime Wrapped feature for viewing yearly stats" },
      { type: "IMPROVED", text: "Enhanced AniList sync threshold reliability" },
      { type: "FIXED", text: "Resolved issue with Lua HTTP password parsing" }
    ]
  },
  {
    version: "v5.5.0",
    date: "2024-01-22",
    changes: [
      { type: "NEW", text: "Introduced secure local OAuth 2.0 callback server" },
      { type: "IMPROVED", text: "Smarter 2-tier AniList database matching" }
    ]
  }
];

export const faqData = [
  {
    question: "What is VLC RPC?",
    answer: "VLC RPC is a sophisticated desktop utility that connects VLC Media Player with Discord Rich Presence and AniList. It automatically identifies what you are watching, updates your Discord status, and synchronizes your anime progress."
  },
  {
    question: "Does it require VLC?",
    answer: "Yes. VLC RPC connects to VLC Media Player via its built-in Web (Lua HTTP) interface. You must enable the web interface in VLC's settings and set a password for the connection."
  },
  {
    question: "How does media recognition work?",
    answer: "The application parses the filename of the currently playing media to extract the title, season, and episode. It uses this structured metadata to query AniList and accurately identify the media."
  },
  {
    question: "Does it support rewatches?",
    answer: "Yes. VLC RPC includes intelligent rewatch detection. If you have already completed a series on AniList and start watching it again, the application can detect the playback and increment a new rewatch cycle."
  },
  {
    question: "Is my data private?",
    answer: "Yes. Authentication is handled entirely locally, and VLC RPC does not use a separate backend to proxy your AniList credentials. All your watch history and analytics data are stored locally in an SQLite database on your machine."
  }
];
