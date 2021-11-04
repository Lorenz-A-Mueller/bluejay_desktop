import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
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
};

export default function MessagePanel(props: Props) {
  const [ticketData, setTicketData] = useState({});
  const [messages, setMessages] = useState([]);
  const [newMessageText, setNewMessageText] = useState('');
  console.log('messages', messages);

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
          <button onClick={handleMessageSendClick}>Send</button>
          <textarea
            onChange={(e) => setNewMessageText(e.currentTarget.value)}
            value={newMessageText}
          />
        </div>
      </div>
    </div>
  );
}
