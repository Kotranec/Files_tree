const sortAllChildrenByName = (obj) => {
    obj.children.sort((a, b) => a.name.localeCompare(b.name));
    obj.children.forEach((child) => sortAllChildrenByName(child));
  };
  
  export function parseTree3(treeJson) {
    const filesTreeParsed = JSON.parse(treeJson);
  
    filesTreeParsed.sort((a, b) => {
      return a.path.split("/").length - b.path.split("/").length;
    });
  
    while (filesTreeParsed.length > 1) {
      const lastItem = filesTreeParsed.pop();
      lastItem.status = true;
      lastItem.children = lastItem.children || [];
      const lastItemParentPath = lastItem.path;
      const parent = filesTreeParsed.find((parent) => {
        return (
          parent.path.replace(/\/$/, "") + "/" + parent.name ===
          lastItemParentPath
        );
      });
      parent.status = true;
      if (Array.isArray(parent.children)) parent.children.push(lastItem);
      else parent.children = [lastItem];
    }
  
    sortAllChildrenByName(filesTreeParsed[0]);
  
    return filesTreeParsed[0];
  }
  