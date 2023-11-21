import { html } from "satori-html";

export const templates: Record<string, (data?: Record<string, any>) => any> = {
    default: () =>
        html`<div
            style="display: flex;
            flex-direction: column;
            align-items: center;
            gap: 24px;
        font-size: 24px;
        padding: 100px 120px;"
        >
            <h1 style="font-size: 48px;">Untitled Urbansheep</h1>
            <p>Безымянная овца — нерегулярное приложение к овцепедии.</p>
            <p>Порн, картинки, рок-н-ролл.</p>
        </div>`,
    blog: (data) =>
        html`<div
            style="display: flex;
            flex-direction: column;
            align-items: center;
            gap: 24px;
            font-size: 24px;
            padding: 100px 120px;"
        >
            <h1 style="font-size: 48px;">${data?.title}</h1>
            <p>Безымянная овца — нерегулярное приложение к овцепедии.</p>
            <p>Порн, картинки, рок-н-ролл.</p>
        </div>`,
};
