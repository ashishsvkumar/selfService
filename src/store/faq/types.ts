export interface Article {
    id?: number,
    name?: string,
    articleUrl?: string,
    body?:string,
    urlKey?:string,
    loading?: boolean,
    errors?: string
}

export interface ArticleBody {
    content?: string,
    urlKey?:string,
    name?:string,
    loading?: boolean,
    errors?: string
}


export interface Section {
    id?: string,
    name?: string,
    articles?: Article[],
    loading?: boolean,
    errors?: string
}

export interface Category {
    id?: string,
    name?: string,
    subCategories?: SubCategory[],
    loading?: boolean,
    errors?: string
}

export interface SubCategory {
    id?: string,
    name?: string,
    articles?: Article[],
    loading?: boolean,
    errors?: string
}


export const enum ArticleActionTypes {
    ARTILE_DETAILS_REQUEST = "article/details/request",
    ARTILE_DETAILS_SUCCESS = "article/details/success",
    ARTILE_DETAILS_FAILURE = "article/details/failure",

    CATEGORY_REQUEST = "category/request",
    CATEGORY_SUCCESS = "category/success",
    CATEGORY_FAILURE = "category/failure",

    SECTION_REQUEST = "section/request",
    SECTION_SUCCESS = "section/success",
    SECTION_FAILURE = "section/failure"
}

export interface ArticlesState {
    [articleId: string]: ArticleBody
}

export interface SectionsState {
    [sectionId: number]: Section
}

export interface CategoriesState {
    [cateogryId: string]: Category
}