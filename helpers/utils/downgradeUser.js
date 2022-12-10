import Fetcher from '@teko/helpers/fetcher';

export default async function downgradeUser(id) {
    const fetcher = new Fetcher({
        url: `users?id=${id}`,
    });
    return fetcher.put({
        role: 'USER',
    });
}
