import performanceData from "./data.js";
import { render } from "./comparisonGraph.js";

const innerButton = document.getElementById("inner-html");
const newButton = document.getElementById("new-element");
const mixButton = document.getElementById("mix");
const removeButton = document.getElementById("remove-author");

// adding event listeners
innerButton.addEventListener("click", useInnerHtml);
newButton.addEventListener("click", useNewElement);
mixButton.addEventListener("click", useMix);
removeButton.addEventListener("click", removeAuthor);

function useInnerHtml() {
  const element = document.getElementById("content");
  const authorMarkup =
    "<span id='author-name'><em><strong>-Lorem Ipsum</strong></em></span>";
  const performance = window.performance;
  const start = performance.now();
  element.innerHTML += authorMarkup;
  const end = performance.now();
  const timeElapsed = (end - start) * 1000;
  performanceData[0].time = timeElapsed;
  barPainter(".Inner.HTML", timeElapsed);
}

function useNewElement() {
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
  barPainter(".Create.Element", timeElapsed);
}

function useMix() {
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
  barPainter(".Mix", timeElapsed);
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

