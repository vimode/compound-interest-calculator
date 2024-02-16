import { useEffect, useRef } from "react";
import { UserQuery } from "../types";
import * as d3 from 'd3';


const MARGIN = {
  top: 20,
  right: 20,
  bottom: 30,
  left: 40
};

const width = 600;
const height= 400;


type StackedAreaChartProps = {
  data: UserQuery[]
}

function StackedAreaChart ({data}:StackedAreaChartProps) {

  const svgRef = useRef(null)

  const lastItem = data.slice(-1)[0]

  useEffect(() => {
    if(data && data.length > 0) {
      drawAreaChart();
    }
  },[data])


  const boundedWidth = width - MARGIN.left - MARGIN.right;
  const boundedHeight = height - MARGIN.top - MARGIN.bottom;

  const drawAreaChart = () => {
    const svg = d3.select(svgRef.current)

    // clear previous elements
    svg.selectAll('*').remove()

    // Create X and Y Scales
    const xScale = d3.scaleLinear()
      .domain(d3.extent(lastItem.details, d => d.year))
      .range([0, boundedWidth])
      .nice()

    const yScale = d3.scaleLinear()
      .domain([lastItem.details[0].initialDeposit - (lastItem.details[0].initialDeposit * 0.02) , d3.max(lastItem.details, d => d.currentAmount)])
      .range([boundedHeight,0])
      .nice()

    const areaBuilder = d3.area()
      .x(d => MARGIN.left + xScale(d.year))
      .y(boundedHeight + MARGIN.top)
      .y1(d => MARGIN.top + yScale(d.currentAmount));

    const areaPath = areaBuilder(lastItem.details)

    const area2Builder = d3.area()
      .x(d => MARGIN.left + xScale(d.year))
      .y(boundedHeight + MARGIN.top)
      .y1(d => MARGIN.top + yScale(d.initialDeposit));

    const area2Path = area2Builder(lastItem.details)
    
    svg.append('path')
      .attr('fill', '#333652')
      .attr('fill-opacity', 0.5)
      .attr('d',areaPath)

    svg.append('path')
      .attr('fill', '#FAD02C')
      .attr('fill-opacity', 0.8)
      .attr('d',area2Path)

    // x-axis
    svg.append('g')
      .attr('transform', `translate(${MARGIN.left}, ${boundedHeight + MARGIN.top})`)
      .call(d3.axisBottom(xScale).ticks(5, 's'))
      .append('text')
      .attr('class', 'label')
      .attr('x',boundedWidth)
      .attr('y', -6)
      .style('text-anchor', 'end')
      .text('Year')

    // y-axis
    svg.append('g')
      .attr('transform', `translate(${MARGIN.left},${MARGIN.top})`)
      .call(d3.axisLeft(yScale).ticks(5, '~s'))
      .append('text')
      .attr('class', 'label')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .text('Current Amount');


    svg.selectAll("circle")
      .data(lastItem.details)
      .join('circle')
      .attr('cx', d => MARGIN.left + xScale(d.year))
      .attr('cy', d => MARGIN.top + yScale(d.currentAmount))
      .attr('r',  6)
      .attr('fill', '#FAD02C')
      .attr('stroke-width',1)
      .attr('stroke', "#333652")

  }



  return (
    <section className="chart_wrapper">
      <svg width={width} height={height} ref={svgRef}>

      </svg>
    </section>
  )

}
export default StackedAreaChart;
