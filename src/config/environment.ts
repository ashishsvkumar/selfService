import * as log from "loglevel";
const ENV = process.env.NODE_ENV || "development";

export const enum Environments {
  daily = "daily",
  development = "development",
  production = "production"
}

function getCurrentEnvironment() {
  const isTest = location.hostname.indexOf('.test') > 0;

  switch (ENV) {
    case Environments.production:
      return Environments.production;
    case Environments.development:
      return isTest ? Environments.daily : Environments.development;
    default:
      return Environments.daily;
  }
}

export function getBasePath(): string {
  const path = location.pathname;
  if (path.indexOf("/support/m") === 0) {
    return "/support/m/";
  }  
  if (path.indexOf("/support") === 0) {
    return "/support/";
  }  
  if (path.indexOf("/m") === 0) {
    return "/m/";
  }
  return "/";
}

export function isMobile(): boolean {
  return location.pathname.indexOf('/m/') >= 0;
}

export const currentEnvironment: Environments = getCurrentEnvironment();
export const basePath: string = getBasePath();

if (currentEnvironment === Environments.production) {
  log.setLevel("ERROR");
} else {
  log.setLevel("INFO");
}
