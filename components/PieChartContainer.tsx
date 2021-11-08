import { useEffect, useState } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { pieChartContainerStyles } from '../utils/styles';
import {
  Category,
  Employee,
  PieChartContainerProps,
  Status,
} from '../utils/types';

const colors = [
  '#ff0000',
  '#00ff00',
  '#0000ff',
  '#ffff00',
  '#00ffff',
  '#ff00ff',
];

export default function PieChartContainer(props: PieChartContainerProps) {
  const [sectorTitles, setSectorTitles] = useState<
    Status[] | Employee[] | Category[]
  >([]);
  const [sectorNumber, setSectorNumber] = useState(0);
  useEffect(() => {
    if (props.statusesData && 'byStatus' in props.reportData) {
      setSectorTitles(props.statusesData);
      setSectorNumber(props.reportData.byStatus.length);
    } else if (props.employeesData && 'byAssignee' in props.reportData) {
      setSectorTitles(props.employeesData);
      setSectorNumber(props.reportData.byAssignee.length);
    } else if (props.categoriesData && 'byCategory' in props.reportData) {
      setSectorTitles(props.categoriesData);
      setSectorNumber(props.reportData.byCategory.length);
    }
  }, [
    props.statusesData,
    props.employeesData,
    props.categoriesData,
    props.reportData,
  ]);

  //

  const statusPieChartArray = [];

  for (let i = 0; i < sectorNumber; i++) {
    statusPieChartArray.push({
      title: i,
      value: 'byStatus' in props.reportData ? props.reportData.byStatus[i] : 0,
      color: colors[i],
    });
  }

  const categoryPieChartArray = [];

  for (let i = 0; i < sectorNumber; i++) {
    categoryPieChartArray.push({
      title: i,
      value:
        'byCategory' in props.reportData ? props.reportData.byCategory[i] : 0,
      color: colors[i],
    });
  }

  const assigneePieChartArray = [];

  for (let i = 0; i < sectorNumber; i++) {
    assigneePieChartArray.push({
      title: i,
      value:
        'byAssignee' in props.reportData ? props.reportData.byAssignee[i] : 0,
      color: colors[i],
    });
  }

  //
  return (
    <div css={pieChartContainerStyles}>
      <p>By {props.keyword}</p>
      <div className="pie-chart-and-legend-container">
        <div className="pie-chart-wrapper">
          {'statusesData' in props && <PieChart data={statusPieChartArray} />}
          {'categoriesData' in props && (
            <PieChart data={categoryPieChartArray} />
          )}
          {'employeesData' in props && (
            <PieChart data={assigneePieChartArray} />
          )}
        </div>
        <div className="legend-wrapper">
          {sectorTitles.map((element, index) => {
            return (
              <div
                className="legend-item-box"
                key={`pieChart-legend-element -${element.id}`}
              >
                <div
                  className="legend-color-box"
                  style={{
                    backgroundColor: colors[index],
                  }}
                />
                <p>
                  {'status_name' in element
                    ? element.status_name
                    : 'first_name' in element
                    ? element.first_name
                    : element.category_name}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
