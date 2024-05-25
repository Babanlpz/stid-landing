import gsap from 'gsap';

export function createOutTimeline(split) {
  const tl = gsap.timeline();

  //tl.fromTo(split.country.lines, { y: 0, z: 0 }, { duration: 0.5, y: 40, ease: "out", z: 0 }, 0);
  tl.to(".mapCardCountry", { duration: 0.5, y: 40, ease: "out", z: 0 }, 0);
  tl.fromTo(split.subCountry.lines, { y: 0, z: 0 }, { duration: 0.5, y: 40, ease: "out", z: 0 }, 0);
  tl.fromTo(split.text.lines, { y: 0, z: 0 }, { duration: 0.5, y: 40, ease: "out", z: 0 }, 0);
  tl.fromTo(split.phone.lines, { y: 0, z: 0 }, { duration: 0.5, y: 40, ease: "out", z: 0 }, 0);
  tl.fromTo(split.mail.lines, { y: 0, z: 0 }, { duration: 0.5, y: 40, ease: "out", z: 0 }, 0);

  return tl;
}

export function createInTimeline(split) {
  const tl = gsap.timeline();

  //tl.fromTo(split.country.lines, { y: 40, z: 2 }, { duration: 0.5, y: 0, ease: "out", z: 1 }, 0);
  tl.to(".mapCardCountry", { duration: 0.5, y: 0, ease: "out", z: 0 }, 0);
  tl.fromTo(split.subCountry.lines, { y: 40, z: 2 }, { duration: 0.5, y: 0, ease: "out", z: 1 }, 0);
  tl.fromTo(split.text.lines, { y: 40, z: 2 }, { duration: 0.5, y: 0, ease: "out", z: 1 }, 0);
  tl.fromTo(split.phone.lines, { y: 40, z: 2 }, { duration: 0.5, y: 0, ease: "out", z: 1 }, 0);
  tl.fromTo(split.mail.lines, { y: 40, z: 2 }, { duration: 0.5, y: 0, ease: "out", z: 1 }, 0);

  return tl;
}