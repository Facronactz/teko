class APIHandler {
    constructor(func, req, res) {
        this.func = func;
        this.req = req;
        this.res = res;
        this.id = req.query.id || req.body.id;
    }

    async get() {
        // const { id } = this.req.query || this.req.body;
        const data = await this.func.get(this.id);
        if (data) return this.res.status(200).json(data);
        return this.res.status(404).json({ error: 'Not Found' });
    }

    async post() {
        const result = await this.func.post(this.req.body);
        if (result.error) {
            return this.res.status(500).json({
                success: 'false', message: result.error,
            });
        }
        return this.res.status(201).json({
            message: 'Data berhasil ditambahkan',
            result,
        });
    }

    async put() {
        const { data } = this.req.body;
        if (!this.id && !data) return this.res.status(400).json({ message: 'Bad Request' });
        try {
            await this.func.put(this.id, data);
            return this.res.status(201).json({
                message: 'Data berhasil diubah',
                data,
            });
        } catch (error) {
            return this.res.status(400).json({
                message: 'Data gagal diubah',
                error,
            });
        }
    }

    async delete() {
        if (!this.id) return this.res.status(400).json({ message: 'Bad Request' });
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
