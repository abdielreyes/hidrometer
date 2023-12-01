import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
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

  useEffect(() => {
    setData((prevData) => {
      const newData = [
        ...prevData,
        {
          name: new Date().toLocaleTimeString(),
          uv: sensorData.current,
          pv: 4300,
          amt: 2100,
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
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineCharts;
