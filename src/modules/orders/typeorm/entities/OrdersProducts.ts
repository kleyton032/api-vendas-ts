import Customer from '@modules/costumers/typeorm/entities/Customer';
import Product from '@modules/products/typeorm/entities/Product';
import {Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import Order from './Order';

@Entity('orders_products')
class OrderProducts {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(()=> Order, order => order.order_products)
    @JoinColumn({name: 'order_id'})
    order: Order;

    @ManyToOne(()=> Product, product => product.order_products)
    @JoinColumn({name: 'product_id'})
    product: Product;

    @Column('decimal')
    price: number;

    @Column('int')
    quantity: number;

    @CreateDateColumn()
    created_at: Date;

    @CreateDateColumn()
    updated_at: Date;
}

export default OrderProducts;