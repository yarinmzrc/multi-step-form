import { useState } from "react";
import { Toggle } from "../Toggle/Toggle";
import { FormContent } from "../FormContent/FormContent";
import iconArcade from "../../assets/images/icon-arcade.svg";
import iconAdvanced from "../../assets/images/icon-advanced.svg";
import iconPro from "../../assets/images/icon-pro.svg";
import "./SelectPlan.scss";
import { IFormContext, Plan, useForm } from "../../contexts/FormContext";

const planDetails = [
  {
    title: Plan.arcade,
    priceMonthly: 9,
    priceYearly: 90,
    iconPath: iconArcade,
  },
  {
    title: Plan.advanced,
    priceMonthly: 12,
    priceYearly: 120,
    iconPath: iconAdvanced,
  },
  { title: Plan.pro, priceMonthly: 15, priceYearly: 150, iconPath: iconPro },
];

const PlanContainer = ({
  iconPath,
  price,
  idx,
  active,
  isMonthly,
  setActivePlan,
  title,
}: {
  iconPath: string;
  title: Plan;
  setActivePlan: React.Dispatch<React.SetStateAction<number>>;
  idx: number;
  isMonthly: boolean;
  active: number;
  price: number;
}) => {
  const { setPlan } = useForm() as IFormContext;
  const priceToShow = `${price}/${isMonthly ? "mo" : "yr"}`;

  const handleSetPlan = (title: Plan) => {
    setActivePlan(idx);
    setPlan(title);
  };

  return (
    <div
      onClick={() => handleSetPlan(title)}
      className={`plan-container ${active === idx ? "active" : ""}`}
    >
      <div className="plan-image">
        <img src={iconPath} alt="" />
      </div>
      <div className="plan-description-container">
        <h3 className="plan-title">{title}</h3>
        <p className="plan-money">{priceToShow}</p>
        {!isMonthly && <p className="plan-months-free">2 months free</p>}
      </div>
    </div>
  );
};

export const SelectPlan = () => {
  const { toggleIsMonthly, formInfo, activePlanIndex } =
    useForm() as IFormContext;
  const { isMonthly } = formInfo;
  const [activePlan, setActivePlan] = useState<number>(activePlanIndex);

  return (
    <FormContent
      hasGoBack
      contentTitle="Select your plan"
      contentSubtitle="You have the option of monthly or yearly billing."
    >
      <div className="plan">
        <div className="plan-wrapper">
          {planDetails.map((plan, idx) => (
            <PlanContainer
              key={plan.title}
              active={activePlan}
              setActivePlan={setActivePlan}
              idx={idx}
              isMonthly={isMonthly}
              title={plan.title}
              iconPath={plan.iconPath}
              price={isMonthly ? plan.priceMonthly : plan.priceYearly}
            />
          ))}
        </div>
        <div className="plan-timed">
          <div className={`plan-timed-item ${isMonthly ? "active" : ""}`}>
            Monthly
          </div>
          <div className="toggle" onClick={toggleIsMonthly}>
            <Toggle savedActiveState={!isMonthly} />
          </div>
          <div className={`plan-timed-item ${!isMonthly ? "active" : ""}`}>
            Yearly
          </div>
        </div>
      </div>
    </FormContent>
  );
};
