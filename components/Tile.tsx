import { BreakingChangeType } from 'graphql';
import { useEffect, useState } from 'react';
import { tileStyles } from '../utils/styles';
import useWindowDimensions from '../utils/useWindowDimensions';

type Props = {
  status: string;
  title: string;
  created: string;
  lastResponse: string;
  category: string;
  priority: string;
  assigneeId: number;
  customerId: number;
  ticketNumber: string;
};

export default function Tile(props: Props) {
  const [statusBoxColor, setStatusBoxColor] = useState('#fff8b6');

  useEffect(() => {
    switch (props.status) {
      case 'NEW':
        setStatusBoxColor('#89FF89');
        break;
      case 'CLOSED':
        setStatusBoxColor('#FFC671');
        break;
      case 'ONGOING':
        setStatusBoxColor('#FFF8B6');
        break;
      default:
        setStatusBoxColor('#FFF8B6');
    }
  }, [props.status]);
  const screenWidth = useWindowDimensions().width;

  return (
    <div css={tileStyles(screenWidth)}>
      <div className="rectangular-box">
        <div className="status-box" style={{ backgroundColor: statusBoxColor }}>
          <p>{props.status}</p>
        </div>
        <div className="title-box">
          <p>{props.title} (2) </p>
        </div>
        <div className="ticket-number-box">
          <p>{props.ticketNumber}</p>
        </div>
        <div className="last-response-box">
          <p>last Response</p>
          <p>
            {props.lastResponse}
            <span>12:12pm</span>
          </p>
        </div>
        <div className="customer-id-box">
          <p>customer ID</p>
          <p>{props.customerId}</p>
        </div>
        <div className="category-box">
          <p>category</p>
          <p>{props.category}</p>
        </div>
        <div className="priority-box">
          <p>priority</p>
          <p>{props.priority}</p>
        </div>
        <div className="created-box">
          <p>created</p>
          <p>
            {props.created} <span>12:12pm</span>
          </p>
        </div>
        <div className="assigned-box">
          <div>
            <p>assigned</p>
            <p>{props.assigneeId} - Jennifer</p>
          </div>
          <img src="person.png" alt="a person" />
          <div className="assigned-date-box">
            <p>12/07/2021</p>
            <p>13:24pm</p>
          </div>
        </div>
      </div>
    </div>
  );
}
