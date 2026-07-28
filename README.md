# ScrollTrigger on Steroids

A scroll-animation study: a sticky hero section driven by GSAP ScrollTrigger with Lenis smooth scrolling.

As you scroll through four viewport-heights, the pinned section runs a choreographed sequence — split-letter text reveals in the intro columns, image scale/parallax, and staged transitions — all scrubbed to scroll position rather than time.

## Techniques used

- `position: sticky` section pinned for `4 × 100vh` of scroll runway
- GSAP **ScrollTrigger** with scrub, driven by a **Lenis** RAF loop (`lenis.on("scroll", ScrollTrigger.update)`)
- Manual letter-splitting for per-character stagger reveals
- Plain HTML/CSS/JS — no build step

## Running

Serve the folder (fonts/images need HTTP):

```sh
python3 -m http.server 8000
```
