import { currentEnvironment, Environments } from "./environment";

function getSelfServiceBase() {
  switch (currentEnvironment) {
    case Environments.production:
      return "//selfservice-api.redmart.com/v1.0.0/support";
    case Environments.development:
      return "//selfservice-api.alpha.redmart.com/v1.0.0/support";
    default:
      return "//selfservice-api.alpha.redmart.com/v1.0.0/support";
  }
}

export const supportBase: string = getSelfServiceBase();

//return "//selfservice-api.alpha.redmart.com/v3/support";
//return 'http://local.lazada.sg/support-service/v1.0/support';
