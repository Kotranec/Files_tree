export function parseTree1(treeJson) {
    const filesTreeParsed = JSON.parse(treeJson);
  
    function getFilesTreeNode(accNodes, nextNode) {
      // Reserve
      // Create multiple new subfolders at once
      //
      // if (nextNode.pathArr.length > 0 &&
      //     Object.keys(accNodes).length === 0) {
      //     const createdFolder = {
      //         name : nextNode.pathArr[0],
      //         type : 'folder',
      //         status : true,
      //         children : [
      //                 getFilesTreeNode(
      //                     {},
      //                     {...nextNode,
      //                     ...{pathArr : nextNode.pathArr.slice(1)}}
      //                 )
      //         ]
      //     };
  
      //     return createdFolder;
      // }
  
      if (nextNode.pathArr.length === 0) {
        // Create a file or folder
        const nodesArr =
          Object.keys(accNodes).length > 0 
            ? [
                ...accNodes.children,
                {
                  name: nextNode.name,
                  type: nextNode.type,
                  status: true,
                  path: nextNode.path,
                  children: []
                }
              ]
            : [];
        return { ...nextNode, children: nodesArr };
      } else {
        const indexToInsert = accNodes.children?.findIndex(
          (i) => i.name === nextNode.pathArr[1]
        );
  
        if (indexToInsert > -1) {
          // Adding to an existing folder
          const insertedNode = {
            ...accNodes,
            children: [
              ...accNodes.children.map((item, index) => {
                if (index === indexToInsert) {
                  return getFilesTreeNode(accNodes.children[indexToInsert], {
                    ...nextNode,
                    ...{ pathArr: nextNode.pathArr.slice(1) }
                  });
                }
                return item;
              })
            ]
          };
          return insertedNode;
        } else {
          // Adding a new folder or file
          const newNode = {
            name: accNodes?.name,
            type: "folder",
            status: true,
            path: accNodes?.path,
            children: [
              ...accNodes?.children,
              getFilesTreeNode(
                {},
                { ...nextNode, ...{ pathArr: nextNode.pathArr.slice(1) } }
              )
            ]
          };
          return newNode;
        }
      }
    }
  
    const filesTreeNodes = filesTreeParsed.reduce((acc, item, index) => {
      if (index === 0) {
        return {
          name: item.name,
          type: item.type,
          status: true,
          path: item.path,
          children: []
        };
      }
      return getFilesTreeNode(acc, {
        ...item,
        ...{ pathArr: item.path.split("/").slice(1) }
      });
    }, {});
  
    return filesTreeNodes;
  }
  