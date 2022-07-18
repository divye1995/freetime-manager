import { PropsWithChildren } from "react";

function CardHolder(props: PropsWithChildren) {
  return (
    <div className="background-light px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
      <div className="mx-auto ">{props.children}</div>
    </div>
  );
}
export default CardHolder;
