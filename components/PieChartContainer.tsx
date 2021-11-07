import { useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { getStatusQuery } from '../utils/queries';
import { pieChartContainerStyles } from '../utils/styles';
import { Employee, PieChartContainerProps, Status } from '../utils/types';

const myValue = 70;

export default function PieChartContainer(props: PieChartContainerProps) {
  useEffect(() => {
    if (props.statusesData) {
      setSectorTitles(props.statusesData);
    } else if (props.employeesData) {
      setSectorTitles(props.employeesData);
    }
  }, [props.statusesData, props.employeesData]);

  const [sectorTitles, setSectorTitles] = useState<[Status] | [Employee] | []>(
    [],
  );

  console.log('sectorTitles: ', sectorTitles);
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
          {sectorTitles.map((element) => {
            return (
              <div
                className="legend-item-box"
                key={`pieChart-legend-element -${element.id}`}
              >
                <div className="legend-color-box" />
                <p>
                  {'status_name' in element
                    ? element.status_name
                    : element.first_name}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
