import { useState, useContext, useEffect } from "react";
import { useResource } from "react-request-hook";
import { StateContext } from "./contexts";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { state, dispatch } = useContext(StateContext);
  const { user } = state;

  // const [post, createPost] = useResource(({ title, content, author }) => ({
  //   url: "/post",
  //   method: "post",
  //   data: { title, content, author },
  // }));

  const [post, createPost] = useResource(({ title, content }) => ({
    url: "/post",
    method: "post",
    headers: { Authorization: `${state.user.access_token}` },
    data: { title, content },
  }));

  function handleTitle(evt) {
    setTitle(evt.target.value);
  }
  function handleContent(evt) {
    setContent(evt.target.value);
  }
  function handleCreate() {
    const newPost = { title, content };
    createPost(newPost);
    //dispatch({ type: "CREATE_POST", ...newPost });
    //handleAddPost(newPost);
  }

  useEffect(() => {
    if (post.isLoading === false && post.data) {
      dispatch({
        type: "CREATE_POST",
        title: post.data.title,
        content: post.data.content,
        id: post.data.id,
        author: user.username,
      });
    }
  }, [post]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleCreate();
      }}
    >
      <div>
        Author: <b>{user.username}</b>
      </div>
      <div>
        <label htmlFor="create-title">Title:</label>
        <input
          type="text"
          value={title}
          onChange={handleTitle}
          name="create-title"
          id="create-title"
        />
      </div>
      <textarea value={content} onChange={handleContent} />
      <input type="submit" value="Create" />
    </form>
  );
}
