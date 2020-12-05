import React, { useEffect, useState } from 'react';
import { Line, Pie, Bar } from 'react-chartjs-2';
import { genrateHexCode } from '../../helpers';

const LineChart = ({ chartType, label, dataSource }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    const prepareData = () => {
      const dataArray = Object.entries(dataSource);
      let dates = [];
      let amounts = [];
      let bgColor = [];
      dataArray.forEach(([txnDate, amount]) => {
        dates.push(txnDate);
        amounts.push(amount);
        bgColor.push(genrateHexCode());
      });
      setData({
        labels: dates,
        datasets: [
          {
            label,
            data: amounts,
            backgroundColor: bgColor,
          },
        ],
      });
    };
    prepareData();
    // eslint-disable-next-line
  }, [dataSource]);

  const ChartComponent =
    chartType === 'line' ? Line : chartType === 'pie' ? Pie : Bar;
  return (
    <div>
      <ChartComponent
        data={data}
        height={300}
        options={{
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: 'Amount',
                },
              },
            ],
            xAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: 'Transaction Date',
                },
              },
            ],
          },
        }}
      />
    </div>
  );
};

export default LineChart;
