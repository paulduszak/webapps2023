import { v4 as uuidv4 } from "uuid";

import Post from "./Post";
export default function PostList({ posts = [] }) {
  return (
    <div>
      {posts.length === 0 && <h2>No posts found.</h2>}
      {posts.length > 0 &&
        posts.map((p, i) => <Post {...p} key={p._id || p.id} />)}
    </div>
  );
}
