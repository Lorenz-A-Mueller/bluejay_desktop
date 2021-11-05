import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { isConstValueNode } from 'graphql';
import { useEffect, useState } from 'react';
import {
  createMessageWithResponderIdMutation,
  getMessageQuery,
  getMessagesQuery,
  getTicketInformationQuery,
} from '../utils/queries';
import { messagePanelStyles } from '../utils/styles';
import HeaderBar from './HeaderBar';
import MessageField from './MessageField';

type Props = {
  openedTicket: string;

  employeeId: string | undefined;
  setShowMessagePanel: (arg: boolean) => void;
  handleTicketDeleteClick: () => void;
  handleTicketCloseClick: () => void;
  setOngoingTicket: () => void;
};

export default function MessagePanel(props: Props) {
  const [ticketData, setTicketData] = useState({});
  const [messages, setMessages] = useState([]);
  const [newMessageText, setNewMessageText] = useState('');
  console.log('messages', messages);
  console.log('TICKET DATA: ', ticketData);

  // query data about clicked-on ticket

  const { loading, error, data } = useQuery(getTicketInformationQuery, {
    variables: { ticketId: props.openedTicket },
    onCompleted: () => {
      console.log(data);
      setTicketData(data.ticket);
      getMessages();
    },
    fetchPolicy: 'network-only',
  });

  const [
    getMessages,
    {
      loading: getMessagesLoading,
      error: getMessagesError,
      data: getMessagesData,
    },
  ] = useLazyQuery(getMessagesQuery, {
    variables: { ticketID: props.openedTicket },
    onCompleted: (getMessagesData) => {
      console.log('data in getMessages: ', getMessagesData);
      setMessages(getMessagesData.messages);
    },
    fetchPolicy: 'network-only',
  });

  const handleMessageSendClick = () => {
    console.log('ticketData.id: ', ticketData.id);
    console.log('newMEssageText: ', newMessageText);
    console.log('responderID: ', props.employeeId);
    sendMessage();
  };

  const [
    sendMessage,
    {
      loading: sendMessageLoading,
      error: sendMessageError,
      data: sendMessageData,
    },
  ] = useMutation(createMessageWithResponderIdMutation, {
    variables: {
      ticketID: ticketData.id,
      content: newMessageText,
      responderID: props.employeeId,
    },
    onCompleted: (thisData) => {
      console.log('data after creating message with responserId', thisData);
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
        <HeaderBar ticket={data && data.ticket} />
        <div className="title-bar">
          <p>{data && data.ticket.title}</p>
        </div>
        {messages.length &&
          messages.map((message) => (
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
              <button onClick={handleMessageSendClick} className="send-button">
                Send
              </button>
            )}
            {data && data.ticket.status !== '3' && (
              <button
                onClick={props.handleTicketCloseClick}
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
              onClick={props.handleTicketDeleteClick}
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
