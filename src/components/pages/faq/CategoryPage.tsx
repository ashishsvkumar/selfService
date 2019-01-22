import * as React from "react";
import * as styles from "./CategoryPage.scss";
import { setTitle } from '../../../utils/container'
import { ContactUs } from "../../card/ContactUs";
import { Section, Article } from "../../../store/faq/types";
import { Link } from "react-router-dom";
import { decode, encodeSpace } from "../../../utils/extras";
import { NavigationCard, Theme } from "../../card/NavigationCard";
import { ContentTitle } from "../../labels/ContentTitle";

export const CategoryPage = (props: CategoryPageProps) => {

    setTitle(decode(props.title))

    return (
        <div className={styles.content}>
            <div className={styles.sections}>{props.sections.map(prepareSection)}</div>
            <ContactUs />
        </div>
    );
}

function prepareSection(section: Section) {
    return (
        <div className={styles.section} key={`section-${section.id}`}>
            <div className={styles.section_title}><ContentTitle text={section.name} /></div>
            <div className={styles.cards}>{ section.articles.map(articleLink) }</div>
        </div>
    )
}

function articleLink(article: Article) {
    return (
        <NavigationCard text={article.title} to={`/faq/${article.id}/${encodeSpace(article.title)}`} theme={Theme.STRIP} key={`article-link-${article.id}`}/>
    )
}

export interface CategoryPageProps {
    title: string,
    sections: Section[]
}
