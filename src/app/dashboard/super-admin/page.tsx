"use client";

import { motion } from "framer-motion";
import StatCard from "@/components/super-admin/StatCard";
import { Users, Camera, ShieldCheck, CalendarCheck } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', bookings: 40, revenue: 2400 },
  { name: 'Feb', bookings: 30, revenue: 1398 },
  { name: 'Mar', bookings: 20, revenue: 9800 },
  { name: 'Apr', bookings: 27, revenue: 3908 },
  { name: 'May', bookings: 18, revenue: 4800 },
  { name: 'Jun', bookings: 23, revenue: 3800 },
  { name: 'Jul', bookings: 34, revenue: 4300 },
];

export default function SuperAdminPage() {
  return (
    <div className="space-y-8">
      {/* Stat Cards Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <StatCard
          title="Total Users"
          value={128}
          icon={<Users className="w-6 h-6" />}
          gradient="from-blue-500 to-indigo-600"
          delay={0.1}
        />
        <StatCard
          title="Total Photographers"
          value={35}
          icon={<Camera className="w-6 h-6" />}
          gradient="from-emerald-400 to-teal-600"
          delay={0.2}
        />
        <StatCard
          title="Total Admins"
          value={4}
          icon={<ShieldCheck className="w-6 h-6" />}
          gradient="from-purple-500 to-fuchsia-600"
          delay={0.3}
        />
        <StatCard
          title="Total Bookings"
          value={240}
          icon={<CalendarCheck className="w-6 h-6" />}
          gradient="from-orange-400 to-rose-500"
          delay={0.4}
        />
      </motion.div>

      {/* Chart Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-white/20 dark:border-zinc-800/50 rounded-2xl p-6 shadow-xl shadow-black/5"
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Statistik Pemesanan & Pendapatan</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Data 7 bulan terakhir</p>
          </div>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-colors">
          </button>
        </div>
        
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis yAxisId="left" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
              <YAxis yAxisId="right" orientation="right" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <Tooltip 
                contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
              />
              <Area yAxisId="left" type="monotone" dataKey="revenue" stroke="#3b82f6" fillOpacity={1} fill="url(#colorRevenue)" />
              <Area yAxisId="right" type="monotone" dataKey="bookings" stroke="#10b981" fillOpacity={1} fill="url(#colorBookings)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>


    </div>
  );
}
