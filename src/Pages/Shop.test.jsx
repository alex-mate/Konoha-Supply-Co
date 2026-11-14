import { afterEach, describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
    MemoryRouter,
    Routes,
    Route,
    Outlet
} from "react-router";

import Shop from "./Shop";
import App from "../App";

const mockProducts = [
    {
        id: "1",
        name: "Standard Kunai",
        description: "Essential ninja equipment.",
        price: 150,
        currency: "Ryō",
        stock: 25,
        category: "Weapons",
        rarity: "Common",
        image: "standard-kunai.webp"
    },
    {
        id: "2",
        name: "Summoning Scroll",
        description: "An ancient ninja scroll.",
        price: 2500,
        currency: "Ryō",
        stock: 5,
        category: "Scrolls",
        rarity: "Rare",
        image: "summoning-scroll.webp"
    },
    {
        id: "3",
        name: "Konoha Headband",
        description: "Symbol of the Hidden Leaf Village.",
        price: 500,
        currency: "Ryō",
        stock: 10,
        category: "Apparel",
        rarity: "Common",
        image: "konoha-headband.webp"
    }
];

function renderShop(
    url = "/ninja-shop",
    overrides = {}
) {
    const addToCart = vi.fn();

    render(
        <MemoryRouter initialEntries={[url]}>
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
                    <Route
                        path="/ninja-shop"
                        element={<Shop />}
                    />
                </Route>
            </Routes>
        </MemoryRouter>
    );

    return { addToCart };
}

describe("Shop", () => {
    it("searches without regard to case", async () => {
        const user = userEvent.setup();
        renderShop();

        await user.type(screen.getByPlaceholderText("Search items..."), "kUnAi");

        expect(screen.getAllByRole("heading", { level: 3 }).map(node => node.textContent))
            .toEqual(["Standard Kunai"]);
    });

    it("displays a message when no products match", async () => {
        const user = userEvent.setup();
        renderShop();

        await user.type(screen.getByPlaceholderText("Search items..."), "nonexistent");

        expect(screen.getByText("No ninja supplies found.")).toBeVisible();
        expect(screen.queryAllByRole("heading", { level: 3 })).toHaveLength(0);
    });

    it("filters by category", async () => {
        const user = userEvent.setup();
        renderShop();

        await user.selectOptions(screen.getByDisplayValue("All Categories"), "Weapons");

        expect(screen.getAllByRole("heading", { level: 3 }).map(node => node.textContent))
            .toEqual(["Standard Kunai"]);
    });

    it("combines search and category filtering", async () => {
        const user = userEvent.setup();
        renderShop("/ninja-shop", {
            itemList: [
                ...mockProducts,
                { ...mockProducts[0], id: "4", name: "Training Scroll" },
                { ...mockProducts[1], id: "5", name: "Ancient Manuscript" }
            ]
        });

        await user.type(screen.getByPlaceholderText("Search items..."), "Scroll");
        await user.selectOptions(screen.getByDisplayValue("All Categories"), "Scrolls");

        expect(screen.getAllByRole("heading", { level: 3 }).map(node => node.textContent))
            .toEqual(["Summoning Scroll"]);
    });

    it.each([
        ["price — ascending", "price-asc", ["Standard Kunai", "Konoha Headband", "Summoning Scroll"]],
        ["price — descending", "price-desc", ["Summoning Scroll", "Konoha Headband", "Standard Kunai"]],
        ["name — A–Z", "name-asc", ["Konoha Headband", "Standard Kunai", "Summoning Scroll"]],
        ["name — Z–A", "name-desc", ["Summoning Scroll", "Standard Kunai", "Konoha Headband"]]
    ])("sorts by %s", async (_description, option, expectedNames) => {
        const user = userEvent.setup();
        renderShop();

        await user.selectOptions(screen.getByDisplayValue("Sort By"), option);

        expect(screen.getAllByRole("heading", { level: 3 }).map(node => node.textContent))
            .toEqual(expectedNames);
    });

    it("reads the category from the URL", () => {
        renderShop("/ninja-shop?category=Apparel");

        expect(screen.getByDisplayValue("Apparel")).toBeVisible();
        expect(screen.getAllByRole("heading", { level: 3 }).map(node => node.textContent))
            .toEqual(["Konoha Headband"]);
    });

    it("displays all available products", () => {
        renderShop();

        expect(
            screen.getByRole("heading", {
                name: "Standard Kunai"
            })
        ).toBeInTheDocument();

        expect(
            screen.getByRole("heading", {
                name: "Summoning Scroll"
            })
        ).toBeInTheDocument();

        expect(
            screen.getByRole("heading", {
                name: "Konoha Headband"
            })
        ).toBeInTheDocument();
    });
    it("filters products by search term", async () => {
    const user = userEvent.setup();

    renderShop();

    await user.type(
        screen.getByPlaceholderText("Search items..."),
        "Kunai"
    );

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

describe("Shop route loading and error states", () => {
    afterEach(() => {
        vi.unstubAllGlobals();
        vi.restoreAllMocks();
    });

    function renderShopRoute() {
        render(
            <MemoryRouter initialEntries={["/ninja-shop"]}>
                <Routes>
                    <Route element={<App />}>
                        <Route path="/ninja-shop" element={<Shop />} />
                    </Route>
                </Routes>
            </MemoryRouter>
        );
    }

    it("displays the loading state while products are being fetched", () => {
        vi.stubGlobal("fetch", vi.fn(() => new Promise(() => {})));
        renderShopRoute();

        expect(screen.getByText("Loading items...")).toBeVisible();
        expect(screen.queryByText("No ninja supplies found.")).not.toBeInTheDocument();
    });

    it("displays the error state when fetching products fails", async () => {
        vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));
        const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
        renderShopRoute();

        expect(await screen.findByText("Error: Failed to fetch items.")).toBeVisible();
        expect(screen.queryByText("Loading items...")).not.toBeInTheDocument();
        expect(screen.queryByText("No ninja supplies found.")).not.toBeInTheDocument();
        expect(consoleError).toHaveBeenCalledWith(
            "Error fetching items:",
            expect.objectContaining({ message: "Failed to fetch items." })
        );
    });
});
