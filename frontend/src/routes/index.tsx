import { createFileRoute } from '@tanstack/react-router'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    useQuery,
} from '@tanstack/react-query'
import { getTotalExpenses } from '@/lib/data/expenses'


export const Route = createFileRoute('/')({
    component: Index,
})

function Index() {
    const { isPending, error, data } = useQuery({ queryKey: ['get-total-expenses'], queryFn: getTotalExpenses })

    if (error) return "An error has occured" + error.message

    return (
        <div className="max-w-md mx-auto mt-4 md:mt-6 lg:mt-8">
            <Card>
                <CardHeader>
                    <CardTitle>Expense Tracker</CardTitle>
                    <CardDescription>Total Amount you have spent</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Total Spent {isPending ? "......." : data.total}</p>
                    <Button>Get More</Button>
                </CardContent>
                <CardFooter>
                    <p>Card Footer</p>
                </CardFooter>
            </Card>
        </div>
    );
};
