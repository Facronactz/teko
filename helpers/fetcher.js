class Fetcher {
    // eslint-disable-next-line object-curly-newline
    constructor(object) {
        if (Object.prototype.hasOwnProperty.call(object, 'url')) {
            // eslint-disable-next-line object-curly-newline
            const { url, id, data, ...options } = object;
            this._url = `/api/${url}`;
            this.id = id;
            this.data = data;
            this.options = options;
            // this.fetcher = () => this.get();
        } else {
            if (typeof object !== 'string') {
                throw new Error('Invalid URL');
            }
            this._url = `/api/${object}`;
        }
    }

    swrConfig = {
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
        refreshInterval: 30000,
        onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
            if (error.status === 401) return;
            if (error.status === 404) return;
            if (retryCount >= 10) return;
            setTimeout(() => revalidate({ retryCount }), 5000);
        },
    };

    get url() {
        if (this.id) {
            return `${this._url}?id=${this.id}`;
        }
        return this._url;
    }

    set url(url) {
        this._url = url;
    }

    // eslint-disable-next-line class-methods-use-this
    async fetcher(url) {
        const response = await fetch(url);
        if (!response.ok) {
            const error = new Error('An error occurred while fetching the data.');
            error.info = await response.json();
            error.status = response.status;
            throw error;
        }
        return response.json();
    }

    async get() {
        let response;
        if (this.id) {
            response = await fetch(`${this._url}?id=${this.id}`);
        } else {
            response = await fetch(this._url);
        }
        const data = await response.json();
        return data;
    }

    async post(data) {
        this.data = data ?? this.data;
        const response = await fetch(this._url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data: this.data,
            }),
        });
        return response.json();
    }

    async put(data, id) {
        this.id = id ?? this.id;
        this.data = data ?? this.data;
        const response = await fetch(this._url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: this.id, data: this.data }),
        });
        return response.json();
    }

    async delete(id) {
        this.id = id ?? this.id;
        const response = await fetch(this._url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: this.id }),
        });
        return response.json();
    }
}

export default Fetcher;
