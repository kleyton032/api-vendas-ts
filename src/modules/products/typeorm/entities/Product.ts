import OrderProducts from '@modules/orders/typeorm/entities/OrdersProducts';
import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';

@Entity('products')
class Product {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToMany(()=>OrderProducts, order_products => order_products.product)
    order_products: OrderProducts[];

    @Column()
    name: string;

    @Column('decimal')
    price: number;

    @Column('int')
    quantity: number;

    @CreateDateColumn()
    created_at: Date;

    @CreateDateColumn()
    updated_at: Date;
}

export default Product;