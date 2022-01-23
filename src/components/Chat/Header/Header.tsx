import React, { FC } from "react";
import { Anonym } from "../../../assets/Anonym.jsx";
import infoButton from "../../../assets/infoButton.svg";

import s from "./Header.module.scss";

export const Header: FC = ({ ...props }): JSX.Element => {
  return (
    <div className={s.container}>
      <div className={s.container_person_data}>
        <Anonym />
        <span>Anonym Anonym Anonym</span>
      </div>
      <div className={s.container_info_btn}>
        <img src={infoButton} alt="info" />
      </div>
    </div>
  );
};
