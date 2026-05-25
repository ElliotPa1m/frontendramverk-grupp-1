import { Icon } from "./Icon";

export const IconButton = ({ icon, actionHandler }) => {
  return (
    <>
      <button
        className="hover:cursor-pointer rounded-full bg-white/80 text-sm h-[35px] w-[35px]"
        onClick={actionHandler}
      >
        <Icon icon={icon} />
      </button>
    </>
  );
};
