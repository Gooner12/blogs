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
  // removeAuthor();
  const element = document.getElementById("content");
  const authorMarkup =
    "<span id='author-name'><em><strong>-Lorem Ipsum</strong></em></span>";
  const performance = window.performance;
  const start = performance.now();
  element.innerHTML += authorMarkup;
  const end = performance.now();
  const timeElapsed = (end - start) * 1000;
  performanceData[0].time = timeElapsed;
  // making the elpased time fit to the width of the bar chart
  const xScale = render(performanceData, false);
  d3.select(".Inner.HTML")
    .transition()
    .ease(d3.easeLinear)
    .duration(Math.min(timeElapsed, 1000))
    .attr("width", xScale(timeElapsed));
  setTimeout(() => {render(performanceData, true)}, Math.min(timeElapsed, 1000));
}

function useNewElement() {
  // removeAuthor();
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
  const xScale = render(performanceData, false);
  d3.select(".Create.Element")
    .transition()
    .ease(d3.easeLinear)
    .duration(timeElapsed)
    .attr("width", xScale(timeElapsed));
  setTimeout(() => {render(performanceData, true)}, timeElapsed);
}

function useMix() {
  // removeAuthor();
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
  const xScale = render(performanceData, false);
  d3.select(".Mix")
    .transition()
    .ease(d3.easeLinear)
    .duration(timeElapsed)
    .attr("width", xScale(timeElapsed));
  setTimeout(() => {render(performanceData, true)}, timeElapsed);
}

function removeAuthor() {
  const authorElement = document.getElementById("author-name");
  if (authorElement) {
  const element = document.getElementById("content");
  element.removeChild(authorElement);
  }
  return;
}

