import shortid from "shortid";

export const SIDEBAR_ITEM = "sidebarItem";
export const ROW = "row";
export const COLUMN = "column";
export const COMPONENT = "component";

export const SIDEBAR_ITEMS = [
  {
    id: shortid.generate(),
    type: SIDEBAR_ITEM,
    component: {
      type: "description",
      content: "해당 스탭 설명"
    }
  },
  {
    id: shortid.generate(),
    type: SIDEBAR_ITEM,
    component: {
      type: "image",
      content: "이미지경로"
    }
  },
  {
    id: shortid.generate(),
    type: SIDEBAR_ITEM,
    component: {
      type: "email",
      content: "Some email"
    }
  },
  {
    id: shortid.generate(),
    type: SIDEBAR_ITEM,
    component: {
      type: "phone",
      content: "Some phone"
    }
  },
  {
    id: shortid.generate(),
    type: SIDEBAR_ITEM,
    component: {
      type: "image",
      content: "Some image"
    }
  }
];
