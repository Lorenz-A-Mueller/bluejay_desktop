import { useRouter } from 'next/dist/client/router';
import { sideBarStyles } from '../utils/styles';
import { SideBarProps } from '../utils/types';
import useWindowDimensions from '../utils/useWindowDimensions';

export default function SideBar(props: SideBarProps) {
  const router = useRouter();

  return (
    <>
      <div css={sideBarStyles(useWindowDimensions().height!)}>
        <div className="circle">
          <img src="icon.png" alt="BlueJay logo" />
        </div>

        <div className="ticket-filter-box">
          <p>Tickets</p>
          <button
            onClick={() => {
              props.setFilter('');
              router.push('/tickets');
            }}
            style={
              'filter' in props &&
              props.filter === '' &&
              router.pathname === '/tickets'
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
              router.push('/tickets');
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
              router.push('/tickets');
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
              alt="an open letter with an @-symbol"
            />
          </button>
          <button
            onClick={() => {
              props.setFilter((previous) => {
                return previous === 'CLOSED' ? '' : 'CLOSED';
              });
              router.push('/tickets');
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
            router.push('/data');
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
