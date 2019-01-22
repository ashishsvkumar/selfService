import { currentEnvironment, Environments } from "./environment";

function getSelfServiceBase() {
  switch (currentEnvironment) {
    case Environments.production:
      return "//selfservice-api.redmart.com/v1.0.0/support";
    case Environments.development:
      return "//selfservice-api.alpha.redmart.com/v1.0.0/support";
    default:
            // For local setup
      return "//selfservice-api.alpha.redmart.com/v1.0.0/support";
  }
}

export const supportBase: string = getSelfServiceBase();

