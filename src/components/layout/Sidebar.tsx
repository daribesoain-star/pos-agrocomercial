"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  label: string;
  href: string;
  icon: string;
  roles?: string[];
}

const NAV_ITEMS: NavItem[] = [
  { label: "Venta", href: "/venta", icon: "🛒" },
  { label: "Dashboard", href: "/dashboard", icon: "📊" },
  { label: "Inventario", href: "/inventario", icon: "📦" },
  { label: "Clientes", href: "/clientes", icon: "👥" },
  { label: "Caja", href: "/caja", icon: "💰", roles: ["CAJERO", "MASTER_LOCAL", "SUPER_ADMIN"] },
  { label: "Reportes", href: "/reportes", icon: "📈", roles: ["MASTER_LOCAL", "SUPER_ADMIN"] },
  { label: "Config", href: "/config", icon: "⚙️", roles: ["MASTER_LOCAL", "SUPER_ADMIN"] },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`bg-white border-r border-gray-200 flex flex-col transition-all duration-200 ${
        collapsed ? "w-16" : "w-56"
      }`}
    >
      {/* Logo */}
      <div className="h-14 flex items-center justify-between px-4 border-b border-gray-200">
        {!collapsed && (
          <span className="text-lg font-bold text-green-700">🌿 Agro</span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
        >
          {collapsed ? "→" : "←"}
        </button>
      </div>

      {/* Nav items */}
      <nav className="flex-1 py-3 px-2 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-green-50 text-green-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
              title={collapsed ? item.label : undefined}
            >
              <span className="text-lg shrink-0">{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer: online/offline indicator */}
      <div className="p-3 border-t border-gray-200">
        <div className="flex items-center gap-2 px-2">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          {!collapsed && (
            <span className="text-xs text-gray-500">Online</span>
          )}
        </div>
      </div>
    </aside>
  
)#�