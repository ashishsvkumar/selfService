import * as React from "react";
import * as log from "loglevel";
import { connect } from "react-redux";
import { CategoryPage as Component } from "../../components/pages/faq/CategoryPage"
import { fetchCategoryDetails, fetchSectionDetails } from "../../store/faq/actions";
import { ApplicationState } from "../../store";
import { CategoriesState, SectionsState, Category } from "../../store/faq/types";
import { Spinner } from "../../components/icons/Spinner";
import { isEmptyObject, isEmptyArray } from "../../utils/extras";

export class CategoryPage extends React.Component<CategoryPageProps, CategoryPageState> {

    constructor(props: CategoryPageProps) {
        super(props);
        this.state = { ready: false }
    }

    componentWillMount() {
        log.info('Category page countainer will mount');
        if (this.categoryFetched()) {
            if(this.allSectionsFetch()) {
                this.setState( { ready: true } )
            }
        }
    }

    categoryFetched = (): boolean => {
        const id = this.props.match.params.id;
        if (isEmptyObject(this.props.categories) || isEmptyObject(this.props.categories[id])) {
            this.props.fetchCategoryDetails(id).then(this.allSectionsFetch);
            return false;
        }
        return !this.props.categories[id].loading
    }

    allSectionsFetch = (): boolean => {
        const id = this.props.match.params.id;
        const category = this.props.categories[id];

        const sectionsNotExisting = category.sections.filter(sec => isEmptyObject(this.props.sections[sec.id]))
        if (!isEmptyArray(sectionsNotExisting)){
            sectionsNotExisting.forEach(section => this.props.fetchSectionDetails(section.id).then(this.allSectionsReady));
            return false;
        }

        return category.sections.every(sec => !this.props.sections[sec.id].loading)
    }

    allSectionsReady = () => {
        const id = this.props.match.params.id;
        const category = this.props.categories[id];

        const sectionsFetching = category.sections.filter(sec => this.props.sections[sec.id].loading);
        if (isEmptyArray(sectionsFetching)) {
            this.setState( { ready: true } )
        }
    }

    getCategory = (): Category => {
        const id = this.props.match.params.id;
        const category = this.props.categories[id];

        return {
            id: id, 
            sections: category.sections.map(sec => {
                return { ...sec, articles: this.props.sections[sec.id].articles }
            })
        }
    }

    render() {
        if (!this.props.match.params || !this.props.match.params.id) {
            return <div>Sorry, the page you are looking for does not exist</div>
        }

        if (this.state.ready) {
            const category = this.getCategory();
            const heading = this.props.match.params.heading;
            return <Component title={decodeURI(heading)} sections={category.sections} />
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
    fetchSectionDetails: Function
}

interface PropsFromState {
    categories: CategoriesState,
    sections: SectionsState
}

interface PropsFromRoute {
    match: { params: { id: number, heading: string } }
}

type CategoryPageProps = PropsFromDispatch & PropsFromState & PropsFromRoute;

const mapDispatchToProps = {
    fetchCategoryDetails: fetchCategoryDetails,
    fetchSectionDetails: fetchSectionDetails
}

const maptStateToProps = ({ categories, sections }: ApplicationState) => {
    return {
        categories, 
        sections
    };
}

export default connect(maptStateToProps, mapDispatchToProps)(CategoryPage);