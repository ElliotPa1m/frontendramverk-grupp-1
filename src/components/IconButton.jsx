import { Icon } from "./Icon";

export const IconButton = ({ icon, actionHandler }) => {
  return (
    <>
      <button
        className="hover:cursor-pointer rounded-xl bg-white/80 px-2 py-1 text-sm"
        onClick={actionHandler}
      >
        <Icon icon={icon} />
      </button>
    </>
  );
};
