import React, { useRef, useState } from "react";
import { useDrag } from "react-dnd";
import { COLUMN } from "./constants";
import DropZone from "./DropZone";
import Component from "./Component";
import Field from "./Field";

const style = {};
const Column = ({ data, components, handleDrop, path }) => {
  const ref = useRef(null);

  const [content, setContent] = useState("Step item title 입력")

  const [{ isDragging }, drag] = useDrag({
    type: COLUMN,
    item: {
      id: data.id,
      children: data.children,
      path
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  const opacity = isDragging ? 0 : 1;
  drag(ref);

  const renderComponent = (component, currentPath) => {
    return (
      <Component
        key={component.id}
        data={component}
        components={components}
        path={currentPath}
      />
    );
  };

  const handle_input_change = (e) => {
    setContent(e.currentTarget.value);
    data.content = content;
  }

  return (
    <div
      ref={ref}
      style={{ ...style, opacity }}
      className="base draggable column"
    >
      {data.id}
      <Field
        value={content}
        inputChange={handle_input_change}
        active = {content}
      />
      {data.children.map((component, index) => {
        
        const currentPath = `${path}-${index}`;

        return (
          <React.Fragment key={component.id}>
            <DropZone
              data={{
                path: currentPath,
                childrenCount: data.children.length
              }}
              onDrop={handleDrop}
            />
            {renderComponent(component, currentPath)}
          </React.Fragment>
        );
      })}
      <DropZone
        data={{
          path: `${path}-${data.children.length}`,
          childrenCount: data.children.length
        }}
        onDrop={handleDrop}
        isLast
      />
    </div>
  );
};
export default Column;
