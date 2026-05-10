"use client";

import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Pagination } from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const sampleCustomers = [
  ["Camille Laurent", "camille@demo.fr", "VIP", "14 commandes"],
  ["Noah Bernard", "noah@demo.fr", "Actif", "8 commandes"],
  ["Emma Petit", "emma@demo.fr", "Actif", "6 commandes"],
  ["Léa Moreau", "lea@demo.fr", "Nouveau", "2 commandes"],
  ["Sofia Nguyen", "sofia@demo.fr", "VIP", "11 commandes"],
  ["Hugo Martin", "hugo@demo.fr", "Actif", "5 commandes"],
  ["Julie Rossi", "julie@demo.fr", "Nouveau", "1 commande"],
  ["Tom Becker", "tom@demo.fr", "Actif", "7 commandes"],
  ["Ines Diallo", "ines@demo.fr", "VIP", "12 commandes"],
  ["Max Leroy", "max@demo.fr", "Actif", "4 commandes"],
  ["Sarah Cohen", "sarah@demo.fr", "Nouveau", "1 commande"],
  ["Yanis Costa", "yanis@demo.fr", "Actif", "3 commandes"],
].map(([name, email, status, volume]) => ({ email, name, status, volume }));

const pageSize = 10;

export function PaginatedTableShowcase() {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(sampleCustomers.length / pageSize));
  const safePage = Math.min(page, totalPages);

  const visibleCustomers = useMemo(
    () => sampleCustomers.slice((safePage - 1) * pageSize, safePage * pageSize),
    [safePage],
  );

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-lg border border-border/70">
        <div className="overflow-x-auto">
          <Table>
            <TableCaption>Exemple de table paginée à partir de 10 lignes visibles.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Volume</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visibleCustomers.map((row) => (
                <TableRow key={row.email}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        row.status === "VIP"
                          ? "warning"
                          : row.status === "Nouveau"
                            ? "info"
                            : "success"
                      }
                    >
                      {row.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{row.volume}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <Pagination
        itemLabel="clients"
        onPageChange={setPage}
        page={safePage}
        pageSize={pageSize}
        totalItems={sampleCustomers.length}
        totalPages={totalPages}
      />
    </div>
  );
}
