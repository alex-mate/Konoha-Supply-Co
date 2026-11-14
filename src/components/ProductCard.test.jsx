import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import ProductCard from "./ProductCard";
import userEvent from "@testing-library/user-event";

const mockProduct = {
    id: "1",
    name: "Standard Kunai",
    description: "A reliable tool for every shinobi.",
    price: 150,
    currency: "Ryō",
    stock: 25,
    category: "Weapons",
    rarity: "Common",
    image: "standard-kunai.webp"
};

describe("ProductCard", () => {
    it("decreases quantity when minus is clicked", async () => {
        const user = userEvent.setup();
        render(<ProductCard product={mockProduct} addToCart={vi.fn()} />);
        await user.click(screen.getByRole("button", { name: "Increase quantity" }));

        await user.click(screen.getByRole("button", { name: "Decrease quantity" }));

        expect(screen.getByRole("spinbutton")).toHaveValue(1);
    });

    it("disables minus at quantity 1", async () => {
        const user = userEvent.setup();
        render(<ProductCard product={mockProduct} addToCart={vi.fn()} />);
        const decrease = screen.getByRole("button", { name: "Decrease quantity" });

        expect(decrease).toBeDisabled();
        await user.click(decrease);
        expect(screen.getByRole("spinbutton")).toHaveValue(1);

        await user.click(screen.getByRole("button", { name: "Increase quantity" }));
        expect(decrease).toBeEnabled();
    });

    it("disables plus at maximum stock", async () => {
        const user = userEvent.setup();
        render(<ProductCard product={mockProduct} addToCart={vi.fn()} />);
        fireEvent.change(screen.getByRole("spinbutton"), { target: { value: "24" } });
        const increase = screen.getByRole("button", { name: "Increase quantity" });

        expect(increase).toBeEnabled();
        await user.click(increase);
        expect(screen.getByRole("spinbutton")).toHaveValue(25);
        expect(increase).toBeDisabled();
        await user.click(increase);
        expect(screen.getByRole("spinbutton")).toHaveValue(25);

        await user.click(screen.getByRole("button", { name: "Decrease quantity" }));
        expect(increase).toBeEnabled();
    });

    it("allows the user to change the quantity to 5", () => {
        render(<ProductCard product={mockProduct} addToCart={vi.fn()} />);
        const quantityInput = screen.getByRole("spinbutton");

        fireEvent.change(quantityInput, { target: { value: "5" } });

        expect(quantityInput).toHaveValue(5);
    });

    it("adds the product with the selected quantity of 5", async () => {
        const user = userEvent.setup();
        const mockAddToCart = vi.fn();
        render(<ProductCard product={mockProduct} addToCart={mockAddToCart} />);

        fireEvent.change(screen.getByRole("spinbutton"), {
            target: { value: "5" }
        });
        await user.click(screen.getByRole("button", { name: "Add to Pouch" }));

        expect(mockAddToCart).toHaveBeenCalledTimes(1);
        expect(mockAddToCart).toHaveBeenCalledWith(mockProduct, 5);
    });

    it("limits the quantity to the stock of 25", () => {
        render(<ProductCard product={mockProduct} addToCart={vi.fn()} />);
        const quantityInput = screen.getByRole("spinbutton");

        fireEvent.change(quantityInput, { target: { value: "26" } });

        expect(quantityInput).toHaveValue(25);
    });

    it("prevents the quantity from dropping below 1", () => {
        render(<ProductCard product={mockProduct} addToCart={vi.fn()} />);
        const quantityInput = screen.getByRole("spinbutton");

        fireEvent.change(quantityInput, { target: { value: "5" } });
        fireEvent.change(quantityInput, { target: { value: "0" } });

        expect(quantityInput).toHaveValue(1);
    });

    it("resets an empty input to 1 without passing NaN to addToCart", async () => {
        const user = userEvent.setup();
        const mockAddToCart = vi.fn();
        render(<ProductCard product={mockProduct} addToCart={mockAddToCart} />);
        const quantityInput = screen.getByRole("spinbutton");

        fireEvent.change(quantityInput, { target: { value: "5" } });
        await user.clear(quantityInput);

        expect(quantityInput).toHaveValue(1);

        await user.click(screen.getByRole("button", { name: "Add to Pouch" }));

        expect(mockAddToCart).toHaveBeenCalledTimes(1);
        expect(mockAddToCart).toHaveBeenCalledWith(mockProduct, 1);
    });

    it("renders the product image", () => {
        render(<ProductCard product={mockProduct} addToCart={vi.fn()} />);

        const image = screen.getByRole("img", { name: "Standard Kunai" });

        expect(image).toBeVisible();
        expect(image).toHaveAttribute(
            "src",
            `${import.meta.env.BASE_URL}images/products/standard-kunai.webp`
        );
    });

    it("renders the correct product price and currency", () => {
        render(<ProductCard product={mockProduct} addToCart={vi.fn()} />);

        expect(screen.getByText("150 Ryō", { exact: true })).toBeVisible();
    });

    it("starts with a quantity of 1", () => {
        render(<ProductCard product={mockProduct} addToCart={vi.fn()} />);

        expect(screen.getByRole("spinbutton")).toHaveValue(1);
    });

    it("renders the Add to Pouch button", () => {
        render(<ProductCard product={mockProduct} addToCart={vi.fn()} />);

        expect(
            screen.getByRole("button", { name: "Add to Pouch", exact: true })
        ).toBeVisible();
    });

    it("renders the product name correctly", () => {
        render(
            <ProductCard
                product={mockProduct}
                addToCart={vi.fn()}
            />
        );

        expect(
            screen.getByRole("heading", {
                name: "Standard Kunai"
            })
        ).toBeInTheDocument();
    });

    it("calls addToCart when the user clicks Add to Pouch", async () => {
    const user = userEvent.setup();
    const mockAddToCart = vi.fn();

    render(
        <ProductCard
            product={mockProduct}
            addToCart={mockAddToCart}
        />
    );

    await user.click(
        screen.getByRole("button", { name: "Add to Pouch" })
    );

    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct, 1);
});
   it("increases quantity when plus is clicked", async () => {
    const user = userEvent.setup();

    render(
        <ProductCard
            product={mockProduct}
            addToCart={vi.fn()}
        />
    );

    await user.click(
        screen.getByRole("button", {
            name: "Increase quantity"
        })
    );

    expect(screen.getByRole("spinbutton")).toHaveValue(2);
});
});
