import { UserWidget } from './UserWidget';

export const Header = ({ title, subTitle }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 0',
      }}
    >
      <div>
        <h1>{title}</h1>
        <p className="sub-header">{subTitle}</p>
      </div>
      <UserWidget />
    </div>
  );
};
