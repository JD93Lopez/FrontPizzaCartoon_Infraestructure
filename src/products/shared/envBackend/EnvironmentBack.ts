import json from './env.json';
export default class Environment {
    static getEndpointProducts = async () => {
        const endpoint = json['products'];
        return `${endpoint.protocol}://${endpoint.domain}/${endpoint.path}/${endpoint.version}/${endpoint.resource}`;
    };
    static getEndpointNewProduct = async () => {
        const endpoint = json['products/new'];
        return `${endpoint.protocol}://${endpoint.domain}/${endpoint.path}/${endpoint.version}/${endpoint.resource}`;
    };
    static getEndpointUpdateProduct = async () => {
        const endpoint = json['products/update'];
        return `${endpoint.protocol}://${endpoint.domain}/${endpoint.path}/${endpoint.version}/${endpoint.resource}`;
    };
    static getEndpointDeleteProduct = async () => {
        const endpoint = json['products/delete'];
        return `${endpoint.protocol}://${endpoint.domain}/${endpoint.path}/${endpoint.version}/${endpoint.resource}`;
    };
}