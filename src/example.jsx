import React, { useState, useCallback } from "react";

import DropZone from "./DropZone";
import TrashDropZone from "./TrashDropZone";
import SideBarItem from "./SideBarItem";
import Row from "./Row";
import { initialData, initialTitle } from "./initial-data";
import {
  handleMoveWithinParent,
  handleMoveToDifferentParent,
  handleMoveSidebarComponentIntoParent,
  handleRemoveItemFromLayout
} from "./helpers";
import Field from "./Field";

import { SIDEBAR_ITEMS, SIDEBAR_ITEM, COMPONENT, COLUMN } from "./constants";
import shortid from "shortid";
import { build_to_json, save_to_file } from "./build_json";
// import Title from "./Title";


const Container = () => {
  const initialLayout = initialData.layout;
  const initialComponents = initialData.components;
  const [layout, setLayout] = useState(initialLayout);
  const [components, setComponents] = useState(initialComponents);
  const [title, setTitle] = useState(initialTitle.textbook_title);
  const [stage, setStage] = useState(initialTitle.stage);
  const [language, setLanguage] = useState(initialTitle.language);
  const [level, setLevel] = useState(initialTitle.level);
  
  const savetojson = () => {
    // console.log(title, stage, language, level);
    // console.log(layout);
    const result = build_to_json([title, stage, language, level], layout);
    const help = {
      "textbook_summary": {
        "summary_image_src": "",
        "summary_text": ""
      }
    }
    save_to_file(result);
    // console.log(result);
  }

  const handleDropToTrashBin = useCallback(
    (dropZone, item) => {
      const splitItemPath = item.path.split("-");
      setLayout(handleRemoveItemFromLayout(layout, splitItemPath));
    },
    [layout]
  );

  const handleDrop = useCallback(
    (dropZone, item_data) => {
      // console.log('dropZone', dropZone)
      // console.log('item_data', item_data) 
      var item = item_data.data;
      if (item === undefined) {
          item = item_data;
      }

      const splitDropZonePath = dropZone.path.split("-");
      const pathToDropZone = splitDropZonePath.slice(0, -1).join("-");

      const newItem = { id: item.id, type: item.type, path: item.path};
      if (item.type === COLUMN) {
        newItem.children = item.children;
      }

      // sidebar into

      if (item.type === SIDEBAR_ITEM) {
        // 1. Move sidebar item into page
        const newComponent = {
          id: shortid.generate(),
          ...item.component
        };
        const newItem = {
          id: newComponent.id,
          type: item.component.type
        };
        setComponents({
          ...components,
          [newComponent.id]: newComponent
        });
        setLayout(
          handleMoveSidebarComponentIntoParent(
            layout,
            splitDropZonePath,
            newItem
          )
        );
        return;
      }

      // move down here since sidebar items dont have path
      const splitItemPath = item.path.split("-");
      const pathToItem = splitItemPath.slice(0, -1).join("-");

      // 2. Pure move (no create)
      if (splitItemPath.length === splitDropZonePath.length) {
        // 2.a. move within parent
        if (pathToItem === pathToDropZone) {
          setLayout(
            handleMoveWithinParent(layout, splitDropZonePath, splitItemPath)
          );
          return;
        }

        // 2.b. OR move different parent
        // TODO FIX columns. item includes children
        setLayout(
          handleMoveToDifferentParent(
            layout,
            splitDropZonePath,
            splitItemPath,
            newItem
          )
        );
        return;
      }

      // 3. Move + Create
      setLayout(
        handleMoveToDifferentParent(
          layout,
          splitDropZonePath,
          splitItemPath,
          newItem
        )
      );
    },
    [layout, components]
  );

  const renderRow = (row, currentPath) => {
    return (
      <Row
        key={row.id}
        data={row}
        handleDrop={handleDrop}
        components={components}
        path={currentPath}
      />
    );
  };

  // const print_sidebaritem = () => {
  //   return (Object.values(SIDEBAR_ITEM).map((sideBarItem, index) => {
  //     console.log(item);
  //     (<SideBarItem key={sideBarItem.id} data={sideBarItem} />)
  //   }))
  // }

  // dont use index for key when mapping over items
  // causes this issue - https://github.com/react-dnd/react-dnd/issues/342
  return (
    <div className="body">
      <div className="sideBar">
        {Object.values(SIDEBAR_ITEMS).map((sideBarItem, index) => (
          <SideBarItem key={sideBarItem.id} data={sideBarItem} />
        ))}
        <div>
          <button onClick={savetojson}> Save to json </button>
          <button onClick={savetojson}> Save to web </button>
        </div>
      </div>
      <div className="pageContainer">
        <div className="page">
        
        <Field
            value={title}
            inputChange={(e) => setTitle(e.currentTarget.value)}
            active = {title}
            />
          <div >
            <br />  
          
            <Field
            value={stage}
            inputChange={(e) => setStage(e.currentTarget.value)}
            active = {stage}
            />
            <Field
            value={language}
            inputChange={(e) => setLanguage(e.currentTarget.value)}
            active = {language}
            />
            <Field
            value={level}
            inputChange={(e) => setLevel(e.currentTarget.value)}
            active = {level}
            />
          </div>

          {layout.map((row, index) => {
            const currentPath = `${index}`;

            return (
              <React.Fragment key={row.id}>
                <DropZone
                  data={{
                    path: currentPath,
                    childrenCount: layout.length
                  }}
                  onDrop={handleDrop}
                  path={currentPath}
                />
                {renderRow(row, currentPath)}
              </React.Fragment>
            );
          })}
          <DropZone
            data={{
              path: `${layout.length}`,
              childrenCount: layout.length
            }}
            onDrop={handleDrop}
            isLast
          />
        </div>
      </div>
        <div className="fixedBox">
          <TrashDropZone
            data={{
              layout
            }}
            onDrop={handleDropToTrashBin}
          />
        </div>
    </div>
  );
};
export default Container;
