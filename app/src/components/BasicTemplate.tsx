export function BasicTemplate({ title = "", ...props }) {
  return (
    <div>
      <div> {title} </div>
      <div> {props.children} </div>
    </div>
  );
}
