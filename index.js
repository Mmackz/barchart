const height = 400;
const width = 800;
const paddingY = 60;
const paddingX = 100;

d3.select(".chart")
   .append("h1")
   .text("United States GDP")
   .attr("class", "title")
   .attr("id", "title");

const chartContainer = d3
   .select(".chart")
   .append("svg")
   .attr("width", width + paddingX)
   .attr("height", height + paddingY);

d3.json(
   "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json"
).then(({ data }) => {
   const barWidth = width / data.length;

   // Dates (x-axis)
   const dates = data.map((item) => new Date(item[0]));
   const maxDate = d3.max(dates);
   maxDate.setMonth(maxDate.getMonth() + 3);
   const xAxisScale = d3
      .scaleTime()
      .domain([d3.min(dates), maxDate])
      .range([0, width]);
   const xAxis = d3.axisBottom(xAxisScale);
   chartContainer
      .append("g")
      .call(xAxis)
      .attr("id", "x-axis")
      .attr("transform", `translate(60, ${height + 10})`)

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

   chartContainer
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -210)
      .attr("y", 80)
      .attr("class", "y-label")
      .text("Gross Domestic Product");

   chartContainer
      .append("text")
      .attr("x", 380)
      .attr("y", 450)
      .attr("class", "x-label")
      .text("More Information: http://www.bea.gov/national/pdf/nipaguid");

   // data bars
   d3.select("svg")
      .selectAll("rect")
      .data(scaledData)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (item, i) => xAxisScale(dates[i]))
      .attr("y", (item) => height - item)
      .attr("width", barWidth)
      .attr("height", (item) => item)
      .attr("data-date", (item, i) => data[i][0])
      .attr("data-gdp", (item, i) => data[i][1])
      .attr("index", (item, i) => i)
      .attr("transform", "translate(60, 10)")
      .attr("fill", "blue")
      .on("mouseover", function (event, data) {
         console.log(event);
         const date = this.getAttribute("data-date");
         const amount = this.getAttribute("data-gdp");
         const index = this.getAttribute("index");
         const [year, month] = date.split("-");
         const quarter = month === "01" ? "Q1" : month === "04" ? "Q2" : month === "07" ? "Q3" : "Q4";
         d3.select("#tooltip")
            .style("opacity", "0.9")
            .style("left", `${barWidth * index + 100}px`)
            .attr("data-date", date)
            .html(`<p class="tt-date">${year} ${quarter}</p>
                   <p class="tt-amount">${amount} Billion</p>`)

      })
      .on("mouseout", function (event, data) {
         d3.select("#tooltip").style("opacity", "0")
      })

      d3.select(".bar:last-of-type").attr("transform", `translate(${60 - barWidth}, 10)`)
});
