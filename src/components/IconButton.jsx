import { Icon } from './Icon';

export const IconButton = ({ icon, actionHandler, buttonClassName = '' }) => {
  return (
    <>
      <button
        className={`hover:cursor-pointer rounded-full bg-white/80 text-sm h-[35px] w-[35px] ${buttonClassName}`}
        onClick={actionHandler}
      >
        <Icon icon={icon} />
      </button>
    </>
  );
};
