import { useRef } from "react";
import * as d3 from "d3"
import { InterestDetails } from "../types";

type DonutChartProps = {
  data: InterestDetails;
}

const WIDTH = 100;
const HEIGHT = 100;
const MARGIN = 20;

function DonutChart ({data}:DonutChartProps) {

  const svgRef = useRef(null)

  const radius = Math.min(WIDTH,HEIGHT) / 2 - MARGIN;
  const colors = ['#FAD02C', '#333652']

  const pieData = [data.increasingInterest, data.currentAmount]
  const pieGenerator = d3.pie().padAngle(0.5)
  const pie = pieGenerator(pieData);

  const arcPathGenerator = d3.arc();
  const arcs =  pie.map((p) => 
    arcPathGenerator({
      innerRadius:50,
      outerRadius:radius,
      startAngle: p.startAngle,
      endAngle: p.endAngle
    })
  )

  return (
    <svg width={WIDTH} height={HEIGHT} ref={svgRef}>
        <g transform={`translate(${WIDTH/ 2}, ${HEIGHT / 2})`}>
          {arcs.map((arc, i) => {
            return <path key={i} d={arc} fill={colors[i]}/>;
          })}
        </g>
    </svg>
  )
}

export default DonutChart;
