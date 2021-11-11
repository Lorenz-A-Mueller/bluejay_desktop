import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import {
  createMessageWithResponderIdMutation,
  getMessagesQuery,
  getTicketInformationQuery,
} from '../utils/queries';
import { messagePanelStyles } from '../utils/styles';
import { Message, MessagePanelProps, Ticket } from '../utils/types';
import MessageField from './MessageField';
import MessagePanelHeader from './MessagePanelHeader';

export default function MessagePanel(props: MessagePanelProps) {
  const [ticketData, setTicketData] = useState<Ticket | {}>({});
  const [messages, setMessages] = useState([]);
  const [newMessageText, setNewMessageText] = useState('');

  // query data about clicked-on ticket

  const { data } = useQuery(getTicketInformationQuery, {
    variables: { ticketId: props.openedTicket },
    onCompleted: () => {
      setTicketData(data.ticket);
      getMessages();
    },
    fetchPolicy: 'network-only',
  });

  const [getTicketInformation] = useLazyQuery(getTicketInformationQuery, {
    variables: { ticketId: props.openedTicket },
    onCompleted: () => {
      setTicketData(data.ticket);
      getMessages();
    },
    fetchPolicy: 'network-only',
  });

  const [getMessages] = useLazyQuery(getMessagesQuery, {
    variables: { ticketID: props.openedTicket },
    onCompleted: (getMessagesData) => {
      setMessages(getMessagesData.messages);
    },
    fetchPolicy: 'network-only',
  });

  const [sendMessage] = useMutation(createMessageWithResponderIdMutation, {
    variables: {
      ticketID: 'id' in ticketData && ticketData.id,
      content: newMessageText,
      responderID: props.employee.id,
    },
    onCompleted: () => {
      getMessages();
      setNewMessageText('');
      props.setOngoingTicket();
    },
    fetchPolicy: 'network-only',
  });

  return (
    <div css={messagePanelStyles}>
      <button onClick={() => props.setShowMessagePanel(false)}>
        <img src="x-icon.jpg" alt="an 'x'" />
      </button>
      <div className="blue-square">
        <MessagePanelHeader
          ticket={data && data.ticket}
          isAdmin={props.isAdmin}
          employees={props.employees}
          priorities={props.priorities}
          getTicketInformation={getTicketInformation}
        />
        <div className="title-bar">
          <p>{data && data.ticket.title}</p>
        </div>
        {messages.length &&
          messages.map((message: Message) => (
            <MessageField
              key={`message-key-${message.content}`}
              message={message}
              ticketData={ticketData}
              employee={props.employee}
            />
          ))}

        <div className="reply-container">
          <div className="reply-header">
            <button onClick={() => getMessages()} className="refresh-button">
              <img
                src="refresh-icon.jpg"
                alt="Two arrows in form of a circle"
              />
            </button>
            {data && data.ticket.status !== '3' && (
              <button onClick={() => sendMessage()} className="send-button">
                Send
              </button>
            )}
            {data && data.ticket.status !== '3' && (
              <button
                onClick={() => props.closeTicket()}
                className="close-button"
              >
                Close ticket
              </button>
            )}
            {data && data.ticket.status === '3' && (
              <button onClick={props.setOngoingTicket} className="close-button">
                Reopen ticket
              </button>
            )}
            <button
              onClick={() => props.deleteTicket()}
              className="delete-button"
            >
              Delete ticket
            </button>
          </div>
          <textarea
            onChange={(e) => setNewMessageText(e.currentTarget.value)}
            value={newMessageText}
            disabled={data && data.ticket.status === '3' ? true : false}
            placeholder={
              data && data.ticket.status === '3'
                ? 'This ticket is closed. You can reopen it.'
                : 'Respond here'
            }
          />
        </div>
      </div>
    </div>
  );
}
