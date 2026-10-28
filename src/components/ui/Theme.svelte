<script lang="ts">
  import "@m3e/web/theme";
  import type {
    ColorScheme,
    ContrastLevel,
    MotionScheme,
    ThemeVariant,
  } from "@m3e/web/theme";
  import type { Snippet } from "svelte";

  interface ThemeProps {
    children: Snippet;
    sourceColor?: string;
    colorScheme?: ColorScheme;
    motionScheme?: MotionScheme;
    themeVariant?: ThemeVariant;
    contrastLevel?: ContrastLevel;
  }

  let {
    children,
    sourceColor = "#6750A4",
    colorScheme = "light",
    contrastLevel = "standard",
    motionScheme = "expressive",
    themeVariant = "expressive",
  }: ThemeProps = $props();
</script>

<m3e-theme
  class="block w-full"
  color={sourceColor}
  scheme={colorScheme}
  contrast={contrastLevel}
  motion={motionScheme}
  variant={themeVariant}
>
  {@render children()}
</m3e-theme>
