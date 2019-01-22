import * as log from "loglevel";
const ENV = process.env.NODE_ENV || "development";

export const enum Environments {
  development = "development",
  production = "production",
  local = "local",
}

function getCurrentEnvironment() {
  switch (ENV) {
    case Environments.production:
      return Environments.production;
    case Environments.development:
      return Environments.development;
    default:
      return Environments.local;
  }
}

export function getBasePath(): string {
  const path = location.pathname;
  if (path.indexOf("/customer-support/m") === 0) {
    return "/customer-support/m/";
  }
  if (path.indexOf("/support/m") === 0) {
    return "/support/m/";
  }  
  if (path.indexOf("/customer-support") === 0) {
    return "/customer-support/";
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
