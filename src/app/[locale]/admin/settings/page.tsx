// C:\LF\luiz-felipe-portfolio\src\app\[locale]\admin\settings\page.tsx
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProfileForm } from '@/components/admin/settings/ProfileForm';
import { SiteSettingsForm } from '@/components/admin/settings/SiteSettingsForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Key } from 'lucide-react';

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    notFound();
  }

  const currentUser = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!currentUser) {
    notFound();
  }
  
  const siteSettings = await prisma.siteSettings.findUnique({
    where: { id: 'main' },
  });

  const isResendConfigured = typeof process.env.RESEND_API_KEY === 'string' && 
                             process.env.RESEND_API_KEY.length > 0;

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Configurações</h2>
      </div>
      
      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Perfil</TabsTrigger>
          <TabsTrigger value="site">Site</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <ProfileForm user={currentUser} />
        </TabsContent>

        <TabsContent value="site" className="space-y-4">
          <SiteSettingsForm settings={siteSettings} />
        </TabsContent>

        <TabsContent value="api" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Chaves de API</CardTitle>
              <CardDescription>
                Gerencie as chaves para serviços externos. Configure estas chaves no arquivo .env
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Key className="h-4 w-4" />
                    <span className="font-semibold">Resend API Key</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Necessária para envio de e-mails
                  </p>
                </div>
                <Badge variant={isResendConfigured ? 'default' : 'destructive'}>
                  {isResendConfigured ? 'Configurada' : 'Não Configurada'}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}