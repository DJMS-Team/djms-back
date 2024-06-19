import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Order } from '../orders/entities/order.entity';
import { OrderDetail } from '../orders/entities/order_detail.entity';
import { subDays, format } from 'date-fns';
import { Status } from '../orders/entities/status.enum';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(OrderDetail)
    private orderDetailsRepository: Repository<OrderDetail>,
  ) {}

  async getIncomeReport(): Promise<any> {
    const currentDate = new Date();
    const lastMonthDate = subDays(currentDate, 30);
    const lastMonthDatePrev = subDays(lastMonthDate, 30);

    const currentPeriodOrders = await this.ordersRepository.find({
      where: {
        date: Between(lastMonthDate, currentDate),
        status: Status.RECEIVED,
      },
      relations: ['order_details', 'order_details.product'],
      
    });

    const lastPeriodOrders = await this.ordersRepository.find({
      where: {
        date: Between(lastMonthDatePrev, lastMonthDate),
        status: Status.RECEIVED,
      },
      relations: ['order_details', 'order_details.product'],
    });

    const calculateIncome = (orders: Order[]) => {
      return orders.reduce((total, order) => {
        const orderIncome = order.order_details.reduce((orderTotal, detail) => {
            
          return orderTotal + Number(detail.quantity) * Number(detail.product.price);
        }, 0);
        return total + orderIncome;
      }, 0);
    };

    const currentPeriodIncome = calculateIncome(currentPeriodOrders);
    const lastPeriodIncome = calculateIncome(lastPeriodOrders);
    const incomeChange = ((currentPeriodIncome - lastPeriodIncome) / lastPeriodIncome) * 100;

    const fillMissingDays = (startDate: Date, endDate: Date, orders: Order[]) => {
      const daysArray = [];
      for (let dt = new Date(startDate); dt <= endDate; dt.setDate(dt.getDate() + 1)) {
        const dateStr = format(dt, 'yyyy-MM-dd');
        const dailyIncome = orders
          .filter(order => format(order.date, 'yyyy-MM-dd') === dateStr)
          .reduce((total, order) => {
            const orderIncome = order.order_details.reduce((orderTotal, detail) => {
                console.log(detail)
              return orderTotal + Number(detail.quantity) * Number(detail.product.price);
            }, 0);
            return total + orderIncome;
          }, 0);
        daysArray.push({ date: dateStr, income: dailyIncome });
      }
      return daysArray;
    };

    const ordersDays = fillMissingDays(lastMonthDate, currentDate, currentPeriodOrders);

    return {
      currentPeriod: {
        income: currentPeriodIncome,
      },
      lastPeriod: {
        income: lastPeriodIncome,
      },
      incomeChange: incomeChange / 100, // Convert to decimal
      ordersDays: ordersDays,
    };
  }
}
