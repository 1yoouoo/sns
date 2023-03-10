import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import API from "../../API/API";
import HomeHeader from "../../Views/HomeHeader/HomeHeader";
import Nav from "../../Views/Nav/Nav";

import PostList from "../../Views/PostList/PostList";
import "./Home.scss";

const Home = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [posts, setPosts] = useState<any>();
  const [throttle, setThrottle] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const [isLoding, setIsLoding] = useState(false);
  const [lastId, setLastId] = useState<number>(0);

  const isThrottle = (response: AxiosResponse) => {
    if (throttle) return console.log("대기 !");
    if (!throttle) {
      setThrottle(true);
      setTimeout(() => {
        setIsLoding(false);
        console.log("Data provided");
        setPosts([
          ...posts,
          ...response.data.data.newsFeedListResponse.postListDetailResponses,
        ]);
        setThrottle(false);
      }, 1000);
    }
  };
  const areAlmostEndPoint = () => {
    const { scrollTop, offsetHeight, scrollHeight } = document.documentElement;
    if (scrollHeight <= scrollTop + offsetHeight && !isLastPage) {
      console.log("touched!");
      getPosts(lastId);
      console.log("lastId", lastId);
      setIsLoding(true);
    }
  };
  const firstGetPosts = async () => {
    const response = await fetchPosts({
      lastId: undefined,
    });
    const postsResponse = response.data.data.newsFeedListResponse;
    setPosts(postsResponse.postListDetailResponses);
    setIsLastPage(!postsResponse.hasNext);
    setLastId(postsResponse.postListDetailResponses.at(-1)?.postId);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fetchPosts = async (lastId: any) => {
    const response = await API.getPosts(lastId);
    return response;
  };
  const getPosts = async (lastId: number) => {
    const response = await fetchPosts({ lastId: lastId });
    setIsLastPage(!response.data.data.newsFeedListResponse.hasNext);
    setLastId(lastId + 1);
    isThrottle(response);
    return response.data.data;
  };
  useEffect(() => {
    window.addEventListener("scroll", areAlmostEndPoint);
    return () => window.removeEventListener("scroll", areAlmostEndPoint);
  });
  useEffect(() => {
    console.log("first Homepage Mount!");
    firstGetPosts();
  }, []);
  return (
    <div className="Home">
      <HomeHeader />
      <PostList posts={posts} isLoding={isLoding} />
      <Nav />
      <div className="Home__NavGap"></div>
    </div>
  );
};

export default Home;
