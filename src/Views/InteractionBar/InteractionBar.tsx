import { Dispatch, SetStateAction, useState } from "react";
import BookMarkSvg from "../../Assets/SVG/BookMarkSvg";
import CommentsSvg from "../../Assets/SVG/Comments";
import HeartActivedSvg from "../../Assets/SVG/HeartActivedSvg";
import HeartSvg from "../../Assets/SVG/HeartSvg";
import "./InteractionBar.scss";

// type
export interface onClickHeartTypeProps {
  onClickHeart?: () => void;
}
interface InteractionBarTypeProps {
  likes: number;
  setLikes: Dispatch<SetStateAction<number>>;
}
const InteractionBar = ({ likes, setLikes }: InteractionBarTypeProps) => {
  const [heartToggle, setHeartToggle] = useState(true);

  const onClickHeart = () => {
    setHeartToggle(!heartToggle);
    if (heartToggle == true) {
      setLikes(likes + 1);
    } else {
      setLikes(likes - 1);
    }
  };
  return (
    <>
      <div className="InteractionBar">
        <span className="InteractionBar__left">
          {heartToggle ? (
            <HeartActivedSvg onClickHeart={onClickHeart} />
          ) : (
            <HeartSvg onClickHeart={onClickHeart} />
          )}
          <CommentsSvg />
        </span>
        <span className="InteractionBar__right">
          <BookMarkSvg />
        </span>
      </div>
    </>
  );
};

export default InteractionBar;
