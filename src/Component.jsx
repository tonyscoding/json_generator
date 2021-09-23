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
  const [fieldinput, setFieldinput] = useState(false);

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
  const [content, setComponent] = useState(components[data.id].content)

  return (
    <div
      ref={ref}
      style={{ ...style, opacity }}
      className="component draggable"
    >
      <div>{data.id}</div>
      <div>
        <Field
          value={content}
          fieldinput={fieldinput}
          inputChange={(e) => setComponent(e.currentTarget.value)}
          active = {content}
          />
      </div>
    </div>
  );
};
export default Component;
