import { NextPage } from "next";

import DashboardLayout from "@/components/layout/DashboardLayout";
import AudienceInsights from "@/components/analytics/AudienceInsights";
import ContentPerformance from "@/components/analytics/ContentPerformance";
import CompetitorTracking from "@/components/analytics/CompetitorTracking";

const Analytics: NextPage = () => {
  return (
    <DashboardLayout title="Analytics">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AudienceInsights />
        <ContentPerformance />
        <CompetitorTracking />
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
