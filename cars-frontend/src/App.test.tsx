import "@testing-library/jest-dom/vitest"
import {render, screen} from "@testing-library/react"
import {describe, expect, test} from "vitest"
import App from "./App.tsx"

describe("App tests", () => {
    test("component renders", () => {
        render(<App/>)
        expect(screen.getByText(/Car Shop/i)).toBeInTheDocument();
    })
})
