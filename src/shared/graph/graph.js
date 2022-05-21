import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
export default function Graph({ data }) {
  return (
    <ResponsiveContainer width="100%" aspect={3} className="container mt-5">
      <BarChart
        width={730}
        height={250}
        data={data || {}}
        margin={{ top: 15, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tickFormatter={(value) => value}>
          {/* <Label value="Course Outcome" offset={0} position="insideBottom" /> */}
        </XAxis>
        <YAxis
          label={{
            value: "Percentage",
            angle: -90,
            position: "insideLeft",
            textAnchor: "middle",
          }}
          tickFormatter={(value) => value + "%"}
        />
        <Tooltip cursor={{ strokeWidth: 2 }} />
        <Bar dataKey="percentage" barSize={30} fill="#8884d8">
          <LabelList dataKey="percentage" position="top" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
