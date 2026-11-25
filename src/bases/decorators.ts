import { ApiAdapter } from "../api/poke-api.adapter";
import Deprecated from "../decorators/deprecated.decorator";
import type { HttpAdapter } from "../interfaces/httpAdapter.interface";
import type { PokeAPI } from "../interfaces/poke-api.interface";
import { errorLog, log, URL_BASE, type PokemonType } from "../utils";

function MyDecorator(){
    return function(target: any){
        log(target);
    }
}

@MyDecorator()
export class PokemonDecorator {
    public readonly id: number = 0;
    public name: string = 'no-name';
    public type: string = 'no-type';
    private _http!: HttpAdapter;

    constructor(
        id: number | undefined = undefined, 
        name: string | undefined = undefined, 
        type: PokemonType | undefined = undefined,
        apiAdapter: ApiAdapter = ApiAdapter.getInstance(),
    ){
        log('Pokemon constructor');

        log(id, name, type);

        id && (this.id = id);
        name && (this.name = name);
        type && (this.type = type);

        apiAdapter && (this._http = apiAdapter);
    }

    get imageUrl(): string {
        return `${URL_BASE}/${this.id}`;
    }

    public async getImage(): Promise<string> {
        if(!this.imageUrl) return 'no-image';

        try {

            const response = await this._http.get<PokeAPI>(this.imageUrl);
            return response.sprites?.other?.home?.front_default || 'no-image';

        } catch (error) {
            errorLog(error);
            return 'no-image';
        }
    }

    @Deprecated('use speak instead')
    public scream(): void {
        log('Grrrrrr!');
    }

    public speak(): string {
        log(`${this.name}`);
        return `${this.name}, ${this.name}`;
    }

    public async getPokeAPI(): Promise<PokeAPI> {
        if(!this.imageUrl) throw new Error('Image URL is required');

        const response = await fetch(this.imageUrl);
        const data = await response.json();
        return data;
      
    }
}
