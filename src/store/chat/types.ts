export interface SnapEngageApi {
    startLink: () => void,
    showButton: () => void,
    hideButton: () => void,
    allowChatSound: (doAllow: boolean) => void,
    setUserEmail: (email: string, readonly: boolean) => void,
    setUserName: (name: string) => void,
    setCustomField: (name: string, value: string) => void
}

export interface ChatState {
    readonly loading: boolean,
    readonly loaded: boolean,
    readonly snapEngageInstance?: SnapEngageApi
}

export const enum ChatActionTypes {
    INIT = "chat/init",
    READY = "chat/ready"
}
