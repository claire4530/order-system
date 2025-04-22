'use client'
import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import TotalRevenue from './components/total-revenue'
import MealTime from './components/meal-time'
import BusinessTime from './components/business-hours'
import TotalRevenueBarChart from './components/total-revenue-bar-chart'
import BestSellers from './components/best-sellers'
import TotalPowerUsage from './components/total-power-usage'
import ElectricityBill from './components/electric-bill'
import TotalPowerChart from './components/total-power-chart'
import TotalPowerCondition from './components/total-power-condition'
import CarbonAnalysis from './components/carbon-analysis'
import {
    ComputerDesktopIcon,
} from '@heroicons/react/24/outline'

export default function DashboardPage() {

    return (
        <>
            <div className="hidden flex-col md:flex">
                <div className='bg-white rounded-3xl p-8'>
                    <div className="flex gap-2 items-center px-4">
                        <ComputerDesktopIcon className="h-8 w-8 font-semibold" />
                        <h2 className="text-3xl font-bold tracking-tight p-3">
                            店鋪管理
                        </h2>
                    </div>
                    <div className="border-b p-3"></div>
                    <div className="flex-1 space-y-4 p-8 pt-6">
                        <Tabs defaultValue="overview" className="space-y-4">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="overview">營業管理</TabsTrigger>
                                <TabsTrigger value="analytics">
                                    用電量管理
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="overview" className="space-y-4">
                                <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-3">
                                    <TotalRevenue />
                                    <MealTime />
                                    <BusinessTime />
                                </div>
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                                    <TotalRevenueBarChart />
                                    <BestSellers />
                                </div>
                            </TabsContent>
                            <TabsContent value="analytics" className="space-y-4">
                                <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-2">
                                    <TotalPowerUsage />
                                    <ElectricityBill />
                                </div>
                                <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
                                    <TotalPowerChart />
                                </div>
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                                    <TotalPowerCondition />
                                    <CarbonAnalysis />
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </>
    )
}
