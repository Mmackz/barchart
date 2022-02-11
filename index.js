const height = 400;
const width = 800;
const paddingY = 60;
const paddingX = 100;
let barWidth;

const dataset = [12, 31, 22, 17, 25, 18, 29, 14, 9, 8];

const chartContainer = d3
   .select(".chart")
   .append("svg")
   .attr("width", width + paddingX)
   .attr("height", height + paddingY);

d3.json(
   "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json"
).then(({ data }) => {
   barWidth = width / data.length;

   const dates = data.map((item) => new Date(item[0]));
   const maxDate = d3.max(dates);
   const xAxisScale = d3
      .scaleTime()
      .domain([d3.min(dates), maxDate])
      .range([0, width]);
   const xAxis = d3.axisBottom(xAxisScale);
   chartContainer
      .append("g")
      .call(xAxis)
      .attr("id", "x-axis")
      .attr("transform", "translate(60, 410)");

   // GDP data (y-axis)
   const gdpData = data.map((item) => item[1]);
   const maximum = d3.max(gdpData);
   const scale = d3.scaleLinear().domain([0, maximum]).range([0, height]);
   const scaledData = gdpData.map((item) => scale(item));
   const yAxisScale = d3.scaleLinear().domain([0, maximum]).range([height, 0]);
   const yAxis = d3.axisLeft(yAxisScale);
   chartContainer
      .append("g")
      .call(yAxis)
      .attr("id", "y-axis")
      .attr("transform", "translate(60, 10)");

   d3.select("svg")
      .selectAll("rect")
      .data(scaledData)
      .enter()
      .append("rect")
      .attr("x", (item, i) => xAxisScale(dates[i]))
      .attr("y", (item) => height - item)
      .attr("width", barWidth)
      .attr("height", (item) => item)
      .attr("transform", "translate(60, 10)")
      .attr("fill", "blue")
});
