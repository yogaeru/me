<script lang="ts">
  import { cn } from "cn";
  import Icon from "./components/ui/Icon.svelte";
  import Theme from "./components/ui/Theme.svelte";
  import HeroShapes from "./components/HeroShapes.svelte";
  import SectionWindow from "./components/SectionWindow.svelte";
  import { defaultThemeSettings, type ThemeSettings } from "./lib/theme";

  let activeSection = $state<string | null>(null);

  interface CardContent {
    title: string;
    icon: string;
    href?: string;
  }

  let themeSettings = $state<ThemeSettings>({ ...defaultThemeSettings });

  const cardContent: CardContent[] = [
    {
      title: "Portfolio",
      icon: "palette",
    },
    {
      title: "Terms",
      icon: "description",
    },
    {
      title: "Contact",
      icon: "chat_bubble_outline",
    },
    {
      title: "Settings",
      icon: "settings",
    },
  ];

  // Add href values to enable these links once the destinations are ready.
  const orderLink: CardContent = {
    title: "See on Github",
    icon: "shopping_cart",
  };

  const socialLinks: CardContent[] = [
    { title: "Instagram", icon: "photo_camera" },
    { title: "GitHub", icon: "code" },
    { title: "Email", icon: "mail_outline" },
  ];
</script>

<Theme {...themeSettings}>
  <div
    class={`bg-grid ${cn(
      "flex flex-col",
      "min-h-dvh",
      "bg-md-surface text-md-on-surface",
      "relative isolate",
    )}`}
  >
    <HeroShapes shapeCount={15} />

    <main id="main" class="flex flex-1 flex-col">
      <section id="hero" class={cn("flex flex-1 justify-center items-center")}>
        <div
          class={cn(
            "flex flex-row items-center justify-center",
            "min-w-[95dvw] min-h-[90dvh] md:min-w-[85dvw] md:min-h-[85dvh] lg:min-w-[60dvw] lg:min-h-[70dvh]",
            "p-4",
            // "border border-green-400",
            // "overflow-hidden",
          )}
        >
          <div class={cn("flex flex-col gap-2")}>
            <!-- Badge -->
            <div class={cn("flex flex-row gap-2 mb-10")}>
              <!-- Role -->
              <span class="bg-md-on-secondary py-1 px-2 text-xs rounded-full">
                Developer
              </span>

              <span class="bg-md-on-tertiary py-1 px-2 text-xs rounded-full">
                Welcome To My Space
              </span>
            </div>

            <span class="font-bold"> Hello There I'm </span>

            <!-- Name  -->
            <h1
              class={cn(
                "relative -mt-4 lg:-mt-10 mb-2  w-fit leading-none tracking-[-6px] lg:tracking-[-12px]",
                "text-[clamp(48px,7vw,96px)] text-md-primary font-one font-extrabold",
              )}
            >
              yogaeru
              <span
                class="absolute -top-4 -right-2 text-3xl tracking-normal"
                aria-hidden="true">✦</span
              >
              <!-- <span class="text-md-tertiary">.</span> -->
            </h1>

            <!-- Introduction -->
            <p
              class="text-lg leading-[1.6] font-semibold max-[480px]:text-[17px]"
            >
              A little design. A little code.
            </p>
            <p
              class="text-sm max-w-100 leading-[1.8] text-md-on-surface-variant max-[760px]:mx-auto"
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. In eaque
              sed laudantium voluptatem quas nihil consequuntur, mollitia iusto
              rem voluptas aspernatur eos nisi deserunt adipisci recusandae,
              officiis odio a consequatur!
            </p>

            <!-- Cards -->
            <div
              class={cn(
                "mt-3 grid w-full max-w-100 grid-cols-2 md:grid-cols-4 gap-2",
              )}
            >
              {#each cardContent as card}
                <button
                  type="button"
                  aria-haspopup="dialog"
                  onclick={() => {
                    activeSection = card.title;
                  }}
                  title={`Open ${card.title}`}
                  class={cn(
                    "group relative flex min-h-15 flex-col items-center justify-center overflow-hidden",
                    "rounded-2xl border border-md-primary/20 bg-md-primary/4 px-3 py-1.5 text-md-primary no-underline",
                    "transition-colors duration-200 hover:border-md-primary/40 focus-visible:border-md-primary/40",
                  )}
                >
                  <span
                    aria-hidden="true"
                    class={cn(
                      "pointer-events-none absolute inset-0 bg-md-primary/8 opacity-0",
                      "transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100",
                    )}
                  ></span>

                  <div
                    class={cn(
                      "relative flex flex-col items-center justify-center gap-1",
                    )}
                  >
                    <span
                      class={cn(
                        "grid size-6 shrink-0 place-items-center rounded-full",
                        "bg-md-primary/8 text-md-primary [&_m3e-icon]:text-[15px]",
                        "transition-colors duration-200 group-hover:bg-md-primary/16 group-focus-visible:bg-md-primary/16",
                      )}
                    >
                      <Icon name={card.icon} />
                    </span>

                    <span
                      class={cn(
                        "text-center font-cherry text-xs leading-tight font-normal tracking-normal",
                        "transition-colors duration-200 group-hover:text-md-primary",
                      )}
                    >
                      {card.title}
                    </span>
                  </div>
                </button>
              {/each}
            </div>

            <!-- SNS -->
            <nav
              aria-label="Social links"
              class={cn(
                "grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-4",
                // "border border-t-cyan-300"
              )}
            >
              <a
                href={orderLink.href}
                aria-disabled={!orderLink.href}
                title={orderLink.href
                  ? orderLink.title
                  : "VGen link not configured yet"}
                class={cn(
                  "inline-flex min-h-8 shrink-0 items-center justify-center gap-1.5 rounded-full px-3",
                  "bg-md-primary text-xs leading-none text-md-on-primary no-underline [&_m3e-icon]:text-base",
                  "transition-colors duration-200 hover:bg-md-primary/85 focus-visible:bg-md-primary/85",
                )}
              >
                <span aria-hidden="true"><Icon name={orderLink.icon} /></span>
                {orderLink.title}
              </a>

              <div class="flex flex-row gap-1 justify-around">
                {#each socialLinks as social}
                  <a
                    href={social.href}
                    aria-label={social.title}
                    aria-disabled={!social.href}
                    title={social.href
                      ? social.title
                      : `${social.title} — link not configured yet`}
                    class={cn(
                      "grid size-8 shrink-0 place-items-center rounded-full border border-md-primary/20",
                      "bg-md-primary/4 text-md-primary no-underline [&_m3e-icon]:text-base",
                      "transition-colors duration-200 hover:border-md-primary/40 hover:bg-md-primary/12 focus-visible:bg-md-primary/12",
                    )}
                  >
                    <span
                      aria-hidden="true"
                      class={cn("grid place-items-center")}
                    >
                      {#if social.title === "X"}
                        <svg
                          viewBox="0 0 24 24"
                          class={cn("size-3.5 fill-current")}
                        >
                          <path
                            d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.6 5.5 22H2.3l7.3-8.5L1.8 2h6.5l4.5 6.8L18.9 2Zm-1.1 18h1.7L7.4 3.9H5.6L17.8 20Z"
                          />
                        </svg>
                      {:else}
                        <Icon name={social.icon} />
                      {/if}
                    </span>
                  </a>
                {/each}
              </div>
            </nav>
          </div>
        </div>
      </section>
    </main>
  </div>

  <SectionWindow
    bind:section={activeSection}
    bind:themeSettings
    sections={cardContent}
    {orderLink}
    {socialLinks}
  />
</Theme>
