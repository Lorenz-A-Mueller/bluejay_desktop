import { useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import {
  getCategoryQuery,
  getMessagePanelInfoQuery,
  getStatusQuery,
} from '../utils/queries';
import { messagePanelHeaderStyles } from '../utils/styles';
import { MessagePanelHeaderProps } from '../utils/types';

export default function MessagePanelHeader(props: MessagePanelHeaderProps) {
  const [statusBoxColor, setStatusBoxColor] = useState('#FFF8B6');

  const [getMessagePanelInfo, { data: getMessagePanelInfoQueryData }] =
    useLazyQuery(getMessagePanelInfoQuery, {
      variables: {
        statusID: props.ticket?.status,
        customerID: props.ticket?.customer_id,
        priorityID: props.ticket?.priority,
        categoryID: props.ticket?.category,
        assigneeID: props.ticket?.assignee_id,
      },
      onCompleted: () => {
        console.log(
          'getMessagePanelInfoQueryData: ',
          getMessagePanelInfoQueryData,
        );
      },
    });

  const [getStatus, { data: getStatusQueryData }] = useLazyQuery(
    getStatusQuery,
    {
      variables: { statusID: props.ticket?.status },
      onCompleted: () => {},
      fetchPolicy: 'network-only',
    },
  );

  const [getCategory, { data: getCategoryQueryData }] = useLazyQuery(
    getCategoryQuery,
    {
      variables: { categoryID: props.ticket?.category },
      onCompleted: () => {},
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
    getMessagePanelInfo();
  }, [props.ticket, getStatus, getCategory, getMessagePanelInfo]);

  return (
    <div css={messagePanelHeaderStyles}>
      <div
        style={{ backgroundColor: statusBoxColor }}
        className="status-square"
      >
        <p>{getStatusQueryData && getStatusQueryData.status.status_name}</p>
        <p>{props.ticket && props.ticket.ticket_number}</p>
      </div>
      <div className="customer-id-square">
        <p>customer</p>
        <p>
          {getMessagePanelInfoQueryData &&
            getMessagePanelInfoQueryData.customer.number}
        </p>
      </div>
      <div className="priority-square">
        <p>priority</p>
        <p>
          {' '}
          {getMessagePanelInfoQueryData &&
            getMessagePanelInfoQueryData.priority.priority_name}
        </p>
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
            (getMessagePanelInfoQueryData &&
            getMessagePanelInfoQueryData.employee.first_name
              ? getMessagePanelInfoQueryData.employee.first_name
              : 'not assigned')}
        </p>
      </div>
    </div>
  );
}
