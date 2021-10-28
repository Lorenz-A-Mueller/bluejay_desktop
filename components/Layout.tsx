import { useState } from 'react';
import { layoutStyles } from '../utils/styles';
import useWindowDimensions from '../utils/useWindowDimensions';

export default function Layout(props) {
  const [isAdmin, setIsAdmin] = useState(true);
  console.log(
    'window height, window width: ',
    useWindowDimensions().height,
    useWindowDimensions().width,
  );
  return (
    <>
      <div
        css={layoutStyles(
          useWindowDimensions().height,
          useWindowDimensions().width,
        )}
      >
        <div className="circle">
          <img src="icon.png" alt="BlueJay logo" />
        </div>

        <div className="ticket-filter-box">
          <p>Tickets</p>
          <img src="all-email-icon.png" alt="two letters" />
          <img src="new-message-icon.jpg" alt="a letter with the number 1" />
          <img src="urgent-icon.png" alt="a letter with an exclamation mark" />
          <img
            src="email-unassigned-icon.png"
            alt="an open letter with an @ symbol"
          />
          <img src="archive-icon.jpg" alt="documents in a drawer" />
        </div>
        <img src="chat-icon.png" alt="a chat icon" />
        <img src="data-icon.png" alt="a graph icon" />
        <img src="employees-icon.png" alt="an employees icon" />
        <img src="settings-icon.png" alt="a settings icon" />
      </div>
      {props.children}
    </>
  );
}
