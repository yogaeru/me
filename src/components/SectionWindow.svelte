<script lang="ts">
  import { cn } from "cn";
  import { tick } from "svelte";
  import Icon from "./ui/Icon.svelte";
  import SegmentedButton from "./ui/SegmentedButton.svelte";
  import ThemeSettingsPanel from "./ThemeSettings.svelte";
  import type { ThemeSettings } from "../lib/theme";

  interface LinkItem {
    title: string;
    icon: string;
    href?: string;
  }

  interface SectionWindowProps {
    section: string | null;
    themeSettings: ThemeSettings;
    sections: LinkItem[];
    orderLink: LinkItem;
    socialLinks: LinkItem[];
  }

  let {
    section = $bindable<string | null>(null),
    themeSettings = $bindable(),
    sections,
    orderLink,
    socialLinks,
  }: SectionWindowProps = $props();

  let windowElement: HTMLDialogElement;
  let maximized = $state(false);
  let closing = $state(false);
  let filter = $state("All works");
  const filters = ["All works", "Design", "Development", "Experiments"];
  const filterItems = filters.map((category) => ({
    value: category,
    label: category,
  }));
  const sectionItems = $derived(
    sections.map((item) => ({
      value: item.title,
      label: item.title,
      icon: item.icon,
    })),
  );
  const active = $derived(sections.find((item) => item.title === section));
  const isOpen = $derived(section !== null);
  const titles: Record<string, string> = {
    Portfolio: "Portfolio gallery",
    Settings: "Theme settings",
    Terms: "Terms of service",
    Contact: "Let's connect",
  };
  const descriptions: Record<string, string> = {
    Portfolio: "A space for design, code, and creative explorations.",
    Settings: "A little more you. Customize the colors and feel of this space.",
    Terms: "The details to review before starting a project together.",
    Contact: "Find me around the web or get in touch about your next idea.",
  };

  $effect(() => {
    if (!windowElement) return;
    if (isOpen && !windowElement.open) {
      maximized = false;
      closing = false;
      windowElement.showModal();
    } else if (!isOpen && windowElement.open) {
      windowElement.close();
    }
  });

  $effect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  });

  async function close() {
    if (closing || !windowElement?.open) return;
    closing = true;
    await tick();

    // Keep the content, focus trap, and scroll lock until the exit animation ends.
    await Promise.all(
      windowElement
        .getAnimations()
        .map((animation) => animation.finished.catch(() => {})),
    );
    if (!windowElement.isConnected) return;
    windowElement.close();
    section = null;
    closing = false;
  }

  function handleBackdrop(event: MouseEvent) {
    if (event.target !== windowElement) return;
    const rect = windowElement.getBoundingClientRect();
    if (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    ) {
      close();
    }
  }
</script>

<dialog
  bind:this={windowElement}
  class={cn(
    "section-window border-md-primary/20 bg-md-surface text-md-on-surface shadow-2xl shadow-black/25",
  )}
  data-maximized={maximized}
  data-closing={closing}
  aria-labelledby="section-window-title"
  oncancel={(event) => {
    event.preventDefault();
    close();
  }}
  onclose={() => {
    section = null;
  }}
  onclick={handleBackdrop}
>
  <div class={cn("flex h-full min-h-0 flex-col")}>
    <header
      class={cn(
        "grid shrink-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-3 border-b border-md-primary/15 px-4 py-3",
        "lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:px-5",
      )}
    >
      <div class={cn("flex min-w-0 items-center gap-2")}>
        <span
          aria-hidden="true"
          class={cn(
            "grid size-8 shrink-0 place-items-center rounded-xl bg-md-primary/10 text-md-primary [&_m3e-icon]:text-lg",
          )}
        >
          <Icon name={active?.icon ?? "palette"} />
        </span>
        <h2
          id="section-window-title"
          class={cn(
            "truncate font-cherry text-sm leading-snug text-md-primary",
          )}
        >
          {section ? (titles[section] ?? section) : "Explore"}
        </h2>
      </div>

      <div
        class={cn(
          "col-span-2 row-start-2 min-w-0 overflow-x-auto",
          "lg:col-span-1 lg:col-start-2 lg:row-start-1",
        )}
      >
        <SegmentedButton
          items={sectionItems}
          label="Explore sections"
          activeIndex={Math.max(
            0,
            sections.findIndex((item) => item.title === section),
          )}
          onValueChange={(index) => {
            section = sections[index].title;
          }}
        />
      </div>

      <div
        class={cn(
          "col-start-2 row-start-1 flex items-center justify-end gap-0.5 lg:col-start-3",
        )}
      >
        <button
          type="button"
          aria-label={maximized ? "Restore window" : "Maximize window"}
          aria-pressed={maximized}
          title={maximized ? "Restore window" : "Maximize window"}
          onclick={() => {
            maximized = !maximized;
          }}
          class={cn(
            "window-control group grid size-9 place-items-center rounded-full hover:bg-md-primary/6",
          )}
        >
          <span
            class={cn(
              "grid size-4 place-items-center rounded-full border border-black/10 bg-md-tertiary-container text-md-on-tertiary-container",
            )}
          >
            <span
              aria-hidden="true"
              class={cn(
                "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 [&_m3e-icon]:text-[11px]",
              )}
              ><Icon
                name={maximized ? "close_fullscreen" : "open_in_full"}
              /></span
            >
          </span>
        </button>
        <button
          type="button"
          aria-label="Close window"
          title="Close window (Esc)"
          onclick={close}
          class={cn(
            "window-control group grid size-9 place-items-center rounded-full hover:bg-md-primary/6",
          )}
        >
          <span
            class={cn(
              "grid size-4 place-items-center rounded-full border border-black/10 bg-md-error text-md-on-error",
            )}
          >
            <span
              aria-hidden="true"
              class={cn(
                "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 [&_m3e-icon]:text-xs",
              )}><Icon name="close" /></span
            >
          </span>
        </button>
      </div>
    </header>

    <!-- svelte-ignore a11y_no_noninteractive_tabindex (The scrollable region needs keyboard focus for scrolling.) -->
    <div
      id="section-window-panel"
      role="region"
      aria-labelledby="section-window-title"
      tabindex="0"
      class={cn(
        "min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-8 sm:px-8 sm:py-10",
      )}
    >
      {#if section}
        <div class={cn("mx-auto max-w-3xl text-center")}>
          <p
            class={cn(
              "mb-2 text-[10px] leading-relaxed tracking-[0.16em] text-md-primary uppercase sm:text-xs",
            )}
          >
            <span aria-hidden="true">✦</span>
            {section === "Portfolio"
              ? "My works"
              : section === "Settings"
                ? "Make it yours"
                : section === "Terms"
                  ? "Before we begin"
                  : "Say hello"}
          </p>
          <h3
            class={cn(
              "font-cherry text-3xl leading-tight text-md-primary sm:text-4xl",
            )}
          >
            {titles[section] ?? section}
          </h3>
          <p
            class={cn(
              "mx-auto mt-3 max-w-lg text-sm leading-relaxed text-md-on-surface-variant",
            )}
          >
            {descriptions[section]}
          </p>
        </div>

        {#if section === "Portfolio"}
          <div class={cn("my-8 overflow-x-auto")}>
            <div class={cn("mx-auto w-max")}>
              <SegmentedButton
                items={filterItems}
                label="Filter portfolio"
                activeIndex={filters.indexOf(filter)}
                onValueChange={(index) => {
                  filter = filters[index];
                }}
              />
            </div>
          </div>
          <div
            class={cn(
              "mx-auto grid min-h-64 max-w-3xl place-items-center rounded-3xl border border-dashed border-md-primary/25 bg-md-primary/3 p-8 text-center",
            )}
          >
            <div>
              <span
                aria-hidden="true"
                class={cn(
                  "mx-auto mb-4 grid size-14 place-items-center rounded-2xl bg-md-primary/8 text-md-primary [&_m3e-icon]:text-3xl",
                )}><Icon name="gallery_thumbnail" /></span
              >
              <h4 class={cn("font-cherry text-lg text-md-primary")}>
                {filter === "All works"
                  ? "The gallery is on its way"
                  : `No ${filter.toLowerCase()} projects yet`}
              </h4>
              <p
                class={cn(
                  "mt-2 text-sm leading-relaxed text-md-on-surface-variant",
                )}
              >
                Projects will appear here once they are added.
              </p>
            </div>
          </div>
        {:else if section === "Settings"}
          <ThemeSettingsPanel bind:settings={themeSettings} />
        {:else if section === "Terms"}
          <div
            class={cn(
              "mx-auto mt-8 max-w-xl rounded-3xl border border-md-primary/20 bg-md-primary/4 p-6 sm:p-8",
            )}
          >
            <h4 class={cn("font-cherry text-lg text-md-primary")}>
              Terms haven't been published yet
            </h4>
            <p
              class={cn(
                "mt-3 text-sm leading-loose text-md-on-surface-variant",
              )}
            >
              Payment, revisions, delivery, usage rights, and cancellation
              policies will be listed here before commissions open.
            </p>
          </div>
        {:else if section === "Contact"}
          <div class={cn("mx-auto mt-8 grid max-w-xl gap-3 sm:grid-cols-2")}>
            {#each socialLinks as social}
              <a
                href={social.href}
                aria-disabled={!social.href}
                class={cn(
                  "flex items-center gap-3 rounded-2xl border border-md-primary/20 bg-md-primary/4 p-4 text-md-primary no-underline transition-colors",
                  social.href && "hover:bg-md-primary/10",
                )}
              >
                <span
                  aria-hidden="true"
                  class={cn(
                    "grid size-10 shrink-0 place-items-center rounded-full bg-md-primary/8 [&_m3e-icon]:text-xl",
                  )}
                >
                  {#if social.title === "X"}<span
                      class={cn("font-sans text-lg")}>𝕏</span
                    >{:else}<Icon name={social.icon} />{/if}
                </span>
                <span class={cn("min-w-0")}>
                  <span class={cn("block font-cherry text-sm")}
                    >{social.title}</span
                  >
                  <span
                    class={cn("mt-1 block text-xs text-md-on-surface-variant")}
                    >{social.href ? "Open link ↗" : "Link coming soon"}</span
                  >
                </span>
              </a>
            {/each}
          </div>
        {/if}
      {/if}
    </div>

    <footer
      class={cn(
        "flex shrink-0 items-center justify-between gap-3 border-t border-md-primary/15 bg-md-primary/3 px-4 py-3 sm:px-5",
      )}
    >
      <span
        class={cn(
          "text-[10px] leading-relaxed text-md-on-surface-variant sm:text-xs",
        )}
        >Press <kbd
          class={cn(
            "rounded border border-md-primary/20 px-1 py-0.5 font-sans text-[10px]",
          )}>Esc</kbd
        > to close</span
      >
      <a
        href={orderLink.href}
        aria-disabled={!orderLink.href}
        title={orderLink.href
          ? orderLink.title
          : "VGen link not configured yet"}
        class={cn(
          "inline-flex min-h-9 items-center gap-2 rounded-full bg-md-primary px-4 text-xs text-md-on-primary no-underline transition-colors",
          orderLink.href && "hover:bg-md-primary/85",
        )}
      >
        <span
          aria-hidden="true"
          class={cn("inline-flex [&_m3e-icon]:text-base")}
          ><Icon name={orderLink.icon} /></span
        >{orderLink.title}
      </a>
    </footer>
  </div>
</dialog>

<style>
  .section-window {
    box-sizing: border-box;
    width: min(1120px, calc(100vw - 10rem));
    height: min(820px, calc(100dvh - 10rem));
    max-width: none;
    max-height: none;
    margin: auto;
    padding: 0;
    overflow: hidden;
    border-width: 1px;
    border-radius: 24px;
    transform-origin: center;
    transition:
      width 320ms cubic-bezier(0.22, 1, 0.36, 1),
      height 320ms cubic-bezier(0.22, 1, 0.36, 1),
      border-radius 320ms cubic-bezier(0.22, 1, 0.36, 1);
  }

  .section-window[open] {
    animation: window-in 280ms cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  .section-window[open][data-closing="true"] {
    pointer-events: none;
    animation: window-out 180ms ease-in both;
  }

  .section-window::backdrop {
    background: rgb(0 0 0 / 45%);
    backdrop-filter: blur(6px);
    animation: backdrop-in 280ms ease-out both;
  }

  .section-window[data-closing="true"]::backdrop {
    animation: backdrop-out 180ms ease-in both;
  }

  @keyframes window-in {
    from {
      opacity: 0;
      transform: translateY(16px) scale(0.96);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes window-out {
    from {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    to {
      opacity: 0;
      transform: translateY(10px) scale(0.97);
    }
  }

  @keyframes backdrop-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes backdrop-out {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  .section-window[data-maximized="true"] {
    width: 90vw;
    height: 90dvh;
    border-radius: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    .section-window,
    .section-window[open],
    .section-window[open][data-closing="true"],
    .section-window::backdrop,
    .section-window[data-closing="true"]::backdrop {
      animation: none;
      transition: none;
    }
  }

  @media (max-width: 640px) {
    .section-window {
      width: calc(90vw - 2rem);
      height: calc(80dvh - 3rem);
      border-radius: 20px;
    }

    .section-window[data-maximized="true"] {
      width: 95vw;
      height: 90dvh;
      border-radius: 0;
    }

    .window-control {
      width: 44px;
      height: 44px;
    }
  }
</style>
