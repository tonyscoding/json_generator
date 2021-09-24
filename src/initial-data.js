import { COMPONENT, ROW, COLUMN } from "./constants";

const initialTitle = {
  textbook_title: "교재 제목",
  stage: "Pioneer",
  language: "Python",
  level: "1"
};

const initialData = {
  layout: [
    {
      type: ROW,
      id: "row0",
      content: "step_title 입력하세요",
      children: [
        {
          type: COLUMN,
          id: "column0",
          content: "step_title_title 입력하세요",
          children: [
            {
              type: COMPONENT,
              id: "component0",
              content: "description content를 입력하세요"
            },
            {
              type: COMPONENT,
              id: "component1",
              content: "description content를 입력하세요"
            }
          ]
        }
      ]
    },
    {
      type: ROW,
      id: "row1",
      content: "step_title 입력하세요",
      children: [
        {
          type: COLUMN,
          id: "column2",
          content: "step_title_title 입력하세요",
          children: [
            {
              type: COMPONENT,
              id: "component0",
              content: "description content를 입력하세요"
            },
            {
              type: COMPONENT,
              id: "component1",
              content: "description content를 입력하세요"
            }
          ]
        }
      ]
    }
  ],
  components: {
    component0: { id: "component0", type: "input", content: "Some input" },
    component1: { id: "component1", type: "image", content: "Some image" },
  }
};

export { initialData, initialTitle };
