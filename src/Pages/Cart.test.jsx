import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
    MemoryRouter,
    Routes,
    Route,
    Outlet
} from "react-router";

import Cart from "./Cart";

const mockCart = [
    {
        id: "1",
        name: "Standard Kunai",
        price: 150,
        quantity: 3,
        stock: 25,
        currency: "Ryō",
        image: "standard-kunai.webp"
    },
    {
        id: "3",
        name: "Konoha Headband",
        price: 500,
        quantity: 2,
        stock: 10,
        currency: "Ryō",
        image: "konoha-headband.webp"
    }
];

function renderCart(cart = []) {
    const removeFromCart = vi.fn();
    const updateQuantity = vi.fn();

    render(
        <MemoryRouter initialEntries={["/your-inventory"]}>
            <Routes>
                <Route element={
                    <Outlet context={{
                        cart,
                        removeFromCart,
                        updateQuantity
                    }} />
                }>
                    <Route
                        path="/your-inventory"
                        element={<Cart />}
                    />
                </Route>
            </Routes>
        </MemoryRouter>
    );

    return { removeFromCart, updateQuantity };
}

describe("Cart", () => {
    it("displays all products in the cart", () => {
        renderCart(mockCart);

        expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(2);
        expect(screen.getByRole("heading", { name: "Standard Kunai" })).toBeVisible();
        expect(screen.getByRole("heading", { name: "Konoha Headband" })).toBeVisible();
    });

    it("displays the total quantity of 5", () => {
        renderCart(mockCart);

        expect(screen.getByText("Total Items: 5", { exact: true })).toBeVisible();
    });

    it("displays the total price of 1,450 Ryō", () => {
        renderCart(mockCart);

        expect(screen.getByText("Total Price: 1,450 Ryō", { exact: true })).toBeVisible();
    });

    it("does not display the empty message when products exist", () => {
        renderCart(mockCart);

        expect(screen.queryByText(/Your pouch is empty/i)).not.toBeInTheDocument();
    });

    it("calls removeFromCart with the correct product", async () => {
        const user = userEvent.setup();
        const { removeFromCart } = renderCart(mockCart);
        const headband = screen.getByRole("heading", { name: "Konoha Headband" }).parentElement;

        await user.click(within(headband).getByRole("button", { name: "Remove" }));

        expect(removeFromCart).toHaveBeenCalledTimes(1);
        expect(removeFromCart).toHaveBeenCalledWith(mockCart[1]);
    });

    it("calls updateQuantity with the correct ID and quantity", () => {
        const { updateQuantity } = renderCart(mockCart);
        const headband = screen.getByRole("heading", { name: "Konoha Headband" }).parentElement;

        fireEvent.change(within(headband).getByRole("spinbutton", { name: "Quantity:" }), {
            target: { value: "4" }
        });

        expect(updateQuantity).toHaveBeenCalledTimes(1);
        expect(updateQuantity).toHaveBeenCalledWith("3", 4);
    });

    it("displays a message when the cart is empty", () => {
        renderCart();

        expect(
            screen.getByText(/Your pouch is empty/i)
        ).toBeInTheDocument();
    });
});
