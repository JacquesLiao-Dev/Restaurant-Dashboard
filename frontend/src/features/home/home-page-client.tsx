"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CircleDollarSign,
  ShoppingBag,
  Users,
  Wallet,
} from "lucide-react";

import { BarTrendChart } from "@/components/dashboard/bar-trend-chart";
import { DashboardPageHeader } from "@/components/dashboard/page-header";
import { LineTrendChart } from "@/components/dashboard/line-trend-chart";
import { MenuItemImage } from "@/components/dashboard/menu-item-image";
import { MetricCard } from "@/components/dashboard/metric-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { InsetCard } from "@/components/ui/inset-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getDashboardOverview } from "@/lib/api";
import type { Customer, MenuItem, Order, RestaurantSettings } from "@/lib/api";
import {
  customerStatusLabels,
  getCustomerBadgeVariant,
  getOrderBadgeVariant,
  menuCategoryLabels,
  orderStatusLabels,
} from "@/lib/domain/constants";
import { formatCurrency, formatDateTime } from "@/lib/utils/format";

import {
  getOrdersSeries,
  getRevenueSeries,
  getRevenueSnapshot,
  getTodayOrdersSnapshot,
  getTopCustomers,
  getTopSellingMenuItems,
  getTotalRevenue,
  getTrackedCustomersSnapshot,
} from "@/features/home/home-analytics";

type HomeData = {
  customers: Customer[];
  orders: Order[];
  menuItems: MenuItem[];
  settings: RestaurantSettings;
};

export function HomePageClient() {
  const [data, setData] = useState<HomeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [revenuePeriod, setRevenuePeriod] = useState<"day" | "week" | "month">("day");
  const [ordersPeriod, setOrdersPeriod] = useState<"day" | "month">("day");

  async function loadHome() {
    try {
      setLoading(true);
      setError(false);
      const nextData = await getDashboardOverview();
      setData(nextData);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadHome();
  }, []);

  if (loading) {
    return (
      <div className="page-shell space-y-8">
        <DashboardPageHeader
          description="Chargement des métriques business, des séries de revenus et des blocs de pilotage du restaurant."
          eyebrow="Home"
          title="Tableau de bord"
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton className="h-44 rounded-lg" key={index} />
          ))}
        </div>
        <div className="grid gap-6 xl:grid-cols-[1.45fr_0.95fr]">
          <Skeleton className="h-[420px] rounded-lg" />
          <Skeleton className="h-[420px] rounded-lg" />
        </div>
        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <Skeleton className="h-[380px] rounded-lg" />
          <Skeleton className="h-[380px] rounded-lg" />
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="page-shell">
        <ErrorState
          action={<Button onClick={loadHome}>Réessayer</Button>}
          description="Impossible de récupérer l’aperçu du dashboard pour le moment."
          title="La vue d’ensemble n’a pas pu être chargée"
        />
      </div>
    );
  }

  const revenueSnapshot = getRevenueSnapshot(data.orders);
  const ordersSnapshot = getTodayOrdersSnapshot(data.orders);
  const trackedCustomersSnapshot = getTrackedCustomersSnapshot(data.orders);
  const totalRevenue = getTotalRevenue(data.orders);
  const revenueSeries = getRevenueSeries(data.orders, revenuePeriod);
  const ordersSeries = getOrdersSeries(data.orders, ordersPeriod);
  const topMenuItems = getTopSellingMenuItems(data.orders, data.menuItems);
  const topCustomers = getTopCustomers(data.orders, data.customers);
  const recentOrders = [...data.orders].sort((left, right) => right.createdAt.localeCompare(left.createdAt)).slice(0, 5);

  return (
    <div className="page-shell space-y-8">
      <DashboardPageHeader
        description={`Pilotage consolidé de ${data.settings.restaurantName}, avec tendances de revenus, volume de commandes et performance des plats.`}
        eyebrow="Home"
        title="Tableau de bord"
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          icon={CircleDollarSign}
          title="Chiffre d’affaires du jour"
          tone="accent"
          trend={{ change: revenueSnapshot.change, label: "vs hier" }}
          value={formatCurrency(revenueSnapshot.current)}
        />
        <MetricCard
          icon={ShoppingBag}
          title="Commandes du jour"
          tone="accent"
          trend={{ change: ordersSnapshot.change, label: "vs hier" }}
          value={String(ordersSnapshot.current)}
        />
        <MetricCard
          icon={Users}
          title="Clients suivis"
          tone="accent"
          trend={{ change: trackedCustomersSnapshot.change, label: "vs hier" }}
          value={String(trackedCustomersSnapshot.current)}
        />
        <MetricCard
          icon={Wallet}
          title="Revenu total"
          tone="accent"
          trend={{ change: null, label: "historique cumulé" }}
          value={formatCurrency(totalRevenue)}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.45fr_0.95fr]">
        <Card className="p-6" variant="elevated">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-1">
              <h2 className="text-h3 text-foreground">Revenus cumulés</h2>
            </div>
            <Tabs onValueChange={(value) => setRevenuePeriod(value as typeof revenuePeriod)} value={revenuePeriod}>
              <TabsList className="w-full sm:w-auto">
                <TabsTrigger value="day">Jour</TabsTrigger>
                <TabsTrigger value="week">Semaine</TabsTrigger>
                <TabsTrigger value="month">Mois</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <LineTrendChart
            chartId={`home-revenue-${revenuePeriod}`}
            data={revenueSeries}
            formatAxisValue={(value) => `${Math.round(value)} €`}
            formatValue={(value) => formatCurrency(value)}
          />
        </Card>

        <Card className="p-6" variant="elevated">
          <div className="space-y-1">
            <h2 className="text-h3 text-foreground">Menus les plus vendus</h2>
          </div>

          {topMenuItems.length ? (
            <div className="mt-6 max-h-[28rem] space-y-3 overflow-y-auto pr-1">
              {topMenuItems.map((item) => (
                <InsetCard key={item.id}>
                  <div className="flex items-start gap-3">
                    <MenuItemImage
                      alt={item.name}
                      className="h-20 w-20 shrink-0 rounded-md"
                      contain
                      sizes="80px"
                      src={item.imageUrl}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate text-label text-foreground">{item.name}</p>
                          <p className="mt-1 text-body-sm text-muted-foreground">
                            {menuCategoryLabels[item.category]}
                          </p>
                        </div>
                        <Badge variant="secondary">{item.soldCount} ventes</Badge>
                      </div>
                      <div className="mt-4 flex items-center justify-between gap-3 text-body-sm">
                        <span className="text-muted-foreground">Revenu généré</span>
                        <span className="font-semibold text-foreground">{formatCurrency(item.revenue)}</span>
                      </div>
                    </div>
                  </div>
                </InsetCard>
              ))}
            </div>
          ) : (
            <div className="mt-6">
              <EmptyState
                action={<Button asChild><Link href="/orders">Créer une commande</Link></Button>}
                description="Aucune ligne de commande ne permet encore d’établir un classement."
                title="Pas de ventes consolidées"
              />
            </div>
          )}
        </Card>
      </div>

      <div className="grid items-start gap-6 xl:grid-cols-[0.92fr_1.08fr]">
        <Card className="self-start p-6 xl:max-h-[43rem]">
          <div className="space-y-1">
            <h2 className="text-h3 text-foreground">Clients les plus actifs</h2>
          </div>

          <div className="mt-6 max-h-[31.5rem] space-y-3 overflow-y-auto pr-1">
            {topCustomers.map((customer) => (
              <InsetCard key={customer.id}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-label text-foreground">{customer.name}</p>
                    <p className="mt-1 text-body-sm text-muted-foreground">
                      {customer.ordersCount} commande(s) • dernière activité {formatDateTime(customer.lastOrderAt)}
                    </p>
                  </div>
                  <Badge variant={getCustomerBadgeVariant(customer.status)}>
                    {customerStatusLabels[customer.status]}
                  </Badge>
                </div>
                <div className="mt-4 flex items-center justify-between gap-3 text-body-sm">
                  <span className="text-muted-foreground">Revenu généré</span>
                  <span className="font-semibold text-foreground">{formatCurrency(customer.revenue)}</span>
                </div>
              </InsetCard>
            ))}
          </div>
        </Card>

        <Card className="p-6" variant="elevated">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-1">
              <h2 className="text-h3 text-foreground">Volume de commandes</h2>
            </div>
            <Tabs onValueChange={(value) => setOrdersPeriod(value as typeof ordersPeriod)} value={ordersPeriod}>
              <TabsList className="w-full sm:w-auto">
                <TabsTrigger value="day">Jour</TabsTrigger>
                <TabsTrigger value="month">Mois</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <BarTrendChart
            chartId={`home-orders-${ordersPeriod}`}
            data={ordersSeries}
            formatAxisValue={(value) => String(value)}
            formatValue={(value) => `${value} commande${value > 1 ? "s" : ""}`}
          />
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-h3 text-foreground">Commandes récentes</h2>
          </div>
          <Button asChild size="sm" variant="ghost">
            <Link href="/orders">
              Voir tout
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-6 space-y-3">
          {recentOrders.map((order) => (
            <div
              className="flex flex-col gap-3 rounded-lg border border-border/60 bg-background/60 p-4 transition duration-base ease-expressive hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-soft md:flex-row md:items-center md:justify-between"
              key={order.id}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <p className="text-label text-foreground">#{order.orderNumber}</p>
                  <Badge variant={getOrderBadgeVariant(order.status)}>{orderStatusLabels[order.status]}</Badge>
                </div>
                <p className="text-body-sm text-muted-foreground">{order.customerName}</p>
                <p className="text-body-sm text-muted-foreground">
                  {order.itemsCount} article(s) • {formatDateTime(order.createdAt)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-body font-semibold text-foreground">{formatCurrency(order.totalAmount)}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
