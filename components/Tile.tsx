import {
  ApolloClient,
  ApolloProvider,
  gql,
  InMemoryCache,
  useApolloClient,
  useLazyQuery,
  useQuery,
} from '@apollo/client';
import { useEffect, useState } from 'react';
import { tileStyles } from '../utils/styles';
import { transformTimestampIntoDatetime } from '../utils/transformTimestampIntoDatetime';
import useWindowDimensions from '../utils/useWindowDimensions';

type Props = {
  ticketId: string;
  status: string;
  title: string;
  created: string;
  lastResponse: string;
  category: string;
  priority: string;
  assigneeId: number;
  customerId: number;
  ticketNumber: string;
  handleTileClick: (arg0: string) => void;
};

const getCustomerNumberQuery = gql`
  query ($idInput: ID!) {
    customer(search: { id: $idInput }) {
      number
    }
  }
`;

export default function Tile(props: Props) {
  const [statusBoxColor, setStatusBoxColor] = useState('#fff8b6');
  const [createdDatetime, setCreatedDatetime] = useState('');
  const [lastResponseDatetime, setLastResponseDatetime] = useState('');
  const [customerNumber, setCustomerNumber] = useState('');
  // console.log('PROPS.TICKETID', props.ticketId);

  // get Customer number from id

  const { loading, error, data } = useQuery(getCustomerNumberQuery, {
    variables: { idInput: props.customerId },
    onCompleted: () => {
      console.log('data', data);
      setCustomerNumber(data.customer.number);
    },
    // must be set so the query doesn't use the cache (could not be called several times)
    fetchPolicy: 'network-only',
    skip: !props.customerId,
  });

  useEffect(() => {
    // get StatusBoxColor
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

    // convert timestamps into daytimes
    setCreatedDatetime(transformTimestampIntoDatetime(props.created));
    setLastResponseDatetime(transformTimestampIntoDatetime(props.lastResponse));
  }, [props.status, props.created, props.lastResponse]);
  const screenWidth = useWindowDimensions().width;

  return (
    <button
      css={tileStyles(screenWidth)}
      onClick={() => props.handleTileClick(props.ticketId)}
    >
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
          <p>{props.category}</p>
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
