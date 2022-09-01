import Customer from '@modules/costumers/typeorm/entities/Customer';
import {Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';

@Entity('orders')
class Order {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(()=> Customer)
    @JoinColumn({name: 'customer_id'})
    customer: Customer

    @CreateDateColumn()
    created_at: Date;

    @CreateDateColumn()
    updated_at: Date;
}

export default Order;