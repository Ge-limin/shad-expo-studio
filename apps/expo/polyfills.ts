// Ensure a Buffer implementation exists in the React Native runtime (used by react-native-svg via Storybook).
import { Buffer } from 'buffer';

if (typeof globalThis.Buffer === 'undefined') {
  globalThis.Buffer = Buffer;
}
