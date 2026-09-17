# DTU Mecha AI

DTU Mecha AI is a local, engineering-focused study assistant for DTU Mechatronics students. It uses Ollama and `qwen2.5:7b-instruct`; the model is Apache-2.0 licensed and supports Arabic and English.

## Setup

1. Install [Ollama](https://ollama.com/).
2. Run `ollama run qwen2.5:7b-instruct` once to download the local model (about 4.7 GB).
3. Run this project with `npm run dev`.

The default endpoint is `http://localhost:11434`. Optionally copy `.env.example` to `.env` and change the local endpoint or model. These values are configuration only; there is no AI API key. If an older `.env` contains `VITE_GEMINI_API_KEY`, remove it and rotate that key if an earlier frontend build was distributed.

## Cost, privacy, and limits

- The model runs on the student's machine: no API subscription, card, or paid credits are required.
- Responses go only to the local Ollama service. Performance depends on the device; initial model download needs disk space and internet access.
- Context is limited to the current page conversation; chats are not stored in a database.
- Google Drive folders and PDFs are not read automatically. Paste lecture text to summarize it, make flashcards, or create a quiz.
- Deterministic calculations currently cover hydraulic-cylinder force and Ohm's-law current when explicit units are supplied. Verify work used in real equipment.

## Safety and model replacement

The system prompt warns for high voltage, pressure systems, machinery, and rotating equipment. It provides educational help, not live-operation authorization.

To replace the model, download another compatible local Ollama model and update `VITE_OLLAMA_MODEL`; no code or credentials need to change.

