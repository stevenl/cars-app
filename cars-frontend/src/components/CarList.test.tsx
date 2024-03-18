import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import "@testing-library/jest-dom/vitest"
import {render, screen, waitFor} from "@testing-library/react"
import {describe, expect, test} from "vitest"
import CarList from "./CarList.tsx"
import {ReactNode} from "react"

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
})

const wrapper = ({children}: {children: ReactNode}) => (
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
)

describe("CarList tests", () => {
    test("component renders", () => {
        render(<CarList/>, {wrapper})
        expect(screen.getByText(/Loading/i)).toBeInTheDocument()
    })
    test("Cars are fetched", async () => {
        render(<CarList/>, {wrapper})
        await waitFor(() => screen.getByText(/New Car/i))
        expect(screen.getByText(/Ford/i)).toBeInTheDocument()
    })
})
