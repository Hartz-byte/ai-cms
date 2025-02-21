// pages/dashboard.tsx
import { NextPage } from "next";

import DashboardLayout from "@/components/layout/DashboardLayout";
import useAuth from "@/hooks/useAuth";
import ContentEditor from "@/components/content/ContentEditor";
import SEOOptimizer from "@/components/content/SEOOptimizer";
import ScheduleAssistant from "@/components/content/ScheduleAssistant";
import PerformancePrediction from "@/components/analytics/PerformancePrediction";
import AiWritingAssistant from "@/components/AiWritingAssistant/AiWritingAssistant";

const Dashboard: NextPage = () => {
  useAuth();

  return (
    <DashboardLayout title="Dashboard">
      {/* Content Creation & AI Assistance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ContentEditor />
        <AiWritingAssistant />
      </div>

      {/* SEO Optimization */}
      <div className="grid grid-cols-1">
        <SEOOptimizer />
      </div>

      {/* Scheduling & Performance Prediction */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ScheduleAssistant />
        <PerformancePrediction />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
