import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BellIcon, Book, ChevronRight, Edit, EllipsisVertical, Pin, PinOff, Trash } from 'lucide-react'
import { Badge } from "../reui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Field, FieldLabel, FieldError } from "../ui/field"
import { useState } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

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

// Zod validation schema
const projectSchema = z.object({
    name: z.string().min(2, "Project name must be at least 2 characters"),
    client: z.string().min(2, "Client name must be at least 2 characters"),
    status: z.string().min(1, "Status is required"),
    specialty: z.string().min(1, "Specialty is required"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    startDate: z.string().min(1, "Start date is required"),
    progress: z.number().min(0).max(100, "Progress must be between 0 and 100"),
})

type ProjectFormData = z.infer<typeof projectSchema>

export function CurrentProjects() {
    const [pinnedProjects, setPinnedProjects] = useState<number[]>([])
    const [editDialogOpen, setEditDialogOpen] = useState(false)
    const [selectedProject, setSelectedProject] = useState<typeof projectsData[0] | null>(null)

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ProjectFormData>({
        resolver: zodResolver(projectSchema),
    })

    const togglePin = (id: number) => {
        if (pinnedProjects.includes(id)) {
            setPinnedProjects(pinnedProjects.filter(p => p !== id))
        } else {
            setPinnedProjects([...pinnedProjects, id])
        }
    }

    const handleEditClick = (project: typeof projectsData[0]) => {
        setSelectedProject(project)
        reset({
            name: project.name,
            client: project.client,
            status: project.status,
            specialty: project.specialty,
            description: project.description,
            startDate: project.startDate,
            progress: project.progress,
        })
        setEditDialogOpen(true)
    }

    const onSubmit: SubmitHandler<ProjectFormData> = (data) => {
        console.log("Updated project data:", { ...selectedProject, ...data })
        // Here you would typically make an API call to update the project
        setEditDialogOpen(false)
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
                                            <PinOff />
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
                                            <DropdownMenuItem onClick={() => handleEditClick(i)}>
                                                <Edit /> Edit
                                            </DropdownMenuItem>
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

            {/* Edit Project Dialog */}
            <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col justify-center">
                    <DialogHeader>
                        <DialogTitle>Edit Project</DialogTitle>
                        <DialogDescription>
                            Update the project details below
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            {/* Project Name */}
                            <Field>
                                <FieldLabel htmlFor="name">Project Name</FieldLabel>
                                <Input
                                    id="name"
                                    placeholder="Enter project name"
                                    {...register("name")}
                                />
                                <FieldError errors={errors.name ? [errors.name] : undefined} />
                            </Field>

                            {/* Client */}
                            <Field>
                                <FieldLabel htmlFor="client">Client</FieldLabel>
                                <Input
                                    id="client"
                                    placeholder="Enter client name"
                                    {...register("client")}
                                />
                                <FieldError errors={errors.client ? [errors.client] : undefined} />
                            </Field>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {/* Status */}
                            <Field>
                                <FieldLabel htmlFor="status">Status</FieldLabel>
                                <Input
                                    id="status"
                                    placeholder="e.g., Trending, In Progress"
                                    {...register("status")}
                                />
                                <FieldError errors={errors.status ? [errors.status] : undefined} />
                            </Field>

                            {/* Specialty */}
                            <Field>
                                <FieldLabel htmlFor="specialty">Specialty</FieldLabel>
                                <Input
                                    id="specialty"
                                    placeholder="e.g., Featured, High Priority"
                                    {...register("specialty")}
                                />
                                <FieldError errors={errors.specialty ? [errors.specialty] : undefined} />
                            </Field>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {/* Start Date */}
                            <Field>
                                <FieldLabel htmlFor="startDate">Start Date</FieldLabel>
                                <Input
                                    id="startDate"
                                    type="date"
                                    {...register("startDate")}
                                />
                                <FieldError errors={errors.startDate ? [errors.startDate] : undefined} />
                            </Field>

                            {/* Progress */}
                            <Field>
                                <FieldLabel htmlFor="progress">Progress (%)</FieldLabel>
                                <Input
                                    id="progress"
                                    type="number"
                                    min="0"
                                    max="100"
                                    placeholder="0-100"
                                    {...register("progress")}
                                />
                                <FieldError errors={errors.progress ? [errors.progress] : undefined} />
                            </Field>
                        </div>

                        {/* Description */}
                        <Field>
                            <FieldLabel htmlFor="description">Description</FieldLabel>
                            <Textarea
                                id="description"
                                placeholder="Enter project description"
                                rows={4}
                                {...register("description")}
                            />
                            <FieldError errors={errors.description ? [errors.description] : undefined} />
                        </Field>

                        <div className="flex justify-end gap-3 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setEditDialogOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button type="submit">
                                Save Changes
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>

    )
}
