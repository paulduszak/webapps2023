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
  // useEffect(getPosts, []);

  // useEffect(() => {
  //   if (postResponse && postResponse.data) {
  //     dispatch({ type: "FETCH_POSTS", posts: postResponse.data.reverse() });
  //   }
  // }, [postResponse]);

  const [state, dispatch] = useReducer(appReducer, {
    user: "",
    posts: [],
  });

  const { user, posts } = state;

  const [theme, setTheme] = useState({
    primaryColor: "orange",
    secondaryColor: "purple",
  });

  const [postsResponse, getPosts] = useResource(() => ({
    url: "/post",
    method: "get",
    headers: { Authorization: `${state?.user?.access_token}` },
  }));

  useEffect(() => {
    getPosts();
  }, [state?.user?.access_token]);
  useEffect(() => {
    if (
      postsResponse &&
      postsResponse.isLoading === false &&
      postsResponse.data
    ) {
      dispatch({
        type: "FETCH_POSTS",
        posts: postsResponse.data.reverse(),
      });
    }
  }, [postsResponse]);

  useEffect(() => {
    if (user) {
      document.title = `${user.username}’s Blog`;
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
