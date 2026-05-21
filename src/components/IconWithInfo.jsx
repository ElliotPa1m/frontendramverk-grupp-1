import { Icon } from "./Icon";

export const IconWithInfo = ({ icon, timeToCook }) => {
  return (
    <>
      <div className="rounded-xl bg-white/80 px-2 py-1 text-sm">
        <Icon icon={icon} />
        {timeToCook.replace("PT", "")}
      </div>
    </>
  );
};
