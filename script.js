function toggleEventRadios(passedSection) {
  const allTimelineEvents = document.querySelectorAll(".timeline-events li");
  allTimelineEvents.forEach((timelineEvent) => {
    timelineEvent.classList.remove("toggle-point-off");
  });
  allTimelineEvents.forEach((timelineEventAfter) => {
    if (passedSection >= 0)
      timelineEventAfter.classList.add("toggle-point-off");
    passedSection--;
  });
}
function adjustTimeline(sectionsScrollPositions) {
  const firstSectionScrollPosition = sectionsScrollPositions[0];

  const timelineContentElement = document.querySelector(".timeline-events");

  const currentScrollPosition = document.documentElement.scrollTop;

  let currentSection = 0;
  sectionsScrollPositions.forEach((sectionScrollPosition) => {
    if (
      sectionScrollPosition <=
      firstSectionScrollPosition + currentScrollPosition
    )
      currentSection++;
  });
  currentSection--;

  const currentSectionNextSectionDifference =
    sectionsScrollPositions[currentSection + 1] -
    sectionsScrollPositions[currentSection];
  const timelineScroll =
    currentSection * 350 +
    ((firstSectionScrollPosition +
      currentScrollPosition -
      sectionsScrollPositions[currentSection]) /
      currentSectionNextSectionDifference) *
      350;
  const translateText = `translate(-${timelineScroll}px, 0)`;
  timelineContentElement.style.transform = translateText;
  toggleEventRadios(currentSection);
}

window.addEventListener("load", () => {
  let sectionsScrollPositions = [];
  const allSections = document.querySelectorAll("section:not(.title)");
  allSections.forEach((section) =>
    sectionsScrollPositions.push(section.getBoundingClientRect().top)
  );
  document.addEventListener("scroll", () => {
    adjustTimeline(sectionsScrollPositions);
  });
});
