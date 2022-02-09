const height = 400;
const width = 800;
const paddingY = 60;
const paddingX = 100;
let barWidth;

const dataset = [12, 31, 22, 17, 25, 18, 29, 14, 9];

const chartContainer = d3
   .select(".chart")
   .append("svg")
   .attr("width", width + paddingX)
   .attr("height", height + paddingY);

d3.json(
   "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json"
).then((data) => {
   barWidth = width / data.data.length;
   const gdpData = data.data.map((item) => item[1]);
   console.log(gdpData);
   const maximum = d3.max(gdpData);
   console.log(maximum);
   const scale = d3.scaleLinear().domain([0, maximum]).range([0, height]);
   const scaledData = gdpData.map((item) => scale(item));
   console.log(scaledData);
   const yAxisScale = d3.scaleLinear().domain([0, maximum]).range([height, 0]);
   const yAxis = d3.axisLeft(yAxisScale);

   chartContainer.append("g").call(yAxis).attr("id", "y-axis").attr("transform", "translate(60, 10)");
   d3.select("svg").selectAll("rect").data(scaledData).enter().append("rect").attr
});
