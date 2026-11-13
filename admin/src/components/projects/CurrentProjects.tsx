import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BellIcon, Book, ChevronRight, Edit, EllipsisVertical, Pin, PinIcon, PinOff, PinOffIcon, Trash } from 'lucide-react'
import { Badge } from "../reui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { useState } from "react"

const projectsData = [
    {
        id: 1,
        name: "Grannth",
        image: "16:9.png",
        status: "Trending",
        specialty: "Featured",
        description: "A modern e-commerce solution with integrated payment gateway and inventory management system.",
        client: "Kshirod Prakashan",
        startDate: "2024-01-15",
        progress: 75
    },
    {
        id: 2,
        name: "CCTP-WB-JOB",
        image: "16:9.png",
        status: "In Progress",
        specialty: "High Priority",
        description: "A comprehensive career counseling and career guidance platform connecting students with professional mentors and job opportunities.",
        client: "CCTP-WB-JOB",
        startDate: "2024-02-10",
        progress: 45
    },
    {
        id: 3,
        name: "HRMS",
        image: "16:9.png",
        status: "Planning",
        specialty: "New",
        description: "Real-time analytics dashboard for human resource management with employee tracking, attendance monitoring, payroll processing, and performance evaluation tools.",
        client: "TechBinaryz",
        startDate: "2024-01-20",
        progress: 90
    },
    {
        id: 4,
        name: "Writtoo",
        image: "16:9.png",
        status: "Trending",
        specialty: "Featured",
        description: "A collaborative platform featuring discussion rooms for community engagement and a powerful blog publishing system with rich text editing.",
        client: "TechBinaryz",
        startDate: "2024-03-01",
        progress: 20
    },
    {
        id: 5,
        name: "Portfolio",
        image: "16:9.png",
        status: "Trending",
        specialty: "Featured",
        description: "Modern and dynamic portfolio website showcasing TechBinaryz's projects, services, team expertise, and client success stories.",
        client: "TechBinaryz",
        startDate: "2024-02-05",
        progress: 60
    }
]

export function CurrentProjects() {
    const [pinnedProjects, setPinnedProjects] = useState<number[]>([])

    const togglePin = (id: number) => {
        if (pinnedProjects.includes(id)) {
            setPinnedProjects(pinnedProjects.filter(p => p !== id))
        } else {
            setPinnedProjects([...pinnedProjects, id])
        }
    }

    return (
        <div className="grid grid-cols-3 my-2 gap-4">
            {
                projectsData.map((i) => {
                    const isPinned = pinnedProjects.includes(i.id)

                    return (
                        <Card key={i.id} className="w-full max-w-xs overflow-hidden pt-0">
                            <div className="relative h-48 w-full overflow-hidden">
                                <img
                                    src={i.image}
                                    alt="16:9"
                                    width={1000}
                                    height={800}
                                    className="h-full w-full object-cover"
                                />
                                {isPinned ? (
                                    <>
                                        <Badge variant="outline" className="absolute top-3 left-4">
                                            <PinOffIcon />
                                        </Badge>
                                        <Badge variant="outline" className="absolute top-3 left-10">
                                            <BellIcon aria-hidden="true" />
                                            {i.status}
                                        </Badge>
                                    </>
                                ) : (
                                    <Badge variant="outline" className="absolute top-3 left-4">
                                        <BellIcon aria-hidden="true" />
                                        {i.status}
                                    </Badge>
                                )}


                                <DropdownMenu>
                                    <DropdownMenuTrigger className="absolute top-3 right-4">
                                        <Button variant="secondary" size="icon">
                                            <EllipsisVertical className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>

                                    <DropdownMenuContent className="w-40" align="end">
                                        <DropdownMenuGroup>
                                            <DropdownMenuLabel>Manage</DropdownMenuLabel>
                                            {isPinned ? (
                                                <DropdownMenuItem onClick={() => togglePin(i.id)}>
                                                    <PinOff /> Unpin
                                                </DropdownMenuItem>
                                            ) : (
                                                <DropdownMenuItem onClick={() => togglePin(i.id)}>
                                                    <Pin /> Pin
                                                </DropdownMenuItem>
                                            )}
                                            <DropdownMenuItem><Edit /> Edit</DropdownMenuItem>
                                            <DropdownMenuItem><Book /> Read More</DropdownMenuItem>
                                        </DropdownMenuGroup>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem variant="destructive"><Trash /> Delete</DropdownMenuItem>
                                        </DropdownMenuGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>

                            </div>

                            <CardContent className="flex flex-col gap-4 pt-4">
                                <div className="flex items-center justify-between gap-5">
                                    <div className="flex items-center gap-1">
                                        <Badge variant="secondary">
                                            {i.client}
                                        </Badge>
                                    </div>
                                </div>

                                <p className="text-foreground text-sm line-clamp-3">
                                    {i.description}
                                </p>

                                <Button>
                                    Get Started
                                    <ChevronRight aria-hidden="true" />
                                </Button>
                            </CardContent>
                        </Card>
                    )
                }
                )
            }
        </div>

    )
}
