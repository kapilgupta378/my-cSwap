import React from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Background from "../background";
import styles from "./styles.module.scss";
const VolumeChart = ({
  data,
  barDataKey,
  XAxisDataKey,
  YAxisDataKey,
  volume,
  ...rest
}) => {
  data;

  return (
    <Background {...rest}>
      <div className={styles.header}>
        <div>
          <p>Volume</p>
          <h2>${volume}</h2>
        </div>
        <div></div>
      </div>

      <div style={{ height: "85%" }} className={styles.barChart_wrap}>
        <ResponsiveContainer>
          <BarChart
            margin={{
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
            }}
            id="barChart"
            data={data}
          >
            <XAxis id="XAxis" dataKey={XAxisDataKey} tickCount={40} />
            <YAxis id="YAxis" dataKey={YAxisDataKey} tickCount={40} />
            <Tooltip />
            <Bar id="bar" tickCount={10} dataKey={barDataKey} fill="#007bff" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Background>
  );
};

export default VolumeChart;
