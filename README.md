# 🧠 Trivia Flair 3.0

A full-stack trivia game with integrated radio player! Built with React, TypeScript, Node.js, and MongoDB. Features trivia gameplay, AI-powered hints, and a fully functional radio widget with thousands of live stations.

🎮 **Live Demo**: [Frontend](https://trivia-game-v3-frontend.onrender.com/) | [Backend API](https://trivia-game-v3-backend.onrender.com)

![Trivia Flair Screenshot](https://via.placeholder.com/800x400/3B2E26/E8A948?text=Trivia+Flair+3.0+-+Trivia+Game+with+Radio+Player)

## ✨ What's New in 3.0

### 🎵 **Radio Widget**
- 📻 30,000+ live radio stations worldwide
- 🔍 Search by country, tags, or station name
- ⭐ Favorite stations with persistent storage
- 🔊 Real-time audio streaming with Howler.js
- 🎛️ Volume control and playback management
- 📱 Responsive retro-style design

### 🔐 **User System** 
- 👤 User registration and authentication
- 🔐 JWT token-based authentication
- 🗄️ MongoDB user data storage
- 📱 Persistent login sessions

### 🚀 **Backend Infrastructure**
- 🛡️ Proxy server for Radio Browser API
- ⚡ Load balancing across multiple radio servers
- 💾 Caching for improved performance
- 🔄 Exponential backoff for error handling

## 🎯 Features

### Trivia Game
- 🎯 Customizable categories, difficulty, and question count
- ⚡ Fast game flow with smooth animations
- 🧠 AI-powered hints & fun facts (DeepInfra Llama 3)
- 🐢 Minimal Mode: disable sound/animations/illustrations
- 📱 Fully responsive and accessible
- 🌙 Dark theme with OKLCH color system

### Radio Player
- 🌍 Global station database
- 🔍 Advanced search and filtering
- ⭐ Favorites system with localStorage
- 🔊 High-quality audio streaming
- 🎛️ Professional playback controls

## 🛠️ Tech Stack

### Frontend
- **React 19** + TypeScript
- **Tailwind CSS 4.0** with custom themes
- **Framer Motion** for animations
- **ShadCN/Radix UI** components
- **Howler.js** for audio handling
- **React Hook Form** + **Zod** for validation
- **Axios** for API calls

### Backend
- **Node.js** + **Express**
- **MongoDB** + **Mongoose**
- **JWT** authentication + **bcrypt** hashing
- **Radio Browser API** integration
- **Caching** and **load balancing**
