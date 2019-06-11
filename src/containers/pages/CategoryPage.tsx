import * as React from "react";
import * as log from "loglevel";
import { connect } from "react-redux";
import { CategoryPage as Component } from "../../components/pages/faq/CategoryPage"
import { getCategories } from "../../store/faq/actions";
import { setBreadcrumbs } from "../../store/breadcrumb/actions";
import { ApplicationState } from "../../store";
import { CategoriesState, Category } from "../../store/faq/types";
import { Spinner } from "../../components/icons/Spinner";
import { isEmptyObject, isEmptyArray, decode } from "../../utils/extras";
import { BreadcrumbEntry } from "../../store/breadcrumb/types";
import { trackPageView, trackEvent } from "../../utils/tracker";
import pathToRegexp = require('path-to-regexp');


class CategoryPage extends React.Component<CategoryPageProps, CategoryPageState> {

    constructor(props: CategoryPageProps) {
        super(props);
        this.state = { ready: false }
    }

    componentWillMount() {
        log.info('Category page countainer will mount 📗');
        const id = this.props.match.params.id;
        this.fetchCategory();
        const heading = this.props.match.params.heading;
        this.props.setBreadcrumbs([ { text: decode(heading), url: `/category/${id}/${heading}`, needLogin: false } ])

        trackPageView('FAQ Category Page')
        trackEvent('FAQ Category', 'View', 'knowledge', decode(heading))
    }

    UNSAFE_componentWillReceiveProps(nextProps: CategoryPageProps) {
        if (nextProps.match.params.id !== this.props.match.params.id) {
            log.info('Category is ',nextProps.match.params.id )
            this.setState({ready: false}, () => this.fetchCategory(nextProps.match.params.id));
            const heading = nextProps.match.params.heading;
            this.props.setBreadcrumbs([ { text: decode(heading), url: location.href, needLogin: false } ])
            trackEvent('FAQ Category', 'View', 'knowledge', decode(heading))
        }
    }

   
    fetchCategory(categoryId?: string) {
        log.info('Fetching from KC');
        if (this.categoryFetched(categoryId)) {
                this.setState( { ready: true } )
        }
    }

    categoryFetched = (categoryId?: string): boolean => {
        const id = categoryId || this.props.match.params.id;
        if (isEmptyObject(this.props.categories) || isEmptyObject(this.props.categories[id])) {
            this.props.getCategories(id).then(this.allSubCategoryFetch);
            return false;
        }
        return !this.props.categories[id].loading
    }

    allSubCategoryFetch = (): boolean => {
        this.setState( { ready: true } )
        return true;
    }
  
    getCategory = (): Category => {
        const id = this.props.match.params.id;
        const category = this.props.categories[id];
        category.subCategories.forEach( subCategory => {
            subCategory.articles.forEach(article => {
                const regexp = pathToRegexp('/:group/:service/:urlKey.html');
                const tokens = regexp.exec(article.articleUrl);
                article.urlKey = tokens[3];
            })
        })
        
        return category;
    }

    render() {
        if (!this.props.match.params || !this.props.match.params.id) {
            return <div>Sorry, the page you are looking for does not exist</div>
        }

        if (this.state.ready) {
            const category = this.getCategory();
            const id = this.props.match.params.id;
            const heading = this.props.match.params.heading;
            return <Component id={id} title={decodeURI(heading)}  subCategories={category.subCategories}/>
        } else {
            return <Spinner />;
        }
    }
}

interface CategoryPageState {
    ready: boolean
}

interface PropsFromDispatch {
    fetchCategoryDetails: Function,
    fetchSectionDetails: Function,
    getCategories: Function,
    setBreadcrumbs: (breadcrumbs: BreadcrumbEntry[]) => void
}

interface PropsFromState {
    categories: CategoriesState,
}

interface PropsFromRoute {
    match: { params: { id: string, heading: string } }
}

type CategoryPageProps = PropsFromDispatch & PropsFromState & PropsFromRoute;

const mapDispatchToProps = {
    getCategories: getCategories,
    setBreadcrumbs: setBreadcrumbs
}

const maptStateToProps = ({ categories }: ApplicationState) => {
    return {
        categories
    };
}

export default connect(maptStateToProps, mapDispatchToProps)(CategoryPage);