import * as React from "react";
import * as log from "loglevel";
import { connect } from "react-redux";
import { CategoryPage as Component } from "../../components/pages/faq/CategoryPage"
import { fetchCategoryDetails, fetchSectionDetails, getCategoriesFromKc } from "../../store/faq/actions";
import { setBreadcrumbs } from "../../store/breadcrumb/actions";
import { ApplicationState } from "../../store";
import { CategoriesState, SectionsState, Category } from "../../store/faq/types";
import { Spinner } from "../../components/icons/Spinner";
import { isEmptyObject, isEmptyArray, decode } from "../../utils/extras";
import { BreadcrumbEntry } from "../../store/breadcrumb/types";
import { trackPageView, trackEvent } from "../../utils/tracker";

class CategoryPage extends React.Component<CategoryPageProps, CategoryPageState> {

    constructor(props: CategoryPageProps) {
        super(props);
        this.state = { ready: false }
    }

    componentWillMount() {
        log.info('Category page countainer will mount 📗');
        const id = this.props.match.params.id;
        this.fetchCategoryFromKc();
        const heading = this.props.match.params.heading;
        this.props.setBreadcrumbs([ { text: decode(heading), url: `/category/${id}/${heading}`, needLogin: false } ])

        trackPageView('FAQ Category Page')
        trackEvent('FAQ Category', 'View', 'knowledge', decode(heading))
    }

    UNSAFE_componentWillReceiveProps(nextProps: CategoryPageProps) {
        if (nextProps.match.params.id !== this.props.match.params.id) {
            log.info('Category is ',nextProps.match.params.id )
            this.setState({ready: false}, () => this.fetchCategoryFromKc(nextProps.match.params.id));
            const heading = nextProps.match.params.heading;
            this.props.setBreadcrumbs([ { text: decode(heading), url: location.href, needLogin: false } ])

            trackEvent('FAQ Category', 'View', 'knowledge', decode(heading))
        }
    }

    fetchCategory(categoryId?: string) {
        log.info('Fetching from KC');
        if (this.categoryFetched(categoryId)) {
            if(this.allSectionsFetch()) {
                this.setState( { ready: true } )
            }
        }
    }

   

    categoryFetched = (categoryId?: string): boolean => {
        const id = categoryId || this.props.match.params.id;
        if (isEmptyObject(this.props.categories) || isEmptyObject(this.props.categories[id])) {
            this.props.fetchCategoryDetails(id).then(this.allSectionsFetch);
            return false;
        }
        return !this.props.categories[id].loading
    }

    fetchCategoryFromKc(categoryId?: string) {
        log.info('Fetching from KC');
        if (this.categoryFetchedFromKc(categoryId)) {
                this.setState( { ready: true } )
        }
    }

    categoryFetchedFromKc = (categoryId?: string): boolean => {
        const id = categoryId || this.props.match.params.id;
        if (isEmptyObject(this.props.categories) || isEmptyObject(this.props.categories[id])) {
            this.props.getCategoriesFromKc(id).then(this.allSubCategoryFetch);
            return false;
        }
        return !this.props.categories[id].loading
    }

    allSubCategoryFetch = (): boolean => {
        this.setState( { ready: true } )
        return true;
    }

    allSectionsFetch = (): boolean => {
        const id = this.props.match.params.id;
        const category = this.props.categories[id];

        const sectionsNotExisting = category.subCategories.filter(sec => isEmptyObject(this.props.sections[sec.id]))
        if (!isEmptyArray(sectionsNotExisting)){
            sectionsNotExisting.forEach(section => this.props.fetchSectionDetails(section.id).then(this.allSectionsReady));
            return false;
        }

        return category.subCategories.every(sec => !this.props.sections[sec.id].loading)
    }

    allSectionsReady = () => {
        const id = this.props.match.params.id;
        const category = this.props.categories[id];

        const sectionsFetching = category.subCategories.filter(sec => this.props.sections[sec.id].loading);
        if (isEmptyArray(sectionsFetching)) {
            this.setState( { ready: true } )
        }
    }

    allArticlesReady = () => {
        const id = this.props.match.params.id;
        const category = this.props.categories[id];
        this.setState( { ready: true } )
        
    }

    getCategory = (): Category => {
        const id = this.props.match.params.id;
        const category = this.props.categories[id];

        return {
            id: id, 
            subCategories: category.subCategories.map(sec => {
                return { ...sec, articles: this.props.sections[sec.id].articles }
            })
        }
    }

    getCategoryKc = (): Category => {
        const id = this.props.match.params.id;
        return this.props.categories[id];
    }

    render() {
        if (!this.props.match.params || !this.props.match.params.id) {
            return <div>Sorry, the page you are looking for does not exist</div>
        }

        if (this.state.ready) {
            const category = this.getCategoryKc();
            const id = this.props.match.params.id;
            const heading = this.props.match.params.heading;
            return <Component id={id} title={decodeURI(heading)} sections={category.subCategories}  subCategories={category.subCategories}/>
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
    getCategoriesFromKc: Function,
    setBreadcrumbs: (breadcrumbs: BreadcrumbEntry[]) => void
}

interface PropsFromState {
    categories: CategoriesState,
    sections: SectionsState
}

interface PropsFromRoute {
    match: { params: { id: string, heading: string } }
}

type CategoryPageProps = PropsFromDispatch & PropsFromState & PropsFromRoute;

const mapDispatchToProps = {
    fetchCategoryDetails: fetchCategoryDetails,
    fetchSectionDetails: fetchSectionDetails,
    getCategoriesFromKc: getCategoriesFromKc,
    setBreadcrumbs: setBreadcrumbs
}

const maptStateToProps = ({ categories, sections }: ApplicationState) => {
    return {
        categories, 
        sections
    };
}

export default connect(maptStateToProps, mapDispatchToProps)(CategoryPage);