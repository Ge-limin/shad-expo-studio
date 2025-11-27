declare module '*.png' {
  import type { ImageSourcePropType } from 'react-native';
  const value: ImageSourcePropType;
  export default value;
}

declare module '*.jpg' {
  import type { ImageSourcePropType } from 'react-native';
  const value: ImageSourcePropType;
  export default value;
}

declare module '*.jpeg' {
  import type { ImageSourcePropType } from 'react-native';
  const value: ImageSourcePropType;
  export default value;
}

declare module '*.json' {
  const value: unknown;
  export default value;
}

declare module '*.ttf' {
  const value: string;
  export default value;
}
