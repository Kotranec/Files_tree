const filesTree = [
      { name: "root", path: "/", type : 'folder' },
      { name: "folder 1", path: "/root", type : 'folder' },
      { name: "file 1 in folder 1", path: "/root/folder 1", type : 'file' },
      { name: "file 2 in folder 1", path: "/root/folder 1", type : 'file' },
      { name: "folder 2", path: "/root", type : 'folder' },
      { name: "folder 1 in folder 2", path: "/root/folder 2", type : 'folder' },
      { name: "file 1 folder 1 in folder 2", path: "/root/folder 2/folder 1 in folder 2", type : 'file' },     
    ];
  
export function mockFetch() {
  return JSON.stringify(filesTree)
}
