import "./headerTitle.scss";

export const HeaderTitle = (props) => {
  const { pageName } = props;

  return (
    <div className="container-header-title">
      <h2>{pageName}</h2>
    </div>
  );
};
