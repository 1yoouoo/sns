import SingleDotSvg from "../../Assets/SVG/SingleDotSvg";
import "./UserComment.scss";

const UserComment = ({ clickedPost }: any) => {
  console.log("UserComment", clickedPost);
  return (
    <div className="UserComment">
      <div className="UserComment__wrapper">
        <span className="UserComment__username">username</span>
        <span className="UserComment__dot">
          <SingleDotSvg />
        </span>
        <span className="UserComment__created-at">1시간</span>
      </div>
      <div className="UserComment__text">{clickedPost?.postContent}</div>
      <div className="UserComment__comment">
        <span className="UserComment__comment--like">좋아요</span>
        <span className="UserComment__comment--recomment">답글달기</span>
      </div>
    </div>
  );
};

export default UserComment;
