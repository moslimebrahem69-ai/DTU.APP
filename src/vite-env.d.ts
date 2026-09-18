/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL?: string;
  readonly VITE_GROQ_MODEL?: string;
}

interface ImportMeta { readonly env: ImportMetaEnv; }
