import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface JobCardProps {
  companyName: string
  jobTitle: string
  onViewCompany: () => void
  onViewJob: () => void
}

export function JobCard({
  companyName,
  jobTitle,
  onViewCompany,
  onViewJob,
}: JobCardProps) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle className="text-lg">{jobTitle}</CardTitle>
        <p className="text-sm text-muted-foreground">{companyName}</p>
      </CardHeader>
      <CardContent className="flex flex-col justify-end flex-grow">
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button variant="outline" onClick={onViewCompany} className="flex-1">
            Company Details
          </Button>
          <Button variant="default" onClick={onViewJob} className="flex-1">
            Job Details
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
