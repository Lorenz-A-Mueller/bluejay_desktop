import { useEffect, useState } from 'react';
import { tileStyles } from '../utils/styles';
import { transformTimestampIntoDatetime } from '../utils/transformTimestampIntoDatetime';
import { TileProps } from '../utils/types';
import useWindowDimensions from '../utils/useWindowDimensions';

export default function Tile(props: TileProps) {
  const [statusBoxColor, setStatusBoxColor] = useState('#fff8b6');
  const [createdDatetime, setCreatedDatetime] = useState('');
  const [lastResponseDatetime, setLastResponseDatetime] = useState('');
  const [thisPriorityName, setThisPriorityName] = useState('');
  const [thisCategoryName, setThisCategoryName] = useState('');
  const [thisStatusName, setThisStatusName] = useState('');
  const [thisAssigneeName, setThisAssigneeName] = useState('');
  const [thisCustomerNumber, setThisCustomerNumber] = useState('');

  // get StatusBoxColor according to status and convert timestamps into readable date-times

  useEffect(() => {
    switch (props.status) {
      case '1':
        setStatusBoxColor('#89FF89');
        break;
      case '2':
        setStatusBoxColor('#FFF8B6');
        break;
      case '3':
        setStatusBoxColor('#FFC671');
        break;
      default:
        setStatusBoxColor('#FFF8B6');
    }
    setCreatedDatetime(transformTimestampIntoDatetime(props.created));
    setLastResponseDatetime(transformTimestampIntoDatetime(props.lastResponse));

    setThisPriorityName(
      props.priorities[Number.parseInt(props.priority, 10) - 1].priority_name,
    );
    setThisCategoryName(
      props.categories[Number.parseInt(props.category, 10) - 1].category_name,
    );
    setThisStatusName(
      props.statuses[Number.parseInt(props.status, 10) - 1].status_name,
    );
    if (props.assigneeId) {
      setThisAssigneeName(
        props.employees[Number.parseInt(props.assigneeId, 10) - 1].first_name,
      );
    } else {
      setThisAssigneeName('not assigned');
    }
    setThisCustomerNumber(
      props.customers[Number.parseInt(props.customerId, 10) - 1].number,
    );
  }, [
    props.status,
    props.created,
    props.lastResponse,
    props.priority,
    props.priorities,
    props.category,
    props.statuses,
    props.categories,
    props.assigneeId,
    props.employees,
    props.customers,
    props.customerId,
  ]);

  const screenWidth = useWindowDimensions().width;

  return (
    <button
      css={screenWidth && tileStyles(screenWidth)}
      onClick={() => props.handleTileClick(props.ticketId)}
      style={{
        display:
          !props.filter && thisStatusName !== 'CLOSED'
            ? 'flex'
            : props.filter === thisStatusName ||
              (props.filter === 'unassigned' &&
                !props.assigneeId &&
                thisStatusName !== 'CLOSED')
            ? 'flex'
            : 'none',
      }}
    >
      <div className="rectangular-box">
        <div className="status-box" style={{ backgroundColor: statusBoxColor }}>
          <p>{thisStatusName}</p>
        </div>
        <div className="title-box">
          <p>{props.title} (2) </p> {/* TODO: show Number of messages */}
        </div>
        <div className="ticket-number-box">
          <p>{props.ticketNumber}</p>
        </div>
        <div className="last-response-box">
          <p>last Response</p>
          <p>
            {lastResponseDatetime.slice(0, -5)}
            <span>&nbsp;{lastResponseDatetime.slice(-5)}</span>
          </p>
        </div>
        <div className="customer-id-box">
          <p>customer</p>
          <p>{thisCustomerNumber}</p>
        </div>
        <div className="category-box">
          <p>category</p>
          <p>{thisCategoryName}</p>
        </div>
        <div className="priority-box">
          <p>priority</p>
          <p>{thisPriorityName}</p>
        </div>
        <div className="created-box">
          <p>created</p>
          <p>
            {createdDatetime.slice(0, -5)}
            <span>&nbsp;{createdDatetime.slice(-5)}</span>
          </p>
        </div>
        <div className="assigned-box">
          <img src="person.png" alt="a person" />
          <div>
            <p>assigned</p>
            <p>{thisAssigneeName}</p>
          </div>
        </div>
      </div>
    </button>
  );
}
