import { action } from "typesafe-actions";
import * as log from "loglevel";
import { Article, ArticleActionTypes, Category } from "./types";
import { getCategoriesByUrlKey, getArticleByUrlKey } from "../../api/mtop";

const articleDetailsRequest = (id: string) => action(ArticleActionTypes.ARTILE_DETAILS_REQUEST, id);
const articleDetailsSuccess = (id: string, data: Article) => action(ArticleActionTypes.ARTILE_DETAILS_SUCCESS, { id, data });
const articleDetailsError = (id: string, message: string) => action(ArticleActionTypes.ARTILE_DETAILS_FAILURE, { id, message });


const categoryRequest = (id: string) => action(ArticleActionTypes.CATEGORY_REQUEST, id);
const categorySuccess = (id: string, data: Category) => action(ArticleActionTypes.CATEGORY_SUCCESS, { id, data });
const categoryFailure = (id: string, message: string) => action(ArticleActionTypes.CATEGORY_FAILURE, { id, message });


export function getCategories(id: string) {
    return function (dispatch: (param: any) => any): Promise<Category | string> {

        log.info(`Fetching category from KC- ${id}`)
        dispatch(articleDetailsRequest(id))

        return getCategoriesByUrlKey(id).then((response: any | null) => {
            if (response === null) {
                log.error(`Could not find category-${id}`)
                dispatch(categoryFailure(id, 'Not found'))
                return null
            } else {
                log.info(`Found category-${id}`)
                log.info('Response is-', response.data)
                dispatch(categorySuccess(id, response.data))
                return response.data
            }
        })
    }
}

export function getArticle(id: string) {
    return function (dispatch: (param: any) => any): Promise<Category | string> {

        log.info(`Fetching category from KC- ${id}`)
        dispatch(categoryRequest(id))

        return getArticleByUrlKey(id).then((response: any | null) => {
            if (response === null) {
                log.error(`Could not find category-${id}`)
                dispatch(articleDetailsError(id, 'Not found'))
                return null
            } else {
                log.info(`Found category-${id}`)
                log.info('Response is-', response.data)
                dispatch(articleDetailsSuccess(id, response.data))
                return response.data
            }
        })
    }
}