import { mockFetch } from "./mock-fetch";
import { parseTree1 } from "./parse-tree1";
import { parseTree2 } from "./parse-tree2";
import { parseTree3 } from "./parse-tree3";
import { FilesTree } from "./FilesTree";

// performance tests
var time = performance.now();
for (var i = 0; i < 1000; i++) parseTree1(mockFetch());
const v1perf = performance.now() - time;
// console.debug("v1:", performance.now() - time);

time = performance.now();
for (i = 0; i < 1000; i++) parseTree2(mockFetch());
const v2perf = performance.now() - time;
// console.debug("v2:", performance.now() - time);

time = performance.now();
for (i = 0; i < 1000; i++) parseTree3(mockFetch());
const v3perf = performance.now() - time;
// console.debug("v3:", performance.now() - time);
// end performance tests

const filesTreeParsed1 = parseTree1(mockFetch());
const filesTreeParsed2 = parseTree2(mockFetch());
const filesTreeParsed3 = parseTree3(mockFetch());

export default function App() {
  return (
    <div>
      <div>Option 1: Original</div>
      <div>{Math.round(v1perf)} ms (x1000 repeats)</div>
      <FilesTree filesTreeParsed={filesTreeParsed1} />

      <div>Option 2: Map by path + name</div>
      <div>{Math.round(v2perf)} ms (x1000 repeats)</div>
      <FilesTree filesTreeParsed={filesTreeParsed2} />

      <div>Option 3: Sort by folder level, update children in place</div>
      <div>{Math.round(v3perf)} ms (x1000 repeats)</div>
      <FilesTree filesTreeParsed={filesTreeParsed3} />
    </div>
  );
}
