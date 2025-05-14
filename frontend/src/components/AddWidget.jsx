import '../styles/AddWidget.css';
import { Card, CardContent, CardHeader } from './Card';
import { CiCirclePlus } from 'react-icons/ci';

export const AddWidget = ({ onClick }) => {
  return (
    <div className="add-widget">
      <Card style={{ width: '100%' }}>
        <CardContent>
          <CardHeader title="Add new budget"></CardHeader>
          <button
            type="submit"
            onClick={onClick}
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <div className="circle-center">
              <CiCirclePlus />
            </div>
          </button>
        </CardContent>
      </Card>
    </div>
  );
};
