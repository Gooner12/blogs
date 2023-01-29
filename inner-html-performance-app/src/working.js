import performanceData from "./data.js";
import { render } from "./comparisonGraph.js";

const compareButton = document.getElementById("comparator");

// adding event listeners
compareButton.addEventListener("click", compareMethods);

function compareMethods() {
  d3.selectAll(".bar-chart").remove();
  useInnerHtml();
  useNewElement();
  useMix();
  render(performanceData, true);
}

function useInnerHtml() {
  removeAuthor();
  const element = document.getElementById("content");
  const authorMarkup =
    "<span id='author-name'><em><strong>-Lorem Ipsum</strong></em></span>";
  const performance = window.performance;
  const start = performance.now();
  element.innerHTML += authorMarkup;
  const end = performance.now();
  const timeElapsed = (end - start) * 1000;
  performanceData[0].time = timeElapsed;
}

function useNewElement() {
  removeAuthor();
  const element = document.getElementById("content");
  const span = document.createElement("span");
  span.id = "author-name";
  element.appendChild(span);
  const performance = window.performance;
  const start = performance.now();
  const italic = document.createElement("em");
  const bold = document.createElement("strong");
  italic.appendChild(bold);
  bold.textContent = "-Lorem Ipsum";
  span.appendChild(italic);
  const end = performance.now();
  const timeElapsed = (end - start) * 1000;
  performanceData[1].time = timeElapsed;
}

function useMix() {
  removeAuthor();
  const element = document.getElementById("content");
  const authorMarkup = "<em><strong>-Lorem Ipsum</strong></em>";
  const span = document.createElement("span");
  span.id = "author-name";
  element.appendChild(span);
  const performance = window.performance;
  const start = performance.now();
  span.innerHTML = authorMarkup;
  const end = performance.now();
  const timeElapsed = (end - start) * 1000;
  performanceData[2].time = timeElapsed;
}

function removeAuthor() {
  const authorElement = document.getElementById("author-name");
  if (authorElement) {
  const element = document.getElementById("content");
  element.removeChild(authorElement);
  }
  return;
}

function barPainter(className, time) {
  // making the elapsed time fit to the width of the bar chart
  const xScale = render(performanceData, false);
  d3.select(className)
    .transition()
    .ease(d3.easeLinear)
    .duration(Math.min(time, 1000))
    .attr("width", xScale(time));
  setTimeout(() => {render(performanceData, true)}, Math.min(time, 1000));
}

