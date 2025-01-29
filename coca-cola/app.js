// GSAP Timeline
const tl = gsap.timeline({ defaults: { duration: 1, ease: "power2.out" } });

// Animate the logo
tl.fromTo('.logo', { y: -50, opacity: 0 }, { y: 0, opacity: 1 });

// Animate the tagline
tl.fromTo('.tagline', { x: -50, opacity: 0 }, { x: 0, opacity: 1 }, "-=0.5");

// Animate the button
tl.fromTo('.cta-btn', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1 }, "-=0.5");

// Animate the bottle
tl.fromTo('.bottle', { y: 300, opacity: 0 }, { y: 0, opacity: 1 }, "-=0.5");

// Animate the lid 
gsap.to(".lids", {
    rotation: 360,
    duration: 5,
    repeat: -1, // Infinite loop
    ease: "linear",
  });

// Animate the can
gsap.to(".can", {
    rotationY: 360,
    duration: 2,
    repeat: -1, // Infinite loop
    ease: "power1.inOut",
  });

// Animate the sustainabiliy image
gsap.to(".sustainability-img", {
    x: "+=10", // Move 10px right
    yoyo: true,
    repeat: -1,
    duration: 0.2,
  });
  
  
