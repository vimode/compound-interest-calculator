// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useCallback, useEffect, useRef } from "react";
import { UserQuery } from "../types";
import * as d3 from "d3";

const MARGIN = {
  top: 30,
  right: 15,
  bottom: 50,
  left: 70,
};

// const width = 600;
const height = 400;

type StackedAreaChartProps = {
  chartItem: UserQuery;
};

function StackedAreaChart({ chartItem  }: StackedAreaChartProps) {
  const svgRef = useRef(null);
  const containerRef = useRef(null)

  const drawAreaChart = useCallback(() => {
    const svg = d3.select(svgRef.current);

    // clear previous elements
    svg.selectAll("*").remove();

    // repsonsive hacks :(
    const svgContainer = d3.select(svg.node().parentNode);
    const currentWidth = parseInt(svgContainer.style('width'), 10)

    svg.attr('width', currentWidth)
    const boundedWidth = currentWidth - MARGIN.left - MARGIN.right;
    const boundedHeight = height - MARGIN.top - MARGIN.bottom;

    // Create X and Y Scales
    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(chartItem.details, (d) => d.year))
      .range([0, boundedWidth])
      .nice();

    const yScale = d3
      .scaleLinear()
      .domain([
        chartItem.details[0].initialDeposit -
          chartItem.details[0].initialDeposit * 0.02,
        d3.max(chartItem.details, (d) => d.currentAmount),
      ])
      .range([boundedHeight, 0])
      .nice();

    const areaBuilder = d3
      .area()
      .x((d) => MARGIN.left + xScale(d.year))
      .y(boundedHeight + MARGIN.top)
      .y1((d) => MARGIN.top + yScale(d.currentAmount));

    const areaPath = areaBuilder(chartItem.details);

    const area2Builder = d3
      .area()
      .x((d) => MARGIN.left + xScale(d.year))
      .y(boundedHeight + MARGIN.top)
      .y1((d) => MARGIN.top + yScale(d.initialDeposit));

    const area2Path = area2Builder(chartItem.details);

    // first Gradient
    const areaGradient1 = svg.append('defs')
      .append('linearGradient')
      .attr('id', 'areaGradient1')
      .attr('x1', '0%').attr('y1', '0%')
      .attr('x2', '0%').attr('y2', '100%');

    areaGradient1.append('stop')
      .attr('offset', "0%")
      .attr('stop-color', '#FAD02C')

    areaGradient1.append('stop')
      .attr('offset', "100%")
      .attr('stop-color', "#fef1c2")

    // second Gradient
    const areaGradient2 = svg.append('defs')
      .append('linearGradient')
      .attr('id', 'areaGradient2')
      .attr('x1', '0%').attr('y1','0%')
      .attr('x2', '0%').attr('y2', '100%');

    areaGradient2.append('stop')
      .attr('offset', "0%")
      .attr('stop-color', '#333652')
      .attr('stop-opacity', '0.3')

    areaGradient2.append('stop')
      .attr('offset', "100%")
      .attr('stop-color', 'transparent')

    //path with interestData
    svg
      .append("path")
      .style("fill", "url(#areaGradient1)")
      .attr("d", areaPath);

    // path with initialDeposit
    svg
      .append("path")
      .attr("fill", "url(#areaGradient2)")
      .attr("fill-opacity", 0.8)
      .attr("d", area2Path);

    // x-axis
    const gx = svg
      .append("g")
      .attr(
        "transform",
        `translate(${MARGIN.left}, ${boundedHeight + MARGIN.top})`
      )
      .call(d3.axisBottom(xScale))

    gx.transition()
      .duration(750)
      .call(d3.axisBottom(xScale).ticks(5, "s"))

    // text label
    svg.append("text")
      .attr("transform", `translate(${MARGIN.left + boundedWidth / 2}, ${height - 10})`)
      .style("text-anchor", "middle")
      .text("Year");

    // y-axis
    const gy = svg.append("g")
      .attr("transform", `translate(${MARGIN.left},${MARGIN.top})`)
      .call(d3.axisLeft(yScale));

    gy.transition()
      .duration(750)
      .call(d3.axisLeft(yScale).ticks(5, "~s"));
    
    // text label
    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0)
      .attr("x", 0 - (MARGIN.top + boundedHeight / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Amount");

    //tooltip
    const tooltip = svg
      .append("g")
      .attr("className", "tooltip")
      .style("display", "none");

    tooltip
      .append("rect")
      .attr("width", 220)
      .attr("height", 70)
      .attr("fill", "rgba(0,0,0,0.8)")
      .attr("rx", 5)
      .attr("ry", 5);

    tooltip
      .append("text")
      .attr("x", 10)
      .attr("y", 20)
      .attr("fill", "#fff")
      .text("Year: ");

    tooltip
      .append("text")
      .attr("x", 10)
      .attr("y", 40)
      .attr("fill", "#fff")
      .text("Interest: ");

    tooltip
      .append("text")
      .attr("x", 10)
      .attr("y", 60)
      .attr("fill", "#fff")
      .text("Current Amount: ");

    // data circles
    svg
      .selectAll("circle")
      .data(chartItem.details)
      .join("circle")
      .attr("cx", (d) => MARGIN.left + xScale(d.year))
      .attr("cy", (d) => MARGIN.top + yScale(d.currentAmount))
      .attr("r", 5)
      .attr("fill", "#FAD02C")
      .attr("strokeWidth", 1)
      .attr("stroke", "#333652")
      .style("cursor", "pointer")
      .on("mouseover", (event:MouseEvent, d) => {
        const tooltipWidth = 200;
        const tooltipY = MARGIN.top;
        const tooltipX = (currentWidth - tooltipWidth) / 2;

        tooltip.attr("transform", `translate(${tooltipX}, ${tooltipY})`);
        tooltip.style("font-weight", "bold");
        tooltip.style("display", "block");
        tooltip.select("text:nth-child(2)").text(`Year: ${d.year}`);
        tooltip
          .select("text:nth-child(3)")
          .text(`Interest: ${Number(d.increasingInterest).toFixed(2)}`);
        tooltip
          .select("text:nth-child(4)")
          .text(`Current Amount: ${Number(d.currentAmount).toFixed(2)}`);
      })
      .on("mouseout", () => {
        tooltip.style("display", "none");
      });
  }, [chartItem]);


  useEffect(() => {
     drawAreaChart();
     window.addEventListener('resize',drawAreaChart)
     return () =>  {
      window.removeEventListener('resize',drawAreaChart)
    }
  }, [drawAreaChart]);

  return (
    <section ref={containerRef} className="chart_wrapper">
      <svg  height={height} ref={svgRef}></svg>
    </section>
  );
}
export default StackedAreaChart;
