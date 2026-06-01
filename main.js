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

// --- Section 4.5: Text Effects ---
let tlText = gsap.timeline({
    scrollTrigger: {
        trigger: "#text-effects-section",
        start: "top center",
        end: "bottom center",
        scrub: 1, // smooth scrubbing
    }
});

tlText.to(".dynamic-text", {
    fontWeight: 900,
    fontSize: "6rem",
    color: "#38bdf8", // changes to accent color
    letterSpacing: "10px",
    textShadow: "0px 0px 20px rgba(56, 189, 248, 0.8)",
    duration: 1
}, 0)
.to(".dynamic-subtext", {
    fontWeight: 700,
    color: "#ffffff",
    fontStyle: "italic",
    scale: 1.2,
    duration: 1
}, 0);

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

// --- NEW SECTION 1: Velocity Skewing ---
let proxy = { skew: 0 },
    skewSetter = gsap.quickSetter(".skew-elem", "skewY", "deg"),
    clamp = gsap.utils.clamp(-20, 20); 

ScrollTrigger.create({
  onUpdate: (self) => {
    let skew = clamp(self.getVelocity() / -300);
    if (Math.abs(skew) > Math.abs(proxy.skew)) {
      proxy.skew = skew;
      gsap.to(proxy, {skew: 0, duration: 0.8, ease: "power3", overwrite: true, onUpdate: () => skewSetter(proxy.skew)});
    }
  }
});
gsap.set(".skew-elem", {transformOrigin: "center center", force3D: true});

// --- NEW SECTION 2: Parallax Background ---
gsap.to(".parallax-bg", {
    backgroundPosition: `50% ${-window.innerHeight / 2}px`,
    ease: "none",
    scrollTrigger: {
      trigger: ".parallax-bg",
      start: "top bottom", 
      end: "bottom top",
      scrub: true
    }
});

// --- NEW SECTION 3: Staggered Grid ---
gsap.to(".grid-item", {
    y: 0,
    opacity: 1,
    duration: 0.8,
    stagger: 0.2,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#stagger-section",
        start: "top 70%",
        toggleActions: "play none none reverse"
    }
});

// --- NEW SECTION 4: SVG Path Drawing ---
let path = document.querySelector(".draw-svg path");
let length = path.getTotalLength();
gsap.set(path, {strokeDasharray: length, strokeDashoffset: length});
gsap.to(path, {
    strokeDashoffset: 0,
    ease: "none",
    scrollTrigger: {
        trigger: "#svg-section",
        start: "top center",
        end: "bottom center",
        scrub: 1
    }
});

// --- NEW SECTION 5: Text Mask Reveal ---
gsap.to(".mask-text", {
    y: 0,
    duration: 1,
    ease: "power4.out",
    scrollTrigger: {
        trigger: "#mask-section",
        start: "top 70%",
        toggleActions: "play none none reverse"
    }
});

// --- NEW SECTION 6: Zoom/Scale Hero ---
gsap.to(".zoom-image", {
    scale: 3,
    ease: "none",
    scrollTrigger: {
        trigger: "#zoom-section",
        start: "top top",
        end: "+=1000",
        pin: true,
        scrub: 1
    }
});

// --- NEW SECTION 7: Color Theme Transition ---
ScrollTrigger.create({
    trigger: "#color-section",
    start: "top 50%",
    end: "bottom 50%",
    onEnter: () => gsap.to("body", {backgroundColor: "#fef08a", color: "#1e293b", duration: 0.5}),
    onLeave: () => gsap.to("body", {backgroundColor: "#0f172a", color: "#f8fafc", duration: 0.5}),
    onEnterBack: () => gsap.to("body", {backgroundColor: "#fef08a", color: "#1e293b", duration: 0.5}),
    onLeaveBack: () => gsap.to("body", {backgroundColor: "#0f172a", color: "#f8fafc", duration: 0.5})
});

// --- NEW SECTION 8: 3D Flip Cards ---
gsap.to(".flip-card", {
    rotationY: 180,
    duration: 1,
    ease: "power2.inOut",
    scrollTrigger: {
        trigger: "#flip-section",
        start: "top center",
        end: "bottom center",
        scrub: true
    }
});

// --- NEW SECTION 9: Morphing Shape ---
gsap.to(".morph-box", {
    borderRadius: "50% 20% / 10% 40%",
    rotation: 360,
    ease: "none",
    scrollTrigger: {
        trigger: "#morph-section",
        start: "top center",
        end: "bottom center",
        scrub: 1
    }
});

// --- NEW SECTION 10: Text Highlighting ---
gsap.to(".highlight", {
    backgroundSize: "100% 100%",
    ease: "none",
    scrollTrigger: {
        trigger: "#highlight-section",
        start: "top 80%",
        end: "top 20%",
        scrub: true
    }
});

// --- PROGRESS BAR ---
gsap.to(".progress-bar", {
    width: "100%",
    ease: "none",
    scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: true
    }
});
