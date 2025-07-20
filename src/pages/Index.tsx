import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

export default function Index() {
  const [activeUsers, setActiveUsers] = useState(47892);
  const [totalViews, setTotalViews] = useState(1247893);
  const [systemStatus, setSystemStatus] = useState('active');
  const [targetUrl, setTargetUrl] = useState('https://example.com');
  const [isRunning, setIsRunning] = useState(false);
  const [visitResults, setVisitResults] = useState({
    totalVisits: 0,
    successfulVisits: 0,
    failedVisits: 0,
    avgResponseTime: 0,
    uniqueIPs: 0,
    bytesTransferred: 0
  });

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveUsers(prev => prev + Math.floor(Math.random() * 10) - 3);
      setTotalViews(prev => prev + Math.floor(Math.random() * 50));
      
      // Update visit results when running
      if (isRunning) {
        setVisitResults(prev => ({
          totalVisits: prev.totalVisits + Math.floor(Math.random() * 25) + 5,
          successfulVisits: prev.successfulVisits + Math.floor(Math.random() * 23) + 4,
          failedVisits: prev.failedVisits + Math.floor(Math.random() * 3),
          avgResponseTime: 150 + Math.floor(Math.random() * 100),
          uniqueIPs: prev.uniqueIPs + Math.floor(Math.random() * 8) + 2,
          bytesTransferred: prev.bytesTransferred + Math.floor(Math.random() * 500000) + 100000
        }));
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const metrics = [
    {
      title: 'Активные пользователи',
      value: activeUsers.toLocaleString(),
      change: '+12.5%',
      icon: 'Users',
      trend: 'up'
    },
    {
      title: 'Общие просмотры',
      value: totalViews.toLocaleString(),
      change: '+8.2%',
      icon: 'Eye',
      trend: 'up'
    },
    {
      title: 'Успешность',
      value: '98.7%',
      change: '+0.3%',
      icon: 'CheckCircle',
      trend: 'up'
    },
    {
      title: 'Защита от DDoS',
      value: '24/7',
      change: 'Активна',
      icon: 'Shield',
      trend: 'stable'
    }
  ];

  const countries = [
    { name: 'Россия', users: 15234, flag: '🇷🇺' },
    { name: 'США', users: 8945, flag: '🇺🇸' },
    { name: 'Германия', users: 6789, flag: '🇩🇪' },
    { name: 'Китай', users: 5432, flag: '🇨🇳' },
    { name: 'Франция', users: 4321, flag: '🇫🇷' }
  ];

  return (
    <div className="min-h-screen bg-background dark text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Icon name="Monitor" size={24} className="text-primary" />
                <h1 className="text-2xl font-bold tracking-tight">TrafficFlow Pro</h1>
              </div>
              <Badge variant="outline" className="animate-pulse-green">
                <Icon name="Circle" size={8} className="mr-1 fill-primary text-primary" />
                СИСТЕМА АКТИВНА
              </Badge>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Icon name="Settings" size={16} className="mr-2" />
                Настройки
              </Button>
              <Button variant="outline" size="sm">
                <Icon name="Download" size={16} className="mr-2" />
                Экспорт
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Main Dashboard */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {metrics.map((metric, index) => (
            <Card key={index} className="animate-counter-up border-border/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.title}
                </CardTitle>
                <Icon 
                  name={metric.icon as any} 
                  size={16} 
                  className="text-muted-foreground" 
                />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold font-mono tracking-tight">
                  {metric.value}
                </div>
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                  <Icon 
                    name={metric.trend === 'up' ? 'TrendingUp' : 'Minus'} 
                    size={12} 
                    className={`mr-1 ${metric.trend === 'up' ? 'text-primary' : 'text-muted-foreground'}`} 
                  />
                  {metric.change} за 24ч
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <Icon name="BarChart3" size={16} />
              <span>Дашборд</span>
            </TabsTrigger>
            <TabsTrigger value="config" className="flex items-center space-x-2">
              <Icon name="Settings" size={16} />
              <span>Конфигурация</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <Icon name="LineChart" size={16} />
              <span>Аналитика</span>
            </TabsTrigger>
            <TabsTrigger value="logs" className="flex items-center space-x-2">
              <Icon name="FileText" size={16} />
              <span>Журнал</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Traffic Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Icon name="Activity" size={20} />
                    <span>Трафик в реальном времени</span>
                  </CardTitle>
                  <CardDescription>
                    Активность пользователей за последние 24 часа
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-end space-x-2">
                    {Array.from({ length: 24 }, (_, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-primary/20 border-t-2 border-primary rounded-t-sm"
                        style={{ 
                          height: `${Math.random() * 80 + 20}%`,
                          animationDelay: `${i * 50}ms`
                        }}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-4">
                    <span>00:00</span>
                    <span>06:00</span>
                    <span>12:00</span>
                    <span>18:00</span>
                    <span>24:00</span>
                  </div>
                </CardContent>
              </Card>

              {/* Geographic Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Icon name="Globe" size={20} />
                    <span>География пользователей</span>
                  </CardTitle>
                  <CardDescription>
                    Распределение по странам
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {countries.map((country, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{country.flag}</span>
                        <span className="font-medium">{country.name}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-20 bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-1000"
                            style={{ width: `${(country.users / 15234) * 100}%` }}
                          />
                        </div>
                        <span className="font-mono text-sm w-16 text-right">
                          {country.users.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* System Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Icon name="Server" size={20} />
                  <span>Состояние системы</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">CPU Usage</span>
                      <span className="text-sm font-mono">67%</span>
                    </div>
                    <Progress value={67} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Memory</span>
                      <span className="text-sm font-mono">43%</span>
                    </div>
                    <Progress value={43} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Network</span>
                      <span className="text-sm font-mono">89%</span>
                    </div>
                    <Progress value={89} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Visit Results */}
            {isRunning && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Icon name="BarChart3" size={20} />
                    <span>Результаты посещений</span>
                    <Badge variant="outline" className="animate-pulse">
                      LIVE
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    Статистика посещений {targetUrl}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
                    <div className="text-center space-y-1">
                      <div className="text-2xl font-bold font-mono text-primary">
                        {visitResults.totalVisits.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">Всего посещений</div>
                    </div>
                    <div className="text-center space-y-1">
                      <div className="text-2xl font-bold font-mono text-green-500">
                        {visitResults.successfulVisits.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">Успешных</div>
                    </div>
                    <div className="text-center space-y-1">
                      <div className="text-2xl font-bold font-mono text-red-500">
                        {visitResults.failedVisits.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">Ошибок</div>
                    </div>
                    <div className="text-center space-y-1">
                      <div className="text-2xl font-bold font-mono text-blue-500">
                        {visitResults.avgResponseTime}ms
                      </div>
                      <div className="text-xs text-muted-foreground">Время ответа</div>
                    </div>
                    <div className="text-center space-y-1">
                      <div className="text-2xl font-bold font-mono text-purple-500">
                        {visitResults.uniqueIPs.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">Уникальных IP</div>
                    </div>
                    <div className="text-center space-y-1">
                      <div className="text-2xl font-bold font-mono text-orange-500">
                        {(visitResults.bytesTransferred / 1024 / 1024).toFixed(1)}MB
                      </div>
                      <div className="text-xs text-muted-foreground">Передано</div>
                    </div>
                  </div>
                  
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Успешность запросов</span>
                      <span className="text-sm font-mono">
                        {visitResults.totalVisits > 0 ? 
                          ((visitResults.successfulVisits / visitResults.totalVisits) * 100).toFixed(1) 
                          : 0}%
                      </span>
                    </div>
                    <Progress 
                      value={visitResults.totalVisits > 0 ? 
                        (visitResults.successfulVisits / visitResults.totalVisits) * 100 
                        : 0} 
                      className="h-2" 
                    />
                  </div>

                  <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center space-x-2 text-sm">
                      <Icon name="Clock" size={14} />
                      <span>Последнее обновление: {new Date().toLocaleTimeString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="config" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Параметры системы</CardTitle>
                <CardDescription>
                  Настройка поведения и лимитов системы
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Target URL Configuration */}
                <div className="space-y-4 p-4 border border-border rounded-lg bg-muted/30">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold flex items-center">
                      <Icon name="Globe" size={20} className="mr-2" />
                      Целевая ссылка
                    </h3>
                    <Button 
                      size="sm" 
                      variant={isRunning ? "destructive" : "default"}
                      onClick={() => setIsRunning(!isRunning)}
                    >
                      <Icon name={isRunning ? "Square" : "Play"} size={16} className="mr-2" />
                      {isRunning ? "Остановить" : "Запустить"}
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="target-url">URL для просмотра</Label>
                    <div className="flex space-x-2">
                      <Input 
                        id="target-url"
                        type="url"
                        placeholder="https://example.com"
                        value={targetUrl}
                        onChange={(e) => setTargetUrl(e.target.value)}
                        className="font-mono"
                      />
                      <Button variant="outline" size="icon">
                        <Icon name="Copy" size={16} />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Ссылка, которую будут просматривать виртуальные пользователи
                    </p>
                  </div>
                  {isRunning && (
                    <div className="flex items-center space-x-2 text-sm text-primary">
                      <Icon name="Activity" size={16} className="animate-pulse" />
                      <span>Система активна • Просмотр: {targetUrl}</span>
                    </div>
                  )}
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Основные настройки</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span>Максимум пользователей</span>
                        <Badge variant="outline">1,000,000</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Задержка (сек)</span>
                        <Badge variant="outline">0-60</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>DDoS защита</span>
                        <Badge className="bg-primary">Включена</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">User-Agent ротация</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span>Chrome</span>
                        <Badge variant="outline">45%</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Firefox</span>
                        <Badge variant="outline">25%</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Safari</span>
                        <Badge variant="outline">20%</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Other</span>
                        <Badge variant="outline">10%</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Детальная аналитика</CardTitle>
                <CardDescription>
                  Подробные отчеты и метрики производительности
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <Icon name="BarChart3" size={48} className="mx-auto mb-4 opacity-50" />
                  <p>Расширенная аналитика в разработке</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="logs" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Журнал событий</CardTitle>
                <CardDescription>
                  История активности системы и пользователей
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 font-mono text-sm">
                  {[
                    '[15:34:22] INFO: Подключение 1,247 новых пользователей',
                    '[15:33:18] WARN: Высокая нагрузка на сервер #3',
                    '[15:32:45] INFO: DDoS атака заблокирована (IP: 192.168.1.xxx)',
                    '[15:31:12] INFO: Сессия завершена: 2,341 пользователей',
                    '[15:30:00] INFO: Система запущена успешно',
                  ].map((log, index) => (
                    <div key={index} className="flex items-center space-x-3 p-2 rounded border border-border/50">
                      <Icon 
                        name={log.includes('WARN') ? 'AlertTriangle' : log.includes('DDoS') ? 'Shield' : 'Info'} 
                        size={14} 
                        className={log.includes('WARN') ? 'text-yellow-500' : log.includes('DDoS') ? 'text-red-500' : 'text-primary'} 
                      />
                      <span>{log}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}