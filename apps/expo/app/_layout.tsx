import { Stack } from 'expo-router';
// Work around Expo Router Android bug where LinkPreview context may be missing in dev.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - not part of the public API but safe for this workaround.
import { LinkPreviewContextProvider } from 'expo-router/build/link/preview/LinkPreviewContext';

import '../polyfills';

export default function RootLayout() {
  return (
    <LinkPreviewContextProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </LinkPreviewContextProvider>
  );
}
