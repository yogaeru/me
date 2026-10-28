<script lang="ts">
  import "@m3e/web/button";
  import type { ButtonShape, ButtonVariant, ButtonSize } from "@m3e/web/button";

  interface ButtonProps {
    label?: string;
    shape?: ButtonShape;
    variant?: ButtonVariant;
    size?: ButtonSize;
    onClick?: () => void;
  }

  let {
    label = "Click Me",
    size = "extra-small",
    shape = "rounded",
    variant = "filled",
    onClick
  }: ButtonProps = $props();

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

</script>

<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
<m3e-button 
  onclick={handleClick}
  role="button"
  tabindex="0"
  {size}
  {shape} 
  {variant} 
> 
  {label} 
</m3e-button>

