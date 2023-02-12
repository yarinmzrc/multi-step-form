import { EAddons, IFormContext, useForm } from "../../contexts/FormContext";
import { FormContent } from "../FormContent/FormContent";
import "./Summary.scss";
export const Summary = () => {
  const { addonsPricesToShow, formInfo, planPrice, getBackToPlanStep } =
    useForm() as IFormContext;
  const { isMonthly, plan, totalPrice } = formInfo;
  const planPriceToShow = isMonthly ? `$${planPrice}/mo` : `$${planPrice}/yr`;
  const totalPriceToShow = `$${totalPrice}/${isMonthly ? "mo" : "yr"}`;

  const addonsPriceToShow = (val: number) =>
    isMonthly ? `+$${val}/mo` : `+$${val}/yr`;

  return (
    <FormContent
      contentTitle="Finishing up"
      contentSubtitle="Double-check everithing looks OK before confirming."
      hasGoBack
    >
      <div className="summary-wrapper">
        <div className="summary-container">
          <div className="summary-plan">
            <h3>
              {plan}
              {isMonthly ? "(Monthly)" : "(Yearly)"}
            </h3>
            <button onClick={getBackToPlanStep} className="change-plan-btn">
              Change
            </button>
          </div>
          <div className="summary-plan-price">{planPriceToShow}</div>
        </div>
        <div className="line"></div>
        {Object.entries(addonsPricesToShow).map(([key, val]) => (
          <div className="addon-item" key={key}>
            <span>{EAddons[key as keyof typeof EAddons]}</span>
            <span>{addonsPriceToShow(val)}</span>
          </div>
        ))}
      </div>
      <div className="total-container">
        <p>Total (per {isMonthly ? "Month" : "Year"})</p>
        <p className="total-price">{totalPriceToShow}</p>
      </div>
    </FormContent>
  );
};
