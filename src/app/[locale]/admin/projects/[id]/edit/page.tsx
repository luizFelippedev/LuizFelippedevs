// C:\LF\luiz-felipe-portfolio\src\app\[locale]\admin\projects\[id]\edit\page.tsx
import { ProjectForm } from "@/components/admin/Forms/ProjectForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default async function EditProjectPage({ params }: { params: { id: string } }) {
  const project = await prisma.project.findUnique({ where: { id: params.id } });
  if (!project) notFound();

  return (
    <div className="p-4 md:p-8 pt-6 space-y-4">
      <Link href="/admin/projects" className="flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
        <ChevronLeft className="mr-2 h-4 w-4" />
        Voltar para todos os projetos
      </Link>
      <Card>
        <CardHeader>
          <CardTitle>Editando: {project.title}</CardTitle>
          <CardDescription>
            Modifique as informações abaixo para atualizar o projeto.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProjectForm project={project} />
        </CardContent>
      </Card>
    </div>
  );
}