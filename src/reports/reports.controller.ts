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

  @Get('regis')
  async getRegistrationReport() {
    return this.reportService.getRegistrationStats();
  }

  @Get('orders')
  async getOrderStats() {
    return this.reportService.getOrderStats();
  }
}
