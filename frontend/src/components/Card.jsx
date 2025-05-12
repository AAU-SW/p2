import '../styles/Card.css';
export const Card = ({ children, style }) => {
  return (
    <div className="card" style={style}>
      {children}
    </div>
  );
};

export const CardContent = ({ children }) => {
  return <>{children}</>;
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
