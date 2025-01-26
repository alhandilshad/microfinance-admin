"use client";

import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function ApexChart() {
  const [isLoaded, setIsLoaded] = useState(false);
  const options = {
    chart: {
      id: 'performance-overview',
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 5,
    },
    legend: {
      position: 'top',
      horizontalAlign: 'center',
    },
    colors: ['#4CAF50', '#2196F3'],
    grid: {
      borderColor: '#e7e7e7',
    },
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const series = [
    { name: 'Current Week', data: [12, 19, 3, 5, 2] },
    { name: 'Previous Week', data: [7, 11, 5, 8, 3] },
  ];

  return <Chart options={options} series={series} type="line" height={300} />;
}