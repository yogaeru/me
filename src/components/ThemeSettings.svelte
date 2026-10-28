<script lang="ts">
  import { cn } from "cn";
  import type {
    ColorScheme,
    ContrastLevel,
    MotionScheme,
    ThemeVariant,
  } from "@m3e/web/theme";
  import Icon from "./ui/Icon.svelte";
  import Select from "./ui/Select.svelte";
  import { defaultThemeSettings, type ThemeSettings } from "../lib/theme";

  let { settings = $bindable() }: { settings: ThemeSettings } = $props();

  const colorOptions = [
    { value: "#B7A8C2", label: "Lavender" },
    { value: "#6750A4", label: "Violet" },
    { value: "#4D80C9", label: "Blue" },
    { value: "#2A9D8F", label: "Teal" },
    { value: "#D66B8A", label: "Rose" },
    { value: "#C28A38", label: "Amber" },
  ];
  const schemeOptions: { value: ColorScheme; label: string }[] = [
    { value: "auto", label: "System" },
    { value: "light", label: "Light" },
    { value: "dark", label: "Dark" },
  ];
  const variantOptions: { value: ThemeVariant; label: string }[] = [
    { value: "content", label: "Content" },
    { value: "tonal-spot", label: "Tonal spot" },
    { value: "expressive", label: "Expressive" },
    { value: "vibrant", label: "Vibrant" },
    { value: "fidelity", label: "Fidelity" },
    { value: "neutral", label: "Neutral" },
    { value: "monochrome", label: "Monochrome" },
    { value: "rainbow", label: "Rainbow" },
    { value: "fruit-salad", label: "Fruit salad" },
  ];
  const contrastOptions: { value: ContrastLevel; label: string }[] = [
    { value: "standard", label: "Standard" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
  ];
  const motionOptions: { value: MotionScheme; label: string }[] = [
    { value: "expressive", label: "Expressive" },
    { value: "standard", label: "Standard" },
  ];
</script>

<div class={cn("mx-auto mt-8 max-w-2xl space-y-6")}>
  <section
    aria-labelledby="theme-preview-heading"
    class={cn(
      "rounded-3xl border border-md-primary/20 bg-md-primary/4 p-5 sm:p-6",
    )}
  >
    <div class={cn("flex items-center gap-3")}>
      <span
        aria-hidden="true"
        class={cn(
          "grid size-10 shrink-0 place-items-center rounded-2xl bg-md-primary text-md-on-primary [&_m3e-icon]:text-xl",
        )}><Icon name="palette" /></span
      >
      <div>
        <h4
          id="theme-preview-heading"
          class={cn("font-cherry text-lg text-md-primary")}
        >
          Make yourself at home
        </h4>
        <p
          class={cn("mt-1 text-xs leading-relaxed text-md-on-surface-variant")}
        >
          Changes apply instantly across the page and this window.
        </p>
      </div>
    </div>
    <div aria-label="Current theme palette" class={cn("mt-5 flex gap-2")}>
      <span
        class={cn(
          "flex-1 rounded-xl bg-md-primary px-2 py-3 text-center text-xs text-md-on-primary",
        )}>Primary</span
      >
      <span
        class={cn(
          "flex-1 rounded-xl bg-md-secondary px-2 py-3 text-center text-xs text-md-on-secondary",
        )}>Secondary</span
      >
      <span
        class={cn(
          "flex-1 rounded-xl bg-md-tertiary px-2 py-3 text-center text-xs text-md-on-tertiary",
        )}>Tertiary</span
      >
    </div>
  </section>

  <div class={cn("grid min-w-0 gap-6 sm:grid-cols-2")}>
    <div class={cn("min-w-0 space-y-2")}>
      <Select
        label="Accent color"
        options={colorOptions}
        bind:value={settings.sourceColor}
      />
      <p class={cn("px-1 text-xs leading-relaxed text-md-on-surface-variant")}>
        The seed color used to generate the palette.
      </p>
    </div>
    <div class={cn("min-w-0 space-y-2")}>
      <Select
        label="Color scheme"
        options={schemeOptions}
        bind:value={settings.colorScheme}
      />
      <p class={cn("px-1 text-xs leading-relaxed text-md-on-surface-variant")}>
        Choose light, dark, or follow your device.
      </p>
    </div>
    <div class={cn("min-w-0 space-y-2")}>
      <Select
        label="Palette style"
        options={variantOptions}
        bind:value={settings.themeVariant}
      />
      <p class={cn("px-1 text-xs leading-relaxed text-md-on-surface-variant")}>
        Adjust how colors are generated from the accent.
      </p>
    </div>
    <div class={cn("min-w-0 space-y-2")}>
      <Select
        label="Contrast"
        options={contrastOptions}
        bind:value={settings.contrastLevel}
      />
      <p class={cn("px-1 text-xs leading-relaxed text-md-on-surface-variant")}>
        Increase separation between text and surfaces.
      </p>
    </div>
    <div class={cn("min-w-0 space-y-2")}>
      <Select
        label="Motion style"
        options={motionOptions}
        bind:value={settings.motionScheme}
      />
      <p class={cn("px-1 text-xs leading-relaxed text-md-on-surface-variant")}>
        Set the motion style for Material components. Device reduced-motion
        preferences still apply.
      </p>
    </div>
  </div>

  <div
    class={cn(
      "flex flex-wrap items-center justify-between gap-4 border-t border-md-primary/15 pt-5",
    )}
  >
    <p class={cn("text-xs leading-relaxed text-md-on-surface-variant")}>
      Preferences stay active until you reload the page.
    </p>
    <button
      type="button"
      onclick={() => {
        settings = { ...defaultThemeSettings };
      }}
      class={cn(
        "inline-flex min-h-10 items-center gap-2 rounded-full border border-md-primary/25 px-4 text-xs text-md-primary transition-colors hover:bg-md-primary/8",
      )}
    >
      <span aria-hidden="true" class={cn("inline-flex [&_m3e-icon]:text-base")}
        ><Icon name="restart_alt" /></span
      >
      Reset theme
    </button>
  </div>
</div>
