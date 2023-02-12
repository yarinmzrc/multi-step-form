import "./Navigation.scss";

const stepsInfo = [
  { title: "STEP 1", info: "YOUR INFO" },
  { title: "STEP 2", info: "SELECT PLAN" },
  { title: "STEP 3", info: "ADD-ONS" },
  { title: "STEP 4", info: "SUMMARY" },
];

export const Navigation = ({ idx = 0 }: { idx: number }) => {
  return (
    <div className="navigation-wrapper">
      {stepsInfo.map((item, index) => (
        <div key={item.title} className="step">
          <div className={`step-number ${idx === index ? "active" : ""}`}>
            {index + 1}
          </div>
          <div className="step-info">
            <h4 className="step-info-title">{item.title}</h4>
            <p className="step-info-content">{item.info}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
