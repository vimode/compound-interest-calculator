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

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(lastItem.details, d => d.currentAmount)])
      .range([boundedHeight,0])
      .nice()

    // area
    const area = d3.area()
      .x(d => MARGIN.left + xScale(d.year))
      .y(boundedHeight + MARGIN.top)
      .y1(d => MARGIN.top + yScale(d.currentAmount));

    svg.append('path')
      .datum(lastItem.details)
      .attr('fill', 'steelblue')
      .attr('fill-opacity', 0.5)
      .attr('d', area)

    // x-axis
    svg.append('g')
      .attr('transform', `translate(${MARGIN.left}, ${boundedHeight + MARGIN.top})`)
      .call(d3.axisBottom(xScale))
      .append('text')
      .attr('class', 'label')
      .attr('x',boundedWidth)
      .attr('y', -6)
      .style('text-anchor', 'end')
      .text('Year')

    // y-axis
    svg.append('g')
      .attr('transform', `translate(${MARGIN.left},${MARGIN.top})`)
      .call(d3.axisLeft(yScale))
      .append('text')
      .attr('class', 'label')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .text('Current Amount');
  }



  return (
    <div>
      <svg width={width} height={height} ref={svgRef}>

      </svg>
    </div>
  )

}
export default StackedAreaChart;
