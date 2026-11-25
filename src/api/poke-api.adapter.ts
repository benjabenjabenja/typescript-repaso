import type { HttpAdapter } from "../interfaces/httpAdapter.interface";
import { errorLog, URL_BASE } from "../utils";
import axios, { type AxiosInstance } from 'axios';

export class ApiFetchAdapter implements HttpAdapter {
    async get<T>(url: string): Promise<T> {
        const response = await fetch(url);
        const data: T = await response.json();
        return data;
    }
    async post<T>(url: string, body: any): Promise<T> {
       const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
       });
       const data: T = await response.json();
       return data;
    }
    async put<T>(url: string, body: any): Promise<T> {
        const response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(body),
        });
        const data: T = await response.json();
        return data;
    }
    async delete<T>(url: string): Promise<T> {
        const response = await fetch(url, {
            method: 'DELETE',
        });
        const data: T = await response.json();
        return data;
    }
    async patch<T>(url: string, body: any): Promise<T> {
        const response = await fetch(url, {
            method: 'PATCH',
            body: JSON.stringify(body),
        });
        const data: T = await response.json();
        return data;
    }
}

export class ApiAdapter implements HttpAdapter {

    private static _instance: ApiAdapter | null = null;
    private _httpHeaders: Record<string, string> = {};
    private _axios!: AxiosInstance;
    private _baseURL: string | undefined = undefined;

    private constructor(baseURL: string | undefined = undefined) {
        this.baseURL = baseURL;
        this._axios = this._createAxios(baseURL);
    }

    public static getInstance(baseURL: string | undefined = undefined): ApiAdapter {
        if(!ApiAdapter._instance) {
            ApiAdapter._instance = new ApiAdapter(baseURL);
        }
        return ApiAdapter._instance;
    }

    private _createAxios(baseURL: string | undefined = undefined): AxiosInstance {
        if(!this._axios) this._axios = axios.create({
            baseURL: baseURL || URL_BASE,
            headers: this._httpHeaders,
        });
        return this._axios;
    }

    get baseURL(): string | undefined {
        return this._baseURL;
    }

    set baseURL(baseURL: string | undefined) {
        this._baseURL = baseURL;
    }

    get httpHeaders(): Record<string, string> {
        return this._httpHeaders;
    }

    set httpHeaders(headers: Record<string, string>) {
        this._httpHeaders = headers;
    }

    public async get<T>(url: string): Promise<T> {
        try {
            
            const response = await this._axios.get<T>(url);
            return response.data;

        } catch (error: any) {
            errorLog(error);
            throw new Error('Error fetching PokeAPI');
        }
    }

    public async post<T>(url: string, data: any): Promise<T> {
        try {

            const response = await this._axios.post<T>(url, data);
            return response.data;

        } catch (error: any) {
            errorLog(error);
            throw new Error('Error posting to PokeAPI');
        }
    }

    public async put<T>(url: string, data: any): Promise<T> {
        try {
            const response = await this._axios.put<T>(url, data);
            return response.data;
        } catch (error: any) {
            errorLog(error);
            throw new Error('Error putting to PokeAPI');
        }
    }

    public async delete<T>(url: string): Promise<T> {
        try {
            const response = await this._axios.delete<T>(url);
            return response.data;
        } catch (error: any) {
            errorLog(error);
            throw new Error('Error deleting from PokeAPI');
        }
    }

    public async patch<T>(url: string, data: any): Promise<T> {
        try {
            const response = await this._axios.patch<T>(url, data);
            return response.data;
        } catch (error: any) {
            errorLog(error);
            throw new Error('Error patching to PokeAPI');
        }
    }
}