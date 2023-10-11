import { v4 as uuidv4 } from "uuid";

import Post from "./Post";
export default function PostList({ posts = [] }) {
  return (
    <div>
      {posts.map((p, i) => (
        <Post {...p} key={uuidv4()} />
      ))}
    </div>
  );
}
