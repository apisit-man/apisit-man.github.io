---
name: edtech-socratic-ai
description: >-
  Design and implement Socratic AI tutoring, guided inquiry, and conceptual misconception diagnosis
  for science, STEM, and physics simulations using the Gemini API. Use when building AI-powered tutors,
  feedback engines, quiz assistants, or scaffolding systems that guide students through questioning
  rather than revealing answers directly.
---

# Socratic AI Tutoring & Misconception Diagnosis Guide

This skill provides prompt engineering architectures, structured JSON schemas, and pedagogical scaffolding for implementing Socratic AI tutors using the Google Gemini API in educational applications (e.g., Concept-Check, Physics Simulations, and AI Literacy games).

---

## 1. Pedagogical Foundation: Conceptual Change Model

In science education, students rarely arrive as blank slates—they bring intuitive misconceptions (e.g., *"Heavier objects always fall faster"*, *"Force is required to keep an object moving"*, or *"Current is consumed by a bulb"*).

A Socratic AI tutor must follow Posner's Conceptual Change steps:
1. **Diagnose**: Pinpoint the underlying misconception behind the student's erroneous answer or action.
2. **Create Cognitive Conflict**: Ask a targeted counter-example question that makes the student question their faulty intuition.
3. **Scaffold Understanding**: Provide progressive hints (low, medium, high) without ever giving the direct answer away.
4. **Reinforce & Generalize**: Connect the correct understanding back to the mathematical law or scientific concept.

---

## 2. Gemini API Structured Output Schema (TypeScript / JavaScript)

Always use structured JSON output (`responseMimeType: "application/json"`) with `responseSchema` to guarantee predictable frontend parsing:

```javascript
import { GoogleGenAI, Type } from '@google/genai';

const ai = new GoogleGenAI();

export const SocraticFeedbackSchema = {
  type: Type.OBJECT,
  properties: {
    isCorrect: { type: Type.BOOLEAN, description: "Whether the student's answer is scientifically correct" },
    misconceptionIdentified: { 
      type: Type.STRING, 
      description: "Specific misconception diagnosed from the choice or 'none' if correct" 
    },
    socraticHint: { 
      type: Type.STRING, 
      description: "A thought-provoking question prompting the student to reconsider their logic without giving away the answer" 
    },
    counterExample: { 
      type: Type.STRING, 
      description: "A relatable real-world physical scenario highlighting the contradiction in their logic" 
    },
    suggestedSimulationTweak: {
      type: Type.OBJECT,
      properties: {
        parameter: { type: Type.STRING, description: "Name of variable to adjust in simulation (e.g., angle, mass, airResistance)" },
        suggestedValue: { type: Type.NUMBER, description: "Suggested value to test in the simulator" },
        instruction: { type: Type.STRING, description: "Action prompt for the student to observe" }
      }
    }
  },
  required: ["isCorrect", "misconceptionIdentified", "socraticHint", "counterExample"]
};
```

---

## 3. Recommended System Instruction Template

```markdown
You are an expert STEM and Physics educator trained in Socratic inquiry and Conceptual Change theory.
Your goal is to guide learners to discover scientific truths themselves.

RULES OF ENGAGEMENT:
1. NEVER reveal the final correct answer or choice letter (A, B, C, D).
2. If the student is wrong, diagnose WHICH specific physical misconception led them to that choice.
3. Formulate a friendly, encouraging question that guides them to observe the flaw in that mental model.
4. If applicable, recommend adjusting a specific simulation slider or control so they can see the empirical evidence themselves.
5. Keep explanations age-appropriate, positive, and grounded in observable phenomena.
```

---

## 4. Client-Side Integration Example

```javascript
export async function getSocraticFeedback(problemContext, studentAnswer) {
  const prompt = `
Question: ${problemContext.question}
Options: ${JSON.stringify(problemContext.options)}
Correct Answer: ${problemContext.correctAnswer}
Student's Chosen Answer: ${studentAnswer}
Underlying Physics Concept: ${problemContext.concept}
`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      systemInstruction: SOCRATIC_SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: SocraticFeedbackSchema,
      temperature: 0.3 // Low temperature for consistent pedagogy
    }
  });

  return JSON.parse(response.text);
}
```
