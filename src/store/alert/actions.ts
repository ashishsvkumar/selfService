import { action } from "typesafe-actions";
import { AlertState, AlertActionTypes } from "./types";

export const showAlert = (alert: AlertState) => action(AlertActionTypes.SHOW_ALERT, alert);
export const hideAlert = () => action(AlertActionTypes.HIDE_ALERT);
