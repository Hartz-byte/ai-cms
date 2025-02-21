import { NextPage } from "next";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ContentEditor from "@/components/content/ContentEditor";
import SEOOptimizer from "@/components/content/SEOOptimizer";
import ScheduleAssistant from "@/components/content/ScheduleAssistant";
import PerformancePrediction from "@/components/analytics/PerformancePrediction";
import useAuth from "@/hooks/useAuth";
import AiWritingAssistant from "@/components/AiWritingAssistant/AiWritingAssistant";

const Dashboard: NextPage = () => {
  // useAuth();

  return (
    <DashboardLayout title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ContentEditor />
        <SEOOptimizer />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ScheduleAssistant />
        <PerformancePrediction />
      </div>

      <AiWritingAssistant />
    </DashboardLayout>
  );
};

export default Dashboard;
