import { useRouter } from 'next/dist/client/router';
import { useState } from 'react';
import { layoutStyles } from '../utils/styles';
import { LayoutProps } from '../utils/types';
import useWindowDimensions from '../utils/useWindowDimensions';

export default function Layout(props: LayoutProps) {
  const route = useRouter();

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
          <button
            onClick={() => {
              props.setFilter('');
              route.push('/allTickets');
            }}
            style={
              'filter' in props && props.filter === ''
                ? {
                    marginLeft: '56px',
                    borderRadius: '8px',
                    backgroundColor: '#C4C4C4',
                    padding: '0px 20px 0 0',
                    boxSizing: 'content-box',
                  }
                : {}
            }
          >
            <img src="all-email-icon.png" alt="two letters" />
          </button>
          <button
            onClick={() => {
              props.setFilter((previous) => {
                return previous === 'NEW' ? '' : 'NEW';
              });
              route.push('/allTickets');
            }}
            style={
              'filter' in props && props.filter === 'NEW'
                ? {
                    marginLeft: '56px',
                    borderRadius: '8px',
                    backgroundColor: '#C4C4C4',
                  }
                : {}
            }
          >
            <img src="new-message-icon.jpg" alt="a letter with the number 1" />
          </button>
          <button>
            <img
              src="urgent-icon.png"
              alt="a letter with an exclamation mark"
            />
          </button>
          <button
            onClick={() => {
              props.setFilter((previous) => {
                return previous === 'unassigned' ? '' : 'unassigned';
              });
              route.push('/allTickets');
            }}
            style={
              'filter' in props && props.filter === 'unassigned'
                ? {
                    marginLeft: '68px',
                    borderRadius: '8px',
                    backgroundColor: '#C4C4C4',
                    padding: '0 8px 8px 0',
                    boxSizing: 'content-box',
                    marginBottom: '-8px',
                  }
                : {}
            }
          >
            <img
              src="email-unassigned-icon.png"
              alt="an open letter with an @ symbol"
            />
          </button>
          <button
            onClick={() => {
              props.setFilter((previous) => {
                return previous === 'CLOSED' ? '' : 'CLOSED';
              });
              route.push('/allTickets');
            }}
            style={
              'filter' in props && props.filter === 'CLOSED'
                ? {
                    marginLeft: '68px',
                    borderRadius: '8px',
                    backgroundColor: '#C4C4C4',

                    padding: '4px 8px 4px 0',
                    boxSizing: 'content-box',
                    marginTop: '44px',
                  }
                : {}
            }
          >
            <img src="archive-icon.jpg" alt="documents in a drawer" />
          </button>
        </div>
        <img src="chat-icon.png" alt="a chat icon" />
        <button
          onClick={() => {
            props.setFilter('none');
            route.push('/data');
          }}
        >
          <img src="data-icon.png" alt="a graph icon" />
        </button>
        <img src="employees-icon.png" alt="an employees icon" />
        <img src="settings-icon.png" alt="a settings icon" />
      </div>
      {props.children}
    </>
  );
}
