import React, { useRef, useState } from "react";
import { useDrag } from "react-dnd";
import { ROW } from "./constants";
import DropZone from "./DropZone";
import Column from "./Column";
import Field from "./Field";

const style = {};
const Row = ({ data, components, handleDrop, path }) => {
  const ref = useRef(null);
  const [content, setContent] = useState("Step title 입력")

  const [{ isDragging }, drag] = useDrag({
    type: ROW,
    item: {
      id: data.id,
      children: data.children,
      content: content,
      path
    },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  const opacity = isDragging ? 0 : 1;
  drag(ref);

  const update_content = () => {
    data.content = content;
  }

  const renderColumn = (column, currentPath) => {
    return (
      <Column
        key={column.id}
        data={column}
        components={components}
        handleDrop={handleDrop}
        path={currentPath}
      />
    );
  };

  const handle_input_change = (e) => {
    setContent(e.currentTarget.value);
    data.content = content;
  }

  return (
    <div ref={ref} style={{ ...style, opacity }} className="base draggable row">
      {data.id}
        <Field 
          value={content}
          inputChange={handle_input_change}
          active = {content}
        />
      <div >
        {data.children.map((column, index) => {
          const currentPath = `${path}-${index}`;

          return (
            <React.Fragment key={column.id}>
              <DropZone
                data={{
                  path: currentPath,
                  childrenCount: data.children.length,
                }}
                onDrop={handleDrop}
                // className="horizontalDrag"
              />
              {renderColumn(column, currentPath)}
            </React.Fragment>
          );
        })}
        <DropZone
          data={{
            path: `${path}-${data.children.length}`,
            childrenCount: data.children.length
          }}
          onDrop={handleDrop}
          // className="horizontalDrag"
          isLast
        />
      </div>
    </div>
  );
};
export default Row;
