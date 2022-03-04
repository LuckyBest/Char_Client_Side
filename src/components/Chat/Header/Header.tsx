import React, { FC } from "react";
import { useSelector } from "react-redux";
import { Anonym } from "../../../assets/Anonym.jsx";
import infoButton from "../../../assets/infoButton.svg";
import { getReceiverNickname } from "../../../store/Selectors/selectors";

import s from "./Header.module.scss";

export const Header: FC = ({ ...props }): JSX.Element => {
  const receiverNickname:string = useSelector(getReceiverNickname);

  return (
    <div className={s.container}>
      {
        !!receiverNickname ? (
          <>
            <div className={s.container_person_data}>
              <Anonym />
              <span>{receiverNickname}</span>
            </div>
            <div className={s.container_info_btn}>
              <img src={infoButton} alt="info" />
            </div>
          </>
        )
        : <></>
      }
    </div>
  );
};
