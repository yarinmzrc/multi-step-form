import { IFormContext, useForm } from "../../contexts/FormContext";
import { FormContent } from "../FormContent/FormContent";
import { AddonContainer } from "./AddonContainer/AddonContainer";
import "./Addons.scss";

export interface IAddonDetails {
  name: string;
  title: string;
  subtitle: string;
  priceMonthly: number;
  priceYearly: number;
}

const addonsDetails = [
  {
    name: "onlineService",
    title: "Online Service",
    subtitle: "Access to multiplayer games",
    priceMonthly: 1,
    priceYearly: 10,
  },
  {
    name: "largerStorage",
    title: "Larger Storage",
    subtitle: "Extra 1TB of cloud save",
    priceMonthly: 2,
    priceYearly: 20,
  },
  {
    name: "customizedProfile",
    title: "Customizable Profile",
    subtitle: "Custom theme on your profile",
    priceMonthly: 2,
    priceYearly: 20,
  },
];

export const Addons = () => {
  const { formInfo, handleClickOnAddon } = useForm() as IFormContext;
  const { addons } = formInfo;

  return (
    <FormContent
      contentTitle="Pick add-ons"
      contentSubtitle="Add-ons helps enhance your gaming experience."
      hasGoBack
    >
      <div className="add-on-wrapper">
        {addonsDetails.map((addon) => (
          <AddonContainer
            details={addon}
            key={addon.title}
            checked={addons[addon.name as keyof typeof addons]}
            handleClickOnAddon={handleClickOnAddon}
          />
        ))}
      </div>
    </FormContent>
  );
};
