import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import * as styles from "./App.scss";
import LandingPage from "./containers/pages/LandingPage";
import OrdersPage from "./containers/pages/OrdersPage";
import OrderHelpLandingPage from "./containers/pages/OrderHelpLandingPage";
import ItemLevelHelpPage from "./containers/pages/ItemLevelHelpPage";
import QueryFormPage from "./containers/pages/QueryFormPage";
import FaqPage from "./containers/pages/FaqPage";
import CategoryPage from "./containers/pages/CategoryPage";
import { basePath } from "./config/environment";
import CommonShell from "./containers/CommonShell";
import ScrollToTop from "./components/wrappers/ScrollToTop";

const supportsHistory = "pushState" in window.history;

export const App = (props: AppProps) => {

    return (
        <CommonShell>
            <Router basename={basePath} forceRefresh={!supportsHistory}>
                <ScrollToTop>
                    <div className={styles.app}>
                        <Route exact path="/orders/:tradeOrderId/help/:category" component={ItemLevelHelpPage} />
                        <Route exact path="/orders/:tradeOrderId" component={OrderHelpLandingPage} />
                        <Route exact path="/category/:id/:heading" component={CategoryPage} />
                        <Route exact path="/faq/:id/:heading?" component={FaqPage} />
                        <Route exact path="/orders" component={OrdersPage} />
                        <Route exact path="/query" component={QueryFormPage} />
                        <Route exact path="/" component={LandingPage} />
                    </div>
                </ScrollToTop>
            </Router>
        </CommonShell>
    );
};

export interface AppProps { }