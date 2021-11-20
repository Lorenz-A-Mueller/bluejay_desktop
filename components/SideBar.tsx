import { useRouter } from 'next/dist/client/router';
import Image from 'next/image';
import allEmailIcon from '../public/all-email-icon.png';
import archiveIcon from '../public/archive-icon.jpg';
import chatIcon from '../public/chat-icon.png';
import dataIcon from '../public/data-icon.png';
import emailUnassignedIcon from '../public/email-unassigned-icon.png';
import employeesIcon from '../public/employees-icon.png';
import icon from '../public/icon.png';
import newMessageIcon from '../public/new-message-icon.jpg';
import settingsIcon from '../public/settings-icon.png';
import urgentIcon from '../public/urgent-icon.png';
import { employeeDataFetch } from '../utils/queries';
import { sideBarStyles } from '../utils/styles';
import { SideBarProps } from '../utils/types';
import useWindowDimensions from '../utils/useWindowDimensions';

export default function SideBar(props: SideBarProps) {
  const router = useRouter();

  return (
    <>
      <div css={sideBarStyles(useWindowDimensions().height!)}>
        <div className="circle">
          <Image src={icon} alt="a bluejay" />
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
            <Image src={allEmailIcon} alt="two letters" />
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
            <Image src={newMessageIcon} alt="a letter with the number 1" />
          </button>
          <button
            onClick={() => {
              props.setFilter((previous) => {
                return previous === 'urgent' ? '' : 'urgent';
              });
              router.push('/tickets');
            }}
            style={
              'filter' in props && props.filter === 'urgent'
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
            <Image src={urgentIcon} alt="a letter with an exclamation mark" />
          </button>
          {'employee' in props && 'isAdmin' in props && props.isAdmin && (
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
              <Image
                src={emailUnassignedIcon}
                alt="an opened letter with an @-symbol"
              />
            </button>
          )}
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
            <Image src={archiveIcon} alt="documents in a drawer" />
          </button>
        </div>
        <button>
          <Image src={chatIcon} alt="two speech bubbles" />
        </button>
        {'employee' in props && 'isAdmin' in props && props.isAdmin && (
          <button
            onClick={() => {
              props.setFilter('none');
              router.push('/data');
            }}
          >
            <Image src={dataIcon} alt="a pie-chart" />
          </button>
        )}
        {'employee' in props && 'isAdmin' in props && props.isAdmin && (
          <button>
            <Image src={employeesIcon} alt="an employees icon" />
          </button>
        )}
        <button>
          <Image src={settingsIcon} alt="a settings icon" />
        </button>
      </div>
      {props.children}
    </>
  );
}
