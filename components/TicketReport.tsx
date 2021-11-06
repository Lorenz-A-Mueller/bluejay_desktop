import { ticketReportStyles } from '../utils/styles';
import PieChartContainer from './PieChartContainer';

export default function TicketReport() {
  return (
    <div css={ticketReportStyles}>
      <div className="ticket-numbers-box">
        <div>
          <p>Total Tickets</p>
          <p>45</p>
        </div>
        <div>
          <p>Assigned</p>
          <p>43</p>
        </div>
        <div>
          <p>Not assigned</p>
          <p>2</p>
        </div>
        <div>
          <p>Closed</p>
          <p>40</p>
        </div>
        <div>
          <p>Pending</p>
          <p>5</p>
        </div>
      </div>
      <div className="ticket-charts-box">
        <PieChartContainer keyword="Category" />
        <PieChartContainer keyword="Status" />
        <PieChartContainer keyword="Assignee" />
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
