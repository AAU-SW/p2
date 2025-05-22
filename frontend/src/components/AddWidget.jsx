import '../styles/AddWidget.css';
import { Card, CardContent, CardHeader } from './Card';
import { CiCirclePlus } from 'react-icons/ci';

export const AddWidget = ({ onClick, noData }) => {
  return (
    <>
      {noData ? (
        <Card style={{ minWidth: '33%' }}>
          <CardContent>
            <button
              type="submit"
              onClick={onClick}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                height: '100%',
                width: '100%',
              }}
            >
              <div className="circle-center">
                <CiCirclePlus />
                <p>Add new budget</p>
              </div>
            </button>
          </CardContent>
        </Card>
      ) : (
        <Card style={{ width: '100%' }}>
          <CardContent>
            <button
              type="submit"
              onClick={onClick}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                height: '100%',
                width: '100%',
              }}
            >
              <div className="circle-center">
                <CiCirclePlus />
                <p>Add new budget</p>
              </div>
            </button>
          </CardContent>
        </Card>
      )}
    </>
  );
};
