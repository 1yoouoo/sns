import { useEffect, useState } from "react";
import UserPhoto from "../../sass/styled-components/UserPhoto";
import InputBox from "../../Views/InputBox/InputBox";
import StyledButton from "../../Views/StyledButton/StyledButton";
import CurrentHeader from "../../Views/UserHeader/CurrentHeader";
import "./EditProfile.scss";

const testData = {
  image_file: "",
  preview_URL: require(`${"/Users/blanc/Documents/Project/sns/src/Assets/blanc.jpeg"}`),
  name: "이지윤",
  userName: "blanc",
  email: "1yoouoo@gmail.com",
  phoneNumber: "01064882739",
};

const EditProfile = () => {
  const [userData, setUserData] = useState<any>();
  const [inputValue, setInputValue] = useState<any>({
    image_file: "",
    preview_URL: testData.preview_URL,
    name: testData.name,
    userName: testData.userName,
    email: testData.email,
    phoneNumber: testData.phoneNumber,
  });
  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue({
      ...inputValue,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };
  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(inputValue);
  };
  const saveImage = (e: any) => {
    e.preventDefault();
    const fileReader = new FileReader();

    if (e.target.files[0]) {
      fileReader.readAsDataURL(e.target.files[0]);
    }
    fileReader.onload = () => {
      setInputValue({
        ...inputValue,
        image_file: e.target.files[0],
        preview_URL: fileReader.result,
      });
    };
    console.log(inputValue);
  };
  useEffect(() => {
    setUserData(testData);
  }, []);
  return (
    <>
      <CurrentHeader current="Edit profile" backwards={true} />
      <div className="EditProfile">
        <form className="Form" onSubmit={onSubmit}>
          <div className="Form__user">
            <UserPhoto size="66px" userProfileImage={inputValue?.preview_URL} />
            <span className="Form__user--wrapper">
              <span className="Form__user--username">{userData?.userName}</span>
              <label className="Form__user--button" htmlFor="photoInput">
                choose profile Photo
              </label>
              <input
                className="Form__user--photo"
                type="file"
                accept="image/*"
                id="photoInput"
                onChange={saveImage}
              />
            </span>
          </div>
          <div className="Form__name">
            <span className="Form__name--label">Name</span>
            <InputBox
              name="name"
              value={inputValue.name}
              onChangeValue={onChangeValue}
            />
          </div>
          <div className="Form__username">
            <span className="Form__username--label">Username</span>
            <InputBox
              name="userName"
              value={inputValue.userName}
              onChangeValue={onChangeValue}
            />
          </div>
          <div className="Form__email">
            <span className="Form__email--label">Email</span>
            <InputBox
              name="email"
              value={inputValue.email}
              onChangeValue={onChangeValue}
            />
          </div>
          <div className="Form__phonenumber">
            <span className="Form__phonenumber--label">PhoneNumber</span>
            <InputBox
              name="phoneNumber"
              value={inputValue.phoneNumber}
              onChangeValue={onChangeValue}
            />
          </div>

          <div className="Form__button">
            <StyledButton
              width="100px"
              height="34px"
              backgroundColor="#0095f6"
              content="On Submit"
              color="#fff"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default EditProfile;
