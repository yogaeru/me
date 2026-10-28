<script lang="ts">
  import "@m3e/web/shape";

  let { shapeCount = 30 }: { shapeCount?: number } = $props();

  const shapeNames = [
    "4-leaf-clover",
    "4-sided-cookie",
    "6-sided-cookie",
    "7-sided-cookie",
    "8-leaf-clover",
    "9-sided-cookie",
    "12-sided-cookie",
    "arch",
    "arrow",
    "boom",
    "bun",
    "burst",
    "circle",
    "diamond",
    "fan",
    "flower",
    "gem",
    "ghost-ish",
    "heart",
    "hexagon",
    "oval",
    "pentagon",
    "pill",
    "pixel-circle",
    "pixel-triangle",
    "puffy",
    "puffy-diamond",
    "semicircle",
    "slanted",
    "soft-boom",
    "soft-burst",
    "square",
    "sunny",
    "triangle",
    "very-sunny",
  ] as const;

  const appearances = [
    {
      classes:
        "w-14 -rotate-12 opacity-30 [--m3e-shape-container-color:var(--md-sys-color-tertiary-container)] max-[760px]:w-10",
      duration: 9,
      delay: 0,
    },
    {
      classes:
        "w-9 rotate-12 opacity-50 [--m3e-shape-container-color:var(--md-sys-color-primary-container)]",
      duration: 8,
      delay: -3,
    },
    {
      classes:
        "w-16 rotate-12 opacity-40 [--m3e-shape-container-color:var(--md-sys-color-secondary-container)] max-[760px]:w-10",
      duration: 10,
      delay: -5,
    },
    {
      classes:
        "w-8 -rotate-12 opacity-35 [--m3e-shape-container-color:var(--md-sys-color-tertiary)]",
      duration: 7,
      delay: -1,
    },
    {
      classes:
        "w-20 rotate-45 opacity-20 [--m3e-shape-container-color:var(--md-sys-color-primary)] max-[760px]:w-12",
      duration: 14,
      delay: -7,
    },
    {
      classes:
        "w-6 -rotate-30 opacity-55 [--m3e-shape-container-color:var(--md-sys-color-secondary)]",
      duration: 6,
      delay: -2,
    },
    {
      classes:
        "w-12 rotate-90 opacity-25 [--m3e-shape-container-color:var(--md-sys-color-tertiary)] max-[760px]:w-8",
      duration: 11,
      delay: -8,
    },
    {
      classes:
        "w-10 -rotate-45 -scale-x-100 opacity-45 [--m3e-shape-container-color:var(--md-sys-color-secondary-container)] max-[760px]:w-7",
      duration: 8.5,
      delay: -4,
    },
    {
      classes:
        "w-18 rotate-6 opacity-15 [--m3e-shape-container-color:var(--md-sys-color-tertiary-container)] max-[760px]:w-11",
      duration: 16,
      delay: -11,
    },
    {
      classes:
        "w-7 rotate-60 opacity-60 [--m3e-shape-container-color:var(--md-sys-color-primary)] max-[760px]:w-5",
      duration: 6.5,
      delay: -3.5,
    },
    {
      classes:
        "w-11 -rotate-90 opacity-35 [--m3e-shape-container-color:var(--md-sys-color-outline-variant)] max-[760px]:w-8",
      duration: 12,
      delay: -9,
    },
    {
      classes:
        "w-24 rotate-30 -scale-y-100 opacity-10 [--m3e-shape-container-color:var(--md-sys-color-secondary)] max-[760px]:w-14",
      duration: 18,
      delay: -13,
    },
    {
      classes:
        "w-5 rotate-180 opacity-50 [--m3e-shape-container-color:var(--md-sys-color-tertiary)]",
      duration: 7.5,
      delay: -5.5,
    },
    {
      classes:
        "w-14 -rotate-6 -scale-x-100 opacity-25 [--m3e-shape-container-color:var(--md-sys-color-primary-container)] max-[760px]:w-9",
      duration: 13,
      delay: -6,
    },
    {
      classes:
        "w-9 rotate-120 opacity-40 [--m3e-shape-container-color:var(--md-sys-color-secondary)] max-[760px]:w-6",
      duration: 9.5,
      delay: -7.5,
    },
    {
      classes:
        "w-16 -rotate-60 opacity-20 [--m3e-shape-container-color:var(--md-sys-color-outline)] max-[760px]:w-10",
      duration: 15,
      delay: -10,
    },
  ];

  function createShapes(count: number) {
    const columns = Math.ceil(Math.sqrt(count));
    const rows = Math.ceil(count / columns);

    // Adapt the cells to the count to keep random positions spread across the hero.
    return Array.from({ length: count }, (_, index) => ({
      ...appearances[index % appearances.length],
      name: shapeNames[Math.floor(Math.random() * shapeNames.length)],
      x: ((index % columns) + 0.15 + Math.random() * 0.7) / columns,
      y: (Math.floor(index / columns) + 0.15 + Math.random() * 0.7) / rows,
    }));
  }

  let shapes = $state<ReturnType<typeof createShapes>>([]);

  $effect(() => {
    const count = Number.isFinite(shapeCount)
      ? Math.max(0, Math.floor(shapeCount))
      : 0;
    shapes = createShapes(count);
  });
</script>

<div
  class="pointer-events-none absolute inset-4 -z-10 select-none"
  aria-hidden="true"
>
  {#each shapes as shape}
    <m3e-shape
      name={shape.name}
      class="absolute motion-safe:animate-hero-float {shape.classes}"
      style:left="calc((100% - 4rem) * {shape.x})"
      style:top="calc((100% - 4rem) * {shape.y})"
      style:animation-duration="{shape.duration}s"
      style:animation-delay="{shape.delay}s"
    ></m3e-shape>
  {/each}
</div>
