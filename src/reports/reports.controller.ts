import { Controller, Get } from '@nestjs/common';
import { ReportService } from './reports.service';
import { IncomeReportDto } from './dto/income_report.dto';

@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('income')
  async getIncomeReport(): Promise<IncomeReportDto> {
    return this.reportService.getIncomeReport();
  }
}
