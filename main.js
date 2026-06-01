// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// --- Section 1: Hero Animation ---
// Play on load
gsap.to(".hero-subtitle", {
    opacity: 1,
    y: 0,
    duration: 1.5,
    delay: 0.5,
    ease: "power3.out"
});
gsap.to(".scroll-indicator", {
    opacity: 1,
    duration: 1,
    delay: 1.5
});

// Fade out hero on scroll
gsap.to(".hero-title", {
    scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true
    },
    y: 150,
    opacity: 0
});

// --- Section 2: Basic Scrubbing ---
gsap.to(".scrub-box", {
    scrollTrigger: {
        trigger: "#scrub-section",
        start: "top center", // when the top of the trigger hits the center of the viewport
        end: "bottom center", // when the bottom of the trigger hits the center of the viewport
        scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
    },
    x: 400,
    rotation: 360,
    borderRadius: "50%",
    backgroundColor: "#ec4899", // animate color
});

// --- Section 3: Pinning ---
ScrollTrigger.create({
    trigger: "#pin-section",
    start: "top top", 
    end: "+=1500", // pin for 1500px of scrolling
    pin: true,
    animation: gsap.to(".pin-image", {
        rotationY: 360,
        scale: 1.2,
        duration: 1,
        ease: "none"
    }),
    scrub: true
});

// Animate the text in the pin section while it's pinned
gsap.from(".pin-text", {
    scrollTrigger: {
        trigger: "#pin-section",
        start: "top center",
        end: "center center",
        scrub: true
    },
    x: -100,
    opacity: 0
});

// --- Section 4: Toggle Actions ---
const cards = gsap.utils.toArray('.toggle-card');
cards.forEach((card, i) => {
    gsap.to(card, {
        scrollTrigger: {
            trigger: card,
            start: "top 80%", // when top of card hits 80% down the viewport
            toggleActions: "play none none reverse", // play on enter, reverse on leave back
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
        delay: i * 0.2 // stagger effect
    });
});

// --- Section 5: Snapping (Handled partly by CSS scroll-snap, but here is GSAP snap) ---
// We can use ScrollTrigger snapping for panels if we remove CSS scroll-snap.
// Let's use GSAP for a custom snap on a timeline instead, or just keep CSS for Section 5 and use GSAP for Section 6.
// For demonstration, let's animate the text inside the snap panels
gsap.utils.toArray('.snap-panel').forEach(panel => {
    gsap.to(panel.querySelector('h2'), {
        scrollTrigger: {
            trigger: panel,
            start: "top center",
            toggleActions: "play reverse play reverse"
        },
        opacity: 1,
        scale: 1.5,
        duration: 0.5
    });
});

// --- Section 6: Horizontal Scroll ---
let sections = gsap.utils.toArray(".horizontal-panel");

gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    ease: "none",
    scrollTrigger: {
        trigger: "#horizontal-section",
        pin: true,
        scrub: 1,
        snap: 1 / (sections.length - 1),
        // base vertical scrolling on how wide the container is so it feels more natural.
        end: () => "+=" + document.querySelector(".horizontal-container").offsetWidth
    }
});
