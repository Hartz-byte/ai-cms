import { NextPage } from "next";
import DashboardLayout from "@/components/layout/DashboardLayout";
import AudienceInsights from "@/components/analytics/AudienceInsights";

const Analytics: NextPage = () => {
  return (
    <DashboardLayout title="Analytics Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AudienceInsights />
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
