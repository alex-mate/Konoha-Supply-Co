import { describe, it, expect, vi, afterEach } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {
    MemoryRouter,
    Routes,
    Route
} from "react-router";

import App from "./App";
import Home from "./Pages/Home";
import Shop from "./Pages/Shop";
import Cart from "./Pages/Cart";

const mockProducts = [
    {
        id: "1",
        name: "Standard Kunai",
        price: 150,
        currency: "Ryō",
        stock: 5,
        category: "Weapons",
        rarity: "Common",
        description: "Essential ninja equipment.",
        image: "standard-kunai.webp",
        featured: true
    }
];

function renderApp(url = "/", fetchMock = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => mockProducts
})) {
    vi.stubGlobal(
        "fetch",
        fetchMock
    );

    render(
        <MemoryRouter initialEntries={[url]}>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<Home />} />
                    <Route path="home" element={<Home />} />
                    <Route path="ninja-shop" element={<Shop />} />
                    <Route path="your-inventory" element={<Cart />} />
                </Route>
            </Routes>
        </MemoryRouter>
    );
}

afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
});

describe("App Integration", () => {
    async function addProduct(user, quantity = 1) {
        await screen.findByRole("heading", { name: "Standard Kunai" });
        fireEvent.change(screen.getByRole("spinbutton"), {
            target: { value: String(quantity) }
        });
        await user.click(screen.getByRole("button", { name: "Add to Pouch" }));
    }

    async function openCart(user) {
        await user.click(within(screen.getByRole("navigation")).getByRole("link", {
            name: /Your Inventory/
        }));
    }

    function expectCartCount(count) {
        expect(within(screen.getByRole("navigation")).getByRole("link", {
            name: `Your Inventory (${count})`, exact: true
        })).toBeVisible();
    }

    it("updates the Navbar cart count", async () => {
        const user = userEvent.setup();
        renderApp();
        await screen.findByRole("navigation");
        expectCartCount(0);

        await addProduct(user, 3);

        expectCartCount(3);
    });

    it("combines duplicate products into one cart item", async () => {
        const user = userEvent.setup();
        renderApp("/ninja-shop");

        await addProduct(user, 2);
        await addProduct(user, 1);
        await openCart(user);

        expect(screen.getAllByRole("heading", { name: "Standard Kunai" })).toHaveLength(1);
        expect(screen.getAllByRole("spinbutton")).toHaveLength(1);
        expect(screen.getByRole("spinbutton")).toHaveValue(3);
        expect(screen.getByText("Total Price: 450 Ryō")).toBeVisible();
        expectCartCount(3);
    });

    it("prevents adding more products than available stock", async () => {
        const user = userEvent.setup();
        renderApp("/ninja-shop");

        await addProduct(user, 4);
        await addProduct(user, 3);
        await addProduct(user, 1);
        await openCart(user);

        expect(screen.getByRole("spinbutton")).toHaveValue(5);
        expect(screen.getByText("Total Items: 5")).toBeVisible();
        expect(screen.getByText("Total Price: 750 Ryō")).toBeVisible();
        expectCartCount(5);
    });

    it("updates quantity and recalculates total price", async () => {
        const user = userEvent.setup();
        renderApp();
        await addProduct(user, 2);
        await openCart(user);
        expect(screen.getByText("Total Price: 300 Ryō")).toBeVisible();

        fireEvent.change(screen.getByRole("spinbutton", { name: "Quantity:" }), {
            target: { value: "4" }
        });

        expect(screen.getByRole("spinbutton")).toHaveValue(4);
        expect(screen.getByText("Total: 600 Ryō")).toBeVisible();
        expect(screen.getByText("Total Price: 600 Ryō")).toBeVisible();
        expect(screen.getByText("Total Items: 4")).toBeVisible();
        expectCartCount(4);
    });

    it("updates the Navbar after removing a product", async () => {
        const user = userEvent.setup();
        renderApp();
        await addProduct(user, 3);
        await openCart(user);
        expectCartCount(3);

        await user.click(screen.getByRole("button", { name: "Remove" }));

        expectCartCount(0);
    });

    it("displays an empty cart after removing all products", async () => {
        const user = userEvent.setup();
        renderApp();
        await addProduct(user, 2);
        await openCart(user);

        await user.click(screen.getByRole("button", { name: "Remove" }));

        expect(screen.getByText("Your pouch is empty. Go to the Ninja Shop to add some items!"))
            .toBeVisible();
        expect(screen.queryByRole("heading", { name: "Standard Kunai" })).not.toBeInTheDocument();
        expect(screen.queryByRole("button", { name: "Remove" })).not.toBeInTheDocument();
        expect(screen.getByText("Total Items: 0")).toBeVisible();
        expect(screen.getByText("Total Price: 0 Ryō")).toBeVisible();
    });

    it("handles a failed API request", async () => {
        const error = new Error("Network unavailable");
        const fetchMock = vi.fn().mockRejectedValue(error);
        const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
        renderApp("/", fetchMock);

        expect(await screen.findByText("Error: Network unavailable")).toBeVisible();
        expect(screen.queryByText("Loading items...")).not.toBeInTheDocument();
        expect(screen.queryByRole("button", { name: "Add to Pouch" })).not.toBeInTheDocument();
        expect(consoleError).toHaveBeenCalledWith("Error fetching items:", error);
    });

    it("shares the cart between Home and Shop", async () => {
        const user = userEvent.setup();

        renderApp();

        await screen.findByRole("heading", {
            name: "Standard Kunai"
        });

        await user.click(
            screen.getByRole("button", {
                name: "Add to Pouch"
            })
        );

        const navbar = within(
            screen.getByRole("navigation")
        );

        await user.click(
            navbar.getByRole("link", {
                name: "Ninja Shop"
            })
        );

        await user.click(
            screen.getByRole("button", {
                name: "Add to Pouch"
            })
        );

        await user.click(
            navbar.getByRole("link", {
                name: /Your Inventory/i
            })
        );

        expect(
            screen.getByRole("spinbutton")
        ).toHaveValue(2);

        expect(
            screen.getByText(/Total Price: 300 Ryō/i)
        ).toBeInTheDocument();
    });
});
