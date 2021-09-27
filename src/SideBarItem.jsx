import React from "react";
import { SIDEBAR_ITEM } from "./constants";
import { useDrag } from "react-dnd";

const SideBarItem = ({ data }) => {
  const [{ opacity }, drag] = useDrag({
    type: SIDEBAR_ITEM,
    item: { data, content: "이미지 경로나 설명을 써주세요." },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.4 : 1
    })
  });
  
  return (
    <div>
      <div className="sideBarItem" ref={drag} style={{ opacity }}>
        {data.component.type}
      </div>
    </div>
  );
};
export default SideBarItem;
