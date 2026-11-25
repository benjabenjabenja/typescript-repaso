import { log } from '../utils/index.ts';
export const name: string = 'benja';
export const age: number = 31;

type TemplateStringProps = {
    heroImg: string;
    typescriptLogo: string;
    viteLogo: string;
}

function templateString({ heroImg, typescriptLogo, viteLogo }: TemplateStringProps): string {
    return `
        <section id="center">
            <div class="hero">
                <img src="${heroImg}" class="base" width="170" height="179">
                <img src="${typescriptLogo}" class="framework" alt="TypeScript logo"/>
                <img src="${viteLogo}" class="vite" alt="Vite logo" />
            </div>
            <div>
                <h1>Get started</h1>
                <p>Edit <code>src/main.ts</code> and save to test <code>HMR</code></p>
            </div>
            <button id="counter" type="button" class="counter"></button>
        </section>
        
        <div class="ticks"></div>
        
        <section id="spacer">Hola: ${name} - ${age}</section>
    `
};

export default ((props: TemplateStringProps) => {
    const { heroImg, typescriptLogo, viteLogo } = props;

    if(!heroImg || !typescriptLogo || !viteLogo) {
        throw new Error('Hero image, TypeScript logo and Vite logo are required');
    }

    log(`name: ${name}, age: ${age}`);

    return templateString({ heroImg, typescriptLogo, viteLogo });
});