// C:\LF\luiz-felipe-portfolio\src\app\[locale]\admin\projects\page.tsx
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Edit, Eye, Trash2 } from "lucide-react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"

// Defina o tipo do seu projeto baseado no Prisma schema
export type Project = {
  id: string
  title: string
  description: string | null
  published: boolean
  createdAt: Date
  updatedAt: Date
  // Adicione outros campos conforme necessário
}

export function getColumns(): ColumnDef<Project>[] {
  return [
    {
      accessorKey: "title",
      header: "Título",
      cell: ({ row }) => {
        const project = row.original
        return (
          <div className="flex flex-col">
            <span className="font-medium">{project.title}</span>
            {project.description && (
              <span className="text-sm text-muted-foreground truncate max-w-[200px]">
                {project.description}
              </span>
            )}
          </div>
        )
      },
    },
    {
      accessorKey: "published",
      header: "Status",
      cell: ({ row }) => {
        const published = row.getValue("published") as boolean
        return (
          <Badge variant={published ? "default" : "secondary"}>
            {published ? "Publicado" : "Rascunho"}
          </Badge>
        )
      },
    },
    {
      accessorKey: "createdAt",
      header: "Criado",
      cell: ({ row }) => {
        const date = row.getValue("createdAt") as Date
        return (
          <span className="text-sm text-muted-foreground">
            {formatDistanceToNow(date, { 
              addSuffix: true,
              locale: ptBR 
            })}
          </span>
        )
      },
    },
    {
      accessorKey: "updatedAt",
      header: "Atualizado",
      cell: ({ row }) => {
        const date = row.getValue("updatedAt") as Date
        return (
          <span className="text-sm text-muted-foreground">
            {formatDistanceToNow(date, { 
              addSuffix: true,
              locale: ptBR 
            })}
          </span>
        )
      },
    },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row }) => {
        const project = row.original
        
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Abrir menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(project.id)}
              >
                Copiar ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={`/admin/projects/${project.id}`}>
                  <Eye className="mr-2 h-4 w-4" />
                  Visualizar
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/admin/projects/${project.id}/edit`}>
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
}