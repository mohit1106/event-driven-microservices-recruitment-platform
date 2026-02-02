"use client";
import { Card } from "@/components/ui/card";
import { Application } from "@/type";
import {
  Briefcase,
  CheckCircle2,
  Clock,
  DollarSign,
  Eye,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import React from "react";

interface AppliedJobsProps {
  applications: Application[];
}

const AppliedJobs: React.FC<AppliedJobsProps> = ({ applications }) => {
  const getStatusConfig = (status: string) => {
    switch (status.toLowerCase()) {
      case "hired":
        return {
          icon: CheckCircle2,
          color: "text-green-600 dark:bg-green-900/30",
          bg: "bg-green-100 dark:bg-green-900/30",
          border: "border-green-200 dark:border-green-800",
        };
      case "rejected":
        return {
          icon: XCircle,
          color: "text-red-600 dark:bg-red-900/30",
          bg: "bg-red-100 dark:bg-red-900/30",
          border: "border-red-200 dark:border-red-800",
        };
      default:
        return {
          icon: Clock,
          color: "text-yellow-600 dark:bg-yellow-900/30",
          bg: "bg-yellow-100 dark:bg-yellow-900/30",
          border: "border-yellow-200 dark:border-yellow-800",
        };
    }
  };
  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <Card className="shadow-lg border-2 overflow-hidden">
        <div className="bg-blue-600 text-white p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <Briefcase size={20} className="text-blue-600" />
            </div>
          </div>
          <h1 className="text-2xl font-bold">Your Applied Jobs</h1>
          <p className="text-sm font-bold">
            {applications.length} applications submitted
          </p>
        </div>

        <div className="p-6">
          {applications && applications.length > 0 ? (
            <div className="space-y-4">
              {applications.map((a) => {
                const statusConfig = getStatusConfig(a.status);
                const StatusIcon = statusConfig.icon;

                return (
                  <div
                    key={a.application_id}
                    className="p-5 rounded-lg border-2 hover:border-blue-500 transition-all bg-background"
                  >
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-semibold mb-3">
                          {a.job_title}
                        </h3>

                        <div className="flex flex-wrap gap-4 items-center">
                          <div className="flex items-center gap-2 text-sm">
                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600">
                              <DollarSign size={14} />
                              <span className="font-medium">
                                ₹ {a.job_salary}
                              </span>
                            </div>
                          </div>

                          <div
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${statusConfig.bg} ${statusConfig.border}`}
                          >
                            <StatusIcon
                              size={14}
                              className={statusConfig.color}
                            />
                            <span
                              className={`font-medium text-sm ${statusConfig.color}`}
                            >
                              {a.status}
                            </span>
                          </div>
                        </div>
                      </div>

                      <Link
                        href={`/jobs/${a.job_id}`}
                        className="shrink-0 flex items-center justify-center gap-1.5"
                      >
                        <Eye size={16} />
                        View Job
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <>
              <p>No Applications Yet</p>
            </>
          )}
        </div>
      </Card>
    </div>
  );
};

export default AppliedJobs;
