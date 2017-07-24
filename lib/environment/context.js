/**
 * @file
 */
'use strict';

const Context = class {
    constructor(data) {
        Object.assign(this, data);
    }
    get path() {
        if (this.getPath) {
            return this.getPath();
        }
    }
    get querystring() {
        if (this.getQuerystring) {
            return this.getQuerystring();
        }
    }
    get method() {
        if (this.getMethod) {
            return this.getMethod();
        }
    }
    get protocol() {
        if (this.getProtocol) {
            return this.getProtocol();
        }
    }
    get header() {
        if (this.getHeader) {
            return this.getHeader();
        }
    }
    get parameter() {
        if (this.getParameter) {
            return this.getParameter();
        }
    }
    get body() {
        if (this.getBody) {
            return this.getBody();
        }
    }
    get remoteAddr() {
        if (this.getRemote) {
            return this.getRemote();
        }
    }
    get server() {
        if (this.getServer) {
            return this.getServer();
        }
    }
};

Object.defineProperty(global, 'Context', {
    value: Context,
    enumerable: true
});
