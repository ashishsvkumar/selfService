import { combineReducers } from "redux";
import { initialOrderListState, initialOrdersDetailsState, ordersDetailsReducer, ordersListReducer } from "./order/reducer";
import { initialArticlesState, initialSectionsState, initialCategoriesState, articleReducer, sectionReducer, cateogryReducer } from "./faq/reducer";
import { OrdersDetailsState, OrdersListState } from "./order/types";
import { ArticlesState, SectionsState, CategoriesState } from "./faq/types";
import { AlertState } from "./alert/types";
import { initialAlertState, alertReducer } from "./alert/reducer";
import { TicketState } from "./ticket/types";
import { initialTicketState, ticketReducer } from "./ticket/reducer";
import { breadcrumbState } from "./breadcrumb/types";
import { initialBreadcrumbState, breadcrumbReducer } from "./breadcrumb/reducer";
import { UserInfoState } from "./user/types";
import { initialUserInfoState, userInfoReducer } from "./user/reducer";


export interface ApplicationState {
  ordersList: OrdersListState;
  ordersDetails: OrdersDetailsState;
  articles: ArticlesState,
  sections: SectionsState,
  categories: CategoriesState,
  alert: AlertState,
  ticket: TicketState,
  breadcrumbs: breadcrumbState,
  user: UserInfoState
}

export const initialState: ApplicationState = {
  ordersList: initialOrderListState,
  ordersDetails: initialOrdersDetailsState,
  articles: initialArticlesState,
  sections: initialSectionsState,
  categories: initialCategoriesState,
  alert: initialAlertState,
  ticket: initialTicketState,
  breadcrumbs: initialBreadcrumbState,
  user: initialUserInfoState
};

export const rootReducer = combineReducers<ApplicationState>({
  ordersList: ordersListReducer,
  ordersDetails: ordersDetailsReducer,
  articles: articleReducer,
  sections: sectionReducer,
  categories: cateogryReducer,
  alert: alertReducer,
  ticket: ticketReducer,
  breadcrumbs: breadcrumbReducer,
  user: userInfoReducer
});
