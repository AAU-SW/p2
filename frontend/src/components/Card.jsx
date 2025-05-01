import '../styles/Card.css';
export const Card = ({ children }) => {
  return <div className="card">{children}</div>;
};

export const CardContent = ({ children }) => {
  return <div className="card-children">{children}</div>;
};

export const CardHeader = ({ children, title }) => {
  return (
    <div className="card-header">
      <h3>{title}</h3>
      {children}
    </div>
  );
};

export const CardDetails = ({ children }) => {
  return <div className="card-details">{children}</div>;
};
