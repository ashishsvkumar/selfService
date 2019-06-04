import * as React from "react";
import * as styles from "./CategoryPage.scss";
import { setTitle } from '../../../utils/container'
import ContactUs from "../../../containers/partials/ContactUs";
import { Section, Article, SubCategory } from "../../../store/faq/types";
import cx from 'classnames';
import { decode, encodeSpace } from "../../../utils/extras";
import { NavigationCard, Theme } from "../../card/NavigationCard";
import { ContentTitle } from "../../labels/ContentTitle";
export const CategoryPage = (props: CategoryPageProps) => {

    setTitle(decode(props.title))

    return (
        <div className={styles.content}>
            <div className={styles.sections}>{props.subCategories.map(subCategory => prepareSection(subCategory, props.id, props.title))}</div>
            <ContactUs />
        </div>
    );
}

function prepareSection(subCategory: SubCategory, categoryId: string, categoryHeading: string) {
    return (
        <div className={styles.section} key={`section-${subCategory.id}`}>
            <div className={styles.section_title}><ContentTitle text={subCategory.name} /></div>
            <div className={cx([styles.cards, styles.only_mobile])}>{ subCategory.articles.map(article => articleLinkMobile(article, categoryId, categoryHeading)) }</div>
            <div className={cx([styles.cards, styles.only_desktop])}>{ subCategory.articles.map(article => articleLinkDesktop(article, categoryId, categoryHeading)) }</div>
        </div>
    )
}

function articleLinkMobile(article: Article, categoryId: string, categoryHeading: string) {
    return (
        <NavigationCard text={article.name} to={`/category/${categoryId}/${categoryHeading}/faq/${article.urlKey}/${encodeSpace(article.name)}`} theme={Theme.STRIP} key={`mobile-article-link-${article.urlKey}`}/>
    )
}

function articleLinkDesktop(article: Article, categoryId: string, categoryHeading: string) {
    return (
        <div className={styles.alt_card} key={`desktop-article-link-${article.urlKey}`}><NavigationCard text={article.name} to={`/category/${categoryId}/${categoryHeading}/faq/${article.urlKey}/${encodeSpace(article.name)}`} theme={Theme.CARD}/></div>
    )
}

export interface CategoryPageProps {
    id: string,
    title: string,
    sections: Section[],
    subCategories: SubCategory[]
}
