import { Icon } from "./Icon";

export const IconWithInfo = ({ icon, timeToCook }) => {
  return (
    <>
      <div className="rounded-xl bg-white/80 px-2">
        <Icon icon={icon} />
        {timeToCook.replace("PT", "")}
      </div>
    </>
  );
};
