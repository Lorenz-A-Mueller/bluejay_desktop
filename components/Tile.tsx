import { useLazyQuery, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import {
  getCategoryQuery,
  getCustomerNumberQuery,
  getStatusQuery,
} from '../utils/queries';
import { tileStyles } from '../utils/styles';
import { transformTimestampIntoDatetime } from '../utils/transformTimestampIntoDatetime';
import { TileProps } from '../utils/types';
import useWindowDimensions from '../utils/useWindowDimensions';

export default function Tile(props: TileProps) {
  const [statusBoxColor, setStatusBoxColor] = useState('#fff8b6');
  const [createdDatetime, setCreatedDatetime] = useState('');
  const [lastResponseDatetime, setLastResponseDatetime] = useState('');
  const [customerNumber, setCustomerNumber] = useState('');

  // get Customer number from id

  const { data } = useQuery(getCustomerNumberQuery, {
    // TODO: error-handling, loading-handling
    variables: { idInput: props.customerId },
    onCompleted: () => {
      setCustomerNumber(data.customer.number);
      console.log('props.status', props.status);
      getStatus();
    },
    // must be set so the query doesn't use the cache (could not be called several times)
    fetchPolicy: 'network-only',
    skip: !props.customerId,
  });

  const [getStatus, { data: getStatusQueryData }] = useLazyQuery(
    getStatusQuery,
    {
      variables: { statusID: props.status },
      onCompleted: () => {
        console.log('getStatusQueryData', getStatusQueryData);
      },
      fetchPolicy: 'network-only',
    },
  );

  const [getCategory, { data: getCategoryQueryData }] = useLazyQuery(
    getCategoryQuery,
    {
      variables: { categoryID: props.category },
      onCompleted: () => {
        console.log('getCategoryQueryData', getCategoryQueryData);
      },
      fetchPolicy: 'network-only',
    },
  );

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
    getCategory();
  }, [props.status, props.created, props.lastResponse, getCategory]);

  const screenWidth = useWindowDimensions().width;

  return (
    <button
      css={screenWidth && tileStyles(screenWidth)}
      onClick={() => props.handleTileClick(props.ticketId)}
    >
      <div className="rectangular-box">
        <div className="status-box" style={{ backgroundColor: statusBoxColor }}>
          <p>{getStatusQueryData && getStatusQueryData.status.status_name}</p>
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
          <p>{customerNumber}</p>
        </div>
        <div className="category-box">
          <p>category</p>
          <p>
            {getCategoryQueryData &&
              getCategoryQueryData.category.category_name}
          </p>
        </div>
        <div className="priority-box">
          <p>priority</p>
          <p>{props.priority}</p>
        </div>
        <div className="created-box">
          <p>created</p>
          <p>
            {createdDatetime.slice(0, -5)}
            <span>&nbsp;{createdDatetime.slice(-5)}</span>
          </p>
        </div>
        <div className="assigned-box">
          {props.assigneeId ? (
            <>
              <div>
                <p>assigned</p>

                <p>{props.assigneeId} - Jennifer</p>
              </div>
              <img src="person.png" alt="a person" />
              <div className="assigned-date-box">
                <p>12/07/2021</p>
                <p>13:24pm</p>
              </div>
            </>
          ) : (
            <div>
              <p>assigned</p>
              <p>Not assigned</p>
            </div>
          )}
        </div>
      </div>
    </button>
  );
}
