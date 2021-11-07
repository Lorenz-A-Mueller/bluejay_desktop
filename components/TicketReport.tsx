import { useLazyQuery } from '@apollo/client';
import { report } from 'process';
import { useEffect, useState } from 'react';
import extractTicketReportData from '../utils/extractTicketReportData';
import { getEmployeesQuery, getStatusesQuery } from '../utils/queries';
import { ticketReportStyles } from '../utils/styles';
import { Employee, Status, TicketReportProps } from '../utils/types';
import PieChartContainer from './PieChartContainer';

export default function TicketReport(props: TicketReportProps) {
  const [statusesData, setStatusesData] = useState<Status[]>([]);
  const [employeesData, setEmployeesData] = useState<Employee[]>([]);

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
  }, [getStatuses, getEmployees]);

  return (
    <div css={ticketReportStyles}>
      <div className="ticket-numbers-box">
        <div>
          <p>Total Tickets</p>
          <p>{props.reportData.totalTickets}</p>
        </div>
        <div>
          <p>Assigned</p>
          <p>{props.reportData.assignedTickets}</p>
        </div>
        <div>
          <p>Not assigned</p>
          <p>{props.reportData.unassignedTickets}</p>
        </div>
        <div>
          <p>Closed</p>
          <p>{props.reportData.closedTickets}</p>
        </div>
        <div>
          <p>Pending</p>
          <p>{props.reportData.pendingTickets}</p>
        </div>
      </div>
      <div className="ticket-charts-box">
        <PieChartContainer keyword="Category" />
        <PieChartContainer keyword="Status" statusesData={statusesData} />
        <PieChartContainer keyword="Assignee" employeesData={employeesData} />
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
