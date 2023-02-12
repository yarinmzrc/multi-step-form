import "./ThankYou.scss";
import Thanks from "../../assets/images/icon-thank-you.svg";

export const ThankYou = () => {
  return (
    <div className="thank-you-wrapper">
      <img src={Thanks} alt="thank you!" />
      <p>
        Thanks for confirming your subscription! We hope you have fun using our
        platform. if you ever need support, please feel free to email us at
        support@loremgaming.com.
      </p>
    </div>
  );
};
