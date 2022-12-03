import { assetPrefix } from '../next.config';

class Fetcher {
    // eslint-disable-next-line object-curly-newline
    constructor({ url, data, id, ...options }) {
        this.url = `${assetPrefix}/api/${url}`;
        this.id = id;
        this.data = data;
        this.options = options;
    }

    async get() {
        let response;
        if (this.id) {
            response = await fetch(`${this.url}/?id=${this.id}`);
        } else {
            response = await fetch(this.url);
        }
        const data = await response.json();
        return data;
    }

    async post() {
        const response = await fetch(this.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.data),
        });
        return response.json();
    }

    async put() {
        const response = await fetch(this.url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: this.id, data: this.data }),
        });
        return response.json();
    }

    async delete() {
        const response = await fetch(this.url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.id),
        });
        return response.json();
    }
}

export default Fetcher;
