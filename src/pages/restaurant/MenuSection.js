import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useParams } from 'react-router-dom';
import { useCart } from '@/hooks/useCart';
export default function MenuSection({ menus, restaurantName, restaurantLogo, }) {
    const { id } = useParams();
    const restaurantId = Number(id);
    const { cart, addItem, increase, decrease } = useCart();
    const getQty = (menuId) => {
        const restaurantCart = cart.restaurants.find((r) => r.restaurantId === restaurantId);
        return restaurantCart?.items.find((i) => i.id === menuId)?.qty ?? 0;
    };
    return (_jsx("div", { className: 'grid grid-cols-2 md:grid-cols-4 gap-4', children: menus.map((menu) => {
            const qty = getQty(menu.id);
            return (_jsxs("div", { className: 'border rounded-xl overflow-hidden', children: [_jsx("img", { src: menu.image, alt: menu.foodName, className: 'w-full h-[160px] object-cover' }), _jsx("div", { className: 'p-3', children: _jsxs("div", { className: 'flex items-center justify-between gap-2', children: [_jsxs("div", { className: 'flex flex-col', children: [_jsx("h3", { className: 'font-semibold text-sm', children: menu.foodName }), _jsxs("p", { className: 'text-red-600 font-bold text-sm', children: ["Rp ", menu.price.toLocaleString('id-ID')] })] }), qty === 0 ? (_jsx("button", { className: 'bg-[#C12116] text-white rounded-full w-[72px] h-[36px] text-sm', onClick: () => addItem(restaurantId, restaurantName, restaurantLogo, {
                                        id: menu.id,
                                        name: menu.foodName,
                                        price: menu.price,
                                        image: menu.image,
                                    }), children: "Add" })) : (_jsxs("div", { className: 'flex items-center gap-2', children: [_jsx("button", { onClick: () => decrease(restaurantId, menu.id), className: 'w-7 h-7 bg-gray-200 rounded-full flex items-center justify-center', children: "\u2212" }), _jsx("span", { className: 'font-semibold', children: qty }), _jsx("button", { onClick: () => increase(restaurantId, menu.id), className: 'w-7 h-7 bg-[#C12116] text-white rounded-full flex items-center justify-center', children: "+" })] }))] }) })] }, menu.id));
        }) }));
}
