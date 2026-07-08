# 🕵️‍♂️ AI Literacy Game

![Game Screenshot](https://via.placeholder.com/800x400.png?text=AI+Literacy+Game)

An interactive, gamified web application designed to teach **AI Literacy** and promote critical thinking. Players act as "Information Detectives" tasked with identifying AI hallucinations, biases, and deepfake references hidden within AI-generated text.

## ✨ Features
- **Dynamic AI Scenarios:** Uses OpenAI's `gpt-4o-mini` model to dynamically generate unique challenges every session.
- **Escalating Difficulty:** The game progressively increases the subtlety of the AI's mistakes (Level 1 to Level 3+).
- **Gamified Experience:** Score tracking, level progression, and satisfying visual/audio feedback (confetti & applause) for correct answers.
- **Topics Covered (OECD Framework):**
  - ⚖️ Bias
  - 👻 Hallucination
  - 🎭 Synthetic Media (Deepfakes)
  - 🛡️ Privacy

## 🛠️ Technology Stack
- **Frontend:** HTML5, CSS3 (Vanilla, Glassmorphism UI), JavaScript (ES6+)
- **APIs:** OpenAI API (Chat Completions)
- **Libraries:** FontAwesome (Icons), Canvas-Confetti (Visual Effects)

## 🚀 How to Run Locally
This is a purely static web application, meaning no backend server is required! 
1. Clone this repository.
2. Open `index.html` in any modern web browser.
3. Enter your OpenAI API Key and start playing!
*(Note: Your API key is processed entirely on the client side and is never stored).*

## 🌐 How to Embed in Your Portfolio
You can easily embed this game into your personal website using an iframe. See `demo-embed.html` for a working example:
```html
<iframe src="ai-literacy-game/index.html" width="100%" height="800px" style="border: none; border-radius: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);"></iframe>
```

---
*Developed as an educational tool for AI Literacy Teacher Training.*
