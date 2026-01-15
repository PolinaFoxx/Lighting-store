class BasketService {
    constructor() {
        this.items = new Map();
    }

    add(product) {
        const id = Number(product.id);
        const existing = this.items.get(id);
        if (existing) {
            existing.qty += 1;
        } else {
            this.items.set(id, { product, qty: 1 });
        }
    }

    remove(id) {
        this.items.delete(Number(id));
    }

    setQty(id, qty) {
        id = Number(id);
        qty = Number(qty);
        if (!this.items.has(id)) return;

        if (qty <= 0) {
            this.items.delete(id);
        } else {
            this.items.get(id).qty = qty;
        }
    }

    getItems() {

        return Array.from(this.items.entries()).map(([id, { product, qty }]) => ({
            id: Number(id),
            product,
            qty
        }));
    }

    getTotals() {
        let total = 0;

        for (const { product, qty } of this.items.values()) {
            total += (Number(product.price.new) || 0) * qty;
        }
        return total;
    }

    getCount() {
        let count = 0;
        for (const { qty } of this.items.values())
            count += qty;
        return count;
    }

    isEmpty() {
        return this.items.size === 0;
    }

    clear() {
        this.items.clear();
    }
}

export const basketService = new BasketService();
