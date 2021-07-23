import React from "react";
import { CardActionArea } from "@material-ui/core";
import UserInfo from "./UserInfo";

const UserInfoButton = ({ imageUrl, header, subheader, ...props }) => {
  return (
    <CardActionArea style={{ height: 65 }} {...props}>
      <UserInfo imageUrl={imageUrl} header={header} subheader={subheader} />
    </CardActionArea>
  );
};

export default UserInfoButton;
