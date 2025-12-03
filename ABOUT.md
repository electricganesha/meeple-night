# Meeple Night

### _Your board game nights, organized effortlessly._

Meeple Night is a social companion app for board gamers.  
It syncs your BoardGameGeek (BGG) collection, connects you with friends, and helps you plan game sessions based on the combined pool of games everyone owns. No more endless “What do we play tonight?” discussions — Meeple Night picks the perfect games for your group size, available time, and playstyle.

Meeple Night now also includes AI-powered game rule summaries and Q&A, helping players learn games faster and resolve rules disputes during play.

---

## 🎯 Purpose

BoardGameGeek is amazing for data, but not for organizing actual game nights.  
Meeple Night bridges that gap by focusing on:

- Your collection
- Your friends’ collections
- Practical constraints (players, time, complexity)
- Social planning and voting
- _In-session rules assistance using LLMs_

It’s the missing social layer for BGG users and board game groups.

---

## ✨ Core Features

### 📦 Collection Integration

- Import and sync your BGG-owned games
- Local caching of game metadata
- Manual add for people without BGG accounts

### 🧑‍🤝‍🧑 Friends & Groups

- Add friends by username or email
- Create gaming groups (Family, Weekly Meetup, RPG Crew, etc.)
- See friends’ highlighted games

### 🎲 Game Session Planner

- Create sessions with date, time, and location
- Invite friends and track attendance
- Automatically merge collections of all attendees

### 🎯 Smart Game Picker

Filter games from the combined pool by:

- Number of players
- Playtime
- Complexity/weight
- Categories and mechanisms

Optional suggestions:

- Auto-pick 3 suggested games
- Voting system for attendees

### 🤖 AI Game Assistant (LLM Integration)

Meeple Night includes optional AI features to improve the game-night experience:

- Rule Summaries  
  Generate a concise, easy-to-read summary of any selected game's rules before a session.

- Ask Anything Q&A  
  Users can ask rules questions (“Does the robber block production in 2-player games?”) and get clear answers based on:

  - The official rulebook
  - Community clarifications
  - Known FAQs

- Contextual Answering During a Session  
  When a game is selected for a session, the assistant stays “locked” to that specific title for fast, accurate rules answers.

### 📅 History

- Log past sessions
- Track what was played and with whom

---

## 🛠️ Tech Stack (Planned)

- Frontend: React Native or Next.js PWA
- Backend: Supabase (Postgres + Auth + Storage)
- LLM Integration: OpenAI / Anthropic / Local LLM via server-side retrieval
- Rulebook Processing: File upload + text extraction + embedding search
- State Management: Zustand / Redux Toolkit / React Query
- Notifications: Expo or Firebase Cloud Messaging
- Hosting: Supabase / Vercel

---

# 🚀 MVP Roadmap

## Phase 1 – Foundation: Collections

Goal: Import collections and display game data.

- [ ] User authentication
- [ ] BGG username linking
- [ ] Fetch owned games via BGG API
- [ ] Store game metadata server-side
- [ ] “My Collection” view with sorting & filtering
- [ ] Basic game details page

---

## Phase 2 – Friends & Shared Pool

Goal: Combine collections across people.

- [ ] Friend system (send/accept invitations)
- [ ] Basic friend profiles
- [ ] Shared pool: merge collections of selected users
- [ ] Filters by players / time / weight
- [ ] Simple “Game Suggestions” tool

---

## Phase 3 – Game Session Planner

Goal: Organize real game nights.

- [ ] Create sessions (date/time/location)
- [ ] Invite friends, track attendance
- [ ] Combined session pool
- [ ] Voting on top game suggestions
- [ ] Push notifications / reminders
- [ ] Session history with played games

---

## Phase 4 – AI Rule Assistant (LLM Integration)

Goal: Help players understand rules and resolve questions quickly.

- [ ] Upload & process rulebooks (PDF → text extraction)
- [ ] Vector embeddings + semantic search
- [ ] Rule summary generator
- [ ] Game-specific Q&A (RAG on rulebook + FAQ)
- [ ] Session “Rules Chat” panel
- [ ] Cache commonly asked questions per game

---

## Post-MVP Ideas

These come later, once the core is solid.

- AI-assisted “What should we play?” (preference-based recommender)
- In-app chat for each session
- Tags & custom lists
- Discover local gamers
- Game stats and achievements
- Scan barcodes to add games
- Offline mode
- Calendar integration
- Public share links for sessions
- House rules & custom variants stored per group

---

## 🧩 Why Meeple Night?

Board gaming is inherently social.  
Meeple Night focuses on the real world: getting people together and matching the right game to the right moment — plus answering rules questions instantly, reducing downtime and confusion.

Game nights should be fun, not logistics or rulebook diving.

---

## 🤝 Contributing

Contributions, ideas, and feature requests are welcome!  
Feel free to open an issue or submit a PR.

---

## 📄 License

MIT License.
