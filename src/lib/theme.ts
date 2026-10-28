import type {
  ColorScheme,
  ContrastLevel,
  MotionScheme,
  ThemeVariant,
} from "@m3e/web/theme";

export interface ThemeSettings {
  sourceColor: string;
  colorScheme: ColorScheme;
  themeVariant: ThemeVariant;
  contrastLevel: ContrastLevel;
  motionScheme: MotionScheme;
}

export const defaultThemeSettings: Readonly<ThemeSettings> = {
  sourceColor: "#B7A8C2",
  colorScheme: "dark",
  themeVariant: "content",
  contrastLevel: "standard",
  motionScheme: "expressive",
};
