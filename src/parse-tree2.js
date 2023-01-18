/**
 * New version
 * @param {*} treeJson string
 */
export function parseTree2(treeJson) {
    const filesTreeParsed = JSON.parse(treeJson);
  
    const treeObj = {};
  
    for (const item of filesTreeParsed) {
      treeObj[item.path.replace(/\/$/, "") + "/" + item.name] = {
        ...item,
        status: true,
        children: []
      };
    }
  
    Object.keys(treeObj).forEach((key) => {
      const item = treeObj[key];
      if (treeObj[item.path]) {
        treeObj[item.path].children.push(item);
      }
    });
  
    return treeObj["/root"];
  }
  