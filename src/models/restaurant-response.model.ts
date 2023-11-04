export interface MenuItem {
    id: number;
    title: string;
    description: string | null;
    kcal: number | null;
    price: number;
    image: string;
}

export interface MenuCategory {
    id: number;
    type: string;
    menuList: MenuItem[];
}

export interface RestaurantData {
    uuid: string;
    companyName: string;
    orderName: string;
    duration: string;
    distance: string;
    closeAt: string;
    deliveryCharge: string;
    price: string;
    rating: number;
    menu: MenuCategory[];
}