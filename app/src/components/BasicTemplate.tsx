export function BasicTemplate({ title = "", ...props }) {
  return (
    <>
      <div>
        <p className="text-gray-500 text-lg">{title}</p>{" "}
      </div>
      <> {props.children} </>
    </>
  );
}
