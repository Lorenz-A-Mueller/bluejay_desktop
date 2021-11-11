import { useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { getCustomerNameQuery } from '../utils/queries';
import { messageFieldStyles } from '../utils/styles';
import { transformTimestampIntoDatetime } from '../utils/transformTimestampIntoDatetime';
import { MessageFieldProps } from '../utils/types';

export default function MessageField(props: MessageFieldProps) {
  const [dateTime, setDateTime] = useState('');
  const [customerFirstName, setCustomerFirstName] = useState('');
  const [customerLastName, setCustomerLastName] = useState('');

  const [getCustomerName, { data }] = useLazyQuery(getCustomerNameQuery, {
    variables: { customerId: props.ticketData?.customer_id },
    onCompleted: () => {
      setCustomerFirstName(data.customer.first_name);
      setCustomerLastName(data.customer.last_name);
    },
    fetchPolicy: 'network-only',
  });

  // convert "created" timestamp into datetime

  useEffect(() => {
    if (props.message) {
      setDateTime(transformTimestampIntoDatetime(props.message.created));
      getCustomerName();
    }
  }, [props.message, getCustomerName]);

  return (
    <div
      css={messageFieldStyles}
      style={{
        flexDirection: props.message?.responder_id ? 'row-reverse' : 'row',
      }}
    >
      <div className="info-field">
        <p>
          {props.message?.responder_id
            ? props.employee.first_name
            : customerFirstName}
        </p>
        <p>{!props.message?.responder_id && customerLastName}</p>
        <p>{dateTime.slice(0, -5)}</p>
        <p>{dateTime.slice(-5)}</p>
      </div>
      <div className="message-display-field">
        {props.message && props.message.content}
      </div>
    </div>
  );
}
