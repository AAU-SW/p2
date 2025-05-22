import { UserWidget } from './UserWidget';

export const Header = ({ title }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 0',
      }}
    >
      <h1>{title}</h1>
      <UserWidget />
    </div>
  );
};
