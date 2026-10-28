<script lang="ts">
  import "@m3e/web/segmented-button";
  import "@m3e/web/icon";

  interface SegmentedButtonItem {
    value: string;
    label: string;
    icon?: string;
  }

  interface SegmentedButtonProps {
    items: Array<SegmentedButtonItem>;
    activeIndex?: number;
    label?: string;
    onValueChange?: (value: number) => void;
  }

  let {
    items,
    activeIndex = 0,
    label = "Choose a section",
    onValueChange,
  }: SegmentedButtonProps = $props();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
<m3e-segmented-button
  class="density-3"
  aria-label={label}
  hide-selection-indicator
>
  {#each items as item, index}
    <m3e-button-segment
      role="button"
      tabindex="0"
      value={String(index)}
      checked={activeIndex === index}
      onclick={(event: Event) => {
        onValueChange?.(index);
      }}
    >
      {#if item.icon}
        <m3e-icon slot="icon" name={item.icon}></m3e-icon>
      {/if}
      <span class="hidden md:block text-[11px]">
        {item.label}
      </span>
    </m3e-button-segment>
  {/each}
</m3e-segmented-button>

<style>
  .density-3 {
    --md-sys-density-scale: -3;
  }
  /* Additional classes omitted for brevity */
</style>
