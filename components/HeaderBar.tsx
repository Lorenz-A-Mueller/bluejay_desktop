import { useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { getCategoryQuery, getStatusQuery } from '../utils/queries';
import { headerBarStyles } from '../utils/styles';
import { HeaderProps } from '../utils/types';

export default function HeaderBar(props: HeaderProps) {
  const [statusBoxColor, setStatusBoxColor] = useState('#FFF8B6');
  console.log('props.ticket', props.ticket);

  const [getStatus, { data: getStatusQueryData }] = useLazyQuery(
    getStatusQuery,
    {
      variables: { statusID: props.ticket?.status },
      onCompleted: () => {
        console.log('getStatusQueryData', getStatusQueryData);
      },
      fetchPolicy: 'network-only',
    },
  );

  const [getCategory, { data: getCategoryQueryData }] = useLazyQuery(
    getCategoryQuery,
    {
      variables: { categoryID: props.ticket?.category },
      onCompleted: () => {
        console.log('getCategoryQueryData', getCategoryQueryData);
      },
      fetchPolicy: 'network-only',
    },
  );

  useEffect(() => {
    if (props.ticket) {
      switch (props.ticket.status) {
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
      getStatus();
      getCategory();
    }
  }, [props.ticket, getStatus, getCategory]);

  return (
    <div css={headerBarStyles}>
      <div
        style={{ backgroundColor: statusBoxColor }}
        className="status-square"
      >
        <p>{getStatusQueryData && getStatusQueryData.status.status_name}</p>
        <p>{props.ticket && props.ticket.ticket_number}</p>
      </div>
      <div className="customer-id-square">
        <p>customer</p>
        <p>{props.ticket && props.ticket.customer_id}</p>
      </div>
      <div className="priority-square">
        <p>priority</p>
        <p>{props.ticket && props.ticket.priority}</p>
      </div>
      <div className="category-square">
        <p>category</p>
        <p>
          {getCategoryQueryData && getCategoryQueryData.category.category_name}
        </p>
      </div>
      <div className="assigned-square">
        <p>assigned</p>
        <p>
          {props.ticket &&
            (props.ticket.assignee_id
              ? props.ticket.assignee_id
              : 'not assigned')}{' '}
        </p>
      </div>
    </div>
  );
}
