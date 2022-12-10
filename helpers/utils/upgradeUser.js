import Fetcher from '@teko/helpers/fetcher';

export default async function upgradeUser(id) {
    const fetcher = new Fetcher({
        url: `users?id=${id}`,
    });
    return fetcher.put({
        role: 'TEMAN',
    });
}
