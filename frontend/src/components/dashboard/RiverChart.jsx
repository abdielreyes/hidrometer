import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import randomColor from "randomcolor";
const dataPre = [
  {
    name: new Date().toLocaleTimeString(),
    uv: 0,
    pv: 0,
    amt: 0,
  },
];
const max = 5;
const LineCharts = ({ sensorData }) => {
  const [data, setData] = useState(dataPre);
  const [color] = useState(randomColor({ luminosity: "dark" }));
  useEffect(() => {
    setData((prevData) => {
      const newData = [
        ...prevData,
        {
          name: new Date().toLocaleTimeString(),
          uv: sensorData.current_avg || sensorData.current,
        },
      ];
      if (newData.length > max) {
        newData.shift(); // Eliminar el primer elemento
      }
      return newData;
    });

    // Limpiar el intervalo cuando el componente se desmonta
  }, [sensorData]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <Line type="monotone" dataKey="uv" stroke={color} />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineCharts;
