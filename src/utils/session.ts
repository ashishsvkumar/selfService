import { get as getCookie, remove } from "es-cookie";
import { currentEnvironment, Environments } from "../config/environment";
import { isEmptyString } from "./extras";
import { isWindVandAvailable, initiateLogin } from "../api/windvane";

const USER_ID_KEY = "lzd_uid";
const SESSION_ID_KEY = "lzd_sid";
const useMock: boolean = location.host.indexOf('local') >= 0 || location.host.indexOf('redmart.com') > 0;

function cookieDomain() {
  let domain;
  if (location.hostname.indexOf('.test') >= 0) domain = '.lazada.test';
  else domain = '.lazada.sg';

  return { domain }
}

export function isLoggedIn() {
  if (useMock) {
    return true;
  }

  const id = getCookie(USER_ID_KEY);
  return !isEmptyString(id);
}

export function clearSession() {
  remove(USER_ID_KEY, cookieDomain());
  remove(SESSION_ID_KEY, cookieDomain());
}

export function getUserId() {
  if (useMock) {
    return '103498013';
  }

  const id = getCookie(USER_ID_KEY);
  return isLoggedIn() ? id : null;
}

export function getSessionId() {
  if (useMock) {
    return 'foo-bar';
  }

  const id = getCookie(SESSION_ID_KEY);
  return isLoggedIn() ? id : null;
}

export function loginFrom(currentLocation: string = location.href): string {
  const param = `?redirect=${encodeURIComponent(currentLocation)}`;

  switch(currentEnvironment) {
    case Environments.production: 
      return `https://member.lazada.sg/user/login${param}`;
    case Environments.development: 
      return `https://member-rm.lazada.sg/user/login${param}`;
    default:
    return `https://buyer.lazada.test/user/login${param}`;
  }
}

export function reLogin() {
  if (isWindVandAvailable()) {
    initiateLogin(() => {
      location.reload();
    })
  } else {
    clearSession();
    // @ts-ignore
    window.location = loginFrom();
  }
}