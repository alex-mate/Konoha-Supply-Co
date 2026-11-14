import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import CartItem from "./CartItem";
import userEvent from "@testing-library/user-event";

const mockItem = {
    id: "1",
    name: "Standard Kunai",
    image: "standard-kunai.webp",
    price: 150,
    currency: "Ryō",
    quantity: 3,
    stock: 25
};

describe("CartItem", () => {
    let updateQuantity;
    let rerender;

    beforeEach(() => {
        updateQuantity = vi.fn();
        ({ rerender } = render(
            <CartItem
                item={mockItem}
                removeFromCart={vi.fn()}
                updateQuantity={updateQuantity}
            />
        ));
    });

    it("calls updateQuantity with the increased quantity when plus is clicked", async () => {
        const user = userEvent.setup();

        await user.click(screen.getByRole("button", { name: "Increase quantity" }));

        expect(updateQuantity).toHaveBeenCalledTimes(1);
        expect(updateQuantity).toHaveBeenCalledWith("1", 4);
    });

    it("calls updateQuantity with the decreased quantity when minus is clicked", async () => {
        const user = userEvent.setup();

        await user.click(screen.getByRole("button", { name: "Decrease quantity" }));

        expect(updateQuantity).toHaveBeenCalledTimes(1);
        expect(updateQuantity).toHaveBeenCalledWith("1", 2);
    });

    it("disables minus at quantity 1", async () => {
        const user = userEvent.setup();
        expect(screen.getByRole("button", { name: "Decrease quantity" })).toBeEnabled();
        rerender(<CartItem item={{ ...mockItem, quantity: 1 }}
            removeFromCart={vi.fn()} updateQuantity={updateQuantity} />);
        const decrease = screen.getByRole("button", { name: "Decrease quantity" });

        expect(decrease).toBeDisabled();
        await user.click(decrease);

        expect(updateQuantity).not.toHaveBeenCalled();
        expect(screen.getByRole("spinbutton")).toHaveValue(1);
        expect(screen.getByRole("button", { name: "Increase quantity" })).toBeEnabled();
    });

    it("disables plus at maximum stock", async () => {
        const user = userEvent.setup();
        expect(screen.getByRole("button", { name: "Increase quantity" })).toBeEnabled();
        rerender(<CartItem item={{ ...mockItem, quantity: 25 }}
            removeFromCart={vi.fn()} updateQuantity={updateQuantity} />);
        const increase = screen.getByRole("button", { name: "Increase quantity" });

        expect(increase).toBeDisabled();
        await user.click(increase);

        expect(updateQuantity).not.toHaveBeenCalled();
        expect(screen.getByRole("spinbutton")).toHaveValue(25);
        expect(screen.getByRole("button", { name: "Decrease quantity" })).toBeEnabled();
    });

    it("displays the correct product name", () => {
        expect(
            screen.getByRole("heading", { name: "Standard Kunai", exact: true })
        ).toBeVisible();
    });

    it("displays the correct image", () => {
        const image = screen.getByRole("img", { name: "Standard Kunai" });

        expect(image).toBeVisible();
        expect(image).toHaveAttribute(
            "src",
            `${import.meta.env.BASE_URL}images/products/standard-kunai.webp`
        );
    });

    it("displays the current quantity of 3", () => {
        expect(screen.getByRole("spinbutton", { name: "Quantity:" })).toHaveValue(3);
    });

    it("displays the individual price of 150 Ryō", () => {
        expect(screen.getByText("Price: 150 Ryō", { exact: true })).toBeVisible();
    });

    it("calculates the subtotal of 450 Ryō", () => {
        expect(screen.getByText("Total: 450 Ryō", { exact: true })).toBeVisible();
    });

    it("calls updateQuantity with the correct ID and quantity", () => {
        fireEvent.change(screen.getByRole("spinbutton", { name: "Quantity:" }), {
            target: { value: "5" }
        });

        expect(updateQuantity).toHaveBeenCalledTimes(1);
        expect(updateQuantity).toHaveBeenCalledWith("1", 5);
    });

    it("prevents quantities above available stock", () => {
        const input = screen.getByRole("spinbutton", { name: "Quantity:" });

        fireEvent.change(input, { target: { value: "26" } });

        expect(updateQuantity).not.toHaveBeenCalled();
        expect(input).toHaveValue(3);

        fireEvent.change(input, { target: { value: "25" } });

        expect(updateQuantity).toHaveBeenCalledTimes(1);
        expect(updateQuantity).toHaveBeenCalledWith("1", 25);
    });

    it("prevents quantities below 1", () => {
        const input = screen.getByRole("spinbutton", { name: "Quantity:" });

        fireEvent.change(input, { target: { value: "0" } });
        fireEvent.change(input, { target: { value: "-1" } });

        expect(updateQuantity).not.toHaveBeenCalled();
        expect(input).toHaveValue(3);

        fireEvent.change(input, { target: { value: "1" } });

        expect(updateQuantity).toHaveBeenCalledTimes(1);
        expect(updateQuantity).toHaveBeenCalledWith("1", 1);
    });
});
