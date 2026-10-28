<script lang="ts">
  import "@m3e/web/shape";
  import type { ShapeName } from "@m3e/web/shape";

  interface ShapeProps {
    name: ShapeName;
  }

  let { name }: ShapeProps = $props();
</script>

<m3e-shape {name}></m3e-shape>
