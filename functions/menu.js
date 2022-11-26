import { prisma } from '@teko/libs/PrismaClient';

class Menu {
    constructor(name, href) {
        this.name = name;
        this.href = href;
    }

    static async get(current, id) {
        const menus = await prisma.menu.findMany();
        if (id) {
            const menu = await prisma.menu.findUnique({
                where: {
                    id,
                },
            });
            return menu;
        }
        if (current) {
            menus.forEach((menu) => {
                if (menu.name === current) {
                    menu.current = true;
                } else {
                    menu.current = false;
                }
            });
        }
        return menus;
    }

    static async post(data) {
        await prisma.menu.createMany({
            data,
        });
    }

    static async put(id, data) {
        await prisma.menu.update({
            where: {
                id,
            },
            data,
        });
    }

    static async delete(id) {
        await prisma.menu.delete({
            where: {
                id,
            },
        });
    }
}

export default Menu;
