import React, { useRef, useState } from "react";
import { useDrag } from "react-dnd";
import { COMPONENT } from "./constants";
import Field from "./Field";

const style = {
  border: "1px dashed black",
  padding: "0.5rem 1rem",
  backgroundColor: "white",
  cursor: "move"
};
const Component = ({ data, components, path }) => {
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: COMPONENT, 
    item: { id: data.id, path },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  const opacity = isDragging ? 0 : 1;
  drag(ref);

  // const component = components[data.id];
  const [content, setContent] = useState(data.content)

  const handle_input_change = (e) => {
    setContent(e.currentTarget.value);
    data.content = content;
  }

  return (
    <div
      ref={ref}
      style={{ ...style, opacity }}
      className="component draggable"
    >
      <div>{data.type}</div>
      <div>
        <Field
          value={content}
          inputChange={handle_input_change}
          active = {content}
          />
      </div>
    </div>
  );
};
export default Component;
