

const build_to_json = (titles, contents) => {
    const [title, stage, language, level] = titles;


    textbook = {
        "textbook_title": title,
        "textbook_subtitle": {
            "stage": stage,
            "language": language,
            "level": level
        },
        "textbook_summary": {
            "summary_image_src": "",
            "summary_text": ""
        }
    }
}

export default build_to_json;

// Red row object => step_title
// blue col object => step_items
// {
//     step_title: "",
//     step_no: "",
//     step_items: [
//         title: "",
//         tags: []
//         collapse: false,
//         images: [{
//             name: "",
//             src: "",
//             description: ""
//         }]
     
//         description_title: "",
//         descriptions: [
//             {
//                 content: "",
//                 sub_content: ""
//             }
//         ]
//     ],
// }