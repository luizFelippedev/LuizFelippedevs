import prisma from '@/lib/prisma';
import { DataTable } from '@/components/admin/DataTable';
import { getColumns } from '../columns';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const revalidate = 0;

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const columns = getColumns();
  const publishedProjects = projects.filter(p => p.published);
  const draftProjects = projects.filter(p => !p.published);

  return (
    <div className="p-4 md:p-8 pt-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gerenciar Projetos</h2>
          <p className="text-muted-foreground">Adicione, edite e visualize seus projetos.</p>
        </div>
        <Button asChild>
          <Link href="/admin/projects/new">
            <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Novo Projeto
          </Link>
        </Button>
      </div>
      
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">Todos ({projects.length})</TabsTrigger>
          <TabsTrigger value="published">Publicados ({publishedProjects.length})</TabsTrigger>
          <TabsTrigger value="drafts">Rascunhos ({draftProjects.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <DataTable columns={columns} data={projects} />
        </TabsContent>
        <TabsContent value="published">
          <DataTable columns={columns} data={publishedProjects} />
        </TabsContent>
        <TabsContent value="drafts">
          <DataTable columns={columns} data={draftProjects} />
        </TabsContent>
      </Tabs>
    </div>
  );
}