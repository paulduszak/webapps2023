import { useReducer, useEffect, useState } from "react";

import CreatePost from "./CreatePost";
import UserBar from "./Userbar";
import PostList from "./PostList";

import { ThemeContext, StateContext } from "./contexts";
import { useResource } from "react-request-hook";
import appReducer from "./reducers";
import Header from "./Header";
import ChangeTheme from "./ChangeTheme";

function App() {
  // const initialPosts = [
  //   {
  //     title: "React Hooks",
  //     content: "The greatest thing since sliced bread!",
  //     author: "Daniel Bugl",
  //   },
  //   {
  //     title: "Using React Fragments",
  //     content: "Keeping the DOM tree clean!",
  //     author: "Daniel Bugl",
  //   },
  //   {
  //     title: "Component Reusability",
  //     content: "Make your components reusable!",
  //     author: "Daniel Bugl",
  //   },
  // ];

  // useEffect(() => {
  //   fetch("/api/posts")
  //     .then((result) => result.json())
  //     .then((posts) => dispatch({ type: "FETCH_POSTS", posts }));
  // }, []);

  const [postResponse, getPosts] = useResource(() => ({
    url: "/posts",
    method: "get",
  }));

  useEffect(getPosts, []);

  useEffect(() => {
    if (postResponse && postResponse.data) {
      dispatch({ type: "FETCH_POSTS", posts: postResponse.data.reverse() });
    }
  }, [postResponse]);

  const [state, dispatch] = useReducer(appReducer, {
    user: "",
    posts: [],
  });

  const { user, posts } = state;

  const [theme, setTheme] = useState({
    primaryColor: "orange",
    secondaryColor: "purple",
  });

  useEffect(() => {
    if (user) {
      document.title = `${user}’s Blog`;
    } else {
      document.title = "Blog";
    }
  }, [user]);

  // const handleAddPost = (newPost) => {
  //   dispatch({ type: "CREATE_POST", ...newPost });
  // };

  return (
    <div>
      <StateContext.Provider value={{ state, dispatch }}>
        <ThemeContext.Provider value={theme}>
          <Header text="Blog" />
          <ChangeTheme theme={theme} setTheme={setTheme} />
          <UserBar />
          <CreatePost />
          <PostList posts={posts} />
        </ThemeContext.Provider>
      </StateContext.Provider>
    </div>
  );
}

export default App;
