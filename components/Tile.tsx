import { useEffect, useState } from 'react';
import { tileStyles } from '../utils/styles';
import { transformTimestampIntoDatetime } from '../utils/transformTimestampIntoDatetime';
import { TileProps } from '../utils/types';
import useWindowDimensions from '../utils/useWindowDimensions';

export default function Tile(props: TileProps) {
  const [statusBoxColor, setStatusBoxColor] = useState('');
  const [createdDatetime, setCreatedDatetime] = useState('');
  const [lastResponseDatetime, setLastResponseDatetime] = useState('');
  const [thisPriorityName, setThisPriorityName] = useState('');
  const [thisCategoryName, setThisCategoryName] = useState('');
  const [thisStatusName, setThisStatusName] = useState('');
  const [thisAssigneeName, setThisAssigneeName] = useState('');
  const [thisCustomerNumber, setThisCustomerNumber] = useState('');

  console.log('props.selectedCategory', props.selectedCategory);
  console.log('props.category', props.category);

  // get StatusBoxColor according to status, convert timestamps into readable date-times and find names of information where ids match

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
      props.priorities.find((priority) => priority.id === props.priority)!
        .priority_name,
    );
    setThisCategoryName(
      props.categories.find((category) => category.id === props.category)!
        .category_name,
    );
    setThisStatusName(
      props.statuses.find((status) => status.id === props.status)!.status_name,
    );
    if (props.assigneeId) {
      setThisAssigneeName(
        props.employees.find((employee) => employee.id === props.assigneeId)!
          .first_name,
      );
    } else {
      setThisAssigneeName('not assigned');
    }
    setThisCustomerNumber(
      props.customers.find((customer) => customer.id === props.customerId)!
        .number,
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
          !props.selectedCategory || props.category === props.selectedCategory // selectedCategory doesn't apply
            ? //
              !props.filter && thisStatusName !== 'CLOSED' // then, check for filter
              ? 'flex'
              : props.filter === thisStatusName ||
                props.filter === thisPriorityName ||
                (props.filter === 'unassigned' &&
                  !props.assigneeId &&
                  thisStatusName !== 'CLOSED')
              ? 'flex'
              : 'none'
            : //
              'none',
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
          <p
            style={
              thisPriorityName === 'urgent'
                ? {
                    color: 'red',
                    textDecoration: 'solid underline red 4px',
                  }
                : {}
            }
          >
            {thisPriorityName}
          </p>
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
