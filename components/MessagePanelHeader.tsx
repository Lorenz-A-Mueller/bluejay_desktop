import { useLazyQuery, useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import {
  changeTicketAssigneeMutation,
  changeTicketPriorityMutation,
  getMessagePanelInfoQuery,
} from '../utils/queries';
import { messagePanelHeaderStyles } from '../utils/styles';
import { MessagePanelHeaderProps } from '../utils/types';

export default function MessagePanelHeader(props: MessagePanelHeaderProps) {
  const [statusBoxColor, setStatusBoxColor] = useState('#FFF8B6');
  const [showPrioritySelectField, setShowPrioritySelectField] = useState(false);
  const [showAssigneeSelectField, setShowAssigneeSelectField] = useState(false);
  const [newAssigneeInput, setNewAssigneeInput] = useState('');
  const [newPriorityInput, setNewPriorityInput] = useState('');

  const [getMessagePanelInfo, { data: getMessagePanelInfoQueryData }] =
    useLazyQuery(getMessagePanelInfoQuery, {
      onCompleted: () => {},
      onError: () => {},
      fetchPolicy: 'network-only',
    });

  const [changeTicketPriority, { data: changeTicketPriorityMutationData }] =
    useMutation(changeTicketPriorityMutation, {
      onCompleted: (data) => {
        console.log('changeTicketPriorityMutationData', data);
      },
    });

  const [changeTicketAssignee, { data: changeTicketAssigneeMutationData }] =
    useMutation(changeTicketAssigneeMutation, {
      onCompleted: (data) => {
        console.log('changeTicketAssigneeMutationData', data);
      },
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
      if (props.ticket.assignee_id) {
        setNewAssigneeInput(props.ticket.assignee_id);
      }
      if (props.ticket.priority) {
        setNewPriorityInput(props.ticket.priority);
      }
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
            <button
              onClick={() =>
                setShowPrioritySelectField((previous) => !previous)
              }
            >
              <img
                src="edit-icon.png"
                alt="a stylized pencil and sheet of paper"
              />
            </button>
          )}
        </div>
        {props.isAdmin && showPrioritySelectField && (
          <select
            value={newPriorityInput}
            onChange={async (e) => {
              setNewPriorityInput(e.currentTarget.value);
              await changeTicketPriority({
                variables: {
                  ticketID: props.ticket.id,
                  priorityID: Number.parseInt(e.currentTarget.value, 10),
                },
              });
              setShowPrioritySelectField(false);
              props.getTicketInformation();
            }}
          >
            {'priorities' in props &&
              props.priorities.map((priority) => (
                <option
                  key={`priority-option-key-${priority.id}`}
                  value={priority.id}
                >
                  {priority.priority_name}
                </option>
              ))}
          </select>
        )}
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
            <button
              onClick={() =>
                setShowAssigneeSelectField((previous) => !previous)
              }
            >
              <img
                src="edit-icon.png"
                alt="a stylized pencil and sheet of paper"
              />
            </button>
          )}
        </div>
        {props.isAdmin && showAssigneeSelectField && (
          <select
            value={newAssigneeInput}
            onChange={async (e) => {
              setNewAssigneeInput(e.currentTarget.value);
              await changeTicketAssignee({
                variables: {
                  ticketID: props.ticket.id,
                  employeeID: Number.parseInt(e.currentTarget.value, 10),
                },
              });
              setShowAssigneeSelectField(false);
              props.getTicketInformation();
            }}
          >
            {'employees' in props &&
              props.employees.map((employee) => (
                <option
                  key={`assignee-option-key-${employee.id}`}
                  value={employee.id}
                >
                  {employee.first_name}
                </option>
              ))}
          </select>
        )}
      </div>
    </div>
  );
}
