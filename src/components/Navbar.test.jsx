import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Navbar from "./Navbar";

function renderNavbar(count = 0) {
    return render(
        <MemoryRouter>
            <Navbar count={count} />
        </MemoryRouter>
    );
}

describe("Navbar", () => {
    it("renders the Home link", () => {
        renderNavbar();

        expect(screen.getByRole("link", { name: "Home", exact: true })).toBeVisible();
    });

    it("renders the Ninja Shop link", () => {
        renderNavbar();

        expect(screen.getByRole("link", { name: "Ninja Shop", exact: true })).toBeVisible();
    });

    it("renders the Your Inventory link", () => {
        renderNavbar();

        expect(screen.getByRole("link", { name: /^Your Inventory/ })).toBeVisible();
    });

    it("displays a cart count of 0", () => {
        renderNavbar(0);

        expect(
            screen.getByRole("link", { name: "Your Inventory (0)", exact: true })
        ).toBeVisible();
    });

    it("displays a cart count of 5", () => {
        renderNavbar(5);

        expect(
            screen.getByRole("link", { name: "Your Inventory (5)", exact: true })
        ).toBeVisible();
    });

    it("gives the Home link the correct href", () => {
        renderNavbar();

        expect(screen.getByRole("link", { name: "Home", exact: true }))
            .toHaveAttribute("href", "/");
    });

    it("gives the Ninja Shop link the correct href", () => {
        renderNavbar();

        expect(screen.getByRole("link", { name: "Ninja Shop", exact: true }))
            .toHaveAttribute("href", "/ninja-shop");
    });

    it("gives the Your Inventory link the correct href", () => {
        renderNavbar();

        expect(screen.getByRole("link", { name: /^Your Inventory/ }))
            .toHaveAttribute("href", "/your-inventory");
    });
});
