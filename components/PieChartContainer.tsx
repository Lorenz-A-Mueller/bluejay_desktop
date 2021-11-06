import { useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { getStatusQuery } from '../utils/queries';
import { pieChartContainerStyles } from '../utils/styles';
import { PieChartContainerProps } from '../utils/types';

const myValue = 70;

export default function PieChartContainer(props: PieChartContainerProps) {
  return (
    <div css={pieChartContainerStyles}>
      <p>By {props.keyword}</p>
      <div className="pie-chart-and-legend-container">
        <div className="pie-chart-wrapper">
          <PieChart
            data={[
              { title: 'One', value: myValue, color: '#E38627' },
              { title: 'Two', value: 15, color: '#C13C37' },
              { title: 'Three', value: 20, color: '#6A2135' },
            ]}
          />
        </div>
        <div className="legend-wrapper">
          <div className="legend-item-box">
            <div className="legend-color-box" />
            <p>Complaint</p>
          </div>
          <div className="legend-item-box">
            <div className="legend-color-box" />
            <p>Complaint</p>
          </div>
          <div className="legend-item-box">
            <div className="legend-color-box" />
            <p>Complaint</p>
          </div>
          <div className="legend-item-box">
            <div className="legend-color-box" />
            <p>Complaint</p>
          </div>
          <div className="legend-item-box">
            <div className="legend-color-box" />
            <p>Complaint</p>
          </div>
        </div>
      </div>
    </div>
  );
}
