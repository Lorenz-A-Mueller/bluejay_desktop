import { useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { getMessagePanelInfoQuery } from '../utils/queries';
import { messagePanelHeaderStyles } from '../utils/styles';
import { MessagePanelHeaderProps } from '../utils/types';

export default function MessagePanelHeader(props: MessagePanelHeaderProps) {
  const [statusBoxColor, setStatusBoxColor] = useState('#FFF8B6');
  const [getMessagePanelInfo, { data: getMessagePanelInfoQueryData }] =
    useLazyQuery(getMessagePanelInfoQuery, {
      onCompleted: () => {},
      onError: () => {},
      fetchPolicy: 'network-only',
    });

  // useEffect(() => {}, [getMessagePanelInfo]);

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
      // include variables here to prevent firing of useLazyQuery when props.ticket is undefined
      getMessagePanelInfo({
        variables: {
          statusID: props.ticket.status,
          customerID: props.ticket.customer_id,
          priorityID: props.ticket.priority,
          categoryID: props.ticket.category,
          assigneeID: props.ticket.assignee_id
            ? props.ticket.assignee_id
            : null,
        },
      });
    }
  }, [props.ticket, getMessagePanelInfo]);

  return (
    <div css={messagePanelHeaderStyles}>
      <div
        style={{ backgroundColor: statusBoxColor }}
        className="status-square"
      >
        <p>
          {getMessagePanelInfoQueryData &&
            getMessagePanelInfoQueryData.status.status_name}
        </p>
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
        <div>
          <p>
            {getMessagePanelInfoQueryData &&
              getMessagePanelInfoQueryData.priority.priority_name}
          </p>
          {props.isAdmin && (
            <img
              src="edit-icon.png"
              alt="a stylized pencil and sheet of paper"
            />
          )}
        </div>
      </div>
      <div className="category-square">
        <p>category</p>
        <p>
          {getMessagePanelInfoQueryData &&
            getMessagePanelInfoQueryData.category.category_name}
        </p>
      </div>
      <div className="assigned-square">
        <p>assigned</p>
        <div>
          <p>
            {props.ticket &&
              (getMessagePanelInfoQueryData &&
              getMessagePanelInfoQueryData.employee &&
              getMessagePanelInfoQueryData.employee.first_name
                ? getMessagePanelInfoQueryData.employee.first_name
                : 'not assigned')}
          </p>
          {props.isAdmin && (
            <img
              src="edit-icon.png"
              alt="a stylized pencil and sheet of paper"
            />
          )}
        </div>
      </div>
    </div>
  );
}
