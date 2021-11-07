import { useLazyQuery } from '@apollo/client';
import { report } from 'process';
import { useEffect, useState } from 'react';
import extractTicketReportData from '../utils/extractTicketReportData';
import {
  getCategoriesQuery,
  getEmployeesQuery,
  getStatusesQuery,
} from '../utils/queries';
import { ticketReportStyles } from '../utils/styles';
import { Category, Employee, Status, TicketReportProps } from '../utils/types';
import PieChartContainer from './PieChartContainer';

export default function TicketReport(props: TicketReportProps) {
  const [statusesData, setStatusesData] = useState<Status[]>([]);
  const [employeesData, setEmployeesData] = useState<Employee[]>([]);
  const [categoriesData, setCategoriesData] = useState<Category[]>([]);

  const [getCategories, { data: getCategoriesQueryData }] = useLazyQuery(
    getCategoriesQuery,
    {
      onCompleted: () => {
        console.log('getCategoriesQueryData: ', getCategoriesQueryData);
        setCategoriesData(getCategoriesQueryData.categories);
      },
      fetchPolicy: 'network-only',
    },
  );

  const [getStatuses, { data: getStatusesQueryData }] = useLazyQuery(
    getStatusesQuery,
    {
      onCompleted: () => {
        console.log('getStatusesQueryData: ', getStatusesQueryData);
        setStatusesData(getStatusesQueryData.statuses);
      },
      fetchPolicy: 'network-only',
    },
  );

  const [getEmployees, { data: getEmployeesQueryData }] = useLazyQuery(
    getEmployeesQuery,
    {
      onCompleted: () => {
        console.log('getEmployeesQueryData: ', getEmployeesQueryData);
        setEmployeesData(getEmployeesQueryData.employees);
      },
      fetchPolicy: 'network-only',
    },
  );
  useEffect(() => {
    getStatuses();
    getEmployees();
    getCategories();
  }, [getStatuses, getEmployees, getCategories]);

  return (
    <div css={ticketReportStyles}>
      <div className="ticket-numbers-box">
        <div>
          <p>Total Tickets</p>
          <p>
            {'totalTickets' in props.reportData &&
              props.reportData.totalTickets}
          </p>
        </div>
        <div>
          <p>Assigned</p>
          <p>
            {'assignedTickets' in props.reportData &&
              props.reportData.assignedTickets}
          </p>
        </div>
        <div>
          <p>Not assigned</p>
          <p>
            {'unassignedTickets' in props.reportData &&
              props.reportData.unassignedTickets}
          </p>
        </div>
        <div>
          <p>Closed</p>
          <p>
            {'closedTickets' in props.reportData &&
              props.reportData.closedTickets}
          </p>
        </div>
        <div>
          <p>Pending</p>
          <p>
            {'pendingTickets' in props.reportData &&
              props.reportData.pendingTickets}
          </p>
        </div>
      </div>
      <div className="ticket-charts-box">
        <PieChartContainer
          keyword="Category"
          categoriesData={categoriesData}
          reportData={props.reportData}
        />
        <PieChartContainer
          keyword="Status"
          statusesData={statusesData}
          reportData={props.reportData}
        />
        <PieChartContainer
          keyword="Assignee"
          employeesData={employeesData}
          reportData={props.reportData}
        />
      </div>
      <div className="ticket-timeline-box">
        <p>Timeline / New tickets per day</p>
        <div className="timeline-graph-box">
          <div className="scale-box">
            <p>20</p>
            <p>15</p>
            <p>10</p>
            <p>5</p>
          </div>
          <div className="fake-line-container">
            <div className="fake-line" />
            <div className="fake-line" />
            <div className="fake-line" />
            <div className="fake-line" />
            <div className="fake-line penultimate" />
            <div className="fake-line last" />
            <div className="column-container">
              <div className="column" />
              <div className="column" />
              <div className="column" />
              <div className="column" />
            </div>
            <div className="date-container">
              <div className="date">08/08</div>
              <div className="date">09/08</div>
              <div className="date">10/08</div>
              <div className="date">11/08</div>
            </div>
          </div>

          {/* <div className="blue-test"></div> */}
        </div>
      </div>
    </div>
  );
}
