import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import CustomToolTip from "./CustomToolTip";
import CustomLegend from "./CustomLegend";

const CustomPieChart = ({ data, colors }) => {
  return (
    <>
    
    <ResponsiveContainer width="100%" height={325} >
      <PieChart>
        <Pie 
          data={data}
            dataKey="count"
            nameKey="status"
            cx="50%"
            cy="50%"
            innerRadius={95}
            outerRadius={135}
            paddingAngle={4}
            cornerRadius={12}
            startAngle={90}
            endAngle={-270}
            isAnimationActive
            animationDuration={900}
            animationEasing="ease-out"
            labelLine={false}
            stroke="#ffffff/20"
            strokeWidth={3}
            
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={colors[index % colors.length]}
            />
          ))}
        </Pie>

        <Tooltip content={<CustomToolTip/>}/>
        <Legend content={<CustomLegend/>}/>
      </PieChart>
    </ResponsiveContainer>
  </>)
};

export default CustomPieChart;
