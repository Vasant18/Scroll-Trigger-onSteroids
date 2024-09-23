
document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);
    const stickySection = document.querySelector(".sticky");
    const totalStickyHeight = window.innerHeight * 4;
    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Helper function: split text letters.
    const introParagraphs = document.querySelectorAll(".intro-col p");
    introParagraphs.forEach((paragraph) => {
        const text = paragraph.textContent;
        paragraph.innerHTML = text.split(/(\s+)/).map((part) => {
            if (part.trim() === "") {
                return part;
            } else {
                return part.split("").map(
                    (char) =>
                        `<span style="opacity: 0; display: inline-block;">${char}</span>`
                ).join("");
            }
        }).join("");
    });

    // Flicker animation for the intro text
    function flickerAnimation(targets, toOpacity) {
        gsap.to(targets, {
            opacity: toOpacity,
            duration: 0.05,
            stagger: {
                amount: 0.3,
                from: "random",
            },
        });
    }

    ScrollTrigger.create({
        trigger: stickySection,
        start: "top top",
        end: () => `${window.innerHeight * 3}`,
        onEnter: () => flickerAnimation(".intro-col p span", 1),
        onLeave: () => flickerAnimation(".intro-col p span", 0),
        onEnterBack: () => flickerAnimation(".intro-col p span", 1),
        onLeaveBack: () => flickerAnimation(".intro-col p span", 0),
    });

    // Pin the sticky section
    ScrollTrigger.create({
        trigger: stickySection,
        start: "top top",
        end: () => `+=${totalStickyHeight}`,
        pin: true,
        pinSpacing: true,
    });

    // Scale img-1
    gsap.to(".img-1 img", {
        scale: 1.125,
        ease: "none",
        scrollTrigger: {
            trigger: stickySection,
            start: "top top",
            end: () => `+=${window.innerHeight}`,
            scrub: true,
        },
    });

    // Animate img-2's clip-path
    gsap.to(".img-2", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        ease: "none",
        scrollTrigger: {
            trigger: stickySection,
            start: "top top",
            end: () => `+=${window.innerHeight}`,
            scrub: true,
            onUpdate: (self) => {
                const progress = self.progress;
                gsap.set(".img-2", {
                    clipPath: `polygon(
                        ${gsap.utils.interpolate(40, 0, progress)}% ${gsap.utils.interpolate(25, 0, progress)}%,
                        ${gsap.utils.interpolate(60, 100, progress)}% ${gsap.utils.interpolate(25, 0, progress)}%,
                        ${gsap.utils.interpolate(60, 100, progress)}% ${gsap.utils.interpolate(75, 100, progress)}%,
                        ${gsap.utils.interpolate(40, 0, progress)}% ${gsap.utils.interpolate(75, 100, progress)}%
                    )`,
                });
            },
        },
    });

    // Scale img-2
    gsap.to(".img-2 img", {
        scale: 1.125,
        ease: "none",
        scrollTrigger: {
            trigger: stickySection,
            start: "top top",
            end: () => `+=${window.innerHeight}`,
            scrub: true,
        },
    });

    // Animate img-3's clip-path

    gsap.to(".img-3", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        ease: "none",
        scrollTrigger: {
            trigger: stickySection,
            start: () => `${window.innerHeight * 3}`,
            end: () => `${window.innerHeight * 4}`,
            scrub: true,
            onUpdate: (self) => {
                const progress = self.progress;
                console.log("img-3 progress:", progress); // Debugging log
                gsap.set(".img-3", {
                    clipPath: `polygon(
                        ${gsap.utils.interpolate(50, 0, progress)}% ${gsap.utils.interpolate(50, 0, progress)}%,
                        ${gsap.utils.interpolate(50, 0, progress)}% ${gsap.utils.interpolate(50, 0, progress)}%,
                        ${gsap.utils.interpolate(50, 0, progress)}% ${gsap.utils.interpolate(50, 0, progress)}%,
                        ${gsap.utils.interpolate(50, 0, progress)}% ${gsap.utils.interpolate(50, 0, progress)}%
                    )`,
                });
            },
        },
    });      

    // Continue img-2's scale
    gsap.fromTo(".img-2 img", {
        scale: 1.125
    }, {
        scale: 1.25,
        ease: "none",
        scrollTrigger: {
            trigger: stickySection,
            start: () => `${window.innerHeight * 3}`,
            end: () => `${window.innerHeight * 4}`,
            scrub: true
        },
    });

    // Scale down img-3
    gsap.to(".img-3 img", {
        scale: 2.9,
        ease: "none",
        scrollTrigger: {
            trigger: stickySection,
            start: () => `${window.innerHeight * 3}`,
            end: () => `${window.innerHeight * 4}`,
            scrub: true,
        },
    });

    // Reset img-3's scale (zoom out)
    gsap.fromTo(".img-3 img", {
        scale: 2.9,
    }, {
        scale: 1,
        ease: "none",
        scrollTrigger: {
            trigger: stickySection,
            start: () => `${window.innerHeight * 4}`,
            end: () => `${window.innerHeight * 6}`,
            scrub: true,
        },
    });

    // Final copy animation
    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: stickySection,
            start: () => `${window.innerHeight * 4.5}`,
            end: () => `${window.innerHeight * 5.5}`,
            scrub: true,
            toggleActions: "play reverse play reverse",
        },
    });
    tl.to(".copy", {
        display: "block",
        rotateY: 0,
        scale: 1,
        duration: 1
    });
});