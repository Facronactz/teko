class APIHandler {
    constructor(func, req, res) {
        this.func = func;
        this.req = req;
        this.res = res;
        this.id = req.query.id || req.body.id;
    }

    async get() {
        // const { id } = this.req.query || this.req.body;
        const data = await this.func.get(this.id, this.req.query);
        if (data) return this.res.status(200).json(data);
        return this.res.status(404).json({ error: 'Not Found' });
    }

    async post() {
        if (!this.id && !this.req.body) return this.res.status(400).json({ error: 'Bad Request' });
        const result = await this.func.post(this.req.body);
        if (result.error) {
            return this.res.status(500).json({
                message: 'Data gagal ditambahkan',
                error: result.error,
            });
        }
        return this.res.status(201).json({
            message: 'Data berhasil ditambahkan',
            result,
        });
    }

    async put() {
        if (!this.id && !this.req.body) return this.res.status(400).json({ error: 'Bad Request' });
        const result = await this.func.put(this.id, this.req.body);
        if (result.error) {
            return this.res.status(400).json({
                message: 'Data gagal diubah',
                error: result.error,
            });
        }
        return this.res.status(201).json({
            message: 'Data berhasil diubah',
            result,
        });
    }

    async delete() {
        if (!this.id) return this.res.status(400).json({ error: 'Bad Request' });
        const result = await this.func.delete(this.id);
        if (result.error) {
            return this.res.status(500).json({
                message: `Data dengan id ${this.id} tidak ditemukan`,
                error: result.error,
            });
        }
        return this.res.status(200).json({
            message: `Data dengan id ${this.id} berhasil dihapus`,
            result,
        });
    }
}

export default APIHandler;
