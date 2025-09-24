// types/speech.d.ts
// Minimal typings for Web Speech API so Next/TS can compile on Vercel.

interface SpeechRecognition extends EventTarget {
  lang?: string;
  continuous?: boolean;
  interimResults?: boolean;
  maxAlternatives?: number;
  start: () => void;
  stop: () => void;
  abort?: () => void;
  onaudioend?: ((this: SpeechRecognition, ev: Event) => any) | null;
  onaudiostart?: ((this: SpeechRecognition, ev: Event) => any) | null;
  onend?: ((this: SpeechRecognition, ev: Event) => any) | null;
  onerror?: ((this: SpeechRecognition, ev: Event) => any) | null;
  onnomatch?: ((this: SpeechRecognition, ev: Event) => any) | null;
  onresult?: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
  onsoundend?: ((this: SpeechRecognition, ev: Event) => any) | null;
  onsoundstart?: ((this: SpeechRecognition, ev: Event) => any) | null;
  onspeechend?: ((this: SpeechRecognition, ev: Event) => any) | null;
  onspeechstart?: ((this: SpeechRecognition, ev: Event) => any) | null;
  onstart?: ((this: SpeechRecognition, ev: Event) => any) | null;
}

interface SpeechRecognitionResult {
  readonly length: number;
  [index: number]: SpeechRecognitionAlternative;
  isFinal?: boolean;
}
interface SpeechRecognitionAlternative { transcript: string; confidence: number; }
interface SpeechRecognitionResultList {
  readonly length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}
interface SpeechRecognitionEvent {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
}

interface Window {
  webkitSpeechRecognition?: { new(): SpeechRecognition };
  SpeechRecognition?: { new(): SpeechRecognition };
}
