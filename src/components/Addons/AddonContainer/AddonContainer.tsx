import { IFormContext, useForm } from "../../../contexts/FormContext";
import { IAddonDetails } from "../Addons";
import "./AddonContainer.scss";
export const AddonContainer = ({
  checked,
  handleClickOnAddon,
  details,
}: {
  details: IAddonDetails;
  checked: boolean;
  handleClickOnAddon: (item: string) => void;
}) => {
  const { formInfo } = useForm() as IFormContext;
  const { isMonthly } = formInfo;

  const priceToShow = isMonthly
    ? `+$${details.priceMonthly}/mo`
    : `+$${details.priceYearly}/yr`;
  return (
    <div
      onClick={() => handleClickOnAddon(details.name)}
      className={`add-on-container ${checked ? "active" : ""}`}
    >
      <input
        className="checkbox"
        type="checkbox"
        name="checkbox"
        checked={checked}
        onChange={() => handleClickOnAddon(details.name)}
        id={details.name}
      />
      <div className="add-on-description">
        <h3>{details.title}</h3>
        <p>{details.subtitle}</p>
      </div>
      <p className="add-on-price">{priceToShow}</p>
    </div>
  );
};
