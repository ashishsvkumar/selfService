import * as React from "react";
import * as styles from "./ContentTitle.scss";

export interface TitleProps {
  text: string;
}

export const ContentTitle = (props: TitleProps) => <h3 className={styles.content}>{props.text}</h3>;
