import performanceData from "./data.js";
const data = performanceData;

const svg = d3.select("svg");
const width = svg.attr("width");
const height = svg.attr("height");

// paints out the bars of the chart
const render = (data, paint) => {
  const xValue = (d) => d.time;
  const yValue = (d) => d.method;
  const margin = { top: 20, left: 200, bottom: 50, right: 80 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, xValue)])
    .range([0, innerWidth]);

  const xAxis = d3.axisBottom(xScale);

  const yScale = d3
    .scaleBand()
    .domain(data.map(yValue))
    .range([0, innerHeight])
    .padding(0.4);

  const yAxis = d3.axisLeft(yScale);

  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`)
    .attr("class","bar-chart");

  g.append("g")
    .attr("class", "y-axis")
    .call(yAxis)
    .selectAll(".domain, .tick line")
    .remove();
  const xAxisGroup = g
    .append("g")
    .attr("class", "x-axis")
    .call(xAxis)
    .attr("transform", `translate(0, ${innerHeight})`);

  xAxisGroup
    .append("text")
    .attr("y", 35)
    .attr("x", innerWidth / 2)
    .text("Time (in Microseconds)")
    .attr("fill", "white");

  const rectangleGroup = g
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("fill", "steelblue")
    .attr("class", (d, i) => `${d.method}`)
    .attr("y", (d) => yScale(yValue(d)))
    .attr("height", yScale.bandwidth());

    // only paint the bars upon a condition such as when data is available otherwise paint till the supporting structure
  if (paint) {
    rectangleGroup.transition().ease(d3.easeLinear).duration(400).
    attr("width", (d) => xScale(xValue(d)));

    g.selectAll(".text")
      .data(data)
      .enter()
      .append("text")
      .attr("x", (d) => xScale(xValue(d)) + 5)
      .attr("y", (d) => yScale(yValue(d)) + 16)
      .text((d) => {
        if (d.time !== null) {
          return d.time.toFixed(0) + "\u00b5s";
        }
        return "";
      })
      .attr("class", "label");
  }

  return xScale;
};

render(data, false);

export { render };
