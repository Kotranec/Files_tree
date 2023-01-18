import { useState } from "react";
import ClosedFolder from "./img/closedFolder.jpg";
import OpenedFolder from "./img/openedFolder.jpg";
import File from "./img/file.jpg";
import Minus from "./img/minus.jpg";
import Plus from "./img/plus.jpg";
import "./styles.css";

export function FilesTree({ filesTreeParsed }) {
  const [tree, setTree] = useState(filesTreeParsed);

  const switchStatus = (node, path, index) => {
    if (path.length === 1) {
      return {...node, status : !node.status}
    }

    const pathNext = path.slice(1);
    const nodeNext = node.children.find(item => item.name === pathNext[0]);
    const modifiedNodes = {      
      ...node, 
      children : node.children.map(item => {
        if(item.name === nodeNext.name) {
          return switchStatus(nodeNext, pathNext, index + 1)
        }
        return item;
      })      
    }

    return modifiedNodes;
  }

  const togglHandler = nodeСlicked => {
    const pathNode = nodeСlicked.path.split('/').slice(1);
    pathNode[0] && pathNode.push(nodeСlicked.name);
    
    const nodesToTree =  switchStatus({...tree}, pathNode, 0);
    setTree(nodesToTree);
  };

  const getNode = (item, tab) => {
    const space = 45 * tab + "px";

    const node = (
      <div
        className="tr"
        style={{ marginLeft: space }}
        key={item.name}
        onClick={() => togglHandler(item)}
      >
        {item.type === "folder" && item.children.length > 0 && (
          <div className="blk">
            {item.status ? <img src={Minus} /> : <img src={Plus} />}
          </div>
        )}
        {item.type === "folder" && (
          <div className="blk">
            {item.status ? (
              <img src={OpenedFolder} />
            ) : (
              <img src={ClosedFolder} />
            )}
          </div>
        )}
        {item.type === "file" && (
          <div className="blk">
            <img src={File} />
          </div>
        )}
        <div className="blk label">{item.name}</div>
      </div>
    );
    return node;
  };

  const getFormattedTree = (itemNxt, tabs) => {
    const carentNode = getNode(itemNxt, tabs);

    const lst = itemNxt.status
      ? itemNxt.children.reduce((accNxt, nxt) => {
          const childNodes = getFormattedTree(nxt, tabs + 1);
          return [...accNxt, ...childNodes];
        }, [])
      : [];

    return [carentNode, ...lst];
  };

  const tabs = 1;
  const formattedTree = getFormattedTree(tree, tabs);

  return <div>{formattedTree}</div>;
}
