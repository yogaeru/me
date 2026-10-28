<script lang="ts">
  import "@m3e/web/icon";
  import type { IconVariant, IconGrade } from "@m3e/web/icon";

  interface IconProps {
    name: string;
    variant?: IconVariant;
    grade?: IconGrade;
  }

  let { name, variant, grade }: IconProps = $props();
</script>

<m3e-icon {name} {variant} {grade}></m3e-icon>
