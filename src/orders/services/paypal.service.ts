import { Injectable } from "@nestjs/common";
import { Order } from "../entities/order.entity";
import { OrdersService } from "./orders.service";
import { OrderDetail } from "../entities/order_detail.entity";
import { Or, Repository } from "typeorm";
import axios from "axios";
import { InjectRepository } from "@nestjs/typeorm";
import { Status } from "../entities/status.enum";

@Injectable()
export class PaypalService {

    constructor(
        private readonly orderService: OrdersService,
        @InjectRepository(OrderDetail)
        private readonly orderDetailRepository: Repository<OrderDetail>,
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>
    ){}

    async createPayment(order_id:string){
        
        const order = await this.orderService.findOne(order_id);
        if (!order) {
            throw new Error('Order not found');
        }

        let totalPrice = 0;

        for (const orderDetail of order.order_details) {
            const productPrice = orderDetail.product.price;
            const quantity = orderDetail.quantity;
            totalPrice += productPrice * (quantity);
        }
        

        const paypal_order = {
            intent: "CAPTURE",
            purchase_units: [
              {
                amount: {
                  currency_code: "USD",
                  value: totalPrice,
                },
              },
            ],
            application_context: {
              brand_name: "mycompany.com",
              landing_page: "NO_PREFERENCE",
              user_action: "PAY_NOW",
              return_url: `http://localhost:3001/paypal/capture/${order_id}`,
              cancel_url: `http://localhost:3001/paypal/cancel/${order_id}`,
            },
          };

        const params = new URLSearchParams();
        params.append('grant_type', 'client_credentials');

       const {data:{access_token}} = await axios.post(`${process.env.PAYPAL_API}/v1/oauth2/token`, params, {
            auth: {
                username: process.env.PAYPAL_CLIENT_ID,
                password: process.env.PAYPAL_SECRET
            }
        })
        //console.log(access_token)
        const response = await axios.post(`${process.env.PAYPAL_API}/v2/checkout/orders`, paypal_order,{
            headers: { Authorization: `Bearer ${access_token}` }
        })

        //console.log(response.data)

        const url = response.data.links[1].href
        console.log(url)
        return url
        console.log("separate \n \n \n")
    }


    async capturePayment(order_id:string, token:any){

        const order = await this.orderService.findOne(order_id);

        const response = await axios.post(
            `${process.env.PAYPAL_API}/v2/checkout/orders/${token}/capture`,
            {},
            {
              auth: {
                username: process.env.PAYPAL_CLIENT_ID,
                password: process.env.PAYPAL_SECRET
              },
            }
        );

        order.status = Status.SENDED;

        await this.orderRepository.save(order)
      
        return response.data
        //console.log(response.data);
    }

    async cancel(order_id:string){
        const order = await this.orderService.findOne(order_id);
        order.status = Status.CANCELLED;

        await this.orderRepository.save(order)
    }
}