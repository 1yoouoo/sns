import { clickedPostTypeProps } from "../../Pages/PostDetail/PostDetail";
import UserPhoto from "../../sass/styled-components/UserPhoto";
import UserComment from "../UserComment/UserComment";
import "./PostContent.scss";

const PostContent = ({ clickedPost }: clickedPostTypeProps) => {
  return (
    <div className="PostContent">
      <div className="PostContent__author">
        <UserPhoto size="44px" />
      </div>
      <UserComment clickedPost={clickedPost} />
    </div>
  );
};

export default PostContent;
