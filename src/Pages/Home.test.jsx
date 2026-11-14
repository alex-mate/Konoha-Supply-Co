import { describe, it, expect, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
    MemoryRouter,
    Routes,
    Route,
    Outlet
} from "react-router";

import Home from "./Home";

const mockProducts = [
    {
        id: "1",
        name: "Standard Kunai",
        price: 150,
        currency: "Ryō",
        stock: 25,
        category: "Weapons",
        rarity: "Common",
        description: "Essential ninja equipment.",
        image: "standard-kunai.webp",
        featured: true
    },
    {
        id: "2",
        name: "Summoning Scroll",
        price: 2500,
        currency: "Ryō",
        stock: 5,
        category: "Scrolls",
        rarity: "Rare",
        description: "An ancient ninja scroll.",
        image: "summoning-scroll.webp",
        featured: false
    }
];

function renderHome(overrides = {}) {
    const addToCart = vi.fn();

    render(
        <MemoryRouter initialEntries={["/"]}>
            <Routes>
                <Route element={
                    <Outlet context={{
                        itemList: mockProducts,
                        loading: false,
                        error: null,
                        addToCart,
                        ...overrides
                    }} />
                }>
                    <Route path="/" element={<Home />} />
                </Route>
            </Routes>
        </MemoryRouter>
    );

    return { addToCart };
}

describe("Home", () => {
    it("displays the Hero heading", () => {
        renderHome();

        expect(screen.getByRole("heading", {
            name: "Everything a Shinobi Needs.", level: 1
        })).toBeVisible();
    });

    it("displays the Enter Shop link", () => {
        renderHome();

        expect(screen.getByRole("link", { name: "Enter Shop", exact: true })).toBeVisible();
    });

    it("gives the Enter Shop link the correct href", () => {
        renderHome();

        expect(screen.getByRole("link", { name: "Enter Shop", exact: true }))
            .toHaveAttribute("href", "/ninja-shop");
    });

    it("displays all category cards", () => {
        renderHome();

        for (const name of ["Weapons", "Scrolls", "Apparel", "Provisions"]) {
            expect(screen.getByRole("heading", { name, exact: true })).toBeVisible();
            expect(screen.getByRole("img", { name, exact: true })).toBeVisible();
        }
        expect(screen.getAllByRole("link", { name: "Explore Collection" })).toHaveLength(4);
    });

    it("includes the correct category search parameter in each category link", () => {
        renderHome();

        for (const name of ["Weapons", "Scrolls", "Apparel", "Provisions"]) {
            const card = screen.getByRole("heading", { name, exact: true }).parentElement;

            expect(within(card).getByRole("link", { name: "Explore Collection" }))
                .toHaveAttribute("href", `/ninja-shop?category=${name}`);
        }
    });

    it("calls addToCart from a featured product", async () => {
        const user = userEvent.setup();
        const { addToCart } = renderHome();
        const product = screen.getByRole("heading", { name: "Standard Kunai" }).parentElement;

        await user.click(within(product).getByRole("button", { name: "Add to Pouch" }));

        expect(addToCart).toHaveBeenCalledTimes(1);
        expect(addToCart).toHaveBeenCalledWith(mockProducts[0], 1);
    });

    it("displays the loading state", () => {
        renderHome({ loading: true });

        expect(screen.getByText("Loading ninja supplies...")).toBeVisible();
        expect(screen.queryByRole("button", { name: "Add to Pouch" })).not.toBeInTheDocument();
        expect(screen.queryByText("No ninja supplies are featured.")).not.toBeInTheDocument();
    });

    it("displays the error state", () => {
        renderHome({ error: "Failed to fetch items." });

        expect(screen.getByText("Failed to fetch items.")).toBeVisible();
        expect(screen.queryByRole("button", { name: "Add to Pouch" })).not.toBeInTheDocument();
        expect(screen.queryByText("Loading ninja supplies...")).not.toBeInTheDocument();
        expect(screen.queryByText("No ninja supplies are featured.")).not.toBeInTheDocument();
    });

    it("displays a message when no featured products exist", () => {
        renderHome({ itemList: mockProducts.map(product => ({ ...product, featured: false })) });

        expect(screen.getByText("No ninja supplies are featured.")).toBeVisible();
        expect(screen.queryByRole("button", { name: "Add to Pouch" })).not.toBeInTheDocument();
    });

    it("displays only featured products", () => {
        renderHome();

        expect(
            screen.getByRole("heading", {
                name: "Standard Kunai"
            })
        ).toBeInTheDocument();

        expect(
            screen.queryByRole("heading", {
                name: "Summoning Scroll"
            })
        ).not.toBeInTheDocument();
    });
});
