

const form_component = (col) => {
    var components = [];
    col.map((comp, index) => {
        if (comp.type === "image") {
            const new_image = {
                "type": "image",
                "name": "",
                "src": comp.content,
            }
            components.push(new_image);
        } else if (comp.type === "desc") {
            let descc = comp.content.replaceAll("\n", "<br />")
            const new_descp = {
                "type": "desc",
                "description": descc 
            }
            components.push(new_descp);
        } else if (comp.type === "code") {
            const new_code = {
                "type": "code",
                "code": "~~~python \n" + comp.content + "\n ~~~ "
            }
            components.push(new_code);
        } else if (comp.type === "table") {
            const new_table = {
                "type": "table",
                "description": comp.content
            }
            components.push(new_table)
        } else if (comp.type === "list") {
            const new_list = {
                "type": "desc",
                "description": comp.content
            }
            components.push(new_list);
        }
    })
    return components;
}

const form_col = (row) => {
    var step_items = [];
    row.map((col, index) => {
        const result = form_component(col.children);
        const new_col = {
            "title": col.content,
            "tags": [],
            "collapse": false,
            "components": result
        }
        step_items.push(new_col);
    })
    return step_items;
}

const form_row = (contents) => {
    var textbook_contents = []
    contents.map((row, index) => {
        const result = form_col(row.children);
        const new_row = {
            "step_title": row.content,
            "step_no": index,
            "step_items": result
        }
        textbook_contents.push(new_row);
    })
    return textbook_contents;
}


const text_con = (contents) => {
    console.log(contents);
    return form_row(contents);
}

export const save_to_file = (contents) => {
    // window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
    // window.requestFileSystem(window.PERSISTENT, 1024, function(fs) {
    //     fs.root.getFile('C:\Users\JST\Documents\newtextbook_gen\json_generator\mystorage.txt', {create: true, exclusive: true}, function(file) {
    //         file.createWriter(function(writer) {
    //             var blob = new Blob(contents, {type: 'text/plain'});
    //             writer.write(blob);
    //         });
    //     });
    // }, function() {
    //     console.log("Could not access file system");
    // });
    const saveText = JSON.stringify(contents, null, "\t");

    // file setting
    const text = saveText;
    const name = "sample.json";
    const type = "text/plain";

    // create file
    const a = document.createElement("a");
    const file = new Blob([text], { type: type });
    a.href = URL.createObjectURL(file);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
}

export const build_to_json = (titles, contents) => {
    const [title, stage, language, level] = titles;

    const textbook_contents = text_con(contents);

    const textbook = {
        "textbook_title": title,
        "textbook_subtitle": {
            "stage": stage,
            "language": language,
            "level": level
        },
        "textbook_summary": {
            "summary_image_src": "",
            "summary_text": ""
        },
        "textbook_contents": textbook_contents
    }

    return textbook;

}



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