'use client';

import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ArrowUpDown, MoreHorizontal, Pencil, Trash2, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Project } from '@prisma/client';

export function getColumns(): ColumnDef<Project>[] {
  return [
    {
      accessorKey: 'title',
      header: ({ column }) => (
        <Button 
          variant="ghost" 
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Título <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue('title')}</div>
      ),
    },
    {
      accessorKey: 'published',
      header: 'Status',
      cell: ({ row }) => {
        const isPublished = row.getValue('published');
        return (
          <Badge variant={isPublished ? 'default' : 'outline'}>
            {isPublished ? 'Publicado' : 'Rascunho'}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'createdAt',
      header: 'Criado em',
      cell: ({ row }) => {
        const date = row.getValue('createdAt') as Date;
        return new Date(date).toLocaleDateString('pt-BR');
      },
    },
    {
      id: 'actions',
      header: 'Ações',
      cell: ({ row }) => {
        const project = row.original;
        
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
              <DropdownMenuItem asChild>
                <Link href={`/admin/projects/${project.id}`}>
                  <Eye className="mr-2 h-4 w-4" /> Ver Detalhes
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/admin/projects/${project.id}/edit`}>
                  <Pencil className="mr-2 h-4 w-4" /> Editar
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="text-destructive focus:text-destructive-foreground focus:bg-destructive"
                onClick={() => {
                  if (confirm(`Tem certeza que deseja deletar o projeto "${project.title}"?`)) {
                    // Implement delete logic here
                    console.log('Delete project:', project.id);
                  }
                }}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Deletar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}