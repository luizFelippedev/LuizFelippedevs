// C:\LF\luiz-felipe-portfolio\src\app\[locale]\admin\projects\new\page.tsx
import { ProjectForm } from "@/components/admin/Forms/ProjectForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function NewProjectPage() {
  return (
    <div className="p-4 md:p-8 pt-6 space-y-4">
      <Link href="/admin/projects" className="flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
        <ChevronLeft className="mr-2 h-4 w-4" />
        Voltar para todos os projetos
      </Link>
      <Card>
        <CardHeader>
          <CardTitle>Criar Novo Projeto</CardTitle>
          <CardDescription>
            Preencha as informações abaixo para adicionar um novo projeto ao seu portfólio.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProjectForm />
        </CardContent>
      </Card>
    </div>
  );
}