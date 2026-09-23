interface ImportMetaEnv {
  /** Web3Forms access key (public by design). Without it the form falls back to mailto:. */
  readonly PUBLIC_WEB3FORMS_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
