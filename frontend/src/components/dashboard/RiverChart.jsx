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
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
];
const LineCharts = () => {
  const [data, setData] = useState(dataPre);
  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) => {
        const newData = [
          ...prevData,
          {
            name: new Date().toLocaleTimeString(),
            uv: getRandomInt(0, 6000),
            pv: 4300,
            amt: 2100,
          },
        ];
        if (newData.length > 5) {
          newData.shift(); // Eliminar el primer elemento
        }
        console.log("new data added");
        return newData;
      });
    }, 2500);

    // Limpiar el intervalo cuando el componente se desmonta
    return () => clearInterval(interval);
  }, []);

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
