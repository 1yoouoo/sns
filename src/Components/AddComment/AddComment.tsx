import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { selectedCommentState } from "../../recoil/snsState";
import UserPhoto from "../../sass/styled-components/UserPhoto";
import InputBox from "../../Views/InputBox/InputBox";
import "./AddComment.scss";
export interface CommentType {
  commentContent?: string;
  commentId: number;
  nickName: string;
  updatedAt?: string | Date;
  userProfileImage?: string;
  userProfileImageUrl?: string;
  hasReComment?: boolean;
  commentLikeSize: number;
  reCommentSize: number;
  isCommentLike: boolean;
}
interface AddCommentPropsType {
  onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
  inputRef: React.RefObject<HTMLInputElement>;
  getUserProfile?: getUserProfileType;
}
interface getUserProfileType {
  userProfileImageUrl: string;
  nickName: string;
}

const AddComment = (props: AddCommentPropsType) => {
  const selectedComment = useRecoilValue(selectedCommentState);
  const { onSubmit, inputRef, getUserProfile }: AddCommentPropsType = props;
  const [inputValue, setInputValue] = useState<string>("");
  const onChangeValue = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setInputValue(e.target.value);
  };
  useEffect(() => {
    selectedComment.nickName != "" &&
      setInputValue(`@${selectedComment.nickName} `);
  }, [selectedComment]);
  useEffect(() => {
    return () => {
      setInputValue("");
    };
  }, [onSubmit]);
  return (
    <form className="AddComment" onSubmit={onSubmit}>
      <span className="AddComment__user">
        <UserPhoto
          size="44px"
          userProfileImage={getUserProfile?.userProfileImageUrl}
        />
      </span>
      <span className="AddComment__input">
        <InputBox
          placeholder={`${getUserProfile?.nickName}(으)로 댓글 달기...`}
          type="text"
          onChangeValue={onChangeValue}
          value={inputValue}
          inputRef={inputRef}
        />
        <button className="AddComment__input--button">게시</button>
      </span>
    </form>
  );
};
export default AddComment;
