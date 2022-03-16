import React, { FC } from "react";
import { useSelector } from "react-redux";
import { getUserData } from "../../store/Selectors/selectors";
import { MessageComponentT } from "../../utils/Types";
import s from "./MessageComponent.module.scss";


const MessageComponent: FC<MessageComponentT> = ({
  ...props
}): JSX.Element => {
  
  const { userLogin, text } = props;
  const ownerLogin: string = useSelector(getUserData).userLogin;
  
  
  let wrapClass:string = `${s.wrap}`;
  let containerClass:string = `${s.container}`;

  
  if (ownerLogin === userLogin){
    wrapClass += ` ${s.owner_wrap}`;
    containerClass += ` ${s.owner_message}`;
  } 
  else{
    wrapClass = `${s.wrap}`;
    containerClass = `${s.container}`;
  }

  return (
    <div className={wrapClass}>
      <div className={containerClass}>{text}</div>
    </div>
  );
};

export default MessageComponent;