# 🕵️‍♂️ AI Literacy Game

![Game Screenshot](https://via.placeholder.com/800x400.png?text=AI+Literacy+Game)

An interactive, gamified web application designed to teach **AI Literacy** and promote critical thinking. Players act as "Information Detectives" tasked with identifying AI hallucinations, biases, and deepfake references hidden within AI-generated text.

## ✨ Features
- **No API Key Required for Players:** Securely uses a backend Serverless Function.
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

## 🚀 How to Run and Deploy (Vercel)
This version uses a **Vercel Serverless Function** to hide the API key.

### Local Development
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel dev` inside the project folder.
3. Set your `OPENAI_API_KEY` when prompted or in `.env`.

### Production Deployment
1. Push this folder to a GitHub repository.
2. Go to [Vercel.com](https://vercel.com) and create a new project.
3. Import your GitHub repository.
4. In the Environment Variables section, add `OPENAI_API_KEY` and set it to your OpenAI API Key.
5. Click **Deploy**! The game will be live for anyone to play, limited to 10 questions per IP per day.

## 🌐 How to Embed in Your Portfolio
You can easily embed this game into your personal website using an iframe. See `demo-embed.html` for a working example:
```html
<iframe src="ai-literacy-game/index.html" width="100%" height="800px" style="border: none; border-radius: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);"></iframe>
```

---
*Developed as an educational tool for AI Literacy Teacher Training.*
