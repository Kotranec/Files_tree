
export function FilesTree({filesTreeParsed}) {

  const getFormattedTree = (tr, calc) => {
    if(!calc){                                              // первый запуск (не рекурсия)        
        const lst = getFormattedTree(tr, true);
        return lst.reduce((acc, item) => acc += item + "\r\n", '');
    }
  
    if(!tr.arr || tr.arr.length === 0)
        return ["-" + tr.name];

    const lst = tr.arr.reduce((accNxt, itemLst, indexLst) => {
      const nxt = getFormattedTree(itemLst, true);
      return [...accNxt, ...nxt.reduce((accNxt, itemNxt, indexNxt) => {
        return [...accNxt, ( 
          ((indexNxt === 0) ?
          ((indexLst !== (tr.arr.length - 1)) ?
            (itemLst.arr.length ? " +-" : " |-") :
            (itemLst.arr.length ? " +-": " L-")) :
          (indexLst + 1 !== tr.arr.length ? " |   ": "\t")
          ) 
          + itemNxt)];
        },[])
      ]
    },[]);

    return ["-" + tr.name, ...lst];
  }

  const formattedTree = getFormattedTree(filesTreeParsed);  
  
  return (
    <div className="files-tree" style={{ marginLeft: "100px", whiteSpace: "pre-wrap"}}>
      <p>{formattedTree}</p>
    </div>
  );
}